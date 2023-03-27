//Home page
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAmerica, faUsers, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
const name = 'kenza toras';
const result = 10;
const date = new Date();
const arr = [
  { value: '', text: 'Tăng dần' },
  { value: '', text: 'Giảm dần' },
];

const projectItem = [
  {
    project_name: '',
    project_detail: '',
    project_leader: '',
    project_fee: '',
  },
  {
    project_name: '',
    project_detail: '',
    project_leader: '',
    project_fee: '',
  },
  {
    project_name: '',
    project_detail: '',
    project_leader: '',
    project_fee: '',
  },
];

const handleChange = (event) => {
  console.log(event.target.value);
};
function Home() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <div className={cx('text-cointainer')}>
          <h1>Một ngày tốt lành, {name}</h1>
          <p>Hãy tìm công việc phù hợp với bạn</p>
          <div className={cx('search')}>
            <button className={cx('search-btn')}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
            <input className={cx('search-input')} placeholder="Search"></input>
          </div>
        </div>
        <div className={cx('img-cointainer')}>
          <FontAwesomeIcon icon={faEarthAmerica} />
          &nbsp;&nbsp;
          <FontAwesomeIcon icon={faUsers} />
        </div>
      </div>
      <div className={cx('inner')}>
        <div className={cx('action-cointainer')}>
          <p className={cx('tittle')}>{result} kết quả</p>
          <select onChange={handleChange} className={cx('filter')}>
            <option value="" disabled selected hidden>
              --Sắp xếp--
            </option>
            {arr.map((option, index) => (
              <option key={index} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </div>
        <div className={cx('project')}>
          <ul className={cx('project-cointainer')}>
            {projectItem.map((option, index) => (
              <li className={cx('project-item')}>
                <div className={cx('project-name')}>
                  <h1>Project Name</h1>
                  <h5 className={cx('leader-time')}>Leader {date.toISOString().slice(0, 10)}</h5>
                  <p className={cx('detail')}>
                    Sample about project. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
                    doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                    architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                    aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi
                    nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
                  </p>
                </div>
                <div className={cx('project-fee')}>
                  <h2>$15/hour</h2>
                  <h2>90 hours</h2>
                  <div className={cx('member')}>
                    <h2>
                      14/23 &nbsp;
                      <FontAwesomeIcon icon={faUsers} />
                    </h2>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <h2 className={cx('page')}> &lt;1&nbsp;2&nbsp;3&nbsp;...&nbsp;5&nbsp;&gt; </h2>
        </div>
      </div>
    </div>
  );
}

export default Home;
