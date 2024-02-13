import React from 'react';
import _ from 'lodash';

import { LinkWidget } from '@src/widgets/LinkWidget';

import { TWeOffer } from './@types';
import styles from './WeOffer.module.scss';

export function WeOffer(props: TWeOffer) {
  const { title, text, buttonText } = props;

  return (
    <div id={'weoffer'} className={styles.wrap}>
      <div className={styles.container}>
        <h2 className={styles.titleBig}>{title}</h2>
        <div className={styles.content}>
          <div className={styles.image} />

          <div className={styles.description}>
            {_.isArray(text) ? (
              <ul className={styles.list}>
                {_.map(text, (item, key) => (
                  <li key={key}>{item}</li>
                ))}
              </ul>
            ) : (
              <div className={styles.text}>{text}</div>
            )}
            <LinkWidget
              title={buttonText}
              href={'form'}
              className={styles.button}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
