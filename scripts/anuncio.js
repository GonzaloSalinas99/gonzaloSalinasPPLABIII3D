export default class Anuncio{
    constructor(id,titulo,transaccion="ventas", descripcion, precio){
        this.id=id;
        this.titulo=titulo;
        this.transaccion=transaccion;
        this.descripcion=descripcion;
        this.precio=precio;
    }
}