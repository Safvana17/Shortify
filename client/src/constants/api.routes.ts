export const API_ROUTES = {
    AUTH: {
        REGISTER: '/auth/register',
        VERIFY_OTP: '/auth/verify-otp',
        RESEND_OTP: '/auth/resend-otp',
        LOGIN: '/auth/login',
        LOGOUT: '/auth/logout',
        REFRESH: '/auth/refresh',
    },
    USER: {
        LINK: {
            SHORT: '/user/url/short',
            GET_LINK: (shortCode: string) =>
                `/user/url/${shortCode}`,
            GET_ALL: '/user/url'
        }
    }
}