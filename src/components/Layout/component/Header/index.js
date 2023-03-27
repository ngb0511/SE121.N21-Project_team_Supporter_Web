import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faEnvelope,
  faBell,
  faMaximize,
  faSortDown,
  faUser,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { faHandPeace } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);
const name = 'kenza toras';
const src = 'https://blog.hamtruyentranh.com/wp-content/uploads/2019/01/citrus-anime.jpg';
const arr = [
  { value: '', text: 'Tên dự án' },
  { value: '', text: 'Chuyên ngành' },
  { value: '', text: 'Thời gian' },
];

function Header() {
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('logo')}>
          <h2 className={cx('logo-tittle')}>
            <a className={cx('logo-tittle')} href="http://localhost:3001">
              {' '}
              <FontAwesomeIcon icon={faHandPeace} /> C I T R O S
            </a>
          </h2>
        </div>
        <div className={cx('search')}>
          <button className={cx('search-btn')}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
          <input className={cx('search-input')} placeholder="Search"></input>
          <select className={cx('search-select')}>
            <option value="" disabled selected hidden>
              Theo
            </option>
            {arr.map((option, index) => (
              <option c key={index} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
        <div className={cx('icon-cointainer')}>
          <button className={cx('icon-btn') + cx(' envelope')}>
            <FontAwesomeIcon icon={faEnvelope} />
          </button>
          <button className={cx('icon-btn') + cx(' bell')}>
            <FontAwesomeIcon icon={faBell} />
          </button>
          <button className={cx('icon-btn') + cx(' maximize')}>
            <FontAwesomeIcon icon={faMaximize} />
          </button>
          <div className={cx('user-cointainer')}>
            <img className={cx('user-img')} src={src} alt="error"></img>
            <div className={cx('user-name-cointainer')}>
              <button className={cx('sort-btn')}>
                <h3 className={cx('user-name')}>
                  {name} <FontAwesomeIcon icon={faSortDown} />
                </h3>
              </button>
              <div className={cx('user-content')}>
                <a href="Home">Link 1</a>
                <a href="Profile">
                  <FontAwesomeIcon icon={faUser} /> Thông tin tài khoản
                </a>
                <a href="Login">
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  Đăng xuất
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
