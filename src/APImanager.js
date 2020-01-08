import axios from 'axios'
import Config from './Config'
const API_URL = Config.getAPIUrl();

const serialize = (obj) => {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

class APImanager {

    static getPhotos(payload, handleCallback) {

        axios.get(`${API_URL}/photos?${serialize(payload)}`,{
                headers:{
                    'Authorization': `${Config.getAccessToken()}`
                }
            })
            .then(response => {
                handleCallback(response);
            })
            .catch(error => {
                handleCallback(error);
            })
    }

    static getPhoto(payload, handleCallback) {
        axios.get(`${API_URL}/photos/${payload.id}`,{
                headers:{
                    'Authorization': `${Config.getAccessToken()}`
                }
            })
            .then(response => {
                handleCallback(response);
            })
            .catch(error => {
                handleCallback(error);
            })
    }

    static getRelativePhotos(payload, handleCallback) {

        axios.get(`${API_URL}/photos/${payload.id}/related?${serialize(payload.params)}`,{
            headers:{
                'Authorization': `${Config.getAccessKey()}`
            }
        })
            .then(response => {
                handleCallback(response);
            })
            .catch(error => {
                handleCallback(error);
            })
    }

    static getLikedPhotos(payload, handleCallback) {

        axios.get(`${API_URL}/users/${Config.getUserName()}/likes?${serialize(payload)}`,{
            headers:{
                'Authorization': `${Config.getAccessToken()}`
            }
        })
            .then(response => {
                handleCallback(response);
            })
            .catch(error => {
                handleCallback(error);
            })
    }

    static likePhoto(payload, handleCallback) {

        axios.post(`${API_URL}/photos/${payload.id}/like`,{}, {
                headers:{
                    'Authorization': `${Config.getAccessToken()}`,
                }
            })
            .then(response => {
                handleCallback(response);
            })
            .catch(error => {
                handleCallback(error);
            })
    }

    static unLikePhoto(payload, handleCallback) {

        axios.delete(`${API_URL}/photos/${payload.id}/like`, {
                headers:{
                    'Authorization': `${Config.getAccessToken()}`,
                }
            })
            .then(response => {
                handleCallback(response);
            })
            .catch(error => {
                handleCallback(error);
            })
    }

    static searchPhoto(payload, handleCallback) {

        axios.get(`${API_URL}/search/photos?${serialize(payload)}`,{
                headers:{
                    'Authorization': `${Config.getAccessKey()}`,
                }
            })
            .then(response => {
                handleCallback(response);
            })
            .catch(error => {
                handleCallback(error);
            })
    }
}

export default APImanager;
