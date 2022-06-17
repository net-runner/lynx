import MainLayout from '../../layouts/MainLayout';
import React, { ReactElement, useMemo } from 'react';
import MainFeed from '../../containers/MainFeed';
import { useRouter } from 'next/router';
import { useUser } from '../../context/user.context';
import { GroupTag, LinkGroup, Tag } from '@prisma/client';
import LynxInfoPanel from '../../components/LynxInfoPanel';
import { getTags } from '../../api/tag';

interface Props {
  initialLinkGroups: (LinkGroup & {
    tags: GroupTag[];
    _count: { links: number };
  })[];
  tags: Tag[];
}
const UserDashboard = ({ initialLinkGroups, tags }: Props) => {
  const {
    query: { user },
  } = useRouter();
  const { user: u } = useUser();
  const isUserDashboard = useMemo(() => {
    if (user && u && u.username) {
      return user === u.username;
    }
    return false;
  }, [user, u]);
  return (
    <>
      {initialLinkGroups.length === 0 && (
        <LynxInfoPanel text={'Nothing to see here!'} />
      )}
      <MainFeed
        linkGroupData={{
          currentPage: '5',
          groups: initialLinkGroups,
        }}
        tags={tags}
      />
    </>
  );
};
export async function getStaticPaths() {
  const users = (await fetch(`${process.env.FRONTEND_URL}api/user/all`).then(
    (res) => res.json()
  )) as { username: string }[];

  const paths = users.map((usr) => ({
    params: { user: usr.username },
  }));

  return {
    paths,
    fallback: true,
  };
}
export async function getStaticProps(context) {
  const { user } = context.params;
  const tags = await getTags();

  const res = await fetch(`${process.env.FRONTEND_URL}api/user/${user}`).then(
    (res) => res.json()
  );
  if (res === null) {
    return {
      props: { initialLinkGroups: null },
    };
  } else {
    const { linkGroups } = res;
    return {
      props: { initialLinkGroups: linkGroups, tags },
    };
  }
}
UserDashboard.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};
export default UserDashboard;
