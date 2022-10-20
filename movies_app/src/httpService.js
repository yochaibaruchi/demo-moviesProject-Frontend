import axios from "axios";






const getdataWithAuth = async (url) => {

    const token = sessionStorage["token"]
    const authAxios = axios.create({
        baseURL: "http://localhost:3000/api",
        headers: {
            "x-access-token": token
        }
    })

    const { data } = await authAxios.get(url)
    return data

}

const Auth = async () => {
    const token = sessionStorage["token"]
    const authAxios = axios.create({
        baseURL: "http://localhost:3000/api",
        headers: {
            "x-access-token": token
        }
    })

    const { data } = await authAxios.get('/users/Auth')
    return data
}

const addData = async (url, obj) => {

    const { data } = await axios.post(url, obj)
    return data

}


const updateData = async (url, obj) => {
    const { data } = await axios.put(url, obj)
    return data
}


const deleteData = async (url) => {
    const { data } = await axios.delete(url)
    return data
}



const httpService = { getdataWithAuth, addData, updateData, deleteData, Auth }

export default httpService