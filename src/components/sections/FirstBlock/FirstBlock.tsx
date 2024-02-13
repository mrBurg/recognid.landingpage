import React from 'react';
import _ from 'lodash';

import { Header } from '@components/Header';
import { LinkWidget } from '@src/widgets/LinkWidget';

import { TFirstBlock } from './@types';
import styles from './FirstBlock.module.scss';
import { WithDangerousHTML } from '@src/hocs/WithDangerousHTML';

export function FirstBlock(props: TFirstBlock) {
  const { mainTitle, subTitle, buttonText } = props;

  return (
    <div className={styles.wrap}>
      <div className={styles.container}>
        <Header />
        <h2 className={styles.titleBig}>{mainTitle}</h2>
        <WithDangerousHTML>
          <h3 className={styles.subTitle}>{subTitle}</h3>
        </WithDangerousHTML>
        <LinkWidget
          title={buttonText}
          href={'form'}
          className={styles.button}
        />
      </div>
    </div>
  );
}
