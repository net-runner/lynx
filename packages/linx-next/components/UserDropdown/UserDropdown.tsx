import { useUser } from '../../context/user.context';
import React, { useState } from 'react';
import * as S from './UserDropdown.styled';
import { ChevronDown } from '../../assets/icons';
import Link from 'next/link';

const UserDropdown = () => {
  const { user, isAuthenticated, logout } = useUser();
  const [Open, setOpen] = useState(false);
  return (
    <S.RelativeContainer>
      <S.Container onClick={() => setOpen(!Open)}>
        {isAuthenticated && user.name.toLocaleLowerCase().replace(' ', '-')}
        <ChevronDown />
      </S.Container>

      {Open && (
        <S.DropdownContainer>
          <S.DropDownLink>
            <Link
              href={`${process.env.FRONTEND_URL}u/${user.name
                .toLocaleLowerCase()
                .replace(' ', '-')}`}
            >
              Profile
            </Link>
          </S.DropDownLink>
          <S.DropdownDivider />
          <S.DropDownLink onClick={() => logout({ redirectLocation: '/' })}>
            Logout
          </S.DropDownLink>
        </S.DropdownContainer>
      )}
    </S.RelativeContainer>
  );
};

export default UserDropdown;
