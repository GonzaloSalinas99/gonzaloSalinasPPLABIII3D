import Anuncio_Mascota from "./anuncioMascota.js";
import {$, create, obtenerLista} from './utils.js'

const $form = document.getElementsByTagName("form")[0];
const listaMascotas = JSON.parse(localStorage.getItem("lista")) || [];
const onLoad = () => {
    handleForm();
    cargando();
}

console.log(listaMascotas);

    window.addEventListener("click",(e)=>{
    
        if(e.target.matches("td"))
        {
            let id = e.target.parentElement.id;
            
            CargarFormulario(listaMascotas.find((mascota)=>mascota.id == id));

            
            

        }
        else if(e.target.matches("#btnDelete")){
            handlerDelete(parseInt($form.txtId.value));
            resetForm();    
        }
        else if(e.target.matches("#btnCancel")){
            resetForm();        
        } 
    })


const handleForm = () => {
    $form.addEventListener('submit', e => {
        e.preventDefault();
        const {txtTitulo, txtDesc, txtPrecio, rdoAnimal, txtId, txtRaza, fecha, vacuna} = $form;
        const anuncio = new Anuncio_Mascota(txtId.value,txtTitulo.value,null,txtDesc.value, txtPrecio.value, rdoAnimal.value, txtRaza.value, fecha.value, vacuna.value);
        if(anuncio.id==""){
            anuncio.id = obtenerMaxId();
            handleCreate(anuncio);
        }
        else{
            anuncio.id = parseInt(anuncio.id);
            handlerUpdate(anuncio);
        }
        resetForm();
    })



}



function CargarFormulario(mascota){

    const botonAgregar = document.getElementById("btnAgregar");
    botonAgregar.hidden = true;

    const botonModificar = document.getElementById("btnModificar");
    botonModificar.hidden = false;

    const botonEliminar = document.getElementById("btnDelete");
    botonEliminar.hidden = false;

    const botonCancelar = document.getElementById("btnCancel");
    botonCancelar.hidden = false;


    const {txtTitulo, txtDesc, txtPrecio, rdoAnimal, txtId, txtRaza, fecha, vacuna} = $form;
    txtId.value = mascota.id;
    txtTitulo.value = mascota.titulo;
    txtDesc.value = mascota.descripcion;
    rdoAnimal.value = mascota.animal;
    txtPrecio.value = mascota.precio;    
    txtRaza.value = mascota.raza;
    fecha.value = mascota.nacimiento;
    vacuna.value = mascota.vacuna;
    
}


const obtenerMaxId = () => {
    const lista = obtenerLista();
    lista.sort((a,b) => a-b);
    return parseInt(lista[lista.length-1]?.id)+1 || 1;
}

//---------CRUD----------
//ALTA
const handleCreate = anuncio => {
    const lista = obtenerLista();
    lista.push(anuncio);
    actualizarLocalStorage(lista);
    cargando();
}
//MODIFICACION
const handlerUpdate = (mascotaEditada)=>{

    // console.log(anuncioEditado);
    let indice = listaMascotas.findIndex((mascota)=>{
        return mascota.id == mascotaEditada.id;
    })

    listaMascotas.splice(indice, 1);
    listaMascotas.push(mascotaEditada);

    actualizarLocalStorage(listaMascotas);
    cargando();
    // console.log(anuncios);
};

//BORRADO
const handlerDelete = (id) => {

    if (confirm("Quiere eliminar el anuncio ?")) {
        const indice = listaMascotas.findIndex((mascota)=>{
            return mascota.id == id;
        })

        listaMascotas.splice(indice, 1);

        actualizarLocalStorage(listaMascotas);
        cargando();
    }
};



//CREACION DE TABLA
const crearThead = (item) => {
    const $thead = create("thead");
    const $tr = create("tr");
    for(const key in item){
        if(key!="id"){
            const $th = create("th");
            $th.textContent = key;
            $tr.appendChild($th);
        }
    }
    $thead.appendChild($tr);
    return $thead;
}

const crearTbody = (lista) => {
    const $tbody = create("tbody");
    lista.forEach((element,index) => {
        const $tr = create("tr");
        for(const key in element){
            if(key=="id"){
                $tr.setAttribute("id",element[key]);
            }else{
                const $td = create("td");
                $td.textContent = element[key];
                $tr.appendChild($td);
            }
        }
        if(index%2){
            $tr.style.opacity = "0.75"
        }
        $tbody.appendChild($tr);
    });
    return $tbody;
}

const crearTabla = (lista) => {
    const $tabla = $('tabla');
    $tabla.appendChild(crearThead(lista[0]));
    $tabla.appendChild(crearTbody(lista));
}


function resetForm(){
    $form.reset();
    $form.txtId.value = '';
    
    const botonAgregar = document.getElementById("btnAgregar");
    botonAgregar.hidden = false;


    const botonModificar = document.getElementById("btnModificar");
    botonModificar.hidden = true;

    const botonEliminar = document.getElementById("btnDelete");
    botonEliminar.hidden = true;

    const botonCancelar = document.getElementById("btnCancel");
    botonCancelar.hidden = true;
}




const actualizarTabla = () => {
    const $tabla = $('tabla');
    let data = obtenerLista();
    while($tabla.hasChildNodes()){
        $tabla.removeChild($tabla.firstElementChild);
    }
    if(data){
        data.sort((a,b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0))
        crearTabla(data);
    }
}

const actualizarLocalStorage = lista => {
    localStorage.setItem("lista", JSON.stringify(lista))
}

const cargando = () => {
    $('spinner').style.display = "flex";
    setTimeout(() => {
            $('spinner').style.display = "none";
        actualizarTabla();
    }, 3000);
}

onLoad();