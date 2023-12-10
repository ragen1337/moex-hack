import React, {useEffect, useState} from 'react';
import {PageContent, PageHeader} from '../../shared';
import s from './stocks.module.css';
import {Dropdown} from 'primereact/dropdown';
import {getStockInfo, TStockInfoDto} from './model/get-stock-info.ts';
import {TStockCoordinate} from './stocks.types.ts';
import {Card} from 'primereact/card';
import {Plot} from '../../shared/ui/plot';
import {Data, PlotData} from 'plotly.js';
import {useTickers} from '../../widgets/hooks/use-tickers.ts';

export const Stocks: React.FC = (): React.ReactNode => {
  const [selectedTicker, setSelectedTicker] = useState<string>();
  const tickers = useTickers(setSelectedTicker);
  const [stockInfo, setStockInfo] = useState<TStockInfoDto>();
  const [traces, setTraces] = useState<Data[]>([]);
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (selectedTicker) {
      setDisabled(true);
      getStockInfo(selectedTicker)
        .then((stockInfo: TStockInfoDto) => {
          setDisabled(false);
          setStockInfo(stockInfo);
        });
    }
  }, [selectedTicker]);

  useEffect(() => {
    if (stockInfo) {
      const trace1: Partial<PlotData> = {
        x: stockInfo.actual.map((coordinates: TStockCoordinate) => new Date(coordinates.time)),
        y: stockInfo.actual.map((coordinates: TStockCoordinate) => coordinates.price),
        text: 'Цена',
        type: 'scatter',
        name: 'Цена'
      };

      const predictedX = stockInfo.predicted.map((coordinates: TStockCoordinate) => new Date(coordinates.time));
      const trace2: Partial<PlotData> = {
        x: predictedX,
        y: stockInfo.predicted.map((coordinates: TStockCoordinate) => coordinates.price),
        type: 'scatter',
        name: 'Прогнозируемая цена',
        text: 'Прогнозируемая цена'
      };

      const data: Data[] = [trace1, trace2];
      setTraces(data);
    }
  }, [stockInfo]);

  const dropdownTickers = tickers.map((ticker: string) => ({
    name: ticker
  }));

  const selectedTickerDropdownItem = dropdownTickers.find((ticker) => ticker.name === selectedTicker);

  return (
    <>
      <PageHeader>Акции</PageHeader>
      <PageContent>
        <section className={s.stocks}>
          <div className={s.dropdownWrapper}>
            <Dropdown
              value={selectedTickerDropdownItem}
              onChange={(e) => setSelectedTicker(e.value.name)}
              options={dropdownTickers}
              optionLabel="name"
              filter
              disabled={disabled}
            />
          </div>
          <div className={s.chartWrapper}>
            <Card className={s.chartCard}>
              <Plot traces={traces} loading={disabled}/>
            </Card>
          </div>
        </section>
      </PageContent>
    </>
  );
};

