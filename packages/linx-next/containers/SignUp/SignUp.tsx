import React, { useEffect } from 'react';
import * as S from './SignUp.styled';
import { SubmitHandler, useForm } from 'react-hook-form';
import AuthLinkFlavor from '../../components/AuthLinkFlavor';
import {
  AuthImportantText,
  SmallAuthText,
} from '../../components/Text/Text.styled';
import Button from '../../components/Button';
import Link from 'next/link';
import { LynxLogoDetailNoCircleSmallBox } from '../../assets/icons';
import GithubLoginButton from '../../components/GithubLoginButton';
import GoogleLoginButton from '../../components/GoogleLoginButton';

type Inputs = {
  email: string;
  name: string;
  password: string;
  repeatPassword: string;
};

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  //Enter key press handler => submit form
  useEffect(() => {
    const listener = (event) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault();
        handleSubmit(onSubmit)();
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [handleSubmit]);

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <S.Wrapper>
      <S.Column>
        <AuthLinkFlavor type="up" />
        <S.Title>Welcome, join us!</S.Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Name</label>
          <S.Input
            {...register('name', { required: true })}
            placeholder="Enter your name"
          />
          <label>Email</label>
          <S.Input
            {...register('email', { required: true })}
            placeholder="Enter your email"
          />
          {/* {errors.email && <span>Email is required</span>} */}
          <label>Password</label>
          <S.Input
            {...register('password', { required: true })}
            placeholder="Enter your password"
          />
          <label>Repeat password</label>
          <S.Input
            {...register('repeatPassword', { required: true })}
            placeholder="Re enter your password"
          />
          {/* {errors.password && <span>Password is required</span>} */}
          <Button type="submit">Sign up</Button>
        </form>
        <div
          className="row center"
          style={{ marginBottom: '-1.5rem', marginTop: '3rem' }}
        >
          <SmallAuthText style={{ marginRight: '1rem' }}>
            Have an account?
          </SmallAuthText>
          <Link href={'signin'} passHref>
            <a>
              <AuthImportantText>Sign in!</AuthImportantText>
            </a>
          </Link>
        </div>
      </S.Column>
      <S.Column>
        <AuthLinkFlavor type="down" />
        <S.LogoContainer>
          <LynxLogoDetailNoCircleSmallBox
            style={{ marginBottom: '2rem' }}
            strokeWidth={2}
          />
          <S.Info>Share, watch, explore the web with Lynx</S.Info>
          <GithubLoginButton />
          <GoogleLoginButton />
        </S.LogoContainer>
      </S.Column>
    </S.Wrapper>
  );
};

export default SignUp;
