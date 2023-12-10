import {
  AUTONOMY_VARIANTS,
  FREQUENCY_VARIANTS,
  GOAL_VARIANTS,
  STRATEGY_STEPS,
  STRATEGY_TYPES
} from './create-strategy.constants.ts';

export type TVariants = GOAL_VARIANTS | AUTONOMY_VARIANTS | FREQUENCY_VARIANTS | STRATEGY_TYPES;

export type TStrategyVariant = {
  id: TVariants;
  name: string;
  description: string;
  blocked?: boolean;
};

export type TStrategyEntity = {
  id: STRATEGY_STEPS;
  stepsLabel: string;
  header: string;
  description: string;
  variants: TStrategyVariant[];
}

export type TStrategySlides = {
  ids: STRATEGY_STEPS[];
  entities: Record<STRATEGY_STEPS, TStrategyEntity>;
}
