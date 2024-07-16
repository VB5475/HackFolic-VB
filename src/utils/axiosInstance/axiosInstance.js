import axios from "axios";

export const API = axios.create({
  baseURL: "url",
  timeout: 10000,
});

// example to write the axios functions

export const getMethod = async (endpoint) => {
  try {
    const res = await API.get(endpoint);
    console.log(res)
if(res.data.length>0) {return {
  success: true,
  data: res.data,
  error: null,
}} else { throw error}
   
  } catch (error) {
    return {
      success: false,
      data: null, // Set data to null in case of error
      error: "data not found",
    };
  }
};

export const postMethod = async (endpoint,data) => {
  try {
    const res = await API.post(endpoint,data);
    console.log(res)
 return {
  success: true,
  data: res.data,
  error: null,
}
   
  } catch (error) {
    return {
      success: false,
      data: null, // Set data to null in case of error
      error: "data not found",
    };
  }
};

export const getUsers = async (userType,endpoint) => {
  try {
    const res = await API.get(endpoint);
    console.log(res)
    console.log(res.data)
 return {
  success: true,
  data: res.data,
  error: null,
}
   
  } catch (error) {
    return {
      success: false,
      data: null, // Set data to null in case of error
      error: `${userType} not found`,
    };
  }
};

export const getApplication = async (endpoint) => {
  try {
    const res = await API.get(endpoint);
    console.log(res)
    console.log(res.data)
 return {
  success: true,
  data: res.data,
  error: null,
}
   
  } catch (error) {
    return {
      success: false,
      data: null, // Set data to null in case of error
      error: `data not found`,
    };
  }
};

export const updateApplication = async (endpoint,data) => {
  try {
    const res = await API.patch(endpoint,data);
    console.log(res)
    console.log(res.data)
 return {
  success: true,
  data: res.data,
  error: null,
}
   
  } catch (error) {
    return {
      success: false,
      data: null, // Set data to null in case of error
      error: `data not found`,
    };
  }
};

export const deleteUser = async (endpoint) => {
  try {
    const res = await API.delete(endpoint);
    console.log(res)
    console.log(res.data)
 return {
  success: true,
  data: res.data,
  error: null,
}
   
  } catch (error) {
    return {
      success: false,
      data: null, // Set data to null in case of error
      error: `data not found`,
    };
  }
};