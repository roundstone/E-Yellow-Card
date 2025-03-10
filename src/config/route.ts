const directorPrefix = "/director";
const registrarPrefix = "/registrar";
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
            RANGE_LIST: `${directorPrefix}/range-list`,
            RANGE_DISTRIBUTION: `${directorPrefix}/range-distribution`,
        },
        REGISTRAR: {
            HOME: `${registrarPrefix}/dashboard`,
            MANAGE_VACCINES: `${registrarPrefix}/manager-vaccines`,
            MANAGE_VACCINES_HISTORY: `${registrarPrefix}/manager-vaccines/vaccination-history`,
            ASSIGN_YELLOW_CARD: `${registrarPrefix}/assign-yellow-card`,
            USER_LIST: `${registrarPrefix}/user-list`,
            ACTIVITY_LOG: `${registrarPrefix}/activity-log`,
        },
    },
    PROFILE: "/profile",
    SETTINGS: "/settings",
};




