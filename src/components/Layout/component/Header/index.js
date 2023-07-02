import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faUser, faRightFromBracket, faHome } from '@fortawesome/free-solid-svg-icons';
import { faHandPeace } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import HeaderItem from './Component/HeaderItem';
import User from './Component/User';
import * as avatarServices from '../../../../apiServices/avatarServices';
const cx = classNames.bind(styles);

function Header() {
  function logout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('isLogIn');
    //sessionStorage.setItem('isLogIn', 0);
  }
  const [src, setSrc] = useState();
  /*var user = JSON.parse(sessionStorage.getItem('user'));
  var userEx = JSON.parse(sessionStorage.getItem('userEx'));
  console.log(user);
  console.log(userEx);
  const isLogIn = true;

  useEffect(() => {
    const fetchApi = async () => {
      const result = await avatarServices.getAvatarSortedByUserID(userEx.userID);
      console.log(result);
      //setUser(result);
    };
    fetchApi();
  }, []);*/

  useEffect(() => {
    const fetchApi = async () => {
      //var account = JSON.parse(sessionStorage.getItem('account'));
      const avatar = await avatarServices.getAvatarSortedByUserID(1);
      var path = avatar[0].avatar.toString().split('\\');
      var avatarName = 'http://localhost:3002/images/' + path[4];
      console.log(avatarName);
      setSrc(avatarName);
      //document.getElementsByClassName('user-img').style.backgroundImage = "url('${avatarName}')";
      //console.log(e.target.files[0]);
      //setFile(avatarName);
      //setImage(URL.createObjectURL(avatarName));
    };
    fetchApi();
  }, []);

  /*return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('logo')}>
          <h2 className={cx('logo-tittle')}>
            <a className={cx('logo-tittle')} href="/Home">
              <FontAwesomeIcon icon={faHandPeace} />
              CITOS
            </a>
          </h2>
        </div>

        {isLogIn ? (
          <div className={cx('user-cointainer')}>
            <img className={cx('user-img')} src={src} alt="error"></img>
            <div className={cx('user-name-cointainer')}>
              <button className={cx('sort-btn')}>
                {userEx ? (
                  <h3 className={cx('user-name')}>
                    NewUser <FontAwesomeIcon icon={faSortDown} />
                  </h3>
                ) : (
                  <h3 className={cx('user-name')}>
                    {userEx} <FontAwesomeIcon icon={faSortDown} />
                  </h3>
                )}
              </button>
              <div className={cx('user-content')}>
                <a href="Home">
                  Home
                  <FontAwesomeIcon icon={faHome} />
                </a>
                <a href="Profile">
                  <FontAwesomeIcon icon={faUser} /> Thông tin tài khoản
                </a>
                <a href="Login" onClick={logout}>
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
  );*/
  const projectDropDown = [
    { link: '/CreateProject', text: 'Create Project' },
    { link: '/Home', text: 'Find Job' },
    { link: '/Project', text: 'Project List' },
  ];

  return (
    <header className={cx('wrapper')}>
      <div className={cx('logo-cointainer')}>
        <img src="https://veerle.duoh.com/images/portfolio/_normal/citrus-logo-hero.png"></img>
      </div>
      {sessionStorage.getItem('isLogIn') == 1 && sessionStorage.getItem('admin') == 0 ? (
        <div className={cx('private-cointainer')}>
          <div className={cx('navigate-cointainer')}>
            <HeaderItem name="Home" sort={false} link="/Home" />
            <HeaderItem name="Profile" sort={false} link="/Profile" />
            <HeaderItem name="Project" sort={true} list={projectDropDown} />
            <HeaderItem name="Statistic" sort={false} link="/Statistic" />
            <HeaderItem name="About Us" sort={false} link="/About" />
            <HeaderItem name="Contact" sort={false} link="/Contact" />
          </div>
          <div className={cx('user-cointainer')}>
            <User
              name="Nguyễn Huỳnh Gia Huy"
              avatar="https://www.upwork.com/profile-portraits/c1mP-BDqyN4kRv9Jgd4yAcLbKtKCPzUv1je-lIDvyCHm1MWaY-AZJJ5IWtUhMzUeKF"
            />
          </div>
        </div>
      ) : (
        <></>
      )}
      {sessionStorage.getItem('isLogIn') == 1 && sessionStorage.getItem('admin') == 1 ? (
        <div className={cx('private-cointainer')}>
          <div className={cx('navigate-cointainer')}></div>
          <div className={cx('user-cointainer')}>
            <User
              name="Nguyễn Huỳnh Gia Huy"
              avatar="https://www.upwork.com/profile-portraits/c1mP-BDqyN4kRv9Jgd4yAcLbKtKCPzUv1je-lIDvyCHm1MWaY-AZJJ5IWtUhMzUeKF"
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </header>
  );
}

export default Header;
