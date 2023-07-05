import classNames from 'classnames/bind';
import styles from './Tag.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import * as tagServices from '../../apiServices/tagServices';
import Confirm from '../../components/PopUp/Confirm';
import Successful from '../../components/PopUp/Successful';
import Error from '../../components/PopUp/Error';
const cx = classNames.bind(styles);
// const data = [
//   { name: 'Node js', detail: ' back-end JavaScript runtime environment' },
//   { name: 'React js', detail: ' free and open-source front-end JavaScript library' },
//   { name: 'Springboot', detail: 'application framework and inversion of control container for the Java platform' },
//   { name: 'Springboot', detail: 'application framework and inversion of control container for the Java platform' },
// ];

function Tag() {
  const [majorList, setMajorList] = useState([]);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isError, setIsError] = useState(false);
  var tag = {
    majorID: '0',
    majorName: '',
    description: '',
  };
  useEffect(() => {
    const fetchApi = async () => {
      const result = await tagServices.getAll();
      setMajorList(result);
    };
    fetchApi();
  }, []);

  function Create() {
    if (document.getElementById('tagName').value !== '') {
      tag.majorName = document.getElementById('tagName').value;
      tag.description = document.getElementById('description').value;
      setIsConfirm(!isConfirm);
    } else {
      setIsError(!isError);
    }
  }
  const confirm = () => {
    Create();
    const fetchApi = async () => {
      const checkExist = await tagServices.checkExistedMajor(tag);
      console.log(checkExist[0].checkExist);
      if (checkExist[0].checkExist === 0) {
        const result = await tagServices.createMajor(tag);
        console.log(result);
        setIsConfirm(!isConfirm);
        setIsSuccessful(!isSuccessful);
        //alert('Thêm thành công');
        window.location.reload();
      } else {
        alert('Chuyên ngành này đã tồn tại');
      }
    };
    fetchApi();
  };

  const toggleConfirm = () => {
    setIsConfirm(!isConfirm);
  };

  const toggleSuccessful = () => {
    const fetchApi = async () => {
      const result = await tagServices.getAll();
      setMajorList(result);
    };
    fetchApi();
    setIsSuccessful(!isSuccessful);
  };

  const toggleError = () => {
    setIsError(!isError);
  };

  function Delete(event, index) {
    console.log(index);
    const fetchApi = async () => {
      const result = await tagServices.deleteMajor(index);
      //setMajorList(result);
      console.log(result);
      alert('Xóa thành công');
      window.location.reload();
    };
    fetchApi();
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('header')}>
          <h3 className={cx('header-tittle')}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Add Major Tag</h3>
          <div className={cx('header-input')}>
            <div className={cx('header-input-name')}>
              <h3>Name:</h3>
              <input id={cx('tagName')}></input>
            </div>
            <div className={cx('header-input-detail')}>
              <h3>Description:</h3>
              <textarea id={cx('description')} cols="40" rows="5"></textarea>
            </div>
            <button onClick={Create}>Add</button>
          </div>
        </div>
        <div className={cx('cointainer')}>
          <h2>Major List</h2>
          <div className="wrapper-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Tool</th>
                </tr>
              </thead>
              <tbody>
                {majorList.map((option, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{option.majorName}</td>
                    <td>{option.description}</td>
                    <td>
                      <button className={cx('delete')} onClick={(event) => Delete(event, option.majorID)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isConfirm && <Confirm handleClose={toggleConfirm} handleConfirm={confirm} />}
      {isSuccessful && <Successful handleClose={toggleSuccessful} />}
      {isError && <Error handleClose={toggleError} />}
    </div>
  );
}

export default Tag;
