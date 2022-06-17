import UserDropdown from '../../components/UserDropdown';
import React from 'react';
import ExpandingButton from '../../components/ExpandingButton';
import { useRouter } from 'next/router';

const UserNav = () => {
  const router = useRouter();
  const handleClick = (e) => {
    router.push(process.env.FRONTEND_URL + 'new');
  };
  return (
    <>
      <ExpandingButton
        type="small"
        onClickHandler={handleClick}
        text="Create link group"
      />
      <UserDropdown />
    </>
  );
};

export default UserNav;
