document.getElementById("archivo").oninput = () => {
    let reader = new FileReader();
    reader.readAsText(document.getElementById("archivo").files[0]);
    reader.onload = () => {
        localStorage.setItem("horario_nks", reader.result);
        mostrarHorario();
    }
}

function mostrarHorario() {
    let horario = JSON.parse(localStorage.getItem("horario_nks"));
    if (horario != null) {
        let contenido = "";
        contenido += `<div class="row"><div class="col-1"></div>`;
        for (let dia of horario.dias_de_clase) {
            contenido += `<div class="col">${dia}</div>`;
        }
        contenido += `</div>`;

        for (i = 0; i < horario.modulos.length - 1; i++) {
            contenido += `<div class="row">`

            contenido += `<div class="col-1">${horario.modulos[i]}<br>${horario.modulos[i + 1]}</div>`
            for (let numMateria of horario.horario[i]) {
                switch (numMateria) {
                    case null:
                        contenido += `<div class="col"></div>`
                        break;
                    case 0:
                        contenido += `<div class="col"><button class="btn btn-primary h-100 w-100">${horario.materias[numMateria].nombre}</button></div>`
                        break;
                    default:
                        contenido += `<div class="col"><a href="${horario.materias[numMateria].enlace}" target="blank"><button class="btn btn-primary h-100 w-100">${horario.materias[numMateria].nombre}</button></a></div>`
                }
            }

            contenido += `</div>`
        }
        document.getElementById("contenedor_horario").innerHTML = contenido;
    }
}
mostrarHorario();
