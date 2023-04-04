// Copyright 2023 Datafuse Labs.
import React, { FC, ReactElement } from 'react';
import styles from './styles.module.less';
import GithubSvg from '../../assets/svg/github';
const Footer: FC = (): ReactElement=> {
  return (
    <div className={styles.footer}>
      <span>SQL-based Knowledge Base Search and Completion using Databend</span>|
      <a href='https://github.com/datafuselabs/askbend' target='_blank' rel="noreferrer">
        <span className={styles.start}><GithubSvg /> <span className={styles.number}>Star: 7</span></span>
      </a>
    </div>
  );
};
export default Footer;