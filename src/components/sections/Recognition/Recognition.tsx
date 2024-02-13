import React, { useRef, useState } from 'react';
import _ from 'lodash';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import ImageBlock from './ImageBlock/ImageBlock';

import { TItem, TRecognition } from './@types';
import styles from './Recognition.module.scss';

export function Recognition(props: TRecognition) {
  const {
    title,
    trustedTitle,
    partnersTitle,
    certificationsTitle,
    mediaAboutUsTitle,
    trustedItems,
    partnersItems,
    certificationsItems,
    mediaAboutUsItems,
  } = props;

  const sliderRef = useRef<Slider | null>(null);

  const [isHovering, setIsHovered] = useState(-1);

  const sliderSettings = {
    className: styles.slider,
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 500,
  };

  const gotoNext = () => {
    sliderRef.current?.slickNext();
  };

  const gotoPrev = () => {
    sliderRef.current?.slickPrev();
  };

  const renderItem = (item: TItem, index: number) => {
    const imgSrc = isHovering == index && item.srcHov ? item.srcHov : item.src;
    return <Image alt={item.alt} src={imgSrc} width={152} height={88} />;
  };

  const renderSliderItems = () => {
    return _.map(mediaAboutUsItems, (item, index) => {
      {
        if (item.link) {
          return (
            <div key={index} className={styles.item}>
              <div
                className={styles.itemImgWrap}
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(-1)}
              >
                <Link href={item.link}>
                  <a href={item.link} target={'_blank'} rel={'noreferrer'}>
                    {renderItem(item, index)}
                  </a>
                </Link>
              </div>
            </div>
          );
        }
      }
      return (
        <div key={index} className={styles.item}>
          <div className={styles.itemImgWrap}>{renderItem(item, index)}</div>
        </div>
      );
    });
  };

  return (
    <div id={'recognition'} className={styles.recognitionWrap}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.containerWrap}>
        <div className={styles.container}>
          <div className={styles.imageBlocksWrap}>
            <div className={styles.imageBlockItem}>
              <ImageBlock
                imagesTitle={trustedTitle}
                images={trustedItems}
                className={styles.trustedBlock}
              />
            </div>
            <div className={styles.imageBlockItem}>
              <ImageBlock
                imagesTitle={partnersTitle}
                images={partnersItems}
                className={styles.partnersBlock}
                width={314}
                height={42}
              />
            </div>
            {/* Тимчасово, замість рядка <ImageBlock> вище */}
            {/* <div>
                  <span className={stylesImageBlock.imagesTitle}>
                  {partnersTitle}
                  </span>
                  <ul className={stylesImageBlock.imagesList}>
                  <span className={styles.comingsoon}>Coming Soon</span>
                  </ul>
                </div> */}
          </div>
          <div className={classNames(styles.imageBlocksWrap, styles.last)}>
            <div className={styles.imageBlockItem}>
              <ImageBlock
                imagesTitle={certificationsTitle}
                images={certificationsItems}
                width={152}
                height={88}
                className={styles.certificationBlock}
              />
            </div>

            <div className={styles.imageBlockItem}>
              <div>
                <span className={styles.sliderTitle}>{mediaAboutUsTitle}</span>
                <Slider ref={sliderRef} {...sliderSettings}>
                  {renderSliderItems()}
                </Slider>
                <div className={styles.btnWrap}>
                  <button className={styles.btnPrev} onClick={gotoPrev} />
                  <button className={styles.btnNext} onClick={gotoNext} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
