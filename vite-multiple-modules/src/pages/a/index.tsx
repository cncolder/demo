import React, { FC } from 'react';

export const Page: FC<{ title: string }> = (props) => {
  const { title } = props;

  return <div>{title}</div>;
};

export const data = {
  title: 'Page a',
};
