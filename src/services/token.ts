export type Token = string;

const AUTH_TOKEN_KEY = 'auth-token';

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
