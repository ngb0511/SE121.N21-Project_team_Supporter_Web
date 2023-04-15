import request from '../utils/request';

//Lấy list dự án
export const projectAllItem = async () => {
  const response = await request.get('/posts');
  return response.data;
};

//Tao /:id để lấy id của 1 dự án nhá
export const projectItem = async (id) => {
  const response = await request.get(`/posts/${id}`);
  return response.data;
};

//Tạo dự án mới
export const createProject = async (project) => {
  const response = await request.post('/posts', JSON.stringify(project));
  console.log(project);
  return response.data;
};

//Cập nhật dự án
export const updateProject = async (id, project) => {
  const response = await request.put(`/posts/${id}`, JSON.stringify(project));
  return response.data;
};

//Xóa dự án
export const deleteProject = async (id) => {
  const response = await request.delete(`/posts/${id}`);
  return response.data;
};
