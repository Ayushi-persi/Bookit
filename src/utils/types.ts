import { ReactNode } from 'react';
import { UserType } from '../redux/types/authType';

export type RouteProps = { children: ReactNode };

export type StateType = {
  authData: UserType;
};
