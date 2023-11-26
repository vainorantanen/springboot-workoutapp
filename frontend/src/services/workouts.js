import axios from 'axios'

const baseUrl = 'http://localhost:8080/api/workouts/'

const getAll = async () => {
    const request = await axios.get(baseUrl)
    return request.data
}

const create = async (object) => {
    const request = await axios.post(`${baseUrl}add`, object)
    return request.data
}

const addMovement = async (object) => {
    console.log('sending data: ', object)
    const request = await axios.post(`${baseUrl}addMovementToWorkout/${object.workoutId}`, object)
    console.log('receiving ', request.data)
    return request.data
}

const remove = async (id) => {
    const response = await axios.delete(`${baseUrl}delete/${id}`)
    return response.data
}

const updateDescription = (workoutId, newDescription) => {
    const request = axios.put(`${baseUrl}modifyDescription/${workoutId}`, { newDescription })
    return request.then(response => response.data)
}


export default { getAll, create, remove, updateDescription, addMovement }