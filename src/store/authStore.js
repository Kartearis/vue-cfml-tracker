import {defineStore} from 'pinia';
import createPinia from "@/controllers/piniaSingleton";
import UserRequestController from "@/controllers/userRequestController";
// import router from "@/router";

const pinia = createPinia();

/**
 * Date reviver function for json.parse
 *
 * @param key
 * @param value
 * @returns {Date|*}
 */
function dateTimeReviver(key, value) {
    if (typeof value === 'string') {
        let reISO = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i;
        if (reISO.test(value)) {
            return new Date(value);
        }
    }
    return value;
}

export function fileSizeFormatter(bytes) {
    switch (true) {
        case bytes > 1000000:
            return `${(bytes / 1000000).toFixed(2)} MB`;
        case bytes > 1000:
            return `${(bytes / 1000).toFixed(2)} KB`;
        default: return `${bytes} B`;
    }
}

/**
 * Generates default userdata object. Fields with displayable: false will not be displayed with other user info
 * Label is human-readable field title
 * TODO: refactor to class with field iterator (for view) and field getters/setters (for others)
 *
 * @type {() => Record<string, {value: unknown, label: string} | {displayable: false, value: unknown}>}
 */
const getDefaultUserData = () => ({
    id: {
        value: "",
        displayable: false
    },
    login: {
        value: "",
        label: "Имя пользователя"
    },
    name: {
        value: "",
        label: "Имя"
    },
    surname: {
        label: "Фамилия",
        value: ""
    },
    token: {
        displayable: false,
        value: null
    }
});


// TODO: Refactor those functions to storageController class
function buildLabel(prefix) {
    return `${prefix}--user`;
}

// Function to read local user from storage. Ugly, all this mess should be remade into userData class
function getLocalUser(prefix) {
    let user = localStorage.getItem(buildLabel(prefix));
    if (!user)
        return getDefaultUserData();
    user = JSON.parse(user, dateTimeReviver);
    const defUser = getDefaultUserData();
    // restore formatters
    Object.keys(user).forEach((key) => {
        if (defUser[key].formatter !== undefined)
            user[key].formatter = defUser[key].formatter;
    })
    return user;
}

function setLocalUser(prefix, data) {
    // console.log('Save user');
    localStorage.setItem(buildLabel(prefix), JSON.stringify(data));
}

// TODO: Should handle requests failed because of 'unauthorized'
export const useAuthStore = defineStore('auth', {
    state: () => ({
        userRequestController: new UserRequestController('http://localhost/rest/controller/'),
        user: getDefaultUserData()
    }),
    getters: {
        isAuthorized: (state) => state.user?.token.value !== undefined && state.user.token.value !== null
    },
    actions: {
        /**
         * Authenticate user. Returns object with result data for view
         *
         * @param {string} email
         * @param {string} password
         * @returns {Promise<{success: boolean, errors: string[]}>}
         */
        async authenticate(email, password) {
            try {
                const data = await this.userRequestController.login(email, password);
                this.user.token.value = data.token;
                this.user.id.value = data.id;
                this.userRequestController.setToken(data.token);
                await this.getUserData(data.id);
                return {success: true, errors: ["Logged in!"]}
            }
            catch (e) {
                return {success: false, errors: e};
            }
        },

        /**
         * Register user. Returns object with results for view.
         *
         * @param login
         * @param {string} password
         * @param {string} name
         * @param surname
         * @returns {Promise<{success: boolean, errors: string[]}>}
         */
        async register(login, password, name, surname) {
            try {
                await this.userRequestController.createUser(login, password, name, surname);
                return {success: true, errors: ["Registered!"]};
            }
            catch (e) {
                return {success: false, errors: e};
            }
        },

        /**
         * Make a logout call to API. Caller expected to redirect user afterwards
         *
         * @returns {Promise<void>}
         */
        async logout() {
            this.clearAuthData();
        },

        clearAuthData() {
            this.user = getDefaultUserData();
            this.userRequestController.setToken(null);
        },

        async getUserData(userId) {
            try {
                const userData = await this.userRequestController.getUserData(userId);
                this.user.id.value = userId;
                this.user.surname.value = userData.surname;
                this.user.name.value = userData.name;
                this.user.login.value = userData.login;
            }
            catch (e) {
                console.debug(e);
            }
        },

        /**
         * Attempt to recover user data from localhost
         */
        tryRememberUser() {
            this.user = getLocalUser('vue-cfml-dt');
            if (this.user.token.value)
                this.userRequestController.setToken(this.user.token.value);
            // Pull user data updates
            this.getUserData(this.user.id.value);
        },
    },
});

const store = useAuthStore(pinia);
store.userRequestController.setUnAuthHandler(() => {
    store.clearAuthData();
});
store.tryRememberUser();
store.$subscribe((
    mutation,
    state
) => setLocalUser('vue-cfml-dt', state.user), {detached: true});

