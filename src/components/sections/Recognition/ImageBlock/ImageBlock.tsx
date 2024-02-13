import classNames from 'classnames';
import _ from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { TImageBlock } from './@types/indes';
import styles from './ImageBlock.module.scss';

export default function ImageBlock(props: TImageBlock) {
  const { imagesTitle, images, width = 188, height = 47, className } = props;

  return (
    <div>
      <span className={styles.imagesTitle}>{imagesTitle}</span>
      <ul
        className={classNames(
          styles.imagesList,
          {
            [styles.smallList]: images.length <= 2,
          },
          className
        )}
      >
        {_.map(images, (item, index) => {
          {
            if (item.link) {
              return (
                <li key={index}>
                  <Link href={item.link}>
                    <a href={item.link} target={'_blank'} rel={'noreferrer'}>
                      <Image
                        alt={item.alt}
                        src={item.src}
                        width={width}
                        height={height}
                      />
                    </a>
                  </Link>
                </li>
              );
            }
          }
          return (
            <li key={index}>
              <Image
                alt={item.alt}
                src={item.src}
                width={width}
                height={height}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
