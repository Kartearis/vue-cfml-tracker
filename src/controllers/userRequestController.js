import BaseController from "@/controllers/baseController";

// Request controller for authorised requests
// TODO: refactor
export default class UserRequestController extends BaseController{
    token

    constructor(host) {
        super(host)
        this.token = null;
        this.client.interceptors.request.use((config) => {
            config.headers.Authorization =  this.token ? `${this.token}` : '';
            return config;
        });
    }

    /**
     * Sets handler for error 401. Should be called after authStore creation.
     *
     * @param handler handler function. Error will be passed as parameter. Default: empty function.
     */
    setUnAuthHandler(handler = () => {}) {
        this.client.interceptors.response
            .use(
                (response) => response,
                (error) => {
                    if (error.response.status === 401)
                    {
                        handler(error);
                    }
                    throw error;
                })
    }

    setToken(token) {
      this.token = token;
    }

    /**
     * Makes a login request to API
     *
     * @throws Error message on 422 (either wrong email or password)
     *
     * @param login
     * @param {string} password user password
     * @returns {Promise<string>} user bearer token
     */
    async login(login, password) {
        const content = await this.genericPostRequest('/auth/login', {login, password},
            (e) => {
                if (e.response && e.response.status === 422) {
                    throw [e.response.data];
                }
            });
        return content;
    }

    /**
     * Makes a register call to API.
     *
     * @throws "Email already in use" on status 422
     *
     * @param {string} login User login
     * @param {string} password User password
     * @param {string} name User name
     * @param {string} surname User surname
     * @returns {Promise<void>}
     */
    async createUser(login, password, name, surname) {
        await this.genericPostRequest('/users', {
            login, password, name, surname
        }, (e) => {
            if (e.response && e.response.status === 422) {
                throw [e.response.data];
            }
        });
    }

    async getUserData(id) {
        const response = await this.client.get(`/users/${id}`);
        return response.data;
    }

    async getDict(dictName) {
        return this.genericGetRequest(`/dicts/${dictName}`, {});
    }

    async getDefect(id) {
        return this.genericGetRequest(`/errors/${id}`, {});
    }

    async getDefectHistory(id) {
        return this.genericGetRequest(`/errors/${id}/history`, {});
    }



    /**
     * Converts provided Date object to required by API string representation
     *
     * @param {Date} date
     * @returns {string} DateTime in format 'YYYY-MM-DD HH:MM'
     */
    convertDateTime(date) {
        const parts = date.toISOString().split('T');
        parts[1] = parts[1].split('.')[0];
        return `${parts[0]} ${parts[1]}`;
    }
}