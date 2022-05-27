import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import Button from '../components/Button';
import {
  BigInformationSection,
  LandingHeader,
} from '../components/Text/Text.styled';
import Home from '../containers/Home/home';
import { useUser } from '../context/user.context';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';

const Index = () => {
  const router = useRouter();
  const { isAuthenticated } = useUser();
  const handleClick = (href: string) => {
    router.push(href);
  };
  if (isAuthenticated) return <Home />;
  return (
    <div className="landing-container">
      <LandingHeader>Manage your links with style</LandingHeader>
      <BigInformationSection>
        Lynx helps you manage your bookmarks with ease & enables sharing and
        finding new exciting sites with a click of a buton.
      </BigInformationSection>
      <div className="landing-buttons-container">
        <Button onClick={() => handleClick('signin')}>Manage bookmarks</Button>
        <Button onClick={() => handleClick('explore')}>Explore</Button>
      </div>
    </div>
  );
};

Index.getLayout = (page: ReactElement) => {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Index;
