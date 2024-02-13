import { LINK_TYPE } from '@src/constants';
import { smoothScroll } from '@src/utils/smoothScroll';
import classNames from 'classnames';
import Link from 'next/link';
import React from 'react';
import { TLinkWidget } from './@types';
import styles from './LinkWidget.module.scss';

export function LinkWidget(props: TLinkWidget) {
  const {
    href,
    title,
    className,
    linkType = LINK_TYPE.BUTTON,
    callBack = () => null,
  } = props;

  const typeStyle = linkType == LINK_TYPE.BUTTON ? styles.button : styles.link;

  return (
    <a
      role={'link'}
      onClick={(element) => {
        smoothScroll(element.currentTarget.id, href);
        callBack();
      }}
      className={classNames(typeStyle, className)}
      id={`MainMenu-link`}
    >
      {title}
    </a>
  );
}
