import { createStore } from 'zustand/vanilla';
import { UserType } from '@/utils/typeDefs';

export type UserState = {
  user: UserType | null;
};

export type UserActions = {
  updateUser: (user: UserType) => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  user: null,
};

export const userStore = createStore<UserStore>()(
  (set, getState) => ({
    ...defaultInitState,
    updateUser: (user: UserType | null) => {
      return set(() => ({ user }));
    },
  })
);

export const createUserStore = () => {
  return userStore;
};
