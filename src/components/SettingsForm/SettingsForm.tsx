import React, { SyntheticEvent, useState } from 'react';
import { classNames } from '../../utils/classNames';
import styles from './settingsform.css';

export function SettingsForm({onSubmit}:{onSubmit:Function}) {
  const [width, setWidth] = useState(4);
  const [height, setHeight] = useState(4);
  const validateValue = (e: SyntheticEvent<HTMLInputElement>) => Math.min(Math.max(+e.currentTarget.value, 2), 10);
  
  return (
    <form className={styles.settingsForm} onSubmit={()=>{onSubmit({width,height})}}>
      <h2 className={styles.title}>Enter field size</h2>
      <div className={styles.inputs}>
        <div className={styles.x}>
        width:<input type="number" value={width} min={2} max={10} className={styles.xInput} onChange={(e)=>setWidth(validateValue(e))} />
        </div>
        <div className={styles.y}>
        height:<input type="number" value={height} min={2} max={10} className={styles.yInput} onChange={(e)=>setHeight(validateValue(e))} />
        </div>
      </div>
      <button className={classNames(styles.ok, 'btn')}>OK</button>
    </form>
  );
}
