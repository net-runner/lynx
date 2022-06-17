import MainLayout from '../../../layouts/MainLayout';
import React, { ReactElement } from 'react';
import { GroupTag, Link, LinkGroup, Tag, User } from '@prisma/client';
import { GetStaticPaths, GetStaticProps } from 'next';
import LinkGroupDisplay from '../../../components/LinkGroupDisplay';
import { getTags } from '../../../api/tag';

interface Props {
  groupWithLinks: LinkGroup & {
    tags: GroupTag[];
    links: Link[];
  };
  tags: Tag[];
}
const ShowGroupContent = ({ groupWithLinks, tags }: Props) => {
  if (groupWithLinks) {
    return <LinkGroupDisplay data={groupWithLinks} tags={tags} />;
  }
  return <>No data</>;
};
export const getStaticPaths: GetStaticPaths = async (context) => {
  const users = (await fetch(
    `${process.env.FRONTEND_URL}api/user/all/groups`
  ).then((res) => res.json())) as (User & { linkGroups: LinkGroup[] })[];

  const paths = [];
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    for (let j = 0; j < user.linkGroups.length; j++) {
      const group = user.linkGroups[j];
      paths.push({ params: { user: user.username, group: group.groupname } });
    }
  }
  return { paths, fallback: true };
};
export const getStaticProps: GetStaticProps = async (context) => {
  // const { group } = context.params;
  const { user, group } = context.params;

  const tags = await getTags();

  const res = await fetch(
    `${process.env.FRONTEND_URL}api/user/${user}/g/${group}`
  ).then((res) => res.json());
  if (res === null) {
    return {
      props: { groupWithLinks: null },
    };
  } else {
    return {
      props: { groupWithLinks: res, tags },
    };
  }
};

ShowGroupContent.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};
export default ShowGroupContent;
