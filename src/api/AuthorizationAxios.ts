import axios from "axios";
const AuthorizationAxios = axios.create({
    baseURL:'https://api.themoviedb.org',
    timeout:100000,
})
AuthorizationAxios.defaults.headers.common['Authorization'] = process.env.REACT_APP_AUTH_TOKEN
export default AuthorizationAxios
