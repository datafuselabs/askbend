// Copyright 2023 Datafuse Labs.
import { FC, ReactElement } from 'react';
import styles from './styles.module.scss';
import CheckSvg from '@/assets/svg/check';
const SuccessTip: FC = (): ReactElement=> {
  return (
    <div>
      <CheckSvg></CheckSvg>
      <span className={styles.successTips}>Here are the results we have found for you.</span>
    </div>
  );
};
export default SuccessTip;