import React, { ReactNode } from 'react';
import styles from './option.sass';

export interface IOptionProps {
  icon?: string | ReactNode;
  text?: string;
}

export function Option({ icon = '', text = '' }: IOptionProps) {
  return (
    <div className={styles.option}>
      {icon &&
        (typeof icon == 'string' ?
          <img className={styles.img} src={icon} /> :
          icon
          )}
      <span className={styles.text}>{text}</span>
    </div>
  );
}
