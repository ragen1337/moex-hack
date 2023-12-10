import {AUTONOMY_VARIANTS, FREQUENCY_VARIANTS, GOAL_VARIANTS, STRATEGY_TYPES} from './create-strategy.constants.ts';
import {Profit} from '../../../../shared/svg/profit.tsx';
import {RiskDecrease} from '../../../../shared/svg/risk-decrease.tsx';
import {Separation} from '../../../../shared/svg/separation.tsx';
import {SignalSvg} from '../../../../shared/svg/signal.tsx';
import {AutoSvg} from '../../../../shared/svg/auto.tsx';
import {FrequencySvg} from '../../../../shared/svg/frequency.tsx';
import {RightArrow} from '../../../../shared/svg/right-arrow.tsx';
import {Reinforcement} from '../../../../shared/svg/reinforcement.tsx';
import {Forecasting} from '../../../../shared/svg/forecasting.tsx';
import {Algorithm} from '../../../../shared/svg/algorithm.tsx';
import {TVariants} from './create-strategy.types.ts';

export const getSvgByVariant = (variant: TVariants) => {
  switch (variant) {
    case GOAL_VARIANTS.PROFIT:
      return <Profit/>;
    case GOAL_VARIANTS.RISK_REDUCE:
      return <RiskDecrease/>;
    case GOAL_VARIANTS.BIG_DEAL_OPTIMIZE:
      return <Separation/>;
    case AUTONOMY_VARIANTS.SIGNAL:
      return <SignalSvg/>;
    case AUTONOMY_VARIANTS.AUTOMATIC:
      return <AutoSvg/>;
    case FREQUENCY_VARIANTS.HIGH_FREQUENCY:
      return <FrequencySvg/>;
    case FREQUENCY_VARIANTS.FUNDAMENTAL:
      return <RightArrow/>;
    case STRATEGY_TYPES.REINFORCEMENT:
      return <Reinforcement/>;
    case STRATEGY_TYPES.FORECASTING:
      return <Forecasting/>;
    case STRATEGY_TYPES.ALGORITHM:
      return <Algorithm/>;
  }
};
