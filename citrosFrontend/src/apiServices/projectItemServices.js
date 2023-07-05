import request from '../utils/request';

//Lấy list dự án
export const projectAllItem = async () => {
  const response = await request.get('/project/findAll');
  return response.data;
};

export const getAllFinishedProjects = async () => {
  const response = await request.get('/project/getAllFinishedProjects');
  return response.data;
};

export const getAllUnfinishedProjects = async () => {
  const response = await request.get('/project/getAllUnfinishedProjects');
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

export const getAllProjectMajors = async (projectID) => {
  const response = await request.get(`/project/getAllProjectMajors/${projectID}`);
  //console.log(response.data);
  return response.data;
};

export const addParticipate = async (id, project) => {
  const response = await request.post(`/participate/addParticipate/${id}`, project);
  return response.data;
};

export const getAllParticipant = async (projectID) => {
  const response = await request.get(`/participate/getAllParticipant/${projectID}`);
  //console.log(project);get
  return response.data;
};

export const getAllJoinedProject = async (userID) => {
  const response = await request.get(`/participate/getAllJoinedProject/${userID}`);
  //console.log(project);get
  return response.data;
};

export const getMatchedProject = async (userID) => {
  const response = await request.get(`/project/getMatchedProject/${userID}`);
  //console.log(project);get
  return response.data;
};

export const getStarredProject = async (userID) => {
  const response = await request.get(`/project/getStarredProject/${userID}`);
  //console.log(project);get
  return response.data;
};

export const getOwnedProject = async (userID) => {
  const response = await request.get(`/project/getOwnedProject/${userID}`);
  //console.log(project);get
  return response.data;
};

export const getFinishedProject = async (userID) => {
  const response = await request.get(`/participate/getFinishedProject/${userID}`);
  //console.log(project);get
  return response.data;
};

export const getUnfinishedProject = async (userID) => {
  const response = await request.get(`/participate/getUnfinishedProject/${userID}`);
  //console.log(project);get
  return response.data;
};

export const addStarredProject = async (userID, project) => {
  const response = await request.post(`/project/addStarredProject/${userID}`, project);
  console.log(project);
  return response.data;
};

export const checkExistedStarred = async (userID, project) => {
  const response = await request.post(`/project/checkExistedStarred/${userID}`, project);
  console.log(project);
  return response.data;
};

export const deleteStarredProject = async (userID, project) => {
  const response = await request.post(`/project/deleteStarredProject/${userID}`, project);
  console.log(project);
  return response.data;
};

export const getAllRegis = async (projectID) => {
  const response = await request.get(`/registrant/findAll/${projectID}`);
  //console.log(project);get
  return response.data;
};

export const addRegistrant = async (regis) => {
  const response = await request.post('/registrant/addRegistrant', regis);
  return response.data;
};

export const checkExistedRegistrant = async (regis) => {
  const response = await request.post('/registrant/checkExistedRegistrant', regis);
  return response.data;
};

export const sendAcceptedEmail = async (email, regis) => {
  const response = await request.post(`/registrant/sendAcceptedEmail/${email}`, regis);
  return response.data;
};

export const deleteRegistrant = async (userID, regis) => {
  const response = await request.post(`/registrant/deleteRegistrant/${userID}`, regis);
  //console.log(project);
  return response.data;
};

export const updateRate = async (participate) => {
  const response = await request.put('/participate/updateRate', participate);
  return response.data;
};

export const getNumberOfLikedProjects = async (projectID) => {
  const response = await request.get(`/project/getNumberOfLikedProjects/${projectID}`);
  return response.data;
};

export function uploadFile(id, file) {
  const formData = new FormData();
  formData.append('file', file);
  request.post(`/projectFile/addProjectFile/${id}`, formData).then((res) => {
    console.log(res);
  });
}

export const getAllFiles = async (projectID) => {
  const response = await request.get(`/projectFile/getAllFiles/${projectID}`);
  return response.data;
};

export const getNumberOfProjects = async () => {
  const response = await request.get('/project/getNumberOfProjects');
  return response.data;
};

export const getProjectsAfterYear = async () => {
  const response = await request.get('/project/getProjectsAfterYear');
  return response.data;
};

export const getNumberOfUnfinishedProjects = async () => {
  const response = await request.get('/project/getNumberOfUnfinishedProjects');
  return response.data;
};

export const getNumberOfFinishedProjects = async () => {
  const response = await request.get('/project/getNumberOfFinishedProjects');
  return response.data;
};

export const getNumberOfProjectsInYear = async (year) => {
  const response = await request.get(`/project/getNumberOfProjectsInYear/${year}`);
  return response.data;
};

export const getNumberOfUnfinishedProjectsInYear = async (year) => {
  const response = await request.get(`/project/getNumberOfUnfinishedProjectsInYear/${year}`);
  return response.data;
};

export const getNumberOfFinishedProjectsInYear = async (year) => {
  const response = await request.get(`/project/getNumberOfFinishedProjectsInYear/${year}`);
  return response.data;
};

export const getNumberOfProjectsForUser = async (id) => {
  const response = await request.get(`/participate/getNumberOfProjects/${id}`);
  return response.data;
};

export const getNumberOfProjectsJoinedForUser = async (id) => {
  const response = await request.get(`/participate/getTotalNumberOfProjectJoined/${id}`);
  return response.data;
};

export const getNumberOfFinishedProjectsForUser = async (id) => {
  const response = await request.get(`/participate/getNumberOfFinishedProjects/${id}`);
  return response.data;
};

export const getNumberOfUnfinishedProjectsForUser = async (id) => {
  const response = await request.get(`/participate/getNumberOfUnfinishedProjects/${id}`);
  return response.data;
};

export const getNumberOfFinishedProjectsInYearForUser = async (year, participate) => {
  const response = await request.post(`/participate/getNumberOfFinishedProjectsInYear/${year}`, participate);
  return response.data;
};

export const getNumberOfUnfinishedProjectsInYearForUser = async (year, participate) => {
  const response = await request.post(`/participate/getNumberOfUnfinishedProjectsInYear/${year}`, participate);
  return response.data;
};

export const getNumberOfProjectsOwned = async (id) => {
  const response = await request.get(`/project/getNumberOfProjectsOwned/${id}`);
  return response.data;
};

export const getAllUnfinishedProjectsSortedByName = async (projectName) => {
  const response = await request.get(`/project/getAllUnfinishedProjectsSortedByName/${projectName}`);
  return response.data;
};

export const getAllFinishedProjectsSortedByName = async (projectName) => {
  const response = await request.get(`/project/getAllFinishedProjectsSortedByName/${projectName}`);
  return response.data;
};

// export const deleteProjectFile = async (id, projectFile) => {
//   const response = await request.put(`/projectFile/updateProjectFile/${id}`, projectFile);
//   return response.data;
// };

export function updateProjectFile(id, file) {
  const formData = new FormData();
  formData.append('file', file);
  request.put(`/projectFile/updateProjectFile/${id}`, formData).then((res) => {
    console.log(res);
  });
}

export const checkParticipated = async (participate) => {
  const response = await request.post('/participate/checkExistedParticipate/', participate);
  console.log(participate);
  return response.data;
};

export const updateProjectOwner = async (id) => {
  const response = await request.put(`/project/updateProjectOwner/${id}`);
  return response.data;
};

export const deleteAllRegistrantOfUser = async (userID) => {
  const response = await request.delete(`/registrant/deleteAllRegistrantOfUser/${userID}`);
  //console.log(project);
  return response.data;
};

export const deleteAllStarredProjectOfUser = async (userID) => {
  const response = await request.delete(`/project/deleteAllStarredProjectOfUser/${userID}`);
  //console.log(project);
  return response.data;
};

export const deleteAllParticipateOfUser = async (userID) => {
  const response = await request.delete(`/project/deleteAllParticipateOfUser/${userID}`);
  //console.log(project);
  return response.data;
};

export const deleteAllParticipateOfProject = async (projectID) => {
  const response = await request.delete(`/project/deleteAllParticipateOfProject/${projectID}`);
  //console.log(project);
  return response.data;
};
