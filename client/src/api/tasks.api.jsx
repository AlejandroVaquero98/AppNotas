import axios from 'axios'; 

const tasksApi = axios.create ({
    baseURL : 'http://127.0.0.1:8000/tasks/api/v1/tasks/'
})


//peticion al backend para mostrar todas las tareas
export const getAllTasks = () => tasksApi.get('/');

export const getTask = (id) => tasksApi.get(`/${id}/`)

//peticion al backend para crear tareas
export const createTask = (task) => tasksApi.post('/', task); 

// peticion al backend para eliminar tareas 
export const deleateTask = (id) => tasksApi.delete(`/${id}/`); 

//petcion al backend para actualizar, donde le pasamos la id de la tarea y en  task los campos que vamos actualizar
export const updateTask = (id, task) => tasksApi.put(`/${id}/`, task);
