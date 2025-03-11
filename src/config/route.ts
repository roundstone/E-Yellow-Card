const directorPrefix = "/director";
const registrarPrefix = "/registrar";
const adminPrefix = "/admin";
export const ROUTES = {
    HOME: "/",
    AUTH: {
        PROFILE_TYPE: "/user/profile-type",
        REGISTER: "/user/register",
        SET_PROFILE: "/user/set-profile",
        DIRECTOR: {
            LOGIN: "/director/login",
            FORGET_PASSWORD: "/director/forget-password",
            CHANGE_PASSWORD: "/director/change-password",
        },
        ADMIN: {
            SET_PROFILE: "/admin/set-profile"
        }
    },
    PAYMENT: "/user/payment-section",
    PAYMENT_SUCCESS: "/user/payment-success",
    PAYMENT_FAILED: "/user/payment-failed",
    PAYMENT_INVOICE: "/user/payment-invoice",
    UNAUTHORIZED: "/unauthorized",
    DASHBOARD: {
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
        SUPERADMIN: {
            HOME: `${adminPrefix}/dashboard`,
            IMPORT_APPLICATIONS: `${adminPrefix}/import-applications`,
            LOCAL_GOVT_LIST: `${adminPrefix}/local-govt-list`,
            REMITA_TRANSACTIONS: `${adminPrefix}/remita-transactions`,
            STATE_LIST: `${adminPrefix}/state-list`,
            MANAGE_PORTS: `${adminPrefix}/manage-ports`,
            VACCINES: `${adminPrefix}/vaccines`,
            UPDATE_VACCINE_INVENTORY: `${adminPrefix}/update-vaccine-inventory`,
            USERS: `${adminPrefix}/users`,
            YELLOW_CARD_RANGE: `${adminPrefix}/yellow-card-range`,
            ALL_EVENTS_HISTORY: `${adminPrefix}/all-events-history`,
            VERIFY_YELLOW_CARDS: `${adminPrefix}/verify-yellow-cards`,
          },
    },
    PROFILE: "/profile",
    SETTINGS: "/settings",
};




