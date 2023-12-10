import React from 'react';
import s from './stock-info-row.module.css';

type TProps = {
  name: string;
  value: string;
};

export const StockInfoRow: React.FC<TProps> = ({name, value}: TProps): React.ReactNode => {
  return (
    <div className={s.wrapper}>
      <h3 className={s.name}>
        {name}
      </h3>
      <span>
        {value}
      </span>
    </div>
  );
};
