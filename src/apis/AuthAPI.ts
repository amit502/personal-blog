import axios from "axios";
import { ILogin } from "../types/AuthTypes";

export const login = async (data:ILogin) => {
    return await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_BASE_URL,
        url:`auth/login`,
        data: data
    })
}

export const logout = async () => {
    return await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_BASE_URL,
        url:`auth/logout`,
    })
}

export const getAccessToken = async (refreshToken: string|null|undefined) => {
    return await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_BASE_URL,
        url:`auth/token`,
        data: {refreshToken: refreshToken}
    })
}

export const fetchUserAuthorization = async () => {
    return await axios({
        method: 'GET',
        baseURL: process.env.REACT_APP_BASE_URL,
        url:`auth/fetchUserAuthorization`,
    })
}

export const signUp = async (data:any) => {
    return await axios({
        method: 'POST',
        baseURL: process.env.REACT_APP_BASE_URL,
        url:`auth/signUp`,
        data: data,
    })
}

// export const changePassword = async (data: any) => {
//     return await axios({
//         method: 'POST',
//         baseURL: process.env.REACT_APP_BASE_URL,
//         url:`auth/changePassword`,
//         data: data,
//     })
// }

// export const resetPasswordOTP = async (data: any) => {
//     return await axios({
//         method: 'POST',
//         baseURL: process.env.REACT_APP_BASE_URL,
//         url:`auth/resetPasswordOTP`,
//         data: data,
//     })
// }

// export const confirmResetPassword = async (data: any) => {
//     return await axios({
//         method: 'POST',
//         baseURL: process.env.REACT_APP_BASE_URL,
//         url:`auth/confirmResetPassword`,
//         data: data,
//     })
// }

// export const resetPassword = async (data: any) => {
//     return await axios({
//         method: 'POST',
//         baseURL: process.env.REACT_APP_BASE_URL,
//         url:`auth/resetPassword`,
//         data: data,
//     })
// }