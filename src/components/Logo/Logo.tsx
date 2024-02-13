import React, { useCallback } from 'react';
import classNames from 'classnames';

import style from './Logo.module.scss';

import { TLogoProps } from './@types';
import { LOGO_TYPE } from '@src/constants';
import Image from 'next/image';

function LogoComponent(props: TLogoProps) {
  const { className, logoType = LOGO_TYPE.WHITE, width, height } = props;

  return (
    <div className={className}>
      <Image
        width={width}
        height={height}
        src={`/theme/logo${logoType}.svg`}
        alt={'Logo'}
      />
    </div>
  );
}

export const Logo = LogoComponent;
