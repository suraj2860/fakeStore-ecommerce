import axios from 'axios';

axios.defaults.baseURL = '/api/v1/users/';
let refresh = false;

axios.interceptors.response.use(resp => resp, async error => {
    if(error.response?.status === 401 && !refresh){
        refresh = true;

        const response = await axios.post('refresh-token', {}, { withCredentials: true});

        if(resp.status === 200) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data['refreshToken']}`; 

            return axios(error.config);    
            }
    }
    refresh = false;
    return error;
});