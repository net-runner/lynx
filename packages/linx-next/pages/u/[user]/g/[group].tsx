import MainLayout from '../../../../layouts/MainLayout';
import React, { ReactElement } from 'react';

const ShowGroupContent = () => {
  return <div>ShowGroupContent</div>;
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
      props: { initialLinkGroups: linkGroups },
    };
  }
}

ShowGroupContent.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};
export default ShowGroupContent;
