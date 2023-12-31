import {AuthUser} from '../../types/models/AuthUser';

export const authRole = {
  admin: ['admin'],
  user: ['user', 'admin'],
};

export enum RoutePermittedRole {
  Admin = 'admin',
  User = 'user',
}

export const defaultUser: AuthUser = {
  uid: 'john-alex',
  displayName: 'John Alex',
  email: 'demo@example.com',
  token: 'access-token',
  role: 'user',
  photoURL: '/assets/images/avatar/A11.jpg',
};
export const initialUrl = '/dashboards/crypto'; // this url will open after login

export const apiTimeout = 20000;
export const apiHeaders = {
  'Content-Type': 'application/json',
  Accept: '*/*',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, *',
  'Accept-Language': 'vi',
  'Content-Security-Policy': 'ALLOWALL',
};
