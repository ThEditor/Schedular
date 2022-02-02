import Cookies from 'js-cookie';
import { createContext, Dispatch, ReactNode, useReducer } from 'react';

import { Card } from '@/components/Card';

export interface Task {
  info: Card;
  time: {
    day: string;
    start: string;
    end: string;
  };
}

export interface IStore {
  authuser: number;
  autoRedirect: string;
}

const initialState: IStore = {
  authuser: parseInt(Cookies.get('authuser') ?? '0'),
  autoRedirect: Cookies.get('autoRedirect') ?? 'none',
};

export interface Action {
  type: ActionType;
  payload?: number | string;
}

export enum ActionType {
  SET_AUTHUSER,
  SET_AUTOREDIRECT,
}

function reducer(state: IStore, action: Action): IStore {
  switch (action.type) {
    case ActionType.SET_AUTHUSER: {
      const authuser = action.payload as number;
      Cookies.set('authuser', JSON.stringify(authuser));
      return { ...state, authuser };
    }
    case ActionType.SET_AUTOREDIRECT: {
      const autoRedirect = action.payload as string;
      Cookies.set('autoRedirect', autoRedirect);
      return { ...state, autoRedirect };
    }
    default:
      return state;
  }
}

export const StoreContext = createContext<{
  state: IStore;
  dispatch: Dispatch<Action>;
} | null>(null);

type Props = {
  children?: ReactNode | undefined;
};

export function StoreProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
