import React, { FC, useContext } from 'react';

import ActiveUserContext from '../../../../context/ActiveUserContext';

import styles from './Info.module.css';

const Info: FC = () => {
  const { activeUser } = useContext(ActiveUserContext);

  return (
    <div className={styles.info}>
      <h2>About me</h2>
      <span>Phone: {activeUser?.phone}</span> <br></br>
      <span>Email: {activeUser?.email}</span>
      <br></br>
      <span>City: {activeUser?.address.city} </span>
    </div>
  );
};

export default Info;
