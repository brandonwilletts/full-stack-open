import axios from "axios";

const baseURL = "/api/persons";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseURL, newObject);
  return request.then((response) => response.data);
};

const deleteEntry = (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request.then((response) => response.data);
};

const update = (id, updatedObject) => {
  const request = axios.put(`${baseURL}/${id}`, updatedObject);
  return request.then((response) => response.data);
};

export default { getAll, create, deleteEntry, update };
