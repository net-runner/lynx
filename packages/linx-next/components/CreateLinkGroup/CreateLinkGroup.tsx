import { GroupTag, Tag } from '@prisma/client';
import { useUser } from '../../context/user.context';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../Button';

import TagList from '../TagList';
import * as S from './CreateLinkGroup.styled';
import Link from 'next/link';
import { SpecialLinkIcon } from '../AuthLinkFlavor/AuthLinkFlavor.styled';
import { createGroup } from '../../api/linkgroup';
import { addMultipleGroupTags } from '../../api/tag';
import { useRouter } from 'next/router';
interface Props {
  tags: (Tag & { _count: { Groups: number } })[];
}
const CreateLinkGroup = ({ tags }: Props) => {
  const router = useRouter();
  const { user } = useUser();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const onTagClick = (i: number) => {
    let sTags = [...selectedTags];
    if (sTags.includes(i)) {
      sTags = sTags.filter((t) => t !== i);
    } else {
      sTags.push(i);
    }
    setSelectedTags(sTags);
  };
  useEffect(() => {
    setValue('owner', user.username);
  }, [user.username, setValue]);

  const onSubmit = async (data) => {
    console.log(data);

    //Request creation of new linkgroup
    const { id } = await createGroup(data);

    //Create Group tags
    const preparedTags: Omit<GroupTag, 'id'>[] = [];
    for (let index = 0; index < selectedTags.length; index++) {
      const tagIndex = selectedTags[index];
      const tag = tags[tagIndex];
      preparedTags.push({ group: id, tag: tag.id });
    }

    const res = await addMultipleGroupTags(preparedTags);

    if (res.status === 200) {
      router.push(
        process.env.FRONTEND_URL + 'u/' + user.username + '/' + data.groupname
      );
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <S.Wrapper>
        <S.Input
          type="hidden"
          defaultValue={'lynxapp'}
          {...(register('owner'), { required: true })}
        />
        <S.Header>
          <Link href={`/u/${user.username}`}>{user.username}</Link>
          <S.TitleDivider>&nbsp;/&nbsp;</S.TitleDivider>
          <S.Input
            defaultValue={'NewGroupName'}
            {...register('name', { required: true })}
          />
        </S.Header>
        <S.BodyWrapper>
          <S.UrlRow>
            <p>URL:</p>
            <p>{process.env.FRONTEND_URL + 'u/' + user.username + '/'}</p>
            <S.Input
              defaultValue={'newgroupname'}
              {...register('groupname', { required: true })}
            />
          </S.UrlRow>
          <TagList
            tags={tags}
            selectedTags={selectedTags}
            onClickHandler={onTagClick}
          />
          <S.Description
            defaultValue={'Description'}
            {...register('description', { required: true })}
          />
          <S.ButtonRow>
            <SpecialLinkIcon />
            <SpecialLinkIcon />
            <Button type="submit">Create link group</Button>
            <SpecialLinkIcon />
            <SpecialLinkIcon />
          </S.ButtonRow>
        </S.BodyWrapper>
      </S.Wrapper>
    </form>
  );
};

export default CreateLinkGroup;
