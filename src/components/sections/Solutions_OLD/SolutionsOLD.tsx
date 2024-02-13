import React from 'react';
import _ from 'lodash';
import Image from 'next/image';

import { LinkWidget } from '@src/widgets/LinkWidget';

import { TSolutionsOLD } from './@types';
import styles from './SolutionsOLD.module.scss';

export function SolutionsOLD(props: TSolutionsOLD) {
  const { title, items, buttonTitle, linkTo } = props;

  return (
    <div id={'solutions'} className={styles.container}>
      <h2 className={styles.titleBig}>{title}</h2>
      <ul className={styles.solutionsItemsWrap}>
        {_.map(items, (item, index) => {
          const fileStyle = {
            backgroundImage: `url('${item.imageUrl}')`,
          };
          return (
            <li key={index}>
              <div className={styles.image} style={fileStyle} />

              <h4>{item.title}</h4>
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
            </li>
          );
        })}
      </ul>
      <LinkWidget
        className={styles.linkWidget}
        title={buttonTitle}
        href={linkTo}
      />
    </div>
  );
}
