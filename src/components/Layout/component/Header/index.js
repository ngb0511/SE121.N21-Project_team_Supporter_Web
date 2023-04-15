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
const src = 'https://blog.hamtruyentranh.com/wp-content/uploads/2019/01/citrus-anime.jpg';
const arr = [
  { value: '', text: 'Tên dự án' },
  { value: '', text: 'Chuyên ngành' },
  { value: '', text: 'Thời gian' },
];

function Header() {
  var user = JSON.parse(sessionStorage.getItem('user'));
  console.log(user);
  const isLogIn = true;
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('logo')}>
          <h2 className={cx('logo-tittle')}>
            <a className={cx('logo-tittle')} href="http://localhost:3001">
              {' '}
              <FontAwesomeIcon icon={faHandPeace} />
              CITOS
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
              <option key={index} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
        {isLogIn ? (
          <div className={cx('icon-cointainer')}>
            <div className={cx('icon-envelope')}>
              <button className={cx('icon-btn') + cx(' envelope')}>
                <FontAwesomeIcon icon={faEnvelope} />
              </button>
              <div className={cx('envelope-content')}>
                {arr.map((option, index) => (
                  <a href="Profile" key={index}>
                    <FontAwesomeIcon icon={faUser} />
                    {option.value}
                  </a>
                ))}
              </div>
            </div>
            <div className={cx('icon-envelope')}>
              <button className={cx('icon-btn') + cx(' envelope')}>
                <FontAwesomeIcon icon={faBell} />
              </button>
              <div className={cx('envelope-content')}>
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
            <div className={cx('icon-envelope')}>
              <button className={cx('icon-btn') + cx(' envelope')}>
                <FontAwesomeIcon icon={faMaximize} />
              </button>
              <div className={cx('envelope-content')}>
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
        ) : (
          <div className={cx('icon-cointainer')}></div>
        )}
        {isLogIn ? (
          <div className={cx('user-cointainer')}>
            <img className={cx('user-img')} src={src} alt="error"></img>
            <div className={cx('user-name-cointainer')}>
              <button className={cx('sort-btn')}>
                <h3 className={cx('user-name')}>
                  {user.userName} <FontAwesomeIcon icon={faSortDown} />
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
        ) : (
          <div className={cx('icon-cointainer')}></div>
        )}
      </div>
    </header>
  );
}

export default Header;
