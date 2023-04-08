import request from '../utils/request';

export function upload(file) {
  const formData = new FormData();
  formData.append('file', file);
  request.post('/photos', formData).then((res) => {
    console.log(res);
  });
}
