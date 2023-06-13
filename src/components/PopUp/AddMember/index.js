import React from 'react';
import classNames from 'classnames/bind';
import styles from './AddMember.module.scss';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import * as projectItemServices from '../../../apiServices/projectItemServices';
import ProfilePop from '../ProfilePop';

const cx = classNames.bind(styles);
const AddMember = (props) => {
  const [selectedOptions, setSelectedOptions] = useState();
  const [selectedMajor, setSelectedMajor] = useState();
  const [regis, setRegis] = useState([]);
  const [major, setMajor] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  // Array of all options
  /*const optionList = [
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'blue', label: 'Blue' },
    { value: 'white', label: 'White' },
  ];*/

  var participate = {
    projectID: '',
    userID: '',
    majorID: '',
  };

  // Function triggered on selection
  function handleSelect(data) {
    setIsOpen(!isOpen);
    console.log(isOpen);
    console.log(data);
    setSelectedOptions(data);
  }

  function majorSelect(data) {
    console.log(data);
    setSelectedMajor(data);
  }

  const optionList = regis.map(({ user, userID }, key) => {
    // Ideally you can change the value to something different that is easier to keep track of like the UTC offset
    return {
      value: userID,
      label: user,
    };
  });

  const majorList = major.map(({ majorName, majorID }, key) => {
    // Ideally you can change the value to something different that is easier to keep track of like the UTC offset
    return {
      value: majorID,
      label: majorName,
    };
  });

  const togglePopup = () => {
    /*const fetchApi = async () => {
      var newId = Number(id);
      console.log(newId);
      const result = await projectServices.projectItem(newId);
      setpId(newId);
      setProject(result);
    };
    fetchApi();*/
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const regis_result = await projectItemServices.getAllRegis(props.projectId);
      const major_result = await projectItemServices.getAllProjectMajors(props.projectId);
      setRegis(regis_result);
      setMajor(major_result);
      console.log(major_result);
    };
    fetchApi();
  }, []);

  function AddMember() {
    const fetchApi = async () => {
      participate.projectID = props.projectId;
      participate.majorID = selectedMajor.value;
      const result = await projectItemServices.addParticipate(selectedOptions.value, participate);
      //const major_result = await projectItemServices.getAllProjectMajors(props.projectId);
      console.log(result);
    };
    fetchApi();

    props.handleClose();
  }
  return (
    <div className={cx('popup-box')}>
      <div className={cx('box')}>
        <span className={cx('close-icon')} onClick={props.handleClose}>
          x
        </span>
        {props.content}
        <div className={cx('content')}>
          <div className={cx('icon-container')}>
            <FontAwesomeIcon icon={faPersonCirclePlus} />
          </div>
          <div className={cx('dropdown-container')}>
            <Select
              placeholder="Chọn người dùng"
              options={optionList}
              value={selectedOptions}
              onChange={handleSelect}
              isSearchable={true}
              maxMenuHeight={100}
            />
          </div>
          <div className={cx('dropdown-container')}>
            <Select
              placeholder="Chọn chuyên môn"
              options={majorList}
              value={selectedMajor}
              onChange={majorSelect}
              isSearchable={true}
              maxMenuHeight={100}
            />
          </div>
          <div>
            <button id={cx('confirm')} onClick={AddMember}>
              Đồng ý
            </button>
            <button id={cx('cancel')} onClick={props.handleClose}>
              Hủy bỏ
            </button>
          </div>
        </div>
      </div>
      {isOpen && <ProfilePop handleClose={togglePopup} id={selectedOptions.value} />}
    </div>
  );
};

export default AddMember;
