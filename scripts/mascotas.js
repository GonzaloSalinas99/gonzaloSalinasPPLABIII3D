import {$,create, obtenerLista} from './utils.js';

const crearCards = () => {
    const lista = obtenerLista();
    lista.forEach(mascota => {
        const $card = create('div');
        const $h2 = create('h2');
        const h3Text = document.createTextNode(`${mascota.titulo}`);
        const $h4 = create('h4');
        const h4Text = document.createTextNode(`${mascota.descripcion}${mascota.vacunas == "Si" ? "vacunas al día": "sin vacunas al día"}`);
        const $span = create('p');
        const spanText = document.createTextNode(`$ ${mascota.precio}`);
        // const $button = create('button');
        // const buttonText = document.createTextNode('Ver Mascota');
        const $caracteristicas = create('div');
        const $razaContainer = create('div');
        const $nacimientoContainer = create('div');
        const $vacunacionContainer = create('div');
        const $imagenRaza = create('img');
        const $razaTexto = document.createTextNode(mascota.raza);
        const $imagenNacimiento = create('img');
        const $nacimientoTexto = document.createTextNode(mascota.nacimiento);
        const $imagenVacuna = create('img');
        const $vacunaTexto = document.createTextNode(mascota.vacuna);
        $imagenRaza.src = './assets/icono_raza.png';
        $imagenRaza.classList.add('card_icon');
        $imagenNacimiento.src = './assets/icono_nacimiento.png';
        $imagenNacimiento.classList.add('card_icon');
        $imagenVacuna.src = './assets/icono_vacuna.png';
        $imagenVacuna.classList.add('card_icon');
        $razaContainer.appendChild($imagenRaza);
        $razaContainer.appendChild($razaTexto);
        $nacimientoContainer.appendChild($imagenNacimiento);
        $nacimientoContainer.appendChild($nacimientoTexto);
        $vacunacionContainer.appendChild($imagenVacuna);
        $vacunacionContainer.appendChild($vacunaTexto);
        $caracteristicas.appendChild($razaContainer);
        $caracteristicas.appendChild($nacimientoContainer);
        $caracteristicas.appendChild($vacunacionContainer);
        $caracteristicas.classList.add('caracteristicas');
        $caracteristicas.style.padding = '0 40px'
        $span.classList.add('precio');
        // $button.appendChild(buttonText);
        // $button.classList.add("card_button")
        $h2.appendChild(h3Text);
        $h4.appendChild(h4Text);
        $span.appendChild(spanText);
        $card.classList.add("card");
        $card.appendChild($h2);
        $card.appendChild($h4);
        $card.appendChild($span);
        $card.appendChild($caracteristicas);
        // $card.appendChild($button);
        $('mascotas').appendChild($card);
    })
}

const cargando = () => {
    $('spinner').style.display = "flex";
    setTimeout(() => {
            $('spinner').style.display = "none";
        }, 3000);
}
    
crearCards();
cargando();