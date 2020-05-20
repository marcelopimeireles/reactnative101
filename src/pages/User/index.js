import React from 'react';
import { View } from 'react-native';

import '../../config/ReactotronConfig';

const User = ({ route }) => {
  console.tron.log(route.params.user);
  return <View />;
};

export default User;
