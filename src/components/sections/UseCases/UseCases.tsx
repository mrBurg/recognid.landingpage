import React from 'react';
import _ from 'lodash';
import Image from 'next/image';
import classNames from 'classnames';

import { WithDangerousHTML } from '@src/hocs/WithDangerousHTML';

import { TUseCases } from './@types';
import styles from './UseCases.module.scss';

export function UseCases(props: TUseCases) {
  const { title, items } = props;
  return (
    <div id={'usecases'} className={styles.container}>
      <h2 className={styles.titleBig}>{title}</h2>
      <ul className={styles.itemsWrap}>
        {_.map(items, (item, index) => {
          const fileStyle = {
            backgroundImage: `url('${item.imageUrl}')`,
          };
          return (
            <li
              key={index}
              className={classNames({ [styles.reverse]: index % 2 })}
            >
              <div className={styles.image} style={fileStyle} />

              <div className={styles.itemDetails}>
                <WithDangerousHTML>
                  <h4>{item.title}</h4>
                </WithDangerousHTML>
                {item.innerList.length > 0 && (
                  <ul className={styles.innerList}>
                    {_.map(item.innerList, (item, index) => {
                      return (
                        <li key={index}>
                          <Image
                            src={'/images/checkmark.svg'}
                            width={16}
                            height={16}
                            alt={'checkmark'}
                          />
                          <span>{item.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}
                <span className={styles.footnote}>{item.footnote}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
