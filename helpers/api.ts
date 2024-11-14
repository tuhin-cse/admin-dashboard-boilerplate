
import axios from "axios"

//apply base url for axios
const API_URL = process.env.backend_url + "/api"

const axiosApi = axios.create({
    baseURL: API_URL,
    validateStatus: function (status) {
        return status >= 200 && status < 600 // default
    },
})

axiosApi.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
)

const updateRequest = (url, data) => {
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('token') ?? ''}`
    const variables = url.match(/:[a-zA-Z]+/g)
    if (variables?.length) {
        variables.forEach(variable => {
            url = url.replace(variable, data[variable.replace(':', '')])
            delete data[variable.replace(':', '')]
        })
    }
    return {url, data}
}

export async function get(url, data, config = {}) {
    const {url: newUrl, data: newData} = updateRequest(url, data)
    return await axiosApi.get(newUrl, {...config, params: newData}).then(response => response.data)
}

export async function post(url, data, config = {}) {
    axiosApi.defaults.headers.common["Content-Type"] = 'application/json'
    const {url: newUrl, data: newData} = updateRequest(url, data)
    return axiosApi
        .post(newUrl, newData, {...config})
        .then(response => response.data)
}


export async function postForm(url, data, config = {}) {
    axiosApi.defaults.headers.common["Content-Type"] = 'multipart/form-data'
    const {url: newUrl, data: newData} = updateRequest(url, data)
    return axiosApi
        .post(newUrl, convertToFormData(newData), {...config})
        .then(response => response.data)
}

export async function put(url, data, config = {}) {
    const {url: newUrl, data: newData} = updateRequest(url, data)
    return axiosApi
        .put(newUrl, newData, {...config})
        .then(response => response.data)
}

export async function patch(url, data, config = {}) {
    axiosApi.defaults.headers.common["Content-Type"] = 'application/json'
    const {url: newUrl, data: newData} = updateRequest(url, data)
    return axiosApi
        .patch(newUrl, newData, {...config})
        .then(response => response.data)
}

export const patchForm = async (url, data, config = {}) => {
    axiosApi.defaults.headers.common["Content-Type"] = 'multipart/form-data'
    const {url: newUrl, data: newData} = updateRequest(url, data)
    return axiosApi
        .patch(newUrl, convertToFormData(newData), {...config})
        .then(response => response.data)
}



export async function del(url, data, config = {}) {
    const {url: newUrl, data: newData} = updateRequest(url, data)
    return await axiosApi
        .delete(newUrl, {...config, params: newData})
        .then(response => response.data)
}


export const convertToFormData = (data) => {
    const formData = new FormData()
    for (const key in data) {
        if(data[key] instanceof Array) {
            data[key].forEach((item) => {
                formData.append(key, item)
            })
            if(data[key].length === 0) {
                formData.append(key, "")
            }
            continue
        }
        if(typeof data[key] !== "undefined") {
            formData.append(key, data[key])
        }

    }
    return formData
}