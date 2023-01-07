import React, { useEffect, useState } from 'react';
import { classNames } from '../../../utils/classNames';
import styles from './card.css';

export type onOpen = (id: number, content: string | number) => void | (() => void);
export interface ICardProps {
  isOpen: boolean;
  isGuessed: boolean;
  isOpenable: boolean;
  content: string | number;
  shirtImg: string;
  id: number;
  color?: string;
  onOpen?: onOpen;
}
const NOOP = () => {};
export function Card({ isOpen, isGuessed, isOpenable, content, shirtImg, id, color = 'white', onOpen = NOOP }: ICardProps) {

  function turn() {
    if (!isOpen && isOpenable) {
      onOpen(id, content);
    }
  }
  return (
    <div className={styles.scene} onClick={turn}>
      <div className={classNames(styles.card, { [styles.turned]: isOpen })}>
        <div className={styles.front} style={{ backgroundColor: color }}>
          <div className={classNames(styles.number, { [styles.guessed]: isGuessed })}>{content}</div>
        </div>
        <div className={styles.back} style={{ backgroundImage: 'url("' + shirtImg + '")' }}></div>
      </div>
    </div>
  );
}
export default React.memo(Card);
