import React from 'react';

import { IUser } from '../type/types';

interface ActiveUserContext {
  activeUser: IUser | null;
  updateUser: (user: IUser | null) => void
}

const ActiveUserContext = React.createContext<ActiveUserContext>({
  activeUser: null,
  updateUser: () => {}
});

export default ActiveUserContext;
