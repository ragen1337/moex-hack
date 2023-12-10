import React, {useState} from 'react';
import s from './app.module.css';
import {SideMenu} from '../widgets/side-menu/side-menu.tsx';
import {Route, Routes} from 'react-router-dom';
import {ROUTES} from '../shared';
import {Strategies} from '../pages/strategies/strategies.tsx';
import {Stocks} from '../pages/stocks';
import {Chat} from '../pages/chat';
import {News} from '../pages/news';
import {Strategy} from '../pages/strategy';

type TProps = {};

export const App: React.FC<TProps> = ({}: TProps): React.ReactNode => {
  const [menuOpened, setMenuOpened] = useState<boolean>(true);

  return (
    <section className={s.appWrapper}>
      <SideMenu status={menuOpened} changeStatus={setMenuOpened}/>
      <div className={`${s.pageWrapper} ${menuOpened ? s.menuActive : ''}`}>
        <Routes>
          <Route path={ROUTES.STOCKS} element={<Stocks />} />
          <Route path={ROUTES.NEWS} element={<News />} />
          <Route path={ROUTES.STRATEGIES} element={<Strategies />} index/>
          <Route path={'/'} element={<Strategies />} index/>
          <Route path={ROUTES.STRATEGY} element={<Strategy />} />
          <Route path={ROUTES.CHAT} element={<Chat />} />
        </Routes>
      </div>
    </section>
  );
};
