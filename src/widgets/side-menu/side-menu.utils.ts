import {MenuItem} from 'primereact/menuitem';
import {NavigateFunction} from 'react-router-dom';
import {ROUTES} from '../../shared';
import {isMobile} from '../../shared/utils.ts';

export const generateMenuItems = (navigate: NavigateFunction, closeMenu: () => void): MenuItem[] => {
  let closeHandler = () => {};
  if (isMobile()) {
    closeHandler = () => closeMenu();
  }

  return [
    {
      label: 'Стратегии',
      icon: 'pi pi-fw pi-chart-line',
      command: () => {
        navigate(ROUTES.STRATEGIES);
        closeHandler();
      }
    },
    {
      label: 'Новости',
      icon: 'pi pi-fw pi-bolt',
      command: () => {
        navigate(ROUTES.NEWS);
        closeHandler();
      }
    },
    {
      label: 'Акции',
      icon: 'pi pi-fw pi-ticket',
      command: () => {
        navigate(ROUTES.STOCKS);
        closeHandler();
      }
    },
    {
      label: 'Чат',
      icon: 'pi pi-fw pi-comment',
      command: () => {
        navigate(ROUTES.CHAT);
        closeHandler();
      }
    }
  ];
};
