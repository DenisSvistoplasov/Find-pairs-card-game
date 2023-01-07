import React, { ReactNode } from 'react';
import styles from './genericlist.sass';

export interface IGenericListProps {
  Tag?: 'li' | 'a' | 'div' | 'button';
  list: IGenericListItem[];

}
interface IGenericListItem {
  inner: string | ReactNode;
  className?: string;
  onClick?: () => void;
}

const NOOP = () => { };
export function GenericList({ Tag = 'li' as const, list }: IGenericListProps) {
  return (
    <>
      {list.map(({ inner, className='', onClick=NOOP }) => (
        <Tag className={className} onClick={onClick}>{inner}</Tag>
      ))
      }
    </>
  );
}
