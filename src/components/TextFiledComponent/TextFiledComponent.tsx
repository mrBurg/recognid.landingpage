import classNames from 'classnames';
import React, { useState } from 'react';
import { TTextFiledComponent } from './@types';
import styles from './TextFiledComponent.module.scss';

export function TextFiledComponent(props: TTextFiledComponent) {
  const {
    placeholder,
    value,
    id,
    error,
    className,
    required = false,
    callBack = () => null,
    onBlur = () => null,
  } = props;

  return (
    <div className={classNames(styles.textareaWrap, className)}>
      <textarea
        id={id}
        className={classNames(styles.textarea, {
          [styles.errorTextarea]: error,
        })}
        placeholder={placeholder}
        value={value}
        onChange={callBack}
        required={required}
        onBlur={onBlur}
      />
      {error && (
        <span className={styles.errorMessage}>This field cannot be empty</span>
      )}
    </div>
  );
}
