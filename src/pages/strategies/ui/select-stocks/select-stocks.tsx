import React, {useState} from 'react';
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import s from './select-stocks.module.css';
import {stocksList} from './select-stocks.constants.ts';

type TProps = {
  visible: boolean;
  onHideHandler: () => void;
  onNextHandler: () => void;
};

export const SelectStocks: React.FC<TProps> = ({
   visible,
   onHideHandler,
   onNextHandler
 }: TProps): React.ReactNode => {
  const [selectedStocks, setSelectedStocks] = useState<number[]>([]);

  const stocksJsx = stocksList.map((stock, i: number) => {
    const isSelected = selectedStocks.includes(i);

    const clickHandler = () => {
      if (isSelected) {
        const copy = [...selectedStocks];
        copy.splice(copy.indexOf(i), 1);
        setSelectedStocks(copy);
      } else {
        setSelectedStocks([...selectedStocks, i]);
      }
    };

    return (
      <section
        className={`${s.stock} ${isSelected ? s.selected : ''}`}
        key={stock.name}
        onClick={clickHandler}
      >
        <img src={'images/' + stock.icon} alt=""/>
        <span>{stock.name}</span>
      </section>
    );
  });

  const isButtonBlocked = selectedStocks.length < 1;

  const hideHandler = () => {
    onHideHandler();
    setSelectedStocks([]);
  }

  const nextHandler = () => {
    onNextHandler();
    setSelectedStocks([]);
  }

  return (
    <Dialog
      header="Выберите акции"
      visible={visible}
      onHide={hideHandler}
      className={s.dialog}
    >
      <div className={s.wrapper}>
        <section className={s.stocks}>
          {stocksJsx}
        </section>
        <Button
          disabled={isButtonBlocked}
          onClick={nextHandler}
        >
          Выбрать
        </Button>
      </div>
    </Dialog>
  );
};
