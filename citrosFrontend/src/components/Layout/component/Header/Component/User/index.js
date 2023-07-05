import classNames from 'classnames/bind';
import styles from './User.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import * as avatarServices from '../../../../../../apiServices/avatarServices';
import * as userServices from '../../../../../../apiServices/userServices';

import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function User({ name, avatar }) {
  function LogOut() {
    sessionStorage.removeItem('isLogIn');
    sessionStorage.removeItem('admin');
  }

  const [img, setImg] = useState(
    'https://t3.ftcdn.net/jpg/03/16/55/44/360_F_316554461_QQ1RVxQgIBIYRa3tq4Sm3Ss1mA7xXUoo.jpg',
  );

  var user = JSON.parse(sessionStorage.getItem('userLogin'));
  console.log(user);

  useEffect(() => {
    const fetchApi = async () => {
      console.log('userID: ' + user.userID);
      //var account = JSON.parse(sessionStorage.getItem('account'));
      const avatar = await avatarServices.getAvatarSortedByUserID(user.userID);
      var path = avatar[0].avatar.toString().split('\\');
      var avatarName = 'http://localhost:3002/images/' + path[4];
      console.log(avatarName);
      setImg(avatarName);
      //document.getElementsByClassName('user-img').style.backgroundImage = "url('${avatarName}')";
      //console.log(e.target.files[0]);
      //setFile(avatarName);
      //setImage(URL.createObjectURL(avatarName));
    };
    fetchApi();

    const fetchApi1 = async () => {
      const userLogin = await userServices.getUserDetailByID(user.userID);
      console.log(userLogin);
      user = userLogin[0];
      console.log(user);
      sessionStorage.setItem('userLogin', JSON.stringify(user));
    };
    fetchApi1();
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <img src={img}></img>
        <div className={cx('cointainer')}>
          <button className={cx('sort-btn')}>
            <p>{user.fullName}</p>
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
