import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { LinkWidget } from '@src/widgets/LinkWidget';

import { TIndustries } from './@types';
import styles from './Industries.module.scss';
import Image from 'next/image';

export function Industries(props: TIndustries) {
  const { title, itemsList, buttonText } = props;
  const [choosedItem, setChoosedItem] = useState(itemsList[0].title);

  const getCurrentItem = (title: string) => {
    setChoosedItem(title);
  };

  useEffect(() => {
    let count = 0;
    setInterval(() => {
      // console.log('title:', count, itemsList[count].title);
      getCurrentItem(itemsList[count].title);
      count++;
      if (count >= itemsList.length) {
        count = 0;
      }
    }, 6000);
  }, [itemsList]);

  return (
    <div id={'industries'} className={styles.accordionWrap}>
      <div className={styles.container}>
        <h2 className={styles.titleBig}>{title}</h2>
        <ul className={styles.accordionList}>
          {_.map(itemsList, (item, index) => {
            return (
              <li
                key={index}
                className={classNames(styles.accordionItem, {
                  [styles.choosedItem]: choosedItem.includes(item.title),
                })}
              >
                <span
                  className={classNames(styles.itemTitle, {
                    [styles.activeTitle]: choosedItem.includes(item.title),
                  })}
                  onClick={() => getCurrentItem(item.title)}
                >
                  {item.title}
                </span>
                <div className={styles.descriptionBlockWrap}>
                  <div className={styles.descriptionBlock}>
                    <div className={styles.imgWrap}>
                      <Image
                        src={item.imageUrl}
                        width={96}
                        height={96}
                        alt={item.title}
                      />
                    </div>
                    <span
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                    <LinkWidget
                      title={buttonText}
                      href={'form'}
                      className={styles.buttonComponent}
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
