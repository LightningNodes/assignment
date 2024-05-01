import React from 'react';
import styles from '../styles/Login.module.css';

interface InputFieldProps {
  type: string;
  placeholder: string;
  iconClass: string;
}

const InputField: React.FC<InputFieldProps> = ({ type, placeholder, iconClass }) => (
  <div className={styles.login__box}>
    <input type={type} placeholder={placeholder} required className={styles.login__input} />
    <i className={iconClass}></i>
  </div>
);

export default InputField;
