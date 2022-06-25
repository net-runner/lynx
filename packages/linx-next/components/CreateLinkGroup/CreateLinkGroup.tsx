import { GroupTag, Tag } from '@prisma/client';
import { useUser } from '../../context/user.context';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import { Eye, Lock } from '../../assets/icons';
import TagList from '../TagList';
import * as S from './CreateLinkGroup.styled';
import Link from 'next/link';
import { SpecialLinkIcon } from '../AuthLinkFlavor/AuthLinkFlavor.styled';
import { createGroup } from '../../api/linkgroup';
import { addMultipleGroupTags } from '../../api/tag';
import { useRouter } from 'next/router';
import { revalidate } from '../../api/revalidate';
interface Props {
  tags: (Tag & { _count: { Groups: number } })[];
}
const CreateLinkGroup = ({ tags }: Props) => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const { handleSubmit, register, setValue } = useForm();
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [selectedPrivacyLevel, setPrivacyLevel] = useState(0);

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
    setValue('privacyLevel', selectedPrivacyLevel);
  }, [user.username, setValue, selectedPrivacyLevel]);

  useEffect(() => {
    setValue('privacyLevel', selectedPrivacyLevel);
  }, [selectedPrivacyLevel, setValue]);

  const onSubmit = async (data) => {
    //Request creation of new linkgroup
    const newgroup = await createGroup(data);
    if (!newgroup) return;

    //Create Group tags
    const preparedTags: Omit<GroupTag, 'id'>[] = [];
    for (let index = 0; index < selectedTags.length; index++) {
      const tagIndex = selectedTags[index];
      const tag = tags[tagIndex];
      preparedTags.push({ groupId: newgroup.id, tagId: tag.id });
    }

    const res = await addMultipleGroupTags(preparedTags);
    await revalidate(`/u/${user.username}`);
    await revalidate(`/t/all`);

    if (res.status === 200) {
      router.push(
        process.env.FRONTEND_URL + 'u/' + user.username + '/' + data.groupname
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <S.Wrapper>
        <S.Input type="hidden" {...register('owner', { required: true })} />
        <S.Header>
          {!isLoading && (
            <Link href={`/u/${user.username}`}>{user.username}</Link>
          )}
          <S.TitleDivider>&nbsp;/&nbsp;</S.TitleDivider>
          <S.Input
            defaultValue={'NewGroupName'}
            {...register('name', { required: true })}
          />
          <S.IconWrapper
            onClick={() => setPrivacyLevel(0)}
            isvisible={selectedPrivacyLevel === 6}
          >
            <p>Private group</p>
            <Lock />
          </S.IconWrapper>
          <S.IconWrapper
            onClick={() => setPrivacyLevel(6)}
            isvisible={selectedPrivacyLevel === 0}
          >
            <p>Public group</p>
            <Eye />
          </S.IconWrapper>
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
            placeholder={'Description'}
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
