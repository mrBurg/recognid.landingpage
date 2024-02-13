import React from 'react';
import classNames from 'classnames';

import styles from './Header.module.scss';

import { Menu } from '@components/Menu';

function HeaderComponent() {
  return (
    <header id={'header'} className={styles.header}>
      {/* <div className={classNames(styles.container)}> */}
      {/* <MainMenu /> */}
      <Menu />
      {/* </div> */}
    </header>
  );
}

export const Header = HeaderComponent;
