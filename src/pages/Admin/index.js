import classNames from 'classnames/bind';
import styles from './Admin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faListCheck, faBarsProgress } from '@fortawesome/free-solid-svg-icons';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
//import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

const data = {
  labels: ['In progress', 'Completed'],
  datasets: [
    {
      label: '# of Projects',
      data: [75, 25],
      backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
      borderWidth: 1,
    },
  ],
};

function Admin() {
  const navigate = useNavigate();
  ChartJS.register(ArcElement, Tooltip, Legend);
  const numproject = 5;
  function Delete(event, index) {
    console.log(event);
  }

  function View(event, index) {
    console.log(event);
    console.log(index);
    navigate('/Admin/ProfileWall/' + index);
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('statistic-conintainer')}>
        <div className={cx('chart-conintainer')}>
          <div className={cx('header')}>
            <ul>
              <li>
                <h3>
                  Total
                  <h2>{numproject}</h2>
                </h3>
                <div>
                  <FontAwesomeIcon icon={faFile} />
                </div>
              </li>
              <li>
                <h3>
                  Completed
                  <h2>{numproject}</h2>
                </h3>
                <div>
                  <FontAwesomeIcon icon={faListCheck} />
                </div>
              </li>
              <li>
                <h3>
                  In Progress
                  <h2>{numproject}</h2>
                </h3>
                <div>
                  <FontAwesomeIcon icon={faBarsProgress} />
                </div>
              </li>
            </ul>
          </div>
          <div className={cx('body')}>
            <h2>Statistic Chart</h2>
            <Line
              data={{
                labels: [2020, 2021, 2022, 2023],
                datasets: [
                  {
                    data: [0, 1, 2, 3, 5],
                    label: 'Total',
                    borderColor: '#3e95cd',
                    fill: false,
                  },
                  {
                    data: [1, 1, 1, 3, 1],
                    label: 'Completed',
                    borderColor: '#8e5ea2',
                    fill: false,
                  },
                  {
                    data: [0, 0, 2, 3, 4],
                    label: 'In Progress',
                    borderColor: '#3cba9f',
                    fill: false,
                  },
                ],
              }}
              options={{
                title: {
                  display: true,
                  text: '',
                },
                legend: {
                  display: true,
                  position: 'bottom',
                },
              }}
            />
          </div>
        </div>
        <div className={cx('number-conintainer')}>
          <h2>Project Status</h2>
          <Doughnut data={data} />
          <p>You need abit more effort to hit monthly target</p>
          <button>View</button>
          <h3>New Account Create</h3>
          <h1>1</h1>
          <p>Data count to day 18/09/2002</p>
        </div>
      </div>
      <div className={cx('account-conintainer')}>
        <h2>Account List</h2>
        <div className={cx('task-detail')}>
          <div className="container">
            <div className="wrapper-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>BirthDay</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Password</th>
                    <th>Major</th>
                    <th>Tool</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Như Tâm</td>
                    <td>18/09/2002</td>
                    <td>215206@gm.uit.vn</td>
                    <td>0927397842</td>
                    <td>#######</td>
                    <td></td>
                    <td>
                      <button className={cx('view')} onClick={(event) => View(event, 1)}>
                        VIEW
                      </button>
                      <button className={cx('delete')} onClick={(event) => Delete(event, 1)}>
                        DEL
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Như Tâm</td>
                    <td>18/09/2002</td>
                    <td>215206@gm.uit.vn</td>
                    <td>0927397842</td>
                    <td>#######</td>
                    <td></td>
                    <td>
                      <button className={cx('view')} onClick={(event) => View(event, 1)}>
                        VIEW
                      </button>
                      <button className={cx('delete')} onClick={(event) => Delete(event, 1)}>
                        DEL
                      </button>
                    </td>
                  </tr>{' '}
                  <tr>
                    <td>3</td>
                    <td>Như Tâm</td>
                    <td>18/09/2002</td>
                    <td>215206@gm.uit.vn</td>
                    <td>0927397842</td>
                    <td>#######</td>
                    <td></td>
                    <td>
                      <button className={cx('view')} onClick={(event) => View(event, 1)}>
                        VIEW
                      </button>
                      <button className={cx('delete')} onClick={(event) => Delete(event, 1)}>
                        DEL
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
