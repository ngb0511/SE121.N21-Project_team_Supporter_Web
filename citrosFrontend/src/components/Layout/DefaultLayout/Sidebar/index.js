import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faListCheck, faChartLine, faReceipt, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import Button from '../../../Button';
const cx = classNames.bind(styles);

function Sidebar() {
  return (
    <aside className={cx('wrapper')}>
      <h1>Menu </h1>
      <ul className={cx('sidebar-cointainer')}>
        <li className={cx('sidebar-item')}>
          <Button to="/Admin">
            <div>
              <FontAwesomeIcon icon={faHome} />
              &nbsp; &nbsp;Trang chủ
            </div>
          </Button>
        </li>
        <li className={cx('sidebar-item')}>
          <Button to="/Admin/ProjectAdmin">
            <div>
              <FontAwesomeIcon icon={faListCheck} />
              &nbsp; &nbsp;Dự án
            </div>
          </Button>
        </li>

        <li className={cx('sidebar-item')}>
          <Button to="/Tag">
            <div>
              <FontAwesomeIcon icon={faReceipt} />
              &nbsp; &nbsp;Thẻ
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
