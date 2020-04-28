import axios from 'axios'

export const createUser = (data) => {
    return {
        type: 'CREATE_USER',
        payload: axios({
            method: 'POST',
            url: `http://localhost:3023/user`,
            data: data
        })
    }
}

export const readUser = () => {
    return {
        type: 'READ_USER',
        payload: axios({
            method: 'GET',
            url: `http://localhost:3023/user`
        })
    }
}

export const updateUser = (data, id) => {
    return {
        type: 'UPDATE_USER',
        payload: axios({
            method: 'PATCH',
            url: `http://localhost:3023/user/${id}`,
            data: data
        })
    }
}

export const deleteUser = (id) => {
    return {
        type: 'DELETE_USER',
        payload: axios({
            method: 'DELETE',
            url: `http://localhost:3023/user/${id}`
        })
    }
}

export const changePassword = (data, id) => {
    return {
        type: 'CHANGE_PASSWORD',
        payload: axios({
            method: 'PATCH',
            url: `http://localhost:3023/user/change-password/${id}`,
            data: data
        })
    }
}