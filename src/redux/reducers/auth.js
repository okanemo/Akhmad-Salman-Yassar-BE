const initialState = {
    isAuthenticated: false,
    profile: {},
    msg: ""
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_PENDING':
            return {
                ...state,
                isAuthenticated: false,
                profile: {},
                msg: ""
            }
        case 'LOGIN_REJECTED':
            return {
                ...state,
                isAuthenticated: false,
                profile: {},
                msg: action.payload.response.data.msg
            }
        case 'LOGIN_FULFILLED':
            return {
                ...state,
                isAuthenticated: true,
                profile: action.payload.data.result
            }
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                profile: {},
                msg: ""
            }
        default:
            return state
    }
}