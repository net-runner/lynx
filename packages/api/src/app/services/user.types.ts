export interface BasicUser {
  email: string;
  name: string;
  password?: string;
  repeat_password?: string;
}
export interface GoogleUser extends BasicUser {
  id: string;
  verified_email: boolean;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export interface GithubUser extends BasicUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  name: string;
  company: string;
  blog: string;
  bio: string;
  followers: number;
  following: number;
  location: string;
  hireable: boolean;
  two_factor_authentication: boolean;
}

export type LynxUser = BasicUser | GoogleUser | GithubUser;
