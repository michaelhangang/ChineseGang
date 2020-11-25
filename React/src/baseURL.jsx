import axios from 'axios';

const  devUrl='http://localhost:8080/api/';
const baseUrl= axios.create({ baseURL: devUrl});
export default baseUrl;