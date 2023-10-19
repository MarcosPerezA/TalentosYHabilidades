function validatePhoneNumber(input) {
    // Reemplaza todo lo que no sea un número con una cadena vacía
    input.value = input.value.replace(/\D/g, "");
  }
  document.addEventListener('DOMContentLoaded', function() {
    const eventTitle = localStorage.getItem('eventTitle');
    if (eventTitle) {
      document.getElementById('event-title').textContent = "Registro Evento "+eventTitle;
    }
  });

  function setEventTitle(title) {
    localStorage.setItem('eventTitle', title);
  }

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      // Obtener el texto después de "Registro Evento" en el título
      const eventTitle = document.getElementById("event-title").textContent;
      const evento = eventTitle.replace("Registro Evento", "").trim(); // Elimina "Registro Evento" y espacios en blanco
  
      // Obtener los valores de los otros campos del formulario
      const nombre = document.getElementById("fullName").value;
      const correo = document.getElementById("email").value;
      const genero = document.querySelector('input[name="gender"]:checked').value;
      const telefono = document.getElementById("phoneNumber").value;
  
      // Crear un objeto con los datos para el registro de evento
      const formData = {
        nombre: nombre,
        evento: evento,
        correo: correo,
        genero: genero,
        telefono: telefono,
      };
  
      // Realizar la solicitud POST al endpoint de registro de evento
      fetch("http://www.talentosyhabilidades.somee.com/Eventos/RegistroEvento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          // Manejar la respuesta del servidor, por ejemplo, mostrar un mensaje de éxito
          console.log("Registro exitoso:", data);
          // Aquí puedes agregar código para mostrar un mensaje al usuario si lo deseas
        })
        .catch((error) => {
          console.error("Error al registrar:", error);
          // Manejar errores, por ejemplo, mostrar un mensaje de error
        });
  
      // Enviar los datos al segundo endpoint (correo) por separado
      const correoEventoData = {
        email: correo, // Usar el correo del formulario
        evento: evento, // Usar el evento obtenido del título
        nombre: nombre
      };
  
      // Realizar la solicitud POST al segundo endpoint (correo)
      fetch("https://localhost:7171/Eventos/CorreoEvento", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(correoEventoData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Correo enviado:", data);
          // Aquí puedes agregar código para mostrar un mensaje adicional si lo deseas
        })
        .catch((error) => {
          console.error("Error al enviar correo:", error);
          // Manejar errores, por ejemplo, mostrar un mensaje de error
        });
    });
  });
  