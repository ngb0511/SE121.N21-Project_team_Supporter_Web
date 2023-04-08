import React from 'react';
import classNames from 'classnames/bind';
import styles from './Statistic.module.scss';
const cx = classNames.bind(styles);
function Statistic() {
  return <div className={cx('wrapper')}></div>;
}

export default Statistic;
