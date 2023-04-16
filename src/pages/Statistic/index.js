import React from 'react';
import classNames from 'classnames/bind';
import styles from './Statistic.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faListCheck, faBarsProgress } from '@fortawesome/free-solid-svg-icons';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

const cx = classNames.bind(styles);
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Statistic() {
  const numproject = 5;
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <h1>Thống kê</h1>
        <ul>
          <li>
            <h3>
              Tổng số dự án tham gia
              <h2>{numproject}</h2>
            </h3>
            <div>
              <FontAwesomeIcon icon={faFile} />
            </div>
          </li>
          <li>
            <h3>
              Dự án đã hoàn thành
              <h2>{numproject}</h2>
            </h3>
            <div>
              <FontAwesomeIcon icon={faListCheck} />
            </div>
          </li>
          <li>
            <h3>
              Dự án đang tiến hành
              <h2>{numproject}</h2>
            </h3>
            <div>
              <FontAwesomeIcon icon={faBarsProgress} />
            </div>
          </li>
        </ul>
      </div>
      <div className={cx('body')}>
        <h2>Biểu đồ thống kê dự án</h2>
        <Line
          data={{
            labels: [2020, 2021, 2022, 2023],
            datasets: [
              {
                data: [0, 1, 2, 3, 5],
                label: 'Tất cả',
                borderColor: '#3e95cd',
                fill: false,
              },
              {
                data: [1, 1, 1, 3, 1],
                label: 'Hoàn thành',
                borderColor: '#8e5ea2',
                fill: false,
              },
              {
                data: [0, 0, 2, 3, 4],
                label: 'Tiến hành',
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
  );
}

export default Statistic;
