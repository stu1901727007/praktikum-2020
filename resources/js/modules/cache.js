/**
 *
 */
class CacheApi {
    /**
     * Cache constructor
     */
    constructor() {

        this.useStorage = this.isStorageAvailable();

        if (this.useStorage) {
            this.cacheApi = 'api-calls';

            if (localStorage.getItem(this.cacheApi) === null) {
                localStorage.setItem(this.cacheApi, '{}');
            }

            console.log('Info[localStorage кеш е активен!]');

        } else {
            console.log('Warning[Не се поддържа localStorage и няма да се използва!]');
        }
    }

    /**
     *
     * @param criteria
     * @returns {string|null}
     */
    getSearch(criteria) {

        if (!this.useStorage)
            return null;

        const hash = md5(JSON.stringify(criteria));
        const cache = JSON.parse(this.get(this.cacheApi));

        return cache[hash] !== undefined ? cache[hash] : null;
    }

    /**
     *
     * @param criteria
     * @param data
     * @returns {boolean}
     */
    saveSearch(criteria, data) {

        if (!this.useStorage)
            return true;

        const hash = md5(JSON.stringify(criteria));
        let cache = JSON.parse(this.get(this.cacheApi));

        cache[hash] = data;

        try {
            this.set(this.cacheApi, JSON.stringify(cache));
        } catch (e) {
            this.clear();
        }
        return true
    }

    /**
     *
     * @param key
     * @returns {boolean}
     */
    has(key) {

        if (!this.useStorage)
            return false;

        return localStorage.getItem(key) === null ? false : true;
    }

    /**
     *
     * @param key
     * @param item
     * @returns {void|CacheApi}
     */
    set(key, item) {
        if (!this.useStorage)
            return localStorage.setItem(key, item);

        return this;
    }

    /**
     *
     * @param key
     * @returns {string|null}
     */
    get(key) {

        if (!this.useStorage)
            return null;

        return localStorage.getItem(key);
    }

    /**
     *
     * @param key
     */
    remove(key) {
        return localStorage.removeItem(key);
    }

    /**
     *
     * @returns {boolean}
     */
    clear() {
        localStorage.clear();

        return true;
    }

    /**
     *
     * @returns {boolean}
     */
    isStorageAvailable() {

        try {
            var storage = window['localStorage'],
                x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
        }

        return false;
    }
}
