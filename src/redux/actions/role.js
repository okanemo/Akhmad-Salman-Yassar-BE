import axios from 'axios'

export const readRole = () => {
    return {
        type: 'READ_ROLE',
        payload: axios({
            method: 'GET',
            url: `http://localhost:3023/role`
        })
    }
}