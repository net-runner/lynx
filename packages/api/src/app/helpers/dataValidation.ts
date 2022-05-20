import * as Joi from 'joi';
import { Link } from '../../interfaces';
import { LynxUser } from '../services/user.types';

const signUpSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$'
      )
    )
    .required(),
  repeat_password: Joi.ref('password'),
  access_token: Joi.string(),
  email: Joi.string().email({
    minDomainSegments: 2,
  }),
})
  .with('name', 'email')
  .xor('password', 'access_token')
  .with('password', 'repeat_password');

export const validateSignUp = async (user: LynxUser): Promise<boolean> => {
  const value = signUpSchema.validate(user);
  return value.error ? false : true;
};


const linkSchema = Joi.object({
  link: Joi.string().domain().required(),
  description: Joi.string().required(),
  privacyLevel: Joi.number().required(),
  owner: Joi.string().guid(),
  group: Joi.string().guid(),
})

export const validateLink = async (link: Link): Promise<boolean> => {
  const value = linkSchema.validate(link);
  return value.error ? false : true;
};
