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

const remove = async (id) => {
    const response = await axios.delete(`${baseUrl}delete/${id}`)
    return response.data
}

const update = async (movementId, newMovement) => {
    const response = await axios.put(`${baseUrl}modify/${movementId}`, { newMovement })
    return response.data
}


export default { getAll, create, remove, update }