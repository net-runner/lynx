import useOutside from '../../hooks/useOutside';
import React, { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useHotkeys } from 'react-hotkeys-hook';
import * as S from '../LinkGroupForm/LinkGroupForm.styled';
import Button from '../Button';
import ExpandingButton from '../ExpandingButton';
import ReviewStars from '../ReviewStars';
import { StarContainer } from './ReviewForm.styled';
import { addReview } from '../../api/review';

interface Props {
  groupId: string;
  creatorName: string;
}
type Inputs = {
  creatorName: string;
  score: number;
  description: string;
  groupId: string;
};

const ReviewForm = ({ groupId, creatorName }: Props) => {
  const [isExpanded, setExpansionState] = useState(false);
  const ref = useRef(null);
  useOutside(ref, () => setExpansionState(false));

  const { register, handleSubmit, control, setValue } = useForm<Inputs>();

  //Enter key press handler => submit form
  useHotkeys('enter, numpadenter', () => {
    handleSubmit(onSubmit)();
  });
  useEffect(() => {
    setValue('creatorName', creatorName);
    setValue('groupId', groupId);
  }, [creatorName, setValue, groupId]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    // const { link, description } = data;
    const addedLink = await addReview(data);
    if (!addedLink) return;
    // addNewLinkToState(addedLink);
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
          <S.Input
            type="hidden"
            {...register('creatorName', { required: true })}
          />
          <S.Input type="hidden" {...register('groupId', { required: true })} />
          <label>Score</label>
          <Controller
            control={control}
            name="score"
            defaultValue={5}
            render={({ field: { value, onChange }, fieldState, formState }) => (
              <StarContainer>
                <ReviewStars rating={value} onChange={onChange} isInput />
              </StarContainer>
            )}
          />
          <label>Review</label>
          <S.TextArea
            {...register('description', { required: true })}
            placeholder="Enter your review"
            rows={4}
          />
          <Button type="submit" isSecondary>
            Create review
          </Button>
        </S.Form>
      ) : (
        <ExpandingButton
          onClickHandler={expandForm}
          text="Create new review"
          type="dynamic"
          site="right"
          size="big"
        />
      )}
    </S.Wrapper>
  );
};

export default ReviewForm;
