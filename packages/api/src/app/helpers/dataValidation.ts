import * as Joi from 'joi';
import { Link, LinkGroup } from '@prisma/client';
import { LynxUser } from '../services/user.types';
import { ControllerMethodTypes } from '../../interfaces';

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
  if (user.name === 'all') return false;
  const value = signUpSchema.validate(user);
  return !value.error;
};

const linkSchema = Joi.object({
  id: Joi.string().guid(),
  link: Joi.string()
    .uri()
    .custom((value) => {
      const firstDoubleSlashIndex = value.indexOf('//');
      const lastDoubleSlashIndex = value.lastIndexOf('//');
      if (firstDoubleSlashIndex !== lastDoubleSlashIndex)
        throw new Error(
          'repeated forward-slashes (//) are not valid in the link'
        );
    }),
  description: Joi.string().min(5),
  privacyLevel: Joi.number(),
  owner: Joi.string().guid(),
  group: Joi.string().guid(),
  stars: Joi.number(),
});
const linkAddSchema = linkSchema.fork(
  ['link', 'description', 'privacyLevel'],
  (key) => key.required()
);

export const validateLink = async (
  link: Link,
  actionType: ControllerMethodTypes
): Promise<boolean> => {
  let value;
  if (actionType === ControllerMethodTypes.ADD)
    value = linkAddSchema.validate(link);
  if (actionType === ControllerMethodTypes.EDIT)
    value = linkSchema.validate(link);
  return !value.error;
};

const linkGroupSchema = Joi.object({
  id: Joi.string().guid(),
  owner: Joi.string(),
  name: Joi.string(),
  groupname: Joi.string(),
  description: Joi.string(),
  privacyLevel: Joi.number(),
  picture: Joi.string(),
  stars: Joi.number(),
  linkedCount: Joi.number(),
  watcherCount: Joi.number(),
  linksAmount: Joi.number(),
});
const linkGroupAddSchema = linkGroupSchema.fork(
  ['owner', 'name', 'description'],
  (key) => key.required()
);

export const validateLinkGroup = async (
  linkGroup: LinkGroup,
  actionType: ControllerMethodTypes
): Promise<boolean> => {
  let value;
  if (actionType === ControllerMethodTypes.ADD)
    value = await linkGroupAddSchema.validate(linkGroup);
  if (actionType === ControllerMethodTypes.EDIT)
    value = await linkGroupSchema.validate(linkGroup);
  return !value.error;
};
