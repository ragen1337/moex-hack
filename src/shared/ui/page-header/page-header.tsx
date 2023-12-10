import React from 'react';
import s from './page-header.module.css';

type TProps = {
  children: string;
};

export const PageHeader: React.FC<TProps> = ({children}: TProps): React.ReactNode => {
  return (
    <h1 className={s.header}>{children}</h1>
  );
};
