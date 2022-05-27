import { useUser } from '../../context/user.context';
import React from 'react';
import * as S from './UserDropdown.styled';

const UserDropdown = () => {
  const { user, isAuthenticated } = useUser();
  return <div>UserDropdown</div>;
};

export default UserDropdown;
