import * as S from './AuthLinkFlavor.styled';

interface Props {
  type: 'up' | 'down';
}

const AuthLinkFlavor: React.FC<Props> = ({ type }) => (
  <S.Container className={type}>
    <S.SpecialLinkIcon />
    <S.SpecialLinkIcon />
    <S.SpecialLinkIcon />
    <S.SpecialLinkIcon />
  </S.Container>
);
export default AuthLinkFlavor;
