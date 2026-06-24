const menu = [
 { nombre: 'Bruschetta Clásica', descripcion: 'Pan tostado con tomate y albahaca fresca', precio: 4500, categoria: 'Entrada' },
 { nombre: 'Tabla de Quesos', descripcion: 'Selección de quesos importados con mermelada', precio: 7800, categoria: 'Entrada' },
 { nombre: 'Lomo al Vino Tinto', descripcion: 'Lomo de res en reducción de vino tinto', precio: 15500, categoria: 'Plato Fuerte' },
 { nombre: 'Pasta Carbonara', descripcion: 'Pasta con tocino, huevo y queso parmesano', precio: 10200, categoria: 'Plato Fuerte' },
 { nombre: 'Salmón a la Plancha', descripcion: 'Filete de salmón con vegetales al vapor', precio: 13800, categoria: 'Plato Fuerte' },
 { nombre: 'Tiramisú', descripcion: 'Postre italiano con café y mascarpone', precio: 5200, categoria: 'Postre' },
 { nombre: 'Cheesecake de Maracuyá', descripcion: 'Cheesecake cremoso con coulis de maracuyá', precio: 4800, categoria: 'Postre' },
];

const reservas = [];

function renderMenu(datos = menu){

    const contenedor = document.getElementById("contenedorMenu");
    contenedor.innerHTML = "";

    datos.forEach(plato => {

        const col = document.createElement("div");
        col.className = "col-md-4";

        const card = document.createElement("div");
        card.className = "card-plato";

        card.innerHTML = `
            <h4>${plato.nombre}</h4>
            <p>${plato.descripcion}</p>
            <p><strong>₡${plato.precio.toLocaleString()}</strong></p>
            <p>${plato.categoria}</p>
        `;

        col.appendChild(card);
        contenedor.appendChild(col);
    });
}

function filtrarCategoria(categoria){

    document.querySelectorAll(".filtro").forEach(btn=>{
        btn.classList.remove("activo");
    });

    event.target.classList.add("activo");

    if(categoria === "Todos"){
        renderMenu(menu);
        return;
    }

    const filtrados = menu.filter(
        plato => plato.categoria === categoria
    );

    renderMenu(filtrados);
}

function validarFormulario(){

    let valido = true;

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const fecha = document.getElementById("fecha").value;
    const personas = Number(document.getElementById("personas").value);

    document.getElementById("errorNombre").textContent = "";
    document.getElementById("errorCorreo").textContent = "";
    document.getElementById("errorFecha").textContent = "";
    document.getElementById("errorPersonas").textContent = "";

    if(!/^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(nombre) || nombre.length < 5){
        document.getElementById("errorNombre").textContent =
        "Ingrese un nombre válido.";
        valido = false;
    }

    const regex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!regex.test(correo)){
        document.getElementById("errorCorreo").textContent =
        "Correo inválido.";
        valido = false;
    }

    const hoy = new Date().toISOString().split("T")[0];

    if(fecha < hoy){
        document.getElementById("errorFecha").textContent =
        "Fecha inválida.";
        valido = false;
    }

    if(personas < 1 || personas > 20){
        document.getElementById("errorPersonas").textContent =
        "Debe ser entre 1 y 20.";
        valido = false;
    }

    document.getElementById("btnEnviar").disabled = !valido;

    return valido;
}

function agregarReserva(){

    const reserva = {
        nombre: nombre.value,
        correo: correo.value,
        fecha: fecha.value,
        hora: hora.value,
        personas: Number(personas.value)
    };

    reservas.push(reserva);

    const fila = document.createElement("tr");
    fila.className = "fila-reserva";

    if(reserva.personas >= 6){
        fila.style.backgroundColor = "#FFF3CD";
    }

    fila.innerHTML = `
        <td>${reserva.nombre}</td>
        <td>${reserva.correo}</td>
        <td>${reserva.fecha}</td>
        <td>${reserva.hora}</td>
        <td>${reserva.personas}</td>
    `;

    document.getElementById("tablaReservas")
    .appendChild(fila);

    actualizarResumen();

    document.getElementById("form-reserva").reset();
    document.getElementById("btnEnviar").disabled = true;
}

function actualizarResumen(){

    const totalReservas = reservas.length;

    const totalPersonas =
    reservas.reduce((a,b)=>a+b.personas,0);

    let mayor = "N/A";

    if(reservas.length > 0){
        mayor = reservas.reduce(
            (max,r)=>r.personas > max.personas ? r : max
        ).nombre;
    }

    document.getElementById("resumen").innerHTML = `
        <h5>Resumen</h5>
        <p>Total reservas: ${totalReservas}</p>
        <p>Total personas esperadas: ${totalPersonas}</p>
        <p>Reserva más grande: ${mayor}</p>
    `;
}

document.addEventListener("DOMContentLoaded",()=>{

    renderMenu();

    document.querySelectorAll(
        "#form-reserva input,#form-reserva select"
    ).forEach(campo=>{
        campo.addEventListener("input",
        validarFormulario);
    });

    document.getElementById("form-reserva")
    .addEventListener("submit",(e)=>{
        e.preventDefault();

        if(validarFormulario()){
            agregarReserva();
        }
    });
});
