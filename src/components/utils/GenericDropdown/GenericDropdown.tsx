import React, { ReactNode, useEffect, useState } from 'react';
import styles from './genericdropdown.sass';

interface IDropdawnProps {
  button: ReactNode,
  children: ReactNode,
  isOpened?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}
const NOOP = () => { };
export function GenericDropdown({ button, children, isOpened = false, onOpen=NOOP, onClose=NOOP }: IDropdawnProps) {
  let [isOpen, setIsOpen] = useState(isOpened);
  useEffect(() => { 
    if (isOpen) onOpen();
    else onClose();
  }, [isOpen]);

  return (
    <div className={styles.container}>

      <div className={styles.button} onClick={() => setIsOpen(isO => !isO)} onBlur={() => setIsOpen(false)}>
        {button}
      </div>

      {isOpen &&
        <div className={styles.listWrapper} onClick={() => setIsOpen(false)}>
          <div className={styles.list}>
            {children}
          </div>
        </div>}

    </div>
  );
}
