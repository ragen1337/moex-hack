import React, {useEffect, useRef} from 'react';
import s from './plot.module.css';
import {plotlyLayout} from './plot.constants.ts';
import {ProgressSpinner} from 'primereact/progressspinner';
import {Data} from 'plotly.js';

type TProps = {
  traces: Data[];
  loading?: boolean;
};

export const Plot: React.FC<TProps> = ({traces, loading}: TProps): React.ReactNode => {
  const obsRef = useRef<ResizeObserver>();

  const rescale = () => {
    const autoscale = document.querySelector('[data-title="Autoscale"]');

    if (autoscale) {
      (autoscale as HTMLElement).click();
    }
  }

  useEffect(() => {
    const plot = document.getElementById('plot');

    const draw = () => {
      const plot = document.getElementById('plot');

      if (plot) {
        Plotly.newPlot('plot', traces, plotlyLayout);
        const bar = document.querySelectorAll('.modebar-group');
        const adv = bar[bar.length - 1];

        if (adv) {
          adv.remove();
        }
      }
    };

    if (obsRef.current) {
      obsRef.current?.disconnect();
      rescale();
    }

    draw();

    const obs = new ResizeObserver(draw);
    obsRef.current = obs;
    obs.observe(plot as Element);
  }, [traces]);

  useEffect(() => {
    rescale();
    return () => {
      if (obsRef.current) {
        obsRef.current?.disconnect();
      }
    };
  }, []);

  return (
    <div className={s.wrapper}>
      {loading &&
        <div className={s.progress}>
          <ProgressSpinner/>
        </div>
      }
      <div id={'plot'}/>
    </div>
  );
};
