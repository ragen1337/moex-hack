import React, {useEffect, useState} from 'react';
import {PageContent, PageHeader} from '../../shared';
import {DataView} from 'primereact/dataview';
import {Card} from 'primereact/card';
import s from './news.module.css';
import {Panel} from 'primereact/panel';
import {Dropdown} from 'primereact/dropdown';
import {useTickers} from '../../widgets/hooks/use-tickers.ts';
import {getNews, TNewsItemDto} from './model/get-news.ts';
import {ProgressSpinner} from 'primereact/progressspinner';

type TProps = {};

export const News: React.FC<TProps> = ({}: TProps): React.ReactNode => {
  const [selectedTicker, setSelectedTicker] = useState<string>();
  const tickers = useTickers(setSelectedTicker);
  const [news, setNews] = useState<TNewsItemDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const dropdownTickers = tickers.map((ticker: string) => ({
    name: ticker
  }));

  const selectedTickerDropdownItem = dropdownTickers.find((ticker) => ticker.name === selectedTicker);

  useEffect(() => {
    if (selectedTicker) {
      setLoading(true);
      getNews(selectedTicker)
        .then(
          (news: TNewsItemDto[]) => {
            setLoading(false);
            setNews(news);
          });
    }
  }, [selectedTicker]);

  const itemTemplate = (item: TNewsItemDto) => {
    return <div className={s.item}>
      <Panel header={item.title}>
        <div className={s.newsContent}>
          <p className="m-0">
            {item.snippet}
          </p>
          <span><b>Источник</b>: {item.source}</span>
          <span><i>Опубликовано: {item.date}</i></span>
          <a href={item.link}><b>Ссылка</b></a>
        </div>
      </Panel>
    </div>;
  };

  let contentJsx;

  if (loading) {
    contentJsx = <div className={s.spinnerWrapper}><ProgressSpinner /></div>;
  } else {
    contentJsx = <DataView value={news} itemTemplate={itemTemplate} rows={5} paginator/>;
  }

  return (
    <>
      <PageHeader>Новости</PageHeader>
      <PageContent>
        <div className={s.wrapper}>
          <div className={s.dropdownWrapper}>
            <Dropdown
              value={selectedTickerDropdownItem}
              onChange={(e) => setSelectedTicker(e.value.name)}
              options={dropdownTickers}
              optionLabel="name"
              filter
              disabled={loading}
            />
          </div>
          <Card className={s.card}>
            {contentJsx}
          </Card>
        </div>
      </PageContent>
    </>
  );
};
