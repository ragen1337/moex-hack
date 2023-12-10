import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {PageContent, PageHeader, ROUTES} from '../../shared';
import s from './strategy.module.css';
import {Card} from 'primereact/card';
import {StockInfoRow} from './ui/stock-info-row';
import {Button} from 'primereact/button';
import {BacktestResult} from './ui/backtest-result';
import {strategyMocks} from './strategy.mocks.ts';
import {TStrategy} from './strategy.types.ts';
import {BreadCrumb} from 'primereact/breadcrumb';

type TProps = {};

export const Strategy: React.FC<TProps> = ({}: TProps): React.ReactNode => {
  const [backtest, setBacktest] = useState<boolean>(false);
  const navigate = useNavigate();
  const {id} = useParams<string>();

  const currentStrategy: TStrategy = strategyMocks[id as string];

  useEffect(() => {
    if (!currentStrategy) {
      navigate(ROUTES.STRATEGIES);
    }
  }, []);

  return (
    <>
      <PageHeader>{`Стратегия ${String(id)}`}</PageHeader>
      <PageContent>
        <BreadCrumb
          model={[{
            label: `Стратегия ${id}`
          }]}
          home={{
            icon: 'pi pi-home',
            command: () => navigate(ROUTES.STRATEGIES)
          }}
        />
        <section className={s.page}>
          <div className={s.avatar}>
            <img src={currentStrategy.icon} alt="sber"/>
          </div>
          <Card>
            <div className={s.stockInfoWrapper}>
              <div className={s.stockInfo}>
                <StockInfoRow name={'Ticker '} value={currentStrategy.ticker}/>
                <StockInfoRow name={'Цель стратегии '} value={currentStrategy.goal}/>
                <StockInfoRow name={'Автономность'} value={currentStrategy.autonomy}/>
                <StockInfoRow name={'Частота торговли '} value={currentStrategy.frequency}/>
                <StockInfoRow name={'Тип стратегии '} value={currentStrategy.strategyType}/>
              </div>
              <div className={s.buttons}>
                <Button onClick={() => setBacktest(true)}>Посмотреть Backtest</Button>
                <Button disabled>Начать торговлю</Button>
              </div>
            </div>
          </Card>
        </section>
      </PageContent>
      <BacktestResult visible={backtest} changeVisible={setBacktest}/>
    </>
  );
};
