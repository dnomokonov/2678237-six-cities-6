import {User} from '../types/user.ts';
import {DEFAULT_USER} from '../const.ts';

export type Token = string;

const AUTH_TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

export const getToken = () : Token => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return token ?? '';
};

export const saveToken = (token : Token) : void => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const removeToken = () : void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

export const saveUser = (user : User) : void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = () : User => {
  try {
    const localUser = localStorage.getItem(USER_KEY);
    if (!localUser) {
      return DEFAULT_USER;
    }
    return JSON.parse(localUser) as User;
  } catch {
    return DEFAULT_USER;
  }
};

export const removeUser = () : void => {
  localStorage.removeItem(USER_KEY);
};
