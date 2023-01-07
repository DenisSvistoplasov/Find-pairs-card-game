import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './timer.css';

interface ITimerProps {
  time: number;
  onTimeOut: () => void;
}
export function Timer({ time = 60, onTimeOut }: ITimerProps) {
  const [timeStamp] = useState(Date.now());
  const [leftTime, setLeftTime] = useState(time);

  useEffect(() => {
    const id = setInterval(() => {
      console.log('interval');
      const elapsedTime = (Date.now() - timeStamp) / 1000;
      let newLeftTime = time - elapsedTime;
      if (Math.floor(newLeftTime) <= 0) {
        newLeftTime = 0;
        onTimeOut();
        clearInterval(id);
      }
      setLeftTime(Math.floor(newLeftTime));
    }, 231);

    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.timer}>{formatTime(leftTime)}</div>
  );
}


function formatTime(time: number) {
  time = Math.round(time);
  let hours = Math.floor(time / 60 ** 2);
  time %= 60 ** 2;
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  let res = '';
  if (hours) res += numberTo2DigitString(hours) + ':';
  return res + numberTo2DigitString(minutes) + ':' + numberTo2DigitString(seconds);
}

function numberTo2DigitString(n: number) {
  return '0'.repeat((2 - (n + '').length)) + n;
}