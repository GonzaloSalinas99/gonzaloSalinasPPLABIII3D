import Anuncio from "./anuncio.js";

export default class Anuncio_Mascota extends Anuncio{
    constructor(id,titulo,transaccion="ventas", descripcion, precio, animal, raza, nacimiento, vacuna){
        super(id,titulo,transaccion="ventas", descripcion, precio);
        this.animal=animal;
        this.raza=raza;
        this.nacimiento=nacimiento;
        this.vacuna=vacuna;
    }
}