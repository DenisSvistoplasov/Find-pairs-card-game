import React, { ReactNode, useEffect, useState } from 'react';
import styles from './selectDropdown.sass';
import { randomString } from '../../../utils/randomString';

interface ISelectDropdown {
  children: ReactNode & ReactNode[],
  selected?: number;
  isOpened?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  arrow?: ReactNode | null;
  optionClassName?: string
}

const NOOP = () => { };
export function SelectDropdown({ children, selected=0, isOpened = false, onOpen=NOOP, onClose=NOOP, arrow=null, optionClassName='' }: ISelectDropdown) {
  let [isOpen, setIsOpen] = useState(isOpened);
  let [selectedN, setSelectedN] = useState(selected);
  useEffect(() => { 
    if (isOpen) onOpen();
    else onClose();
  }, [isOpen]);

  
  children = children.map((option, index) => (
    <div className={styles.option+''+optionClassName} onClick={()=>{setSelectedN(index)}}>{ option }</div>
  ));
  const selectedOption = children[selectedN];
  const resOptions = [...children.slice(0, selectedN), ...children.slice(selectedN + 1)];
  
  return (
    <div className={styles.container}>

      <div className={styles.button} onClick={() => setIsOpen(isO => !isO)} onBlur={() => setIsOpen(false)}>
        <div className={optionClassName}>{selectedOption}</div>
        {arrow && <div className={styles.arrow}>{arrow}</div>}
      </div>

      {isOpen &&
        <div className={styles.listWrapper} onClick={() => setIsOpen(false)}>
          <div className={styles.list}>
            {resOptions}
          </div>
        </div>}

    </div>
  );
}



