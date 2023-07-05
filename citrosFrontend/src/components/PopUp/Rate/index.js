import React from 'react';
import classNames from 'classnames/bind';
import styles from './Rate.module.scss';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import * as projectServices from '../../../apiServices/projectItemServices';
//import ProfilePop from '../ProfilePop';
var participate = {
  projectID: '',
  userID: '',
  rate: '',
};

//id lấy từ bảng là props.id
const cx = classNames.bind(styles);
const Rate = (props) => {
  var participate = {
    projectID: '',
    userID: '',
    rate: '',
  };
  const handleConfirm = (event) => {
    //setActive(event.target.id);

    const fetchApi = async () => {
      participate.projectID = props.pId;
      participate.userID = props.id;

      //var userEx = JSON.parse(sessionStorage.getItem('userLogin'));
      // Cần 1 object participate (gồm userID, projectID, rate)
      //const result = await projectServices.participate(/*participate*/);
      //var account = JSON.parse(sessionStorage.getItem('account'));
      if (document.getElementById('Bad').checked === true) {
        participate.rate = document.getElementById('Bad').value;
      }
      if (document.getElementById('Normal').checked === true) {
        participate.rate = document.getElementById('Normal').value;
      }
      if (document.getElementById('Good').checked === true) {
        participate.rate = document.getElementById('Good').value;
      }
      if (document.getElementById('VeryGood').checked === true) {
        participate.rate = document.getElementById('VeryGood').value;
      }
      if (document.getElementById('Excellent').checked === true) {
        participate.rate = document.getElementById('Excellent').value;
      }
      console.log(participate);
      const result = await projectServices.updateRate(participate);
    };
    fetchApi();
    alert('Đánh giá thành viên thành công');
    window.location.reload();
  };

  return (
    <div className={cx('popup-box')}>
      <div className={cx('box')}>
        <span className={cx('close-icon')} onClick={props.handleClose}>
          x
        </span>
        {props.content}
        <div className={cx('content')}>
          <p>Please select rate for this member:</p>
          <input type="radio" id="Bad" name="fav_language" value="1"></input> &nbsp;
          <label for="html">Bad</label>
          <br></br>
          <input type="radio" id="Normal" name="fav_language" value="2"></input> &nbsp;
          <label for="css">Normal</label>
          <br></br>
          <input type="radio" id="Good" name="fav_language" value="3"></input> &nbsp;
          <label for="javascript">Good</label>
          <br></br>
          <input type="radio" id="VeryGood" name="fav_language" value="4"></input> &nbsp;
          <label for="javascript">Very good</label>
          <br></br>
          <input type="radio" id="Excellent" name="fav_language" value="5"></input> &nbsp;
          <label for="javascript">Excellent</label>
          <br></br>
          <button id={cx('confirm')} onClick={handleConfirm}>
            Đồng ý
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rate;
