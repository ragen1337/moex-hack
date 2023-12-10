import {TStrategySlides} from './create-strategy.types.ts';

export enum STRATEGY_STEPS {
  GOAL, AUTONOMY, FREQUENCY, STRATEGY_TYPE
}

export enum GOAL_VARIANTS {
  PROFIT='profit', RISK_REDUCE='riskReduce', BIG_DEAL_OPTIMIZE='bigDealOptimize'
}

export enum AUTONOMY_VARIANTS {
  SIGNAL='signal', AUTOMATIC='automatic'
}

export enum FREQUENCY_VARIANTS {
  HIGH_FREQUENCY='highFrequency',
  FUNDAMENTAL='fundamental'
}

export enum STRATEGY_TYPES {
  FORECASTING='forecasting', REINFORCEMENT='reinforcement', ALGORITHM='algorithm'
}

export const strategySlides: TStrategySlides = {
  ids: [
    STRATEGY_STEPS.GOAL,
    STRATEGY_STEPS.AUTONOMY,
    STRATEGY_STEPS.FREQUENCY,
    STRATEGY_STEPS.STRATEGY_TYPE
  ],
  entities: {
    [STRATEGY_STEPS.GOAL]: {
      id: STRATEGY_STEPS.GOAL,
      stepsLabel: 'Цель',
      header: 'Выберите цель реализации стратегии',
      description: '...',
      variants: [
        {
          id: GOAL_VARIANTS.PROFIT,
          name: 'Прибыль',
          description: 'Цель таких алгоритмов генерировать прибыль на спекуляции активами',
        },
        {
          id: GOAL_VARIANTS.RISK_REDUCE,
          name: 'Уменьшение риска',
          description: 'Данный тип алгоритмов предназначен для автоматической диверсификации и ребалансировки портфеля владельца. Основная цель самого алгоритма не генерация прибыли, а максимально быстрое реагирование на изменение баланса портфеля и приведение его к заранее заданным параметрам. Например, поддержание доли акций (по цене) в границах 30-40% от стоимости портфеля',
          blocked: true
        },
        {
          id: GOAL_VARIANTS.BIG_DEAL_OPTIMIZE,
          name: 'Оптимизация сделок',
          description: 'Данный тип алгоритмов предназначен для совершения очень крупных по объёму сделок. Особенности работы торговых площадок подразумевают сильное влияние на стоимость актива крупными торговыми поручениями. Например, если появляется заявка на покупку определённых акций на сумму $1млн, это неминуемо сильно повысит цены торгов. Чтобы избежать такого влияния, крупные участники рынка используют алгоритмы, которые могут в течение длительного времени маленькими партиями покупать или продавать инструменты по заданным параметрам цены. Такое "дробление" позволяет минимизировать влияние трейдера на рынок и получить требуемые объёмы сделок по приемлемым ценам.',
          blocked: true
        }
      ]
    },
    [STRATEGY_STEPS.AUTONOMY]: {
      id: STRATEGY_STEPS.AUTONOMY,
      stepsLabel: 'Автономность',
      header: 'Выберите степень автономности стратегии',
      description: '...',
      variants: [
        {
          id: AUTONOMY_VARIANTS.AUTOMATIC,
          name: 'Автоматическая',
          description: 'Тип торгового робота, который самостоятельно торгует на бирже, т.е. выставление/отмена торговых поручений происходит в полностью автоматическом режиме без участия человека.',
        },
        {
          id: AUTONOMY_VARIANTS.SIGNAL,
          name: 'Сигнальная',
          description: 'Тип алгоритмов, которые, исходя из внутренней логики, формируют сигналы трейдеру о покупке или продаже инструментов. Решение же о непосредственном выставлении заявки на биржу принимает человек (разработчик алгоритма)',
          blocked: true
        },
      ]
    },
    [STRATEGY_STEPS.FREQUENCY]: {
      id: STRATEGY_STEPS.FREQUENCY,
      stepsLabel: 'Частота торгов',
      header: 'Выберите частоту торговли стратегии',
      description: '...',
      variants: [
        {
          id: FREQUENCY_VARIANTS.HIGH_FREQUENCY,
          name: 'Высокочастотная',
          description: 'Основная форма алгоритмической торговли на финансовых рынках, в которой современное оборудование и алгоритмы используются для быстрой торговли ценными бумагами. В HFT используются специальные торговые стратегии, при которых компьютеры покупают и продают позиции в течение долей секунды, получая при этом на каждой сделке минимальную прибыль (часто измеряемую сотыми долями процента). Данный тип алгоритмов очень критичен к скорости получения биржевой информации и скорости выставления поручений на торговую площадку. Задержки на считанные миллисекунды способны свести и без того небольшую доходность каждой сделки к нулю или даже к убыткам',
        },
        {
          id: FREQUENCY_VARIANTS.FUNDAMENTAL,
          name: 'Фундаментальная',
          description: 'Вид алгоритмов, при котором отсутствует привязка к торговому дню биржи. Один актив может удерживаться торговым роботом в течение нескольких дней или даже недель в ожидании выгодного предложения о продаже/покупке',
          blocked: true
        },
      ]
    },
    [STRATEGY_STEPS.STRATEGY_TYPE]: {
      id: STRATEGY_STEPS.STRATEGY_TYPE,
      stepsLabel: 'Тип стратегии',
      header: 'Выберите тип стратегии',
      description: '...',
      variants: [
        {
          id: STRATEGY_TYPES.FORECASTING,
          name: '(ИИ) Прогнозирование',
          description: 'Торговля с использованием прогнозирования – это стратегия, основанная на анализе данных и предсказании будущих движений цен для принятия обоснованных решений',
        },
        {
          id: STRATEGY_TYPES.REINFORCEMENT,
          name: '(ИИ) Подкрепление',
          description: 'Торговля при помощи обучения с подкреплением (reinforcement learning, RL) основана на применении методов искусственного интеллекта для обучения агента принимать решения в динамичной среде с целью максимизации капитала.',
        },
        {
          id: STRATEGY_TYPES.ALGORITHM,
          name: 'Алгоритм',
          description: 'Торговля при помощи алгоритмов, часто называемая алгоритмической торговлей (algorithmic trading или algo trading), представляет собой использование программных алгоритмов для принятия торговых решений.',
        },
      ]
    }
  }
}
