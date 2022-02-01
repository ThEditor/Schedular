import Cookies from 'js-cookie';
import { createContext, Dispatch, ReactNode, useReducer } from 'react';

import { Card } from '@/components/Card';

export interface Task {
  info: Card,
  time: {
    day: string;
    start: string;
    end: string;
  }
}

export interface IStore {
  tasks: Task[]
}

const initialState: IStore = {
  tasks: JSON.parse(Cookies.get('tasks') ?? '[]') ?? []
};

export interface Action {
  type: ActionType;
  payload?: Task[];
}

export enum ActionType {
  UPDATE_TASKS
}

function reducer(state: IStore, action: Action): IStore {
  switch (action.type) {
    case ActionType.UPDATE_TASKS: {
      const tasks = action.payload as Task[];
      Cookies.set('tasks', JSON.stringify(tasks));
      return { ...state, tasks };
    }
    default:
      return state;
  }
}

export const StoreContext = createContext<{ state: IStore; dispatch: Dispatch<Action> } | null>(null);

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