import React from 'react';

import { IUser } from '../type/types';

interface ActiveUserContext {
  activeUser: IUser | null;
}

const ActiveUserContext = React.createContext<ActiveUserContext>({
  activeUser: null,
});

export default ActiveUserContext;
