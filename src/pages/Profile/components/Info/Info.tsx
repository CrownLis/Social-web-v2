import React, { FC, useContext } from 'react';

import ActiveUserContext from '../../../../context/ActiveUserContext';

import styles from './Info.module.css';

const Info: FC = () => {
  const { activeUser } = useContext(ActiveUserContext);

  return (
    <div className={styles.info}>
      <h2>About me</h2>
      <span>Email: {activeUser?.email}</span>
      <br></br>
    </div>
  );
};

export default Info;
