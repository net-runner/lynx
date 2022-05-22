import * as Joi from 'joi';
import { Link } from '@prisma/client';
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
  return !value.error;
};

const linkAddSchema = Joi.object({
  id: Joi.string().guid(),
  link: Joi.string().domain().required(),
  description: Joi.string().required(),
  privacyLevel: Joi.number().required(),
  owner: Joi.string().guid(),
  group: Joi.string().guid(),
  stars: Joi.number(),
});

export const validateLinkAdd = async (link: Link): Promise<boolean> => {
  const value = linkAddSchema.validate(link);
  return !value.error;
};

const linkEditSchema = Joi.object({
  id: Joi.string().guid(),
  link: Joi.string().domain(),
  description: Joi.string(),
  privacyLevel: Joi.number(),
  owner: Joi.string().guid(),
  group: Joi.string().guid(),
  stars: Joi.number(),
});

export const validateLinkEdit = async (link: Link): Promise<boolean> => {
  const value = linkEditSchema.validate(link);
  return !value.error;
};
