import React, { useEffect } from 'react';
import * as S from './SignUp.styled';
import { SubmitHandler, useForm } from 'react-hook-form';
import AuthLinkFlavor from '../../components/AuthLinkFlavor';
import {
  AuthImportantText,
  MediumTopic,
  SmallAuthText,
} from '../../components/Text/Text.styled';
import AuthInput from '../../components/AuthInput';
import Button from '../../components/Button';
import Link from 'next/link';
import { LynxLogoDetailNoCircle } from '../../assets/icons';
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
      </S.Column>
      <S.Column>
        <AuthLinkFlavor type="down" />
        <div className="rel column">
          <LynxLogoDetailNoCircle
            style={{ width: 300, height: 300 }}
            strokeWidth={2}
          />
          <S.Info>Share, watch, explore the web with Lynx</S.Info>
          <GithubLoginButton />
          <GoogleLoginButton />
        </div>
      </S.Column>
    </S.Wrapper>
  );
};

export default SignUp;
