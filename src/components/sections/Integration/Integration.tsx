import React from 'react';
import _ from 'lodash';
import Image from 'next/image';

import { TIntegration } from './@types';
import styles from './Integration.module.scss';

export function Integration(props: TIntegration) {
  const { title, mainImageUrl, items } = props;
  const fileStyle = {
    backgroundImage: `url('${mainImageUrl}')`,
  };

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <div className={styles.integrationInnerWrap}>
        <div className={styles.integrationImage}>
          <div className={styles.image} style={fileStyle} />
        </div>
        <ul className={styles.optionsWrap}>
          {_.map(items, (item, index) => {
            return (
              <li key={index}>
                <div className={styles.integrationSmallImages}>
                  <Image
                    src={item.imageUrl}
                    width={48}
                    height={48}
                    alt={item.title}
                  />
                </div>

                <div className={styles.optionsText}>
                  <h4>{item.title}</h4>
                  <p>{item.descriptiom}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
