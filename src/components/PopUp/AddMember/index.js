import React from 'react';
import classNames from 'classnames/bind';
import styles from './AddMember.module.scss';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const cx = classNames.bind(styles);
const AddMember = (props) => {
  const [selectedOptions, setSelectedOptions] = useState();

  // Array of all options
  const optionList = [
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'blue', label: 'Blue' },
    { value: 'white', label: 'White' },
  ];

  // Function triggered on selection
  function handleSelect(data) {
    setSelectedOptions(data);
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
          <div>
            <button id={cx('confirm')} onClick={props.handleConfirm}>
              Đồng ý
            </button>
            <button id={cx('cancel')} onClick={props.handleClose}>
              Hủy bỏ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
