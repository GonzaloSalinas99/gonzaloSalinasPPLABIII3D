export const obtenerLista = () => {
    return JSON.parse(localStorage.getItem("lista")) || [];
}

export const $ = elemento => {
    return document.getElementById(elemento);
}

export const create = elemento => {
    return document.createElement(elemento);
}