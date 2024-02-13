import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Image from 'next/image';
import classNames from 'classnames';
import { isMobile } from 'react-device-detect';

import { LinkWidget } from '@src/widgets/LinkWidget';

import { TSolutions } from './@types';
import styles from './Solutions.module.scss';
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

import { WithDangerousHTML } from '@src/hocs/WithDangerousHTML';
import { useRouter } from 'next/router';

export function Solutions(props: TSolutions) {
  const { title, items, buttonTitle, linkTo } = props;

  const { isReady } = useRouter();

  const [choosedItemIndex, setChoosedItemIndex] = useState(0);

  useEffect(() => {
    let count = 1;
    setInterval(() => {
      setChoosedItemIndex(count);
      // smoothScroll('', 'accordion__heading-' + count);

      count++;
      if (count >= items.length) {
        count = 0;
      }
    }, 6000);
  }, [items]);

  const renderContent = () => {
    if (isMobile) {
      return (
        <div className={styles.accordionWrap}>
          <Accordion
            className={styles.accordion}
            preExpanded={[choosedItemIndex]}
            allowZeroExpanded
          >
            {_.map(items, (item, index) => {
              return (
                <AccordionItem
                  key={index}
                  uuid={index}
                  className={styles.accordionItem}
                  // dangerouslySetExpanded={index == choosedItemIndex}
                >
                  <AccordionItemHeading>
                    <AccordionItemButton className={styles.accordionItemButton}>
                      <WithDangerousHTML>
                        <span>{item.title}</span>
                      </WithDangerousHTML>
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel className={styles.accordionItemPanel}>
                    <div className={styles.descrBlock}>
                      <div className={styles.imgWrap}>
                        <Image
                          src={item.imageUrl}
                          width={327}
                          height={280}
                          alt={item.title}
                        />
                      </div>
                      <WithDangerousHTML>
                        <span>{item.description}</span>
                      </WithDangerousHTML>
                    </div>
                  </AccordionItemPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      );
    } else {
      return (
        <div className={styles.itemsWrap}>
          <ul>
            {_.map(items, (item, index) => {
              return (
                <li
                  key={index}
                  className={classNames({
                    [styles.choosedItem]: choosedItemIndex == index,
                  })}
                >
                  <span
                    dangerouslySetInnerHTML={{ __html: item.title }}
                    className={styles.itemTitle}
                    onClick={() => setChoosedItemIndex(index)}
                  />
                </li>
              );
            })}
          </ul>
          <div className={styles.description}>
            <div className={styles.imgWrap}>
              <Image
                src={items[choosedItemIndex].imageUrl}
                width={365}
                height={314}
                alt={items[choosedItemIndex].title}
              />
            </div>
            <span
              className={styles.txtWrap}
              dangerouslySetInnerHTML={{
                __html: items[choosedItemIndex].description,
              }}
            />
          </div>
        </div>
      );
    }
  };

  if (isReady) {
    return (
      <div id={'solutions'} className={styles.container}>
        <h2 className={styles.titleBig}>{title}</h2>

        {renderContent()}

        <LinkWidget
          className={styles.linkWidget}
          title={buttonTitle}
          href={linkTo}
        />
      </div>
    );
  }
  return <></>;
}
