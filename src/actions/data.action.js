import axios from 'axios';
import { showLoader, hideLoader } from '../helpers/loader';

let baseUrl = 'https://slo-server.herokuapp.com/api/'

if (process.env.NODE_ENV === 'development'){
  baseUrl = 'http://127.0.0.1:8080/api/'
}

export const httpPost = async (url, postBody) => {
  try{
    const { data } = await axios.post(`${baseUrl}${url}`, postBody,{
      headers: { Authorization: localStorage.token }
    });
    return data;
  } catch (error){
    return error
  }
};

export const httpPatch = async (url, postBody) => {
  try{
    const { data } = await axios.patch(`${baseUrl}${url}`, postBody,{
      headers: { Authorization: localStorage.token }
    });
    return data;
  } catch (error){
    return error
  }
};

export const httpDelete = async (url, postBody) => {
  try{
    const { data } = await axios.delete(`${baseUrl}${url}`, postBody,{
      headers: { Authorization: localStorage.token }
    });
    return data;
  } catch (error){
    return error
  }
};

export const httpGet = async (url) => {
  try{
    showLoader()
    console.log('show loader')
    const { data } = await axios.get(`${baseUrl}${url}`, {
      headers: { Authorization: localStorage.token }
    });
    return data;
  } catch (error){
    return error;
  }
};

export const httpPostFormData = async (url, postBody) => {
  try{
    const { data } = await axios.post(`${baseUrl}${url}`, postBody,{
      headers: { Authorization: localStorage.token, 'Content-Type': 'multipart/form-data' }
    });
    return data;
  } catch (error){
    return error
  }
};