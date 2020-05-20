import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

import '../../config/ReactotronConfig';

const Main = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');
  const localUsersName = 'users';

  const updateLocalUsers = async () => {
    const localUsers = await AsyncStorage.getItem(localUsersName);
    if (localUsers) setUsers(JSON.parse(localUsers));
  };

  useEffect(() => {
    updateLocalUsers();
  }, [setUsers]);

  navigation.setOptions({ title: 'Usuários' });

  const handleAddUser = async () => {
    setLoading(true);
    const response = await api.get(`/users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    const newUsers = [...users, data];
    AsyncStorage.setItem('users', JSON.stringify(newUsers));
    setUsers(newUsers);
    setNewUser('');
    setLoading(false);

    Keyboard.dismiss();
  };

  const handleNavigate = (user) => {
    navigation.navigate('User', { user });
  };

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Adicionar usuário"
          value={newUser}
          onChangeText={(text) => setNewUser(text)}
          returKeyType="send"
          onSubmitEditing={handleAddUser}
        />
        <SubmitButton loading={loading} onPress={handleAddUser}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Icon name="add" size={20} color="#FFF" />
          )}
        </SubmitButton>
      </Form>

      <List
        data={users}
        kewyExtractor={(user) => user.login}
        renderItem={({ item }) => (
          <User>
            <Avatar source={{ uri: item.avatar }} />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>
            <ProfileButton onPress={() => handleNavigate(item)}>
              <ProfileButtonText>Ver perfil</ProfileButtonText>
            </ProfileButton>
          </User>
        )}
      />
    </Container>
  );
};

Main.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default Main;
