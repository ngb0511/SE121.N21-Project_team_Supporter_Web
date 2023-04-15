import Header from '../component/Header';
import styles from './HeaderOnlyLayout.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function HeaderOnlyLayout({ children }) {
  return (
    <div>
      <Header />
      <div className={cx('wrapper')}>
        <div className={cx('cointainer')}>{children}</div>
      </div>
    </div>
  );
}

export default HeaderOnlyLayout;
