import React, { useEffect } from 'react';
import * as S from './SignIn.styled';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import AuthLinkFlavor from '../../components/AuthLinkFlavor';
import { LynxLogoDetail } from '../../assets/icons';
import {
  AuthImportantText,
  MediumTopic,
  SmallAuthText,
} from '../../components/Text/Text.styled';
import AuthInput from '../../components/AuthInput';
import Button from '../../components/Button';
import GithubLoginButton from '../../components/GithubLoginButton';
import GoogleLoginButton from '../../components/GoogleLoginButton';
import Link from 'next/link';
import { useUser } from '../../context/user.context';

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

  const { login } = useUser();
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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const ax = login(data);
    console.log(ax);
    console.log(data);
  };

  return (
    <S.Wrapper>
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
    </S.Wrapper>
  );
};

export default SignIn;
