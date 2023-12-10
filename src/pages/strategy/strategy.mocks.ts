import {TStrategy} from './strategy.types.ts';

export const strategyMocks: Record<string, TStrategy> = {
  '1': {
    ticker: 'SBER',
    goal: 'Прибыль',
    autonomy: 'Автоматическая',
    frequency: 'Высокая',
    strategyType: 'ИИ с подкреплением',
    icon: '/images/sber.jpg'
  },
  '2': {
    ticker: 'SBER',
    goal: 'Прибыль',
    autonomy: 'Автоматическая',
    frequency: 'Высокая',
    strategyType: 'ИИ Прогнозирование',
    icon: '/images/ozon.png'
  }
};

