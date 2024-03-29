import { ReactNode } from 'react';

export interface IChildrenProp {
  children: ReactNode;
}

export interface IJwtTokenContent {
  userName: string;
  exp: number;
}

export interface IProviderProps<T> {
  children: ReactNode;
  value: T;
}
