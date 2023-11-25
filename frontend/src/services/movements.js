import axios from 'axios'

const baseUrl = 'http://localhost:8080/api/movements/'

const getAll = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}

const create = async (object) => {
    const request = await axios.post(`${baseUrl}add`, object)
    return request.data
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (obj) => {
    const request = axios.put(`${baseUrl}/${obj.id}`, obj)
    return request.then(response => response.data)
}


export default { getAll, create, remove, update }