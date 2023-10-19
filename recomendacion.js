document.addEventListener("DOMContentLoaded", function () {
    const comentarBtn = document.getElementById("comentarBtn");
    const cardContainer = document.querySelector(".container__right");
    const nombreInput = document.getElementById("nombreInput");
    const comentarioInput = document.getElementById("comentarioInput");
  
    // Agrega un evento de clic al botón de "Comentar"
    comentarBtn.addEventListener("click", function () {
      const nombre = nombreInput.value;
      const comentario = comentarioInput.value;
  
      const comentarioData = {
        nombre: nombre,
        comentario: comentario
      };
  
      fetch("http://www.talentosyhabilidades.somee.com/Comentarios/ingresaComentario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(comentarioData)
      })
        .then(response => {
          if (response.ok) {
            console.log("Usuario Registrado Con Éxito");
  
            nombreInput.value = "";
            comentarioInput.value = "";
  
            obtenerComentarios();
          } else {
            console.log("Error al registrar el usuario");
          }
        });
    });
  
    // Función para obtener y mostrar comentarios aleatorios desde la API
    function obtenerComentarios() {
      fetch("http://www.talentosyhabilidades.somee.com/Comentarios/todosComentarios")
        .then(response => response.json())
        .then(data => {
          // Limpia el contenedor de tarjetas
          cardContainer.innerHTML = "";
  
          // Selecciona 6 comentarios aleatorios
          const comentariosAleatorios = obtenerComentariosAleatorios(data, 4);
  
          // Itera a través de los comentarios aleatorios
          comentariosAleatorios.forEach(comentario => {
            const card = document.createElement("div");
            card.classList.add("card");
  
            const cardContent = document.createElement("div");
            cardContent.classList.add("card__content");
  
            const quotesIcon = document.createElement("span");
            quotesIcon.innerHTML = '<i class="ri-double-quotes-l"></i>';
  
            const cardDetails = document.createElement("div");
            cardDetails.classList.add("card__details");
  
            const comentarioParagraph = document.createElement("p");
            comentarioParagraph.textContent = comentario.Comentario;
  
            const nombreHeader = document.createElement("h4");
            nombreHeader.textContent = `- ${comentario.Nombre}`;
  
            cardDetails.appendChild(comentarioParagraph);
            cardDetails.appendChild(nombreHeader);
            cardContent.appendChild(quotesIcon);
            cardContent.appendChild(cardDetails);
            card.appendChild(cardContent);
            cardContainer.appendChild(card);
          });
        })
        .catch(error => {
          console.error("Error al obtener los comentarios:", error);
        });
    }
  
    // Función para obtener comentarios aleatorios de una lista
    function obtenerComentariosAleatorios(lista, cantidad) {
      const comentariosAleatorios = [];
      const listaClonada = lista.slice(); // Clona la lista para no modificar la original
  
      for (let i = 0; i < cantidad; i++) {
        const indiceAleatorio = Math.floor(Math.random() * listaClonada.length);
        const comentarioAleatorio = listaClonada.splice(indiceAleatorio, 1)[0];
        comentariosAleatorios.push(comentarioAleatorio);
      }
  
      return comentariosAleatorios;
    }
  
    obtenerComentarios();
  });
  