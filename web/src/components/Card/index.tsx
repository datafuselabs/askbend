// Copyright 2023 Datafuse Labs.
import React from 'react';
import { FC, ReactElement } from 'react';
import styles from './styles.module.less';
import clsx from 'clsx';
import { ICommonProps } from '../../types';
interface IProps extends ICommonProps{
  href?: string;
  isDownload?: boolean;
  padding?: number[]; 
}
const Card: FC<IProps> = ({children, padding, className, href, isDownload, style}): ReactElement=> {
  const  p = padding || [28, 24];
  const props = {
    style:{padding: `${p[0]}px ${p[1]}px`, ...style},
    className: clsx(styles.wrap, className)
  };
  return (
    <>
      {
        href
          ? <a download={isDownload} href={href} {...props}>{children}</a>
          : <div {...props}>{children}</div>
      }
    </>
  );
};
Card.defaultProps = {
  padding: [28, 24],
  isDownload: false
};
export default Card;