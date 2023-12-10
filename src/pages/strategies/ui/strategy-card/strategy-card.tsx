import React from 'react';
import s from './strategy-card.module.css';
import {Card} from 'primereact/card';

type TProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export const StrategyCard: React.FC<TProps> = ({children, onClick}: TProps): React.ReactNode => {
  return (
    <Card className={s.card} onClick={onClick}>
      <section className={s.cardContent}>
        {children}
      </section>
    </Card>
  );
};
