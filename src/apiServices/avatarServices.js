import request from '../utils/request';

export function upload(id, avatarLink) {
  const formData = new FormData();
  formData.append('image', avatarLink);
  request.post(`/avatar/addAvatar/${id}`, formData).then((res) => {
    console.log(res);
  });
  // request.post(`/avatar/addAvatar`, formData).then((res) => {
  //   console.log(res);
  // });
  /*fetch('http://localhost:3002/upload', {
    method: 'POST',
    body: formData,
  })
    .then((res) => res.text())
    .then((data) => {
      console.log(data);
      alert(data);
    })
    .catch((error) => {
      console.log(error);
      alert('da xai ra loi uploa len server');
    });*/
}

// export const updateVerifiedAccount = async (id, account) => {
//   const response = await request.put(`/account/updateVerifiedAccount/${id}`, account);
//   console.log(account);
//   return response.data;
// };
