const directorPrefix = "/director"
export const ROUTES = {
    HOME: "/",
    AUTH: {
        REGISTER: "/user/register",
        SET_PROFILE: "/user/set-profile",
        DIRECTOR: {
            LOGIN: "/director/login",
            FORGET_PASSWORD: "/director/forget-password",
            CHANGE_PASSWORD: "/director/change-password",
        }
    },
    PAYMENT: "/user/payment-section",
    PAYMENT_SUCCESS: "/user/payment-success",
    PAYMENT_FAILED: "/user/payment-failed",
    PAYMENT_INVOICE: "/user/payment-invoice",
    UNAUTHORIZED: "/unauthorized",
    DASHBOARD: {
        SUPERADMIN: "/superadmin/dashboard",
        USER: "/user/dashboard",
        DIRECTOR: {
            HOME: `${directorPrefix}/dashboard`,
            RANGE_LIST: `${directorPrefix}/range-list`
        },
        REGISTRAR: "/registrar/dashboard",
    },
    PROFILE: "/profile",
    SETTINGS: "/settings",
};