import fetch from "isomorphic-fetch"

import {
    LOCAL_DATA_ENDPOINT,
    GET_USER_ENDPOINT
} from "./endpoints"

const Storage = window.sessionStorage
const StorageIdentifier = "_mah-propp-data"

// Wrapper for webstorage
class Cache {
    constructor(storage, identifier) {
        this.storage = storage
        this.identifier = identifier
        // storage specific data
        this.cache = {
            user: null,
            answers: null,
            material: null,
            lastUpdated: null
        }
    }
    // Parse JSON data from webstorage
    getData() {
        return JSON.parse(this.storage.getItem(this.identifier))
    }
    // Check if any data is cached
    exists() {
        return Boolean(this.storage.getItem(this.identifier))
    }
    // Refresh the cache
    refresh() {
        if (this.exists()) {
            this.cache = this.getData()
            return
        }

        return fetch(LOCAL_DATA_ENDPOINT)
            .then(res => {
                if (res.ok) {
                    res.json().then(json => {
                        this.cache.answers = json.answers
                        this.cache.material = json.material
                        this.update()
                    })
                } else {
                    console.log("Error", res)
                }
            })
    }
    // Update webstorage with new data
    update() {
        this.storage.setItem(this.identifier, JSON.stringify(this.cache));
    }
    // Update all quiz answers
    updateAnswers(answers) {
        this.cache.answers = answers;
        this.update();
    }
    // Update the user object
    updateUser(user) {
        this.cache.user = user;
        this.update();
    }
    // Update the material object
    updateMaterial(material) {
        this.cache.material = material;
        this.update();
    }
    // Check if a user is stored in the webstorage
    userExists() {
        if (this.exists()) {
            this.cache = this.getData()
            return this.cache.user ? true : false
        }

        return false
    }
    // Check if quiz answers are stored in the cache
    // otherwise fetch them from the local JSON file
    getAnswers(callback) {
        if (this.cache.answers !== null) {
            return callback(this.cache.answers);
        }

        return fetch(LOCAL_DATA_ENDPOINT)
            .then(res => {
                if (res.ok) {
                    res.json().then(json => {
                        this.updateAnswers(json.answers)
                        callback(json.answers)
                    })
                } else {
                    console.log("Error", res)
                }
            })
    }
    // Check if the material are stored in the cache
    // otherwise fetch them from the local JSON file
    getMaterial(callback) {
        if (this.cache.material !== null) {
            return callback(this.cache.material);
        }

        return fetch(LOCAL_DATA_ENDPOINT)
            .then(res => {
                if (res.ok) {
                    res.json().then(json => {
                        this.updateMaterial(json.material)
                        callback(json.material)
                    })
                } else {
                    console.log("Error", res)
                }
            })
    }
    // Check if the user is stored in the cache
    // otherwise fetch the user from the server (by code)
    getUser(code, callback) {
        if (this.cache.user !== null) {
            return callback(this.cache.user);
        }

        return fetch(GET_USER_ENDPOINT + `?code=${code}`)
            .then(res => {
                if (res.ok) {
                    res.json().then(json => {
                        this.updateUser(json.user)
                        callback(json.user)
                    })
                } else {
                    console.log("Error", res)
                }
            })
    }
    // Getter for user
    get user() {
        return this.cache.user
    }
    // Getter for material
    get material() {
        return this.cache.material
    }
    // Getter for quiz answers
    get answers() {
        return this.cache.answers;
    }
}

// Export the cache object (instance)
export default new Cache(Storage, StorageIdentifier);
