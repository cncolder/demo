import type { FC } from 'react';
import { css, cx } from '@linaria/core';
import { styled } from '@linaria/react';

export interface ButtonProps {
  className?: string;
  type: ButtonType;
}

export enum ButtonType {
  Button = 'button',
  Submit = 'submit',
  Reset = 'reset',
}

export const Button: FC<ButtonProps> = ({ className, type, ...restProps }) => {
  return <button {...restProps} className={cx(RedButton, className)} type={type} />;
};

export const MaxContentButton = styled.button<ButtonType>`
  width: max-content;
`;

const RedButton = css`
  background-color: red;
`;
