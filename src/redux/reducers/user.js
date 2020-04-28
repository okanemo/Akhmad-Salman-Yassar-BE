const initialState = {
    users: [],
    msg: ""
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_USER_PENDING':
            return {
                ...state
            }
        case 'CREATE_USER_REJECTED':
            return {
                ...state,
                msg: action.payload.response.data.msg
            }
        case 'CREATE_USER_FULFILLED':
            return {
                ...state,
                users: action.payload.data.result
            }

        case 'READ_USER_PENDING':
            return {
                ...state
            }
        case 'READ_USER_REJECTED':
            return {
                ...state,
                msg: action.payload.response.data.msg
            }
        case 'READ_USER_FULFILLED':
            return {
                ...state,
                users: action.payload.data.result
            }

        case 'UPDATE_USER_PENDING':
            return {
                ...state
            }
        case 'UPDATE_USER_REJECTED':
            return {
                ...state,
                msg: action.payload.response.data.msg
            }
        case 'UPDATE_USER_FULFILLED':
            return {
                ...state,
                users: action.payload.data.result
            }

        case 'DELETE_USER_PENDING':
            return {
                ...state
            }
        case 'DELETE_USER_REJECTED':
            return {
                ...state,
                msg: action.payload.response.data.msg
            }
        case 'DELETE_USER_FULFILLED':
            return {
                ...state,
                users: action.payload.data.result
            }

        case 'CHANGE_PASSWORD_PENDING':
            return {
                ...state
            }
        case 'CHANGE_PASSWORD_REJECTED':
            return {
                ...state,
                msg: action.payload.response.data.msg
            }
        case 'CHANGE_PASSWORD_FULFILLED':
            return {
                ...state,
                msg: action.payload.data.result
            }
        default:
            return state
    }
}

export default user