import axios from 'axios';
import constant from  './constant'
import swal from 'sweetalert';
const apiUrl = constant.API_URL;

export const ApiServices = {
callServiceGet: async (url, id=null,data = null, headers = {}) => {
  try {

    const newUrl=id==null?apiUrl+url:apiUrl+url+id
    console.log("newUrl",newUrl)
    const response = await axios({
      url:newUrl,
      method:'GET',
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error('Axios error:', error);
    throw error;
  }
},

 callServicePostWithFormData:async (url, data = null, headers = {}) => {
  try {
    const newUrl=apiUrl+url
console.log("newUrl",newUrl)
    const response = await axios({
      url:newUrl,
      method:'Post',
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    // console.error('Axios error:', error);
    // console.error('Response', response);

    // throw error;
        swal("error",error.message,"error")

  }
},
callServicePutWithFormData:async (url,id, data = null, headers = {}) => {
  try {
    const newUrl=apiUrl+url+id
    const response = await axios({
      url:newUrl,
      method:'Put',
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error('Axios error:', error);
    throw error;
  }
},

callServiceDelete: async (url,id,data = null, headers = {}) => {
  try {
    const newUrl=apiUrl+url+id
    const response = await axios({
      url:newUrl,
      method:'Delete',
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error('Axios error:', error);
    throw error;
  }
}
}