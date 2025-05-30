import axios from 'axios'
const baseURL = '/api/notes';

const getAll = () => {
    const req = axios.get(baseURL);
    return req.then(response => response.data);
}

const create = (newObj) => {
    const req = axios.post(baseURL, newObj);
    return req.then(response => response.data);
}

const update = (newObj, id) => {
    const req = axios.put(`${baseURL}/${id}`, newObj);
    return req.then(response => response.data);
}

const remove = (id) =>{
    const req = axios.delete(`${baseURL}/${id}`);
    return req.then(response=>response.data)
}

export default {getAll,create,update,remove}