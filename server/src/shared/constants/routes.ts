export const ROUTES = {
    AUTH: {
        REGISTER: '/register',
        VERIFY_OTP: '/verify-otp',
        RESEND_OTP: '/resend-otp',
        LOGIN: '/login',
        LOGOUT: '/logout',
        REFRESH: '/refresh'
    },
    USER: {
        LINK: '/url/short',
        GET_LINK: '/:shortCode',
        GET_ALL: '/url'
    }
}