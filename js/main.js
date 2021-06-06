
/*Elementos Pointer*/
let puntos = 0;
let tiempo = 60;
let necesarios = 15;
let vidas = 3;

/*Elementos Juego y Contenedor*/
let cantidadMariposas = 10;
let cantidadMurcielagos = 6;

const contenedor = document.getElementById('containerElementos')

function crearBichos() {
    for (let i = 0; i < cantidadMariposas; i++) {
        const mariposa = document.createElement('div')
        mariposa.className = "butterfly"
        contenedor.appendChild(mariposa)
        mariposa.addEventListener('transitionend', () => {
            randNum = Math.round(Math.random() * 450);
            randNum2 = Math.round(Math.random() * 450);
            mariposa.style.marginTop = randNum + "px";
            mariposa.style.marginLeft = randNum2 + "px";
        })
        setTimeout(() => {
            randNum = Math.round(Math.random() * 450);
            randNum2 = Math.round(Math.random() * 450);
            mariposa.style.marginTop = randNum + "px";
            mariposa.style.marginLeft = randNum2 + "px";
        }, 0)
        mariposa.addEventListener('click', sumarPuntos)
    }


    for (let i = 0; i < cantidadMurcielagos; i++) {
        const murcielago = document.createElement('div')
        murcielago.className = "bat"
        contenedor.appendChild(murcielago)
        murcielago.addEventListener('transitionend', () => {
            randNum = Math.round(Math.random() * 450);
            randNum2 = Math.round(Math.random() * 450);
            murcielago.style.marginTop = randNum + "px";
            murcielago.style.marginLeft = randNum2 + "px";
        })
        setTimeout(() => {
            randNum = Math.round(Math.random() * 450);
            randNum2 = Math.round(Math.random() * 450);
            murcielago.style.marginTop = randNum + "px";
            murcielago.style.marginLeft = randNum2 + "px";
        }, 0)
        murcielago.addEventListener('mouseover', quitarVidas)
    }
}

crearBichos()

/* Aplico Jquery en la funcion donde se suman los puntos cada vez que clickeas una mariposa */
function sumarPuntos() {
    puntos++;
    $('#puntos').html(puntos + "/" + necesarios);

    if (puntos == necesarios) {
        alert("Felicitaciones. Pasaste al siguiente nivel!");
        nuevoNivel()
    }
}

/* Pasar de nivel y acumular puntos del nivel anterior */
function nuevoNivel() {
    cantidadMariposas = Math.round(cantidadMariposas * 0.8);
    cantidadMurcielagos = Math.round(cantidadMurcielagos * 1.3);

    puntos;
    tiempo = 60;
    necesarios += 15;

    contenedor.innerHTML = ''
    crearBichos();
    if (puntos == necesarios) {
        alert("Felicitaciones. Pasaste al siguiente nivel!");
    }
}

/* Perder vidas */
function quitarVidas() {
    vidas--;
    document.getElementById('vidas').innerHTML = vidas;
    if (vidas <= 0) {

        showModal()
    }
}

/* Contador de tiempo */
function restarTiempo() {
    tiempo--;
    document.getElementById("tiempo").innerHTML = tiempo;
    if (tiempo == 0) {
        showModal()
    }
}
setInterval(restarTiempo, 1000);


/* Ranking y local storage */
let ranking = JSON.parse(localStorage.getItem('Ranking')) || []

let nuevoRanking = ranking.sort((b, a) => {
    return a.Puntos - b.Puntos
})
console.log(nuevoRanking)


/*Pop Up*/
function showModal() {
    document.getElementById('openModal').style.display = 'block';
}

function CloseModal() {
    document.getElementById('openModal').style.display = 'none';
    document.location.reload()
}

/* Guardar el nombre para el ranking */
function validarInput(e) {
    e.preventDefault();
    let nombre = document.getElementById('nombre').value;
    let nombrePuntos = { 'Nombre': nombre, 'Puntos': puntos }

    if (nombre.length > 0 ) {     
        nuevoRanking.push(nombrePuntos)
        localStorage.setItem('Ranking', JSON.stringify(nuevoRanking))
        CloseModal()       
    }
}

const submit = document.getElementById('submit')
submit.addEventListener('click', validarInput)


