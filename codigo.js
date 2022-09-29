let formLoteros = document.getElementById("formLoteros");
let cantidadPisos = document.getElementById("pisos");
let cantidadHabitaciones = document.getElementById("habitaciones");
let cantidadBanios = document.getElementById("banios");
let cantidadPrecio = document.getElementById("precio");
let idExplicacionBusqueda = document.getElementById("idExplicacionBusqueda");
let resultadosBusqueda = document.getElementById("resultadosBusqueda");
let divBtnBuscarDeNuevo = document.getElementById("divBtnBuscarDeNuevo");
let btnBuscarDeNuevo = document.getElementById("btnBuscarDeNuevo");

const getData = async () => {
  let datos = await fetch("./c.json");
  let datosOk = await datos.json();
  return datosOk;
};

formLoteros.addEventListener("submit", (e) => {
  e.preventDefault();
  cantidadPisos = cantidadPisos.value;
  cantidadHabitaciones = cantidadHabitaciones.value;
  cantidadBanios = cantidadBanios.value;
  formLoteros.classList.add("hidden");
  divBtnBuscarDeNuevo.classList.remove("hidden");

  idExplicacionBusqueda.innerHTML = `
    <div style= "width: 60%; margin-right: auto; margin-left: auto; margin-top: 10px;">
    <h4>
    ¡Perfecto! <br> Vamos a buscar propiedades con ${cantidadPisos == 1 ? "un piso" : `${cantidadPisos} pisos`},  ${cantidadBanios == 1 ? "un baño" : `${cantidadBanios} baños`}, y  ${cantidadHabitaciones == 1 ? "una habitación." : `${cantidadHabitaciones} habitaciones.`}
    </h4>
    </div>
    `;

  getData().then((data) => {
    let resultados = data.filter(
      (propiedad) =>
        propiedad.floors == cantidadPisos &&
        propiedad.bedrooms == cantidadHabitaciones &&
        propiedad.bathrooms == cantidadBanios
    );
    if(resultados.length == 0){
      idExplicacionBusqueda.innerText = "No lota, no hay resultado. Buscá otra cosa LCDTM"
    }
    resultados.map((resultado) => {
      let div = document.createElement("div");
      div.innerHTML = `
      <div class="card" style="width: 18rem; border: solid 2px black; padding: 8px; margin-bottom: 20px;">
      <img src="./casa.png" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">USD ${resultado.price}</h5>
        <h6 class="card-title">Código Postal: ${resultado.zipcode}</h6>
        <h6 class="card-title">Condición de la propiedad: ${resultado.condition}</h6>
        <p>Habitaciones: ${resultado.bedrooms}</p>
        <p>Pisos: ${resultado.floors}</p>
        <p>Baños: ${resultado.bathrooms}</p>
      </div>
      </div>
      `;

      resultadosBusqueda.appendChild(div);
    });
  });

  formLoteros.reset();
});

btnBuscarDeNuevo.addEventListener("click", () => {
  window.location.href = "./index.html";
});
