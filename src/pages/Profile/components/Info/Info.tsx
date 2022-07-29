import React, { FC, useContext } from 'react';
import { getActiveUser } from '../../../../store/ducks/activeUser/selectors';
import { useAppSelector } from '../../../../store/hooks';

import styles from './Info.module.css';

const Info: FC = () => {
  
  const activeUser = useAppSelector(getActiveUser)

  return (
    <div className={styles.info}>
      <h2>About me</h2>
      <span>Email: {activeUser?.email}</span>
      <br></br>
    </div>
  );
};

export default Info;
