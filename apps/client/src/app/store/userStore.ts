import { createStore } from 'zustand';

import { User } from '../api/LoginAPI';

type UserStore = {
  user: User;
  setUser: (user: User) => void;
  logout: () => void;
};

const INITIAL_USER = {
  user: {} as User,
};

const LOCAL_STORAGE_KEY = 'USER_KEY';

const getUserData = localStorage.getItem(LOCAL_STORAGE_KEY);

const initialState = {
  user: getUserData ? (JSON.parse(getUserData) as User) : INITIAL_USER.user,
};

const userStore = createStore<UserStore>(set => ({
  user: initialState.user,
  setUser: user =>
    set(state => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user));
      return {
        ...state,
        user,
      };
    }),
  logout: () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    set(state => ({
      ...state,
      user: {} as User,
    }));
  },
}));

export default userStore;
