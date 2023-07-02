import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
  return (
    <footer className={cx('wrapper')}>
      <div className={cx('inner')}>
        <p>© 2015 - 2023 Citrus® Global Inc. • Privacy Policy</p>
      </div>
    </footer>
  );
}

export default Footer;
