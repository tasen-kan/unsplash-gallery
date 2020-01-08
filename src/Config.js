const API_URL = 'https://api.unsplash.com';
const ACCESS_KEY = 'Client-ID 6d93584bb396648cc68b365b5ad845e7908a7469a3fbc07c24a03dbeacad9c83';
const ACCESS_TOKEN = 'Bearer 554efff77138c421914d81ca6d494658ddacca50608a09e82b1ab4fefca9c369';
const USER_NAME = 'tasenkan';

class Config {

    static getAPIUrl(){
        return API_URL
    }

    static getUserName(){
        return USER_NAME
    }

    static getAccessKey(){
        return ACCESS_KEY
    }

    static getAccessToken(){
        return ACCESS_TOKEN;
    }
}

export default Config;
