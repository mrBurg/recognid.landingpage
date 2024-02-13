import { WithDangerousHTML } from '@src/hocs/WithDangerousHTML';
import classNames from 'classnames';
import _ from 'lodash';
import React from 'react';
import { TCheckBoxComponent } from './@types';
import styles from './CheckBoxComponent.module.scss';

export function CheckBoxComponent(props: TCheckBoxComponent) {
  const {
    text,
    errorText,
    error = false,
    // invalid = false,
    checked = false,
    // required = false,
    callBack = () => null,
    onBlur = () => null,
  } = props;

  return (
    <div className={styles.checkBoxWrap}>
      <input
        className={classNames(styles.checkbox, {
          [styles.activeCheckbox]: checked,
          [styles.error]: error && !checked,
        })}
        onChange={callBack}
        checked={checked}
        type={'checkbox'}
        onBlur={onBlur}
      />
      {error && !checked && (
        <span className={styles.errorText}>{errorText}</span>
      )}
      <WithDangerousHTML>
        <span className={styles.text}>{text}</span>
      </WithDangerousHTML>
    </div>
  );
}
