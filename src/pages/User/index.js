import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import api from '../../services/api';
import '../../config/ReactotronConfig';

const User = ({ navigation, route }) => {
  const { user } = route.params;
  navigation.setOptions({ title: user.name });

  const [stars, setStars] = useState([]);

  const loadStars = async () => {
    const response = await api.get(`/users/${user.login}/starred`);
    setStars(response.data);
  };

  useEffect(() => {
    loadStars();
  }, [setStars]);

  return <View />;
};

User.propTypes = {
  navigation: PropTypes.shape({
    setOptions: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.string,
  }).isRequired,
};

export default User;
