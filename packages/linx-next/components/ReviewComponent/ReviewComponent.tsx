import { Review } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import ReviewStars from '../ReviewStars';
import * as S from './ReviewComponent.styled';
interface Props {
  data: Review;
}

const ReviewComponent = ({ data }: Props) => {
  return (
    <S.ReviewRow>
      <S.UserLink href={process.env.FRONTEND_URL + 'u/' + data.creatorName}>
        {'@' + data.creatorName}
      </S.UserLink>

      {data.description}
      <ReviewStars rating={data.score} />
    </S.ReviewRow>
  );
};
export default ReviewComponent;
