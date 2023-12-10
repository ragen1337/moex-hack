import React from 'react';
import s from './side-menu.module.css';
import {GraphSvg} from '../../shared';
import {Menu} from 'primereact/menu';
import {generateMenuItems} from './side-menu.utils.ts';
import {useNavigate} from 'react-router-dom';
import {Button} from 'primereact/button';

type TProps = {
  status: boolean;
  changeStatus: (val: boolean) => void;
};

export const SideMenu: React.FC<TProps> = ({status, changeStatus}: TProps): React.ReactNode => {
  const navigate = useNavigate();
  const closeMenu = () => changeStatus(false);
  const items = generateMenuItems(navigate, closeMenu);

  return (
    <div className={`${s.wrapper} ${status ? '' : s.disabled}`}>
      <section className={s.sideMenu}>
        <section className={s.appName}>
          <GraphSvg/>
          <span>ALGO</span>
        </section>
        <Menu model={items} className={s.menuList}/>
      </section>
      <Button
        icon={`pi ${status ? 'pi-arrow-left' : 'pi-bars'}`}
        onClick={() => changeStatus(!status)}
        rounded
        outlined
        className={s.button}
      />
    </div>
  );
};
