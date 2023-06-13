import classNames from 'classnames/bind';
import styles from './User.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function User({ name, avatar }) {
  function LogOut() {
    sessionStorage.removeItem('isLogIn');
    sessionStorage.removeItem('admin');
  }
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <img src={avatar}></img>
        <div className={cx('cointainer')}>
          <button className={cx('sort-btn')}>
            <p>{name}</p>
          </button>
          <div className={cx('content')}>
            {sessionStorage.getItem('admin') == 0 ? (
              <div>
                <a href="/Profile">
                  <FontAwesomeIcon icon={faUser} /> &nbsp; Profile
                </a>
                <a href="/ChangePassword">
                  <FontAwesomeIcon icon={faLock} /> &nbsp; Change password
                </a>
              </div>
            ) : (
              <></>
            )}

            <a onClick={LogOut} href="/Login">
              <FontAwesomeIcon icon={faRightFromBracket} /> &nbsp; Log Out
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
