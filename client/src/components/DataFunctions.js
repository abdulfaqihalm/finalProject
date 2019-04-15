import axios from 'axios'

export const upload = file => {
    return axios
        .post('/upload', file)
        .then(response => {
            return response.data
        })
        .catch(error => {
            if(error.response) {
                // The request was made and server responded 
                // but the respond in range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
            }else if (error.request) {
                // The request was made but server didnt respond
                console.log(error.request);
            } else {
                // Something happened before the request 
                console.log('Error', error.message);
            }
        })
}

export const createMask = annotData => {
    return axios
        .get('/extract-mask/' + annotData)
        .then(response => {
            return response.data
        })
        .catch(error => {
            if(error.response) {
                console.log('Axios: Server responded w/ error');
                console.log(error.response.data);
                console.log(error.response.status);
            }else if (error.request) {
                console.log('Axios: Cant retrieve response');
                console.log(error.request);
            } else {
                console.log('Axios: Something happen'); 
                console.log('Error', error.message);
            }
        })
}

export const classify = fileName => {
    return axios
        .get('/classify/' + fileName)
        .then(response => {
            console.log('Classifier result : ' + response.data);
            return response.data
        })
        .catch(error => {
            if(error.response) {
                console.log('Axios: Classify Server responded w/ error');
                console.log(error.response.data);
                console.log(error.response.status);
            }else if (error.request) {
                console.log('Axios: Cant retrieve response');
                console.log(error.request);
            } else {
                console.log('Axios: Something happen'); 
                console.log('Error', error.message);
            }
        })
}
