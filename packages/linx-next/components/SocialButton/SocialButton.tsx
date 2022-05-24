import router from 'next/router';
import * as S from './SocialButton.styled';

interface Props {
  icon: JSX.Element;
  text: string;
  linkToAuth: string;
}

const SocialButton: React.FC<Props> = ({ linkToAuth, text, icon }) => {
  const handleClick = (href: string) => {
    router.push(href);
  };
  return (
    <S.Button onClick={() => handleClick(linkToAuth)}>
      {icon}
      {text}
    </S.Button>
  );
};

export default SocialButton;
