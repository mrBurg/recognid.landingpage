import React, { useState } from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import Image from 'next/image';

import { LinkWidget } from '@src/widgets/LinkWidget';

import { TTabsBlock } from './@types';
import styles from './TabsBlock.module.scss';

export function TabsBlock(props: TTabsBlock) {
  const { title, tabs, buttonText } = props;

  const [activeTab, setActiveItem] = useState('business');

  const activeTabItem = _.filter(tabs, (tab) => tab.id == activeTab)[0];
  const fileStyle = {
    backgroundImage: `url('${activeTabItem.image}')`,
  };

  return (
    <div id={'tabsblock'} className={styles.wrap}>
      <div className={styles.container}>
        <h2 className={styles.titleBig}>{title}</h2>
        <div className={styles.content}>
          <div className={styles.tabsWrap}>
            {_.map(tabs, (tab, index) => {
              return (
                <button
                  key={index}
                  className={classNames(styles.tab, {
                    [styles.active]: activeTab.includes(tab.id),
                  })}
                  onClick={() => setActiveItem(tab.id)}
                >
                  {tab.name}
                </button>
              );
            })}
          </div>

          <div className={styles.description}>
            <div className={styles.listWrap}>
              <span className={styles.tabTitle}>{activeTabItem.title}</span>
              <ul className={styles.list}>
                {_.map(activeTabItem.text, (item, key) => (
                  <li key={key}>{item}</li>
                ))}
              </ul>

              <LinkWidget
                title={buttonText}
                href={'form'}
                className={styles.button}
              />
            </div>

            <div className={styles.image} style={fileStyle} />
          </div>
        </div>
      </div>
    </div>
  );
}
