const isLocal = window.location.hostname == "localhost" || window.location.hostname == "127.0.0.1"
const baseURL = "http://146.185.170.62"

// Endpoints for HTTP requests
export const LOCAL_DATA_ENDPOINT = "/data.json"
export const SUBMIT_QUIZ_ENDPOINT = isLocal ? "http://127.0.0.1:5000/api/quiz" : `${baseURL}/api/quiz`
export const GET_USER_ENDPOINT = isLocal ? "http://127.0.0.1:5000/api/user" : `${baseURL}/api/user`
export const CREATE_USER_ENDPOINT = isLocal ? "http://127.0.0.1:5000/api/user" : `${baseURL}/api/user`
