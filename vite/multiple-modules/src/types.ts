import { FC } from 'react';

export interface PageModule<P = { title: string }> {
  Page: FC<P>;
  data: P;
}
