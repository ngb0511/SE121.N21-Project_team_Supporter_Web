import classNames from 'classnames/bind';
import styles from './Tag.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
const data = [
  { name: 'Node js', detail: ' back-end JavaScript runtime environment' },
  { name: 'React js', detail: ' free and open-source front-end JavaScript library' },
  { name: 'Springboot', detail: 'application framework and inversion of control container for the Java platform' },
  { name: 'Springboot', detail: 'application framework and inversion of control container for the Java platform' },
];

function Tag() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('header')}>
          <h3 className={cx('header-tittle')}>Thêm thẻ</h3>
          <div className={cx('header-input')}>
            <div className={cx('header-input-name')}>
              <h3>Tên thẻ:</h3>
              <input></input>
            </div>
            <div className={cx('header-input-detail')}>
              <h3>Mô tả:</h3>
              <textarea cols="40" rows="5"></textarea>
            </div>
            <button>Thêm</button>
          </div>
        </div>
        <div className={cx('cointainer')}>
          <h2>Danh sách thẻ</h2>
          <table>
            <tr>
              <th>Tên</th>
              <th>Mô tả</th>
              <th>Thao tác</th>
            </tr>
            {data.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.name}</td>
                  <td>{val.detail}</td>
                  <td>
                    <button>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Tag;
