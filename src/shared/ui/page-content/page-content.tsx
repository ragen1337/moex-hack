import React from 'react';
import s from './page-content.module.css';

type TProps = {
  children: React.ReactNode;
};

export const PageContent: React.FC<TProps> = ({children}: TProps): React.ReactNode => {
  return (
    <div className={s.content}>
      {children}
    </div>
  );
};
