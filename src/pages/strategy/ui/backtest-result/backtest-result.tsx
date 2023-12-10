import React, {useEffect, useState} from 'react';
import {Dialog} from 'primereact/dialog';
import {Calendar} from 'primereact/calendar';
import {Nullable} from 'primereact/ts-helpers';
import s from './backtest-result.module.css';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {getBacktest, TBacktestDto} from '../../model/get-backtest.ts';
import {timestampToDate} from '../../../../shared/utils.ts';
import {ProgressSpinner} from 'primereact/progressspinner';
import {Plot} from '../../../../shared/ui/plot';
import {Data, PlotData} from 'plotly.js';
import {TStockCoordinate} from '../../../stocks/stocks.types.ts';

type TProps = {
  visible: boolean;
  changeVisible: (val: boolean) => void;
};

export const BacktestResult: React.FC<TProps> = ({visible, changeVisible}: TProps): React.ReactNode => {
  const [dates, setDates] = useState<Nullable<(Date | null)[]>>(null);
  const [capital, setCapital] = useState<number>();
  const [blocked, setBlocked] = useState<boolean>(true);
  const [backtest, setBacktest] = useState<TBacktestDto>();
  const [loader, setLoader] = useState<boolean>(false);
  const [traces, setTraces] = useState<Data[]>([]);

  const allFieldsFilled = dates && capital && dates[0] && dates[1];

  const revenue = backtest?.revenue ? Math.round(backtest.revenue) : 0;

  const checkResults = async () => {
    if (allFieldsFilled) {
      setLoader(true);
      const backtest = await getBacktest(
        'SBER',
        (dates[0] as Date).valueOf(),
        (dates[1] as Date).valueOf(),
        capital,
        'rl'
      );

      const trace1: Partial<PlotData> = {
        x: backtest.actual.map((coordinates: TStockCoordinate) => new Date(coordinates.time)),
        y: backtest.actual.map((coordinates: TStockCoordinate) => coordinates.price),
        text: 'Цена',
        type: 'scatter',
        name: 'Цена'
      };

      const trace2: Partial<PlotData> = {
        x: backtest.buyDecisions.map((coordinates: TStockCoordinate) => new Date(coordinates.time)),
        y: backtest.buyDecisions.map((coordinates: TStockCoordinate) => coordinates.price),
        type: 'scatter',
        name: 'Покупка',
        text: 'Покупка',
        mode: 'markers',
        marker: {
          color: 'green'
        }
      };

      const trace3: Partial<PlotData> = {
        x: backtest.sellDecisions.map((coordinates: TStockCoordinate) => new Date(coordinates.time)),
        y: backtest.sellDecisions.map((coordinates: TStockCoordinate) => coordinates.price),
        type: 'scatter',
        name: 'Продажа',
        mode: 'markers',
        text: 'Продажа',
        marker: {
          color: 'red'
        }
      };

      const data: Data[] = [trace1, trace2, trace3];
      setTraces(data);

      setLoader(false);
      setBacktest(backtest);
    }
  };

  useEffect(() => {
    if (allFieldsFilled) {
      setBlocked(false);
    } else if (!blocked) {
      setTraces([]);
      setBacktest(undefined);
      setBlocked(true);
    }
  }, [dates, capital]);



  let content;

  if (loader) {
    content = <div className={s.spinnerWrapper}><ProgressSpinner/></div>;
  } else if (backtest && allFieldsFilled) {
    content = <>
      <p className={s.backtestText}>
        Если бы вы применили данную стратегию для акции <b>SBER</b> с <i>{
        timestampToDate((dates[0] as Date).valueOf())
      }</i> по <i>{
        timestampToDate((dates[1] as Date).valueOf())
      }</i>, ваш баланс изменился бы на <strong className={revenue > 0 ? s.up : s.down}>{revenue}%</strong>
      </p>
      <div className={s.plot}>
        <Plot traces={traces}/>
      </div>
    </>;
  } else {
    content = null;
  }

  const hide = () => {
    setDates(null);
    setCapital(undefined);
    setBlocked(true);
    setBacktest(undefined);
    setLoader(false);
    setTraces([]);
    changeVisible(false);
  }

  return (
    <Dialog
      header="Результаты бэктеста"
      visible={visible}
      onHide={hide}
    >
      <div className={s.wrapper}>
        <div className={s.form}>
          <div className={s.miniForm}>
            <h3>Выберите даты</h3>
            <Calendar
              value={dates}
              onChange={(e) => setDates(e.value)}
              selectionMode="range"
              dateFormat={'dd.mm.yy'}
              readOnlyInput
              maxDate={new Date()}
            />
          </div>
          <div className={s.miniForm}>
            <h3>Введите стартовый баланс</h3>
            <InputText
              keyfilter="int"
              placeholder="Количество в рублях"
              value={String(capital ?? '')}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCapital(Number(e.target.value))}
            />
          </div>
          <Button disabled={blocked} onClick={checkResults}>
            Посмотреть результаты
          </Button>
        </div>
        {content}
      </div>
    </Dialog>
  );
};
