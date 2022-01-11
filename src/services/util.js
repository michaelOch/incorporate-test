// export const apiUrl =  'http://localhost:3001';

export const apiUrl =  'https://secure-castle-18129.herokuapp.com';

export function getDataToken () {
    return sessionStorage.getItem("data");
}

export function setDataToken (data) {
    sessionStorage.setItem("data", data);
}

export function removeDataToken (data) {
    sessionStorage.removeItem("data");
}