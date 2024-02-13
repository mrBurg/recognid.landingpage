import { useCallback, useMemo } from 'react';

import staticData from '@src/staticData/index.json';

import { isDev } from '@utils';
import { ENVIRONMENT } from '@src/constants';

import { FirstBlock } from '@components/sections/FirstBlock';
import { WeOffer } from '@components/sections/WeOffer';
import { TabsBlock } from '@components/sections/TabsBlock';
import { Solutions } from '@components/sections/Solutions';
import { Integration } from '@components/sections/Integration';
import { UseCases } from '@components/sections/UseCases';
import { Industries } from '@components/sections/Industries';
import { Recognition } from '@components/sections/Recognition';
import { QuestionForm } from '@components/sections/QuestionForm';
import { Footer } from '@components/Footer';
import { Cookies } from '@components/popup/Cookies';

function Home(props: any) {
  const {
    firstblock,
    weoffer,
    tabsblock,
    solutions,
    integration,
    usecases,
    industries,
    recognition,
    form,
    footer,
    cookiesPopup,
  } = props;

  const envStyles = useMemo(
    () => ({
      position: 'fixed',
      zIndex: '999',
      width: '100%',
      textAlign: 'center',
      color: 'red',
      fontSize: '24px',
      fontWeight: '700',
      backgroundColor: '#00000033',
      textTransform: 'uppercase',
    }),
    []
  ) as React.CSSProperties;

  const renderEnvironment = useCallback(
    () => isDev && <div style={envStyles}>{ENVIRONMENT}</div>,
    [envStyles]
  );

  return (
    <>
      {renderEnvironment()}
      <Cookies {...cookiesPopup} />
      <FirstBlock {...firstblock} />
      <WeOffer {...weoffer} />
      <TabsBlock {...tabsblock} />
      <Solutions {...solutions} />
      <Integration {...integration} />
      <UseCases {...usecases} />
      <Industries {...industries} />
      <Recognition {...recognition} />
      <QuestionForm {...form} />
      <Footer {...footer} />
    </>
  );
}

export default Home;

export async function getStaticProps() {
  let props = staticData;

  try {
    const res = await fetch('http://localhost:3000/api/staticData');
    props = await res.json();
  } catch (err) {
    console.log(err);
  }

  return { props };
}
