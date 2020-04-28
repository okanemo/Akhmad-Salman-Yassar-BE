import axios from 'axios'

export const login = (data) => {
    return {
        type: 'LOGIN',
        payload: axios({
            method: 'POST',
            url: `http://localhost:3023/user/login`,
            data: data
        })
    }
}

export const logout = () => {
    return {
        type: 'LOGOUT'
    }
}