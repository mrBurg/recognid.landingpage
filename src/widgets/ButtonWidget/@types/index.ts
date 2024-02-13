import { ButtonHTMLAttributes, MouseEventHandler } from 'react';

export type TButtonWidget = ButtonHTMLAttributes<HTMLButtonElement> &
  Record<'title', string> &
  Partial<
    Record<'className', string> &
      Record<'callBack', MouseEventHandler<HTMLButtonElement>>
  >;
