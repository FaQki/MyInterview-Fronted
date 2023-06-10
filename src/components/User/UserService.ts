import axios from 'axios' // axios es un modulo para poder hacer peticiones
import { User } from './User'

const api ='http://localhost:3000';

export const getUsers = async () => {

    return await axios.get<User[]>(`${api}/userform`)
    
}

export const createUser = async (user: User) => {

    return await axios.post(`${api}/userform`, user)
    
}

export const getOneUser = async (id: string) => {

    return await axios.get<User>(`${api}/userform/${id}`)
    
}

export const updateUser = async (id: string, user: User) => {

    return await axios.put<User>(`${api}/userform/${id}`, user)
    
}

export const deleteUser = async (id: string) => {

    return await axios.delete<User>(`${api}/userform/${id}`)
    
}