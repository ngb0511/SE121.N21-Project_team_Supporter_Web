import styles from './NoneLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function NoneLayout({ children }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('cointainer')}>{children}</div>
    </div>
  );
}

export default NoneLayout;
