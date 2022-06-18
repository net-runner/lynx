import React from 'react';
import * as S from './SignIn.styled';
import { SubmitHandler, useForm } from 'react-hook-form';
import AuthLinkFlavor from '../../components/AuthLinkFlavor';
import { LynxLogoDetail } from '../../assets/icons';
import {
  AuthImportantText,
  SmallAuthText,
} from '../../components/Text/Text.styled';
import Button from '../../components/Button';
import GithubLoginButton from '../../components/GithubLoginButton';
import GoogleLoginButton from '../../components/GoogleLoginButton';
import Link from 'next/link';
import { useUser } from '../../context/user.context';
import { useHotkeys } from 'react-hotkeys-hook';
import { useRouter } from 'next/router';

type Inputs = {
  email: string;
  password: string;
};

const SignIn = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const router = useRouter();
  const { login, isAuthenticated } = useUser();
  //Enter key press handler => submit form
  useHotkeys('enter, numpadenter', () => {
    handleSubmit(onSubmit)();
  });

  if (isAuthenticated) {
    router.push('/');
    return null;
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    login(data);
  };

  return (
    <S.Wrapper>
      <AuthLinkFlavor type="up" />
      <LynxLogoDetail style={{ position: 'absolute', top: -25, right: -25 }} />
      <S.Title>Hi, welcome back!</S.Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <S.Input
          {...register('email', { required: true })}
          placeholder="Enter your email"
        />
        {/* {errors.email && <span>Email is required</span>} */}
        <label>Password</label>
        <S.Input
          type={'password'}
          {...register('password', { required: true })}
          placeholder="Enter your password"
        />
        {/* {errors.password && <span>Password is required</span>} */}
        <Button type="submit">Sign in</Button>
      </form>
      <GithubLoginButton />
      <GoogleLoginButton />
      <div
        className="row center"
        style={{ marginBottom: '-1.5rem', marginTop: '3rem' }}
      >
        <SmallAuthText style={{ marginRight: '1rem' }}>
          Don’t have an account?
        </SmallAuthText>
        <Link href={'signup'} passHref>
          <a>
            <AuthImportantText>Sign up fo free!</AuthImportantText>
          </a>
        </Link>
      </div>
    </S.Wrapper>
  );
};

export default SignIn;
