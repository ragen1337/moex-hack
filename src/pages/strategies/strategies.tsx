import React, {useState} from 'react';
import {StrategySvg} from '../../shared/svg/strategy.tsx';
import s from './strategies.module.css';
import {Button} from 'primereact/button';
import {StrategyCard} from './ui';
import {WaitSvg} from '../../shared/svg/wait.tsx';
import {PageContent, PageHeader, ROUTES} from '../../shared';
import {CreateStrategy} from './ui/create-strategy';
import {strategiesListInitial} from './strategies.constants.ts';
import {TStrategyItem} from './strategies.types.ts';
import {SelectStocks} from './ui/select-stocks';
import {useNavigate} from 'react-router-dom';

type TProps = {};

export const Strategies: React.FC<TProps> = ({}: TProps): React.ReactNode => {
  const [newStrategyModal, setNewStrategyModal] = useState<boolean>(false);
  const [selectStocksModal, setSelectStocksModal] = useState<boolean>(false);
  const [strategiesList, setStrategiesList] = useState<TStrategyItem[]>(strategiesListInitial);
  const navigate = useNavigate();

  const strategiesJsx = strategiesList.map((strategy: TStrategyItem, i: number) => {
    const onClick = strategy.onHold ? undefined : () => navigate(`${ROUTES.STRATEGIES}/${i + 1}`);

    return <StrategyCard
      key={strategy.id}
      onClick={onClick }
    >
      <>
        {strategy.onHold ? <WaitSvg/> : <StrategySvg/>}
        <h3>Стратегия {i + 1}</h3>
      </>
    </StrategyCard>;
  });

  const appendNewStrategy = (newStrategy: TStrategyItem) => {
    setStrategiesList([...strategiesList, newStrategy]);
  };

  const openCreateStrategy = () => {
    setSelectStocksModal(false);
    setNewStrategyModal(true);
  }


  return (
    <>
      <PageHeader>Стратегии</PageHeader>
      <PageContent>
        <section className={s.strategiesCards}>
          {strategiesJsx}
          <StrategyCard key={'create'}>
            <Button onClick={() => setSelectStocksModal(true)}>
              Создать
            </Button>
          </StrategyCard>
        </section>
      </PageContent>
      <CreateStrategy
        visible={newStrategyModal}
        changeVisible={setNewStrategyModal}
        appendNewStrategy={appendNewStrategy}
      />
      <SelectStocks
        visible={selectStocksModal}
        onHideHandler={() => setSelectStocksModal(false)}
        onNextHandler={() => openCreateStrategy()}
      />
    </>
  );
};
