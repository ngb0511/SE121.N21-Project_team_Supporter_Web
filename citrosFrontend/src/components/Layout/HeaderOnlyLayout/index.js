import Header from '../component/Header';
import Footer from '../component/Footer';
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
      <Footer />
    </div>
  );
}

export default HeaderOnlyLayout;
