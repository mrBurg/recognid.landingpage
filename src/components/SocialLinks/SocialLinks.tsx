import { TSocialLinks } from './@types';

import styles from './SocialLinks.module.scss';

import Image from 'next/image';
import Link from 'next/link';
import classNames from 'classnames';

export function SocialLinks(props: TSocialLinks) {
  const { className } = props;
  return (
    <div className={classNames(styles.iconsWrap, className)}>
      <Link href={'https://www.facebook.com/recognid'}>
        <a target={'_blank'}>
          <Image alt={'fb_icon'} src={'/theme/fb.svg'} width={28} height={28} />
        </a>
      </Link>

      <Link href={'https://twitter.com/RecognID'}>
        <a target={'_blank'}>
          <Image
            alt={'fb_icon'}
            src={'/theme/twitter.svg'}
            width={28}
            height={28}
          />
        </a>
      </Link>
      <Link href={'https://www.linkedin.com/company/recognid/'}>
        <a target={'_blank'}>
          <Image
            alt={'fb_icon'}
            src={'/theme/linkedin.svg'}
            width={28}
            height={28}
          />
        </a>
      </Link>
    </div>
  );
}
