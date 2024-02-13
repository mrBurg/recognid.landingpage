import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import Link from 'next/link';

import { LOGO_TYPE } from '@src/constants';
import { Logo } from '@components/Logo';
import { SocialLinks } from '@components/SocialLinks';

import { TFooter } from './@types';
import styles from './Footer.module.scss';

export function Footer(props: TFooter) {
  const { regognitionText, policy, mail, contacts } = props;

  return (
    <footer className={styles.footer}>
      <div className={classNames(styles.container)}>
        <div className={styles.linkskWrap}>
          <Logo logoType={LOGO_TYPE.PINK} width={160} height={42} />
          <SocialLinks className={styles.socialLinks} />
        </div>

        <div className={styles.leftWrap}>
          <span>{regognitionText}</span>
          <Link href={policy.url}>
            <a target={'_blank'}>
              <span>{policy.label}</span>
            </a>
          </Link>
          {/* <span>{mail}</span> */}
        </div>
        <div className={styles.contacts}>
          <ul className={styles.rightWrap}>
            {_.map(contacts, (item, index) => (
              <li key={index}>
                <span className={styles.contactTitle}>{item.title}</span>
                <span className={styles.contactValue}>{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
