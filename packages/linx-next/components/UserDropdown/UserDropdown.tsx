import { useUser } from '../../context/user.context';
import React, { useRef, useState } from 'react';
import * as S from './UserDropdown.styled';
import { ChevronDown } from '../../assets/icons';
import Link from 'next/link';
import useOutside from '../../hooks/useOutside';

const UserDropdown = () => {
  const { user, isAuthenticated, logout } = useUser();
  const [Open, setOpen] = useState(false);
  const ref = useRef(null);
  useOutside(ref, () => setOpen(false));
  return (
    <S.RelativeContainer ref={ref}>
      <S.Container onClick={() => setOpen(!Open)}>
        {isAuthenticated && user.name}
        <ChevronDown />
      </S.Container>

      <S.DropdownContainer className={Open && 'open'}>
        <S.DropDownLink>
          <Link
            href={`${process.env.FRONTEND_URL}u/${user.name
              .toLocaleLowerCase()
              .replaceAll(' ', '-')}`}
          >
            Profile
          </Link>
        </S.DropDownLink>
        <S.DropdownDivider />
        <S.DropDownLink onClick={() => logout({ redirectLocation: '/' })}>
          Logout
        </S.DropDownLink>
      </S.DropdownContainer>
    </S.RelativeContainer>
  );
};

export default UserDropdown;
