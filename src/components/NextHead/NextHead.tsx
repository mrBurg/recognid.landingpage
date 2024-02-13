import _ from 'lodash';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Head from 'next/head';

import { commonApi } from '@src/api';
import { TNextHeadProps } from './@types';
import cfg from '@root/config.json';
import { TJSON } from '@interfaces';
import { env } from '@utils';
import { CookiesContext } from '@root/pages/_app';

function NextHead(props: TNextHeadProps) {
  const { hasCookiesAccess } = useContext(CookiesContext);
  const [gtmID, setGtmID] = useState('');

  /** Google Tag Manager */
  const renderGTMScript = useCallback(() => {
    if (gtmID) {
      return (
        <>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${gtmID}');
                `.trim(),
            }}
          />
        </>
      );
    }
  }, [gtmID]);

  /** Google tag (gtag.js) */
  const renderGtagScript = useCallback(() => {
    //const env = 'prod';
    if (env) {
      const gtagId = (cfg.gtag as TJSON)[env];
      if (gtagId) {
        return (
          <>
            {/* Define dataLayer and the gtag function.
                Default ad_storage & analytics_storage to 'denied' as a placeholder */}
            <script
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}

                gtag('consent', 'default', { 
                  'ad_storage': 'denied', 
                  'analytics_storage': 'denied' 
                });
                `.trim(),
              }}
            />

            {/* Google tag (gtag.js) */}
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`.trim()}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}

                gtag('js', new Date());
                gtag('config', '${gtagId}');
                `.trim(),
              }}
            />

            {/** Юзер дозволив кукі */}
            {hasCookiesAccess && (
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                gtag('consent', 'update', {
                  'ad_storage': 'granted',
                  'analytics_storage': 'granted'
                });
                `.trim(),
                }}
              />
            )}
          </>
        );
      }
    }
  }, [hasCookiesAccess]);

  useEffect(() => {
    const getGtmID = async () => {
      const response = await commonApi.getGTM();
      // const response = 'GTM-T6H62B7';

      if (response) {
        return response;
      }

      return null;
    };
    getGtmID().then((data) => {
      if (data) setGtmID(data);
    });
  }, []);

  return (
    <Head>
      <meta
        name={'viewport'}
        content={
          'user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0'
        }
      />
      {_.map(props.meta, (item, index) => (
        <meta key={index} name={item.name} content={item.description} />
      ))}
      <title>{props.title}</title>
      {renderGTMScript()}
      {renderGtagScript()}
    </Head>
  );
}

export { NextHead };
