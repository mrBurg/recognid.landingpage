import React from 'react';
import classNames from 'classnames';
import styles from './FooterNew.module.scss';
import { SocialLinks } from '@components/SocialLinks';
import { Logo } from '@components/Logo';
import { LOGO_TYPE } from '@src/constants';
import Link from 'next/link';
import { TFooter } from './@types';
import _ from 'lodash';

function FooterNew(props: TFooter) {
  const { regognitionText, policy, contacts } = props;

  return (
    <footer className={styles.footer}>
      <div className={classNames(styles.container)}>
        <div className={styles.linkskWrap}>
          <Logo logoType={LOGO_TYPE.PINK} width={160} height={42} />
          <SocialLinks className={styles.socialLinks} />
        </div>

        <div className={styles.flex_row_container}>
          <div className={styles.flex_row_item}></div>
          <div className={styles.flex_row_item}>
            <span>{regognitionText}</span>
          </div>
          <div className={styles.flex_row_item}>
            <Link href={policy.url}>
              <a target={'_blank'}>
                <span>{policy.label}</span>
              </a>
            </Link>
          </div>
          {_.map(contacts, (item, index) => {
            return (
              <div key={index} className={styles.flex_row_item}>
                <span className={styles.contactTitle}>{item.title}</span>
                <span className={styles.contactValue}>{item.value}</span>
              </div>
            );
          })}
        </div>
        {/* <ul className={styles.contacts}>
          <div className={styles.topWrap}>
            <span>{regognitionText}</span>
            <Link href={policy.url}>
              <a target={'_blank'}>
                <span>{policy.label}</span>
              </a>
            </Link>
            
          </div>

          <div className={styles.bottomWrap}>
            {_.map(contacts, (item, index) => {
              return (
                <li key={index}>
                  <span className={styles.contactTitle}>{item.title}</span>
                  <span className={styles.contactValue}>{item.value}</span>
                </li>
              );
            })}
          </div>
        </ul> */}
      </div>
    </footer>
  );
}

export { FooterNew };
