import React from 'react';
import styles from './gameovermodal.css';
import {classNames} from '../../../utils/classNames';

export function GameOverModal({isWon=false,onRestart=()=>{}}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.modal}>
        <h2 className={styles.title}>{isWon?'You won!':'Game Over'}</h2>
        <button className={classNames(styles.restartBtn, 'btn')} onClick={onRestart}>restart</button>
      </div>
    </div>
  );
}

