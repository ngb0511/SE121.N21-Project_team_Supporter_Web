import React from 'react';
import classNames from 'classnames/bind';
import styles from './Statistic.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as accountServices from '../../apiServices/accountServices';
import * as projectItemServices from '../../apiServices/projectItemServices';
import { useState, useEffect } from 'react';
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
  const [user, setUser] = useState([]);
  const [total, setTotal] = useState();
  const [inprogress, setinprogress] = useState();
  const [completed, setcompleted] = useState();
  const [totalArr, setTotalArr] = useState([]);
  const [inprogressArr, setInprogressArr] = useState([]);
  const [completedArr, setCompletedArr] = useState([]);
  const [year, setYear] = useState([]);

  var participate = {
    projectID: '',
    userID: '',
    rate: '',
  };

  var userEx = JSON.parse(sessionStorage.getItem('userLogin'));

  useEffect(() => {
    const fetchApi = async () => {
      const result = await accountServices.account();
      console.log(result);
      setUser(result);

      participate.userID = userEx.userID;

      var yearArr = [];
      var total = [];
      var inprogress = [];
      var completed = [];
      const arrResult = await projectItemServices.getNumberOfProjectsForUser(userEx.userID);
      //for (var i=0; i<arrResult.len)
      for (var i = 0; i < arrResult.length; i++) {
        yearArr[i] = arrResult[i].year;
        total[i] = arrResult[i].total;
        const inprogressResult = await projectItemServices.getNumberOfUnfinishedProjectsInYearForUser(
          arrResult[i].year,
          participate,
        );
        inprogress[i] = inprogressResult[0].inprogress;
        const completedResult = await projectItemServices.getNumberOfFinishedProjectsInYearForUser(
          arrResult[i].year,
          participate,
        );
        //console.log(completedResult[0].completed);
        completed[i] = completedResult[0].completed;
        //console.log(completedResult[0].completed);
      }
      setYear(yearArr);
      setTotalArr(total);
      setInprogressArr(inprogress);
      setCompletedArr(completed);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await accountServices.account();
      console.log(result);
      setUser(result);

      const totalResult = await projectItemServices.getNumberOfProjectsJoinedForUser(userEx.userID);
      if (totalResult[0].total === null) {
        setTotal('0');
      } else {
        setTotal(totalResult[0].total);
      }

      const inprogressResult = await projectItemServices.getNumberOfUnfinishedProjectsForUser(userEx.userID);
      if (inprogressResult[0].inprogress === null) {
        setinprogress('0');
      } else {
        setinprogress(inprogressResult[0].inprogress);
      }

      const completedResult = await projectItemServices.getNumberOfFinishedProjectsForUser(userEx.userID);
      if (completedResult[0].completed === null) {
        setcompleted('0');
      } else {
        setcompleted(completedResult[0].completed);
      }
    };
    fetchApi();
  }, []);

  // useEffect(() => {
  //   const fetchApi = async () => {
  //     console.log(userEx);

  //     //setTotal();
  //     //console.log(completed);
  //     // arr = [total[0].total, inprogress[0].inprogress, completed[0].completed];
  //     // year = [total[0].year, total[0].year + 1, total[0].year + 2];
  //     // totalnum = total[0].total;
  //     // inprogressnum = inprogress[0].inprogress;
  //     // completednum = completed[0].completed;
  //     // console.log(arr);
  //   };
  //   fetchApi();
  // }, []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <ul>
          <li>
            <h3>
              Tổng số dự án tham gia
              <h2>{total}</h2>
            </h3>
            <div>
              <FontAwesomeIcon icon={faFile} />
            </div>
          </li>
          <li>
            <h3>
              Dự án đã hoàn thành
              <h2>{completed}</h2>
            </h3>
            <div>
              <FontAwesomeIcon icon={faListCheck} />
            </div>
          </li>
          <li>
            <h3>
              Dự án đang tiến hành
              <h2>{inprogress}</h2>
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
            labels: year,
            datasets: [
              {
                data: totalArr,
                label: 'Tất cả',
                borderColor: '#3e95cd',
                fill: false,
              },
              {
                data: completedArr,
                label: 'Hoàn thành',
                borderColor: '#8e5ea2',
                fill: false,
              },
              {
                data: inprogressArr,
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
