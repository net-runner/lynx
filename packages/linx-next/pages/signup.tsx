import { NextSeo } from 'next-seo';
import Link from 'next/link';
import React, { ReactElement, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LynxLogoDetailNoCircle } from '../assets/icons';
import AuthInput from '../components/AuthInput';
import AuthLinkFlavor from '../components/AuthLinkFlavor';
import Button from '../components/Button';
import GithubLoginButton from '../components/GithubLoginButton';
import GoogleLoginButton from '../components/GoogleLoginButton';
import {
  AuthImportantText,
  InterMediumInfo,
  MediumTopic,
  SmallAuthText,
} from '../components/Text/Text.styled';
import AuthLayout from '../layouts/AuthLayout';

type Inputs = {
  email: string;
  name: string;
  password: string;
  repeatPassword: string;
};

const Signup = () => {
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
    <div className="auth-container row signup">
      <div className="column flex-1">
        <AuthLinkFlavor type="up" />
        <MediumTopic style={{ marginBottom: '25px' }}>
          Welcome, join us!
        </MediumTopic>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>Name</label>
          <AuthInput
            {...register('name', { required: true })}
            placeholder="Enter your name"
          />
          <label>Email</label>
          <AuthInput
            {...register('email', { required: true })}
            placeholder="Enter your email"
          />
          {/* {errors.email && <span>Email is required</span>} */}
          <label>Password</label>
          <AuthInput
            {...register('password', { required: true })}
            placeholder="Enter your password"
          />
          <label>Repeat password</label>
          <AuthInput
            {...register('repeatPassword', { required: true })}
            placeholder="Re enter your password"
          />
          {/* {errors.password && <span>Password is required</span>} */}
          <Button type="submit">Sign up</Button>
        </form>
        <div
          className="row center"
          style={{ marginBottom: '-15px', marginTop: '30px' }}
        >
          <SmallAuthText style={{ marginRight: '10px' }}>
            Have an account?
          </SmallAuthText>
          <Link href={'signin'} passHref>
            <a>
              <AuthImportantText>Sign in!</AuthImportantText>
            </a>
          </Link>
        </div>
      </div>
      <div className="column flex-1 m0">
        <AuthLinkFlavor type="down" />
        <div className="rel column">
          <LynxLogoDetailNoCircle
            style={{ width: 300, height: 300 }}
            strokeWidth={2}
          />
          <InterMediumInfo
            style={{
              width: 200,
              marginTop: '-50px',
            }}
          >
            Share, watch, explore the web with Lynx
          </InterMediumInfo>
          <GithubLoginButton />
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
};
Signup.getLayout = (page: ReactElement) => (
  <AuthLayout>
    <NextSeo title="Signin" description="Sign in to your account." />

    {page}
  </AuthLayout>
);
export default Signup;
