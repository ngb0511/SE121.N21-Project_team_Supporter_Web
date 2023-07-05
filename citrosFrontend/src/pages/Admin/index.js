import classNames from 'classnames/bind';
import styles from './Admin.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faListCheck, faBarsProgress } from '@fortawesome/free-solid-svg-icons';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
//import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import * as accountServices from '../../apiServices/accountServices';
import * as userServices from '../../apiServices/userServices';
import * as projectItemServices from '../../apiServices/projectItemServices';
import * as taskServices from '../../apiServices/taskServices';
import dateFormat from 'dateformat';
const cx = classNames.bind(styles);

function Admin() {
  const [user, setUser] = useState([]);
  //var arr = [1, 3, 4, 5];
  //var year = [1, 3, 4, 5];
  const [total, setTotal] = useState();
  const [userNum, setUserNum] = useState();
  const [inprogress, setinprogress] = useState();
  const [completed, setcompleted] = useState();
  const [totalArr, setTotalArr] = useState([]);
  const [inprogressArr, setInprogressArr] = useState([]);
  const [completedArr, setCompletedArr] = useState([]);
  const [year, setYear] = useState([]);

  const data = {
    labels: ['In progress', 'Completed'],
    datasets: [
      {
        label: '# of Projects',
        data: [inprogress, completed],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    const fetchApi = async () => {
      const result = await userServices.getUserNumber();
      console.log(result[0].userNum);

      setUserNum(result[0].userNum);
    };
    fetchApi();
  });

  useEffect(() => {
    const fetchApi = async () => {
      const result = await accountServices.account();
      console.log(result);
      setUser(result);
      var yearArr = [];
      var total = [];
      var inprogress = [];
      var completed = [];
      const arrResult = await projectItemServices.getProjectsAfterYear();
      //for (var i=0; i<arrResult.len)
      for (var i = 0; i < arrResult.length; i++) {
        //console.log(arrResult[i].year);
        yearArr[i] = arrResult[i].year;
        total[i] = arrResult[i].total;
        const inprogressResult = await projectItemServices.getNumberOfUnfinishedProjectsInYear(arrResult[i].year);
        inprogress[i] = inprogressResult[0].inprogress;
        const completedResult = await projectItemServices.getNumberOfFinishedProjectsInYear(arrResult[i].year);
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

      // const total = await projectItemServices.getNumberOfProjects();
      // const inprogress = await projectItemServices.getNumberOfUnfinishedProjects();
      // const completed = await projectItemServices.getNumberOfFinishedProjects();

      const totalResult = await projectItemServices.getNumberOfProjects();
      if (totalResult[0].total === null) {
        setTotal('0');
      } else {
        setTotal(totalResult[0].total);
      }

      const inprogressResult = await projectItemServices.getNumberOfUnfinishedProjects();
      if (inprogressResult[0].inprogress === null) {
        setinprogress('0');
      } else {
        setinprogress(inprogressResult[0].inprogress);
      }

      const completedResult = await projectItemServices.getNumberOfFinishedProjects();
      if (completedResult[0].completed === null) {
        setcompleted('0');
      } else {
        setcompleted(completedResult[0].completed);
      }
      //console.log(completed);
      // arr = [total[0].total, inprogress[0].inprogress, completed[0].completed];
      // year = [total[0].year, total[0].year + 1, total[0].year + 2];
      // totalnum = total[0].total;
      // inprogressnum = inprogress[0].inprogress;
      // completednum = completed[0].completed;
      // console.log(arr);
    };
    fetchApi();
  }, []);

  const navigate = useNavigate();
  ChartJS.register(ArcElement, Tooltip, Legend);

  function projectView(event) {
    navigate('/Admin/ProjectAdmin');
  }

  function Delete(event, email) {
    var userID = '';
    for (var i = 0; i < user.length; i++) {
      if (user[i].email === email) {
        userID = user[i].userID;
      }
    }

    console.log(userID);

    //deleteAccountByEmail
    const fetchApi = async () => {
      const updateOwner = await projectItemServices.updateProjectOwner(userID);
      const participateResult = await projectItemServices.deleteAllParticipateOfUser(userID);
      const progressResult = await taskServices.updateProgressUser(userID);
      const regisResult = await projectItemServices.deleteAllRegistrantOfUser(userID);
      const starProResult = await projectItemServices.deleteAllStarredProjectOfUser(userID);
      const accountResult = await accountServices.deleteAccountByEmail(email);
    };
    fetchApi();

    const fetchApi1 = async () => {
      const userResult = await userServices.deleteUser(userID);
      //setMajorList(result);
      //console.log(result);
      alert('Xóa thành công');
      window.location.reload();
    };
    fetchApi1();
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
                  <h2>{total}</h2>
                </h3>
                <div>
                  <FontAwesomeIcon icon={faFile} />
                </div>
              </li>
              <li>
                <h3>
                  Completed
                  <h2>{completed}</h2>
                </h3>
                <div>
                  <FontAwesomeIcon icon={faListCheck} />
                </div>
              </li>
              <li>
                <h3>
                  In Progress
                  <h2>{inprogress}</h2>
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
                labels: year,
                datasets: [
                  {
                    data: totalArr,
                    label: 'Total',
                    borderColor: '#3e95cd',
                    fill: false,
                  },
                  {
                    data: completedArr,
                    label: 'Completed',
                    borderColor: '#8e5ea2',
                    fill: false,
                  },
                  {
                    data: inprogressArr,
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
          <button onClick={projectView}>View</button>
          <h1>{userNum}</h1>
          <h3>User Created</h3>
          <p>Data count to day {dateFormat(new Date().toLocaleDateString(), 'yyyy-mm-dd')}</p>
        </div>
      </div>
      <div className={cx('account-conintainer')}>
        <h2>User List</h2>
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
                    <th>ID Number</th>
                    <th>Tool</th>
                  </tr>
                </thead>
                <tbody>
                  {user.map((option, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{option.user}</td>
                      <td>{option.dateOfBirth}</td>
                      <td>{option.email}</td>
                      <td>{option.phoneNumber}</td>
                      <td>{option.idNumber}</td>
                      <td>
                        <button className={cx('view')} onClick={(event) => View(event, option.userID)}>
                          VIEW
                        </button>
                        <button className={cx('delete')} onClick={(event) => Delete(event, option.email)}>
                          DEL
                        </button>
                      </td>
                    </tr>
                  ))}
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
