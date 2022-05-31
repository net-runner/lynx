import MainLayout from '../../../layouts/MainLayout';
import React, { ReactElement } from 'react';
import { LinkGroup } from '@prisma/client';
import { GetStaticPaths, GetStaticProps } from 'next';

const ShowGroupContent = () => {
  return <div>ShowGroupContent</div>;
};
// export const getStaticPaths: GetStaticPaths = async (context) => {
//   console.log(context);
//   // const { user, group } = context.params;

//   // const res = await fetch(`${process.env.FRONTEND_URL}api/user/${user}`).then(
//   //   (res) => res.json()
//   // );
//   // const { linkGroups } = res as { linkGroups: LinkGroup[] };
//   // const paths = linkGroups.map((g) => ({
//   //   params: { group: g.name.toLowerCase().replaceAll(' ', '-') },
//   // }));

//   return {
//     paths: [],
//     fallback: true,
//   };
// };
// export const getStaticProps: GetStaticProps = async (context) => {
//   // const { group } = context.params;
//   console.log(context.params);
//   // const res = await fetch(`${process.env.FRONTEND_URL}api/user/${user}`).then(
//   //   (res) => res.json()
//   // );
//   const res = null;
//   if (res === null) {
//     return {
//       props: { initialLinkGroups: null },
//     };
//   } else {
//     const { linkGroups } = res;
//     return {
//       props: { initialLinkGroups: linkGroups },
//     };
//   }
// };

ShowGroupContent.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};
export default ShowGroupContent;
