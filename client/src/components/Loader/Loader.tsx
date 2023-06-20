import React from 'react';
import styles from './loader.module.css';

export const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles['lds-grid']}>
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};
