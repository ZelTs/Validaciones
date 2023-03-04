//Esta funcion se llama cada vez que el usuario sale del input que estaba rellenando
export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    
    if (validadores[tipoDeInput]) {
      validadores[tipoDeInput](input);
    }

    //Vamos a verificar el input
    if(input.validity.valid){
      //Quitamos la clase si es válido los datos ingresados
      input.parentElement.classList.remove("input-container--invalid");
      input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
      //Añadimos clase de datos inválidos
      input.parentElement.classList.add("input-container--invalid");
      input.parentElement.querySelector(".input-message-error").innerHTML = 
      mostrarMensajeDeError(tipoDeInput, input);
    }
  }

  const tiposDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
  ];


  //Definimos cada mensaje de los inputs en caso de error
  const mensajesDeError = {
    //Objeto nombre
    nombre: {
      valueMissing: "Este campo no puede estar vacio",
    },
    email: {
      valueMissing: "Este campo no puede estar vacio",
      typeMismatch: "El correo no es válido",
    },

    password: {
      valueMissing: "Este campo no puede estar vacio",
      patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
    },

    nacimiento: {
      valueMissing: "Este campo no puede estar vacio",
      customError: "Debes tener al menos 18 años de edad",
    },

    numero: {
      valueMissing: "Este campo no puede estar vacio",
      patternMismatch: "El formato requerido es XXXXXXXXXX 10 números"
    },

    direccion: {
      valueMissing: "Este campo no puede estar vacio",
      patternMismatch: "La dirección debe contener entre 10 y 40 caracteres",
    },

    ciudad: {
      valueMissing: "Este campo no puede estar vacio",
      patternMismatch: "La ciudad debe contener entre 4 y 20 caracteres",
    },

    estado: {
      valueMissing: "Este campo no puede estar vacio",
      patternMismatch: "El estado debe contener entre 4 y 20 caracteres",
    },

  };
  
  const validadores = {
    nacimiento: (input) => validarNacimiento(input),
  };

function mostrarMensajeDeError (tipoDeInput, input){
  
  let mensaje = " ";

  tiposDeErrores.forEach( (error) =>{
    if(input.validity[error]){
      console.log(tipoDeInput, error);
      console.log(input.validity[error]);
      console.log(mensajesDeError[tipoDeInput][error]);
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  });
  return mensaje;
}
  
  function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorDeEdad(fechaCliente)) {
      mensaje = "Debes tener al menos 18 años de edad";
    }
  
    input.setCustomValidity(mensaje);
  }
  
  function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
      fecha.getUTCFullYear() + 18,
      fecha.getUTCMonth(),
      fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
  }
  