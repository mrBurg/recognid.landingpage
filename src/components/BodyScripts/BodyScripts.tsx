import React, { useCallback, useEffect, useState } from 'react';
import _ from 'lodash';
import { commonApi } from '@src/api';

/** Додавання різних скриптів в body всіх сторінок */
function BodyScripts() {
  const [gtmID, setGtmID] = useState('');

  /** Google Tag Manager (noscript) */
  const renderGTMNoScript = useCallback(() => {
    if (gtmID) {
      return (
        <>
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
              <iframe src=""https://www.googletagmanager.com/ns.html?id=${gtmID}""
              height=""0"" width=""0"" style=""display:none;visibility:hidden""></iframe>
              `.trim(),
            }}
          />
        </>
      );
    }
  }, [gtmID]);

  useEffect(() => {
    const getGtmID = async () => {
      const response = await commonApi.getGTM();

      if (response) {
        return response;
      }

      return null;
    };

    getGtmID().then((data) => setGtmID(data));
  }, []);

  /**
   * RENDER
   */
  return <>{renderGTMNoScript()}</>;
}

export { BodyScripts };
