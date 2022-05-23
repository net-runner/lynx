import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

const providers = [
  CredentialsProvider({
    name: 'Credentials',
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    authorize: async (credentials) => {
      const user = await axios.post(
        process.env.API_URL + 'auth/signin',
        {
          user: {
            password: credentials.password,
            email: credentials.email,
          },
        },
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json',
          },
        }
      );

      if (user) {
        console.log(user);
        return Promise.resolve(user);
      } else {
        return Promise.resolve(null);
      }
    },
  }),
];
const callbacks = {
  async jwt(token, user) {
    console.log(token);
    console.log(user);
    return token;
  },

  async session(session, token) {
    session.accessToken = token.accessToken;
    return session;
  },
};

const options: NextAuthOptions = {
  providers,
  // callbacks,
};
const Auth = (req, res) => NextAuth(req, res, options);
export default Auth;
