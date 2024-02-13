import classNames from 'classnames';
import React, { useState } from 'react';
import { TInputComponent } from './@types';
import styles from './InputComponent.module.scss';

export function InputComponent(props: TInputComponent) {
  const {
    placeholder,
    value,
    id,
    error,
    errorMessage,
    className,
    required = false,
    callBack = () => null,
    onBlur = () => null,
  } = props;
  return (
    <div className={classNames(styles.inputWrap, className)}>
      <input
        id={id}
        className={classNames(styles.input, {
          [styles.errorInput]: error,
        })}
        placeholder={placeholder}
        value={value}
        onChange={callBack}
        required={required}
        onBlur={onBlur}
      />
      {error && (
        <span className={styles.errorMessage}>
          {errorMessage ? errorMessage : 'This field cannot be empty'}
        </span>
      )}
    </div>
  );
}
