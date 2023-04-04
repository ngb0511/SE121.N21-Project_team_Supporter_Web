import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faListCheck, faChartLine, faReceipt, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../Button';
const cx = classNames.bind(styles);

function Sidebar() {
  return (
    <aside className={cx('wrapper')}>
      <ul className={cx('sidebar-cointainer')}>
        <li className={cx('sidebar-item')}>
          <Button to="/Home">
            <div>
              <FontAwesomeIcon icon={faHome} />
              &nbsp; &nbsp;Trang chủ
            </div>
          </Button>
        </li>
        <li className={cx('sidebar-item')}>
          <Button to="/Profile">
            <div>
              <FontAwesomeIcon icon={faCircleUser} />
              &nbsp; &nbsp;Thông tin cá nhân
            </div>
          </Button>
        </li>
        <li className={cx('sidebar-item')}>
          <Button to="/Project">
            <div>
              <FontAwesomeIcon icon={faListCheck} />
              &nbsp; &nbsp;Dự án
            </div>
          </Button>
        </li>
        <li className={cx('sidebar-item')}>
          <Button to="/Account">
            <div>
              <FontAwesomeIcon icon={faChartLine} />
              &nbsp; &nbsp;Thống kê
            </div>
          </Button>
        </li>
        <li className={cx('sidebar-item')}>
          <Button to="/Account">
            <div>
              <FontAwesomeIcon icon={faReceipt} />
              &nbsp; &nbsp;Tài nguyên
            </div>
          </Button>
        </li>
        <li className={cx('sidebar-item')}>
          <Button to="/Account">
            <div>
              <FontAwesomeIcon icon={faUser} />
              &nbsp; &nbsp;Tài khoản
            </div>
          </Button>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
