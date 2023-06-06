import request from '../utils/request';

//Lấy list dự án
export const projectAllItem = async () => {
  const response = await request.get('/project/findAll');
  return response.data;
};

//Tao /:id để lấy id của 1 dự án nhá
export const projectItem = async (id) => {
  const response = await request.get(`/project/getProjectSortedByID/${id}`);
  return response.data;
};

//Tạo dự án mới
export const createProject = async (project) => {
  const response = await request.post('/project/addProject', project);
  console.log(project);
  return response.data;
};

//Cập nhật dự án
export const updateProject = async (id, project) => {
  const response = await request.put(`/project/updateProject/${id}`, project);
  return response.data;
};

//Xóa dự án
export const deleteProject = async (id) => {
  const response = await request.delete(`/project/deleteProject/${id}`);
  return response.data;
};

//sap xep dự án mới
export const sortProject = async (name) => {
  const response = await request.get(`/project/getProjectSortedByName/${name}`);
  return response.data;
};

export const sortProjectDesc = async (name) => {
  const response = await request.get(`/project/getProjectSortedByNameAndDateDesC/${name}`);
  return response.data;
};

export const sortProjectAsc = async (name) => {
  const response = await request.get(`/project/getProjectSortedByNameAndDateASC/${name}`);
  return response.data;
};

export const sortProjectAllAsc = async () => {
  const response = await request.get(`/project/getProjectSortedByDateASC`);
  return response.data;
};

export const sortProjectAllDesc = async () => {
  const response = await request.get(`/project/getProjectSortedByDateDESC`);
  return response.data;
};

//lay max id
export const maxProjectId = async () => {
  const response = await request.get('/project/getMaxProjectID');
  return response.data;
};

//Them nguoi tham du khi khoi tao
export const addParticipateWhenCreateProject = async (project) => {
  const response = await request.post('/project/addParticipateWhenCreateProject', project);
  console.log(project);
  return response.data;
};

//Them nguoi tham du khi khoi tao
export const getAllParticipant = async (projectID) => {
  const response = await request.get(`/project/getAllParticipant/${projectID}`);
  //console.log(project);get
  return response.data;
};

export const getAllRegis = async (projectID) => {
  const response = await request.get(`/registrant/getAllRegistrants/${projectID}`);
  //console.log(project);get
  return response.data;
};
