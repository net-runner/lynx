import React, { useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { SubmitHandler, useForm } from 'react-hook-form';
import useOutside from '../../hooks/useOutside';
import * as S from './LinkGroupForm.styled';
import Button from '../Button';
import ExpandingButton from '../ExpandingButton';
import { addLink } from '../../api/link';

interface Props {
  groupId: string;
  addNewLinkToState?: (link: string) => void;
}
type Inputs = {
  link: string;
  description: string;
};

const LinkGroupForm: React.FC<Props> = ({ groupId, addNewLinkToState }) => {
  const [isExpanded, setExpansionState] = useState(false);
  const ref = useRef(null);
  useOutside(ref, () => setExpansionState(false));

  const { register, handleSubmit } = useForm<Inputs>();

  //Enter key press handler => submit form
  useHotkeys('enter, numpadenter', () => {
    handleSubmit(onSubmit)();
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { link, description } = data;
    const addedLink = await addLink(link, description, 0, groupId);
    if (!addedLink) return;
    addNewLinkToState(addedLink);
    setExpansionState(false);
  };
  const expandForm = (e) => {
    e.stopPropagation();
    setExpansionState(true);
  };
  return (
    <S.Wrapper>
      {isExpanded ? (
        <S.Form onSubmit={handleSubmit(onSubmit)} ref={ref}>
          <label>Link</label>
          <S.Input
            {...register('link', { required: true })}
            placeholder="Enter new link"
          />
          <label>Description</label>
          <S.TextArea
            {...register('description', { required: true })}
            placeholder="Enter link's description"
            rows={4}
          />
          <Button type="submit" isSecondary>Add link</Button>
        </S.Form>
      ) : (
        <ExpandingButton
          onClickHandler={expandForm}
          text="Add new link to group"
          type="dynamic"
          site="right"
          size="big"
        />
      )}
    </S.Wrapper>
  );
};

export default LinkGroupForm;
