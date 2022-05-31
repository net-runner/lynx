import React from 'react';
import * as S from './ReviewStars.styled';
import { StarEmpty, StarFull, StarHalf } from '../../assets/icons';

interface Props {
  rating: number;
}

const ReviewStars: React.FC<Props> = ({ rating }) => {
  const stars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) stars.push(<StarFull key={i} />);
      else if (i + 0.25 > rating && i + 0.75 < rating)
        stars.push(<StarHalf key={i} />);
      else stars.push(<StarEmpty key={i} />);
    }
    return stars;
  };
  return <S.Wrapper>{stars()}</S.Wrapper>;
};
export default ReviewStars;
