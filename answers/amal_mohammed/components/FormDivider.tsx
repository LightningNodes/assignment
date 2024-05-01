import React from 'react';
import styles from '../styles/Login.module.css';

const FormDivider: React.FC = () => (
  <div className={styles.login__divider}>
    <span className={styles.login__divider_bar}></span>
    <span className={styles.login__divider_text}>Or</span>
    <span className={styles.login__divider_bar}></span>
  </div>
);

export default FormDivider;
