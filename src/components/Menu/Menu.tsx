import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

import styles from './Menu.module.scss';
import { Logo } from '@components/Logo';
import { LINK_TYPE, LOGO_TYPE } from '@src/constants';

import { mainMenu } from '@routes';
import _ from 'lodash';
import { LinkWidget } from '@src/widgets/LinkWidget';

import { stopScroll } from '@utils';
import { SocialLinks } from '@components/SocialLinks';

function MenuComponent() {
  const [isOpenMobileMenu, setOpenMobileMenu] = useState(false);

  useEffect(() => stopScroll(isOpenMobileMenu), [isOpenMobileMenu]);

  return (
    <div className={classNames(styles.menu)}>
      <Logo
        logoType={LOGO_TYPE.WHITE}
        className={classNames(styles.logo)}
        width={190}
        height={50}
      />
      <button
        id={'hamburger'}
        onClick={() => setOpenMobileMenu(!isOpenMobileMenu)}
        className={styles.menuButton}
      >
        <div
          className={classNames(
            isOpenMobileMenu ? styles.iconClose : styles.iconBurger
          )}
        />
      </button>
      <div
        className={classNames(styles.mobileMenuBackground, {
          [styles.mobileMenuBackgroundActive]: isOpenMobileMenu,
        })}
      >
        <div
          className={classNames(styles.nav, {
            [styles.activeMenu]: isOpenMobileMenu,
          })}
        >
          <Logo
            logoType={LOGO_TYPE.PINK}
            className={styles.mobileMenuLogo}
            width={150}
            height={40}
          />
          <div className={styles.linksWrap}>
            {_.map(mainMenu, (item, key) => (
              <LinkWidget
                key={key}
                title={item.title}
                href={item.href}
                className={classNames(styles.link)}
                linkType={LINK_TYPE.LINK}
                callBack={() => setOpenMobileMenu(false)}
              />
            ))}
          </div>

          <SocialLinks className={styles.socialLinks} />
        </div>
      </div>
    </div>
  );
}

export const Menu = MenuComponent;
