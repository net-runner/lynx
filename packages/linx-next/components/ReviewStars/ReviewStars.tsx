import React from 'react';
import * as S from './ReviewStars.styled';
import { StarEmpty, StarFull, StarHalf } from '../../assets/icons';

interface Props {
  rating: number;
  isInput?: boolean;
  onChange?: (rating: number) => void;
}

const ReviewStars: React.FC<Props> = ({ rating, isInput, onChange }) => {
  const handlePress = (index: number) => {
    if (isInput) {
      if (onChange) {
        onChange(index);
      }
    }
  };
  const stars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i + 0.25 < rating && rating < i + 0.75)
        stars.push(<StarHalf key={i} />);
      else if (i < rating)
        stars.push(<StarFull onClick={() => handlePress(i + 1)} key={i} />);
      else stars.push(<StarEmpty onClick={() => handlePress(i + 1)} key={i} />);
    }
    return stars;
  };
  return <S.Wrapper isInput={isInput}>{stars()}</S.Wrapper>;
};
export default ReviewStars;
