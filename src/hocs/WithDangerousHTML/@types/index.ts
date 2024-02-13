import { ReactElement } from 'react';

export type TWithDangerousHTMLProps = Record<
  'children',
  ReactElement | ReactElement[]
>;
