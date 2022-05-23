import { useForm, SubmitHandler } from 'react-hook-form';
import { NextSeo } from 'next-seo';
import React, { ReactElement, useEffect } from 'react';
import { LynxLogoDetail } from '../assets/icons';
import AuthLinkFlavor from '../components/AuthLinkFlavor';
import Button from '../components/Button';
import GithubLoginButton from '../components/GithubLoginButton';
import GoogleLoginButton from '../components/GoogleLoginButton';
import {
  AuthImportantText,
  MediumTopic,
  SmallAuthText,
} from '../components/Text/Text.styled';
import AuthLayout from '../layouts/AuthLayout';
import AuthInput from '../components/AuthInput';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

type Inputs = {
  email: string;
  password: string;
};

const SigninPage = () => {
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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signIn('credentials', {
      email: data.email,
      password: data.password,
      callbackUrl: `/home`,
    });
    console.log(data);
  };

  return (
    <div className="auth-container column">
      <AuthLinkFlavor type="up" />
      <LynxLogoDetail style={{ position: 'absolute', top: -25, right: -25 }} />
      <MediumTopic style={{ marginBottom: '25px' }}>
        Hi, welcome back!
      </MediumTopic>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <AuthInput
          {...register('email', { required: true })}
          placeholder="Enter your email"
        />
        {/* {errors.email && <span>Email is required</span>} */}
        <label>Password</label>
        <AuthInput
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
        style={{ marginBottom: '-15px', marginTop: '30px' }}
      >
        <SmallAuthText style={{ marginRight: '10px' }}>
          Don’t have an account?
        </SmallAuthText>
        <Link href={'signup'} passHref>
          <a>
            <AuthImportantText>Sign up fo free!</AuthImportantText>
          </a>
        </Link>
      </div>
    </div>
  );
};

SigninPage.getLayout = (page: ReactElement) => {
  return (
    <AuthLayout type="signin">
      <NextSeo title="Signin" description="Sign in to your account." />
      {page}
    </AuthLayout>
  );
};
export default SigninPage;
