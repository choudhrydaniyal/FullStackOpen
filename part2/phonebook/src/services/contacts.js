import axios from "axios";

const baseUrl = "/api/persons";

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (newContact) => {
  return axios.post(baseUrl, newContact);
};

const deleteContact = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const updateContact = (changedContact) => {
  return axios.put(`${baseUrl}/${changedContact.id}`, changedContact);
};

export default { getAll, create, deleteContact, updateContact };
