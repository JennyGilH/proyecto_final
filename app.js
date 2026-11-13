// 1. Clase Reserva: Molde para crear el objeto de cada reserva
class Reserva {
    constructor(destino, precio, personas) {
        this.destino = destino;
        this.precio = precio;
        this.personas = personas;
        // Calculamos el total de una vez
        this.total = precio * personas;
    }
}

// 2. Clase Agencia: Administra el arreglo de reservas
class Agencia {
    constructor() {
        this.reservas = [];
    }

    registrar(reserva) {
        this.reservas.push(reserva);
    }

    listar() {
        return this.reservas;
    }
}

// 3. Clase Aplicacion: Conecta el botón HTML, lee los datos y muestra los resultados
class Aplicacion {
    constructor() {
        // Creamos la instancia de nuestra agencia
        this.agencia = new Agencia();
        
        // Escuchamos el clic del botón tal cual se enseñó en clase
        document.getElementById("registrar")
            .addEventListener("click", () => this.registrarNuevaReserva());
    }

    registrarNuevaReserva() {
        // Capturamos los campos HTML
        const selectDestino = document.getElementById("destino");
        const inputPersonas = document.getElementById("personas");
        
        // Extraemos valores
        const precio = Number(selectDestino.value);
        const personas = Number(inputPersonas.value);
        
        // Validamos que la información sea correcta (que no esté vacío o sea menor a 1)
        if (!selectDestino.value || personas <= 0) {
            return alert("Datos inválidos. Selecciona un destino y la cantidad de viajeros.");
        }

        // Extraemos solo el nombre del destino (ej: "Roma")
        const nombreDestino = selectDestino.options[selectDestino.selectedIndex].text.split(' - ')[0];

        // Registramos usando nuestras clases
        this.agencia.registrar(new Reserva(nombreDestino, precio, personas));
        
        // Actualizamos la vista
        this.mostrarReservas();
    }

    mostrarReservas() {
        const lista = document.getElementById("lista");
        lista.innerHTML = ""; // Limpiamos la lista para no duplicar datos
        
        // Recorremos el arreglo y pintamos cada reserva
        this.agencia.listar().forEach(reserva => {
            const item = document.createElement("li");
            // Agregamos clases de Bootstrap al elemento <li>
            item.className = "list-group-item list-group-item-info mb-2 shadow-sm rounded";
            
            // Formato de moneda para que se vea como pesos colombianos
            const formatoCOP = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
            }).format(reserva.total);

            // Inyectamos el contenido
            item.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="mb-0 fw-bold">${reserva.destino}</h6>
                        <small class="text-muted">Viajeros: ${reserva.personas}</small>
                    </div>
                    <span class="badge bg-success rounded-pill fs-6">${formatoCOP}</span>
                </div>
            `;
            
            lista.appendChild(item);
        });
    }
}

// 4. Inicializamos la aplicación
new Aplicacion();