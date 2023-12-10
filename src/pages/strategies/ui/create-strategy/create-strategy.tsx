import React, {useState} from 'react';
import {Dialog} from 'primereact/dialog';
import {Steps} from 'primereact/steps';
import {STRATEGY_STEPS, strategySlides} from './create-strategy.constants.ts';
import s from './create-strategy.module.css';
import {Card} from 'primereact/card';
import {getSvgByVariant} from './create-strategy.utils.tsx';
import {TStrategyItem} from '../../strategies.types.ts';
import {TStrategyVariant} from './create-strategy.types.ts';
import {Tooltip} from 'primereact/tooltip';

type TProps = {
  visible: boolean;
  changeVisible: (val: boolean) => void;
  appendNewStrategy: (newStrategy: TStrategyItem) => void;
};

export const CreateStrategy: React.FC<TProps> = (
  {
    visible,
    changeVisible,
    appendNewStrategy
  }: TProps): React.ReactNode => {
  const [selectedStep, setSelectedStep] = useState<STRATEGY_STEPS>(STRATEGY_STEPS.GOAL);

  const items = strategySlides.ids.map((id: STRATEGY_STEPS) => ({
    label: strategySlides.entities[id].stepsLabel
  }));

  const selectedStepIndex = strategySlides.ids.indexOf(selectedStep);
  const selectedSlide = strategySlides.entities[selectedStep];
  const headerText = selectedSlide.header;

  const onHideHandler = () => {
    setSelectedStep(STRATEGY_STEPS.GOAL);
    changeVisible(false);
  };

  const contentJsx = selectedSlide.variants.map((variant: TStrategyVariant) => {
    const clickHandler = () => {
      if (!variant?.blocked) {
        if (selectedStepIndex === strategySlides.ids.length - 1) {
          appendNewStrategy({
            id: String(Date.now()),
            onHold: true
          });
          onHideHandler();
        } else {
          setSelectedStep(strategySlides.ids[selectedStepIndex + 1]);
        }
      }
    };

    return (
      <Card
        key={variant.id}
        className={`${s.cardWrapper} ${variant?.blocked ? s.blocked : ''}`}
        onClick={clickHandler}
      >
        <section className={s.variant} id={variant.id}>
          <div className={s.imageWrapper}>
            {getSvgByVariant(variant.id)}
          </div>
          <span>{variant.name}</span>
        </section>
        <Tooltip
          target={`#${variant.id}`}
          content={variant.description}
          style={{maxWidth: '400px'}}
        />
      </Card>
    );
  });

  return (
    <Dialog
      header="Создание новой стратегии"
      visible={visible}
      onHide={onHideHandler}
      className={s.dialog}
    >
      <div className={s.modalWrapper}>
        <h1>{headerText}</h1>
        <section className={s.variants}>
          {contentJsx}
        </section>
      </div>
      <div className={s.stepsWrapper}>
        <Steps model={items} activeIndex={selectedStepIndex}/>
      </div>
    </Dialog>
  );
};
