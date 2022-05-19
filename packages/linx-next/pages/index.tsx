import { useRouter } from 'next/router';
import Button from '../components/Button';
import {
  BigInformationSection,
  LandingHeader,
} from '../components/Text/Text.styled';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';

const Index = () => {
const router = useRouter()
 const handleClick = (href:string) => {
   router.push(href)
 }
  return(

    <AuthLayout>
      <div className="landing-container">
        <LandingHeader>Manage your links with style</LandingHeader>
        <BigInformationSection>
          Lynx helps you manage your bookmarks with ease & enables sharing and
          finding new exciting sites with a click of a buton.
        </BigInformationSection>
        <div className="landing-buttons-container">
          <Button onClick={()=>handleClick('/login')}>Manage bookmarks</Button>
          <Button onClick={()=>handleClick('/explore')}>Explore</Button>
        </div>
      </div>
    </AuthLayout>
  );
}



export default Index;
