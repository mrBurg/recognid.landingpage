import htmlParser from 'html-react-parser';
import _ from 'lodash';
import React, { createElement, Fragment, ReactElement } from 'react';

import { TWithDangerousHTMLProps } from './@types';

function WithDangerousHTML(props: TWithDangerousHTMLProps) {
  const { children } = props;

  const writeTag = (child: ReactElement) => {
    const {
      type,
      props: { children, ...restProps },
    } = child;

    return createElement(
      type,
      restProps,
      (() => {
        switch (true) {
          case _.isArray(children):
            return children;
          case _.isString(children):
            return htmlParser(children);
        }
      })()
    );
  };

  switch (true) {
    case _.isArray(children):
      return (
        <>
          {_.map(children, (child, index) => (
            <Fragment key={index}>{writeTag(child)}</Fragment>
          ))}
        </>
      );
    default:
      return writeTag(children as ReactElement);
  }
}

export { WithDangerousHTML };
