import classNames from 'classnames';
import React from 'react';
import { TButtonWidget } from './@types';
import styles from './ButtonWidget.module.scss';

export function ButtonWidget(props: TButtonWidget) {
  const { title, className, callBack, ...restProps } = props;

  return (
    <button
      onClick={callBack}
      className={classNames(styles.button, className)}
      {...restProps}
    >
      {title}
    </button>
  );
}
