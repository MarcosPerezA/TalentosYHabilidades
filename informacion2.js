var apiUrl = "http://www.talentosyhabilidades.somee.com/Perfil/RecuperaPerfil";
        const usuario = localStorage.getItem('usuario');
        var requestData = {
            "usuario": usuario
        };

        var xhr = new XMLHttpRequest();
        xhr.open("POST", apiUrl, true);
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                var nombreElement = document.getElementById("nombre");
                var descripcionElement = document.getElementById("descripcion");
                var enlaceFacebook = document.getElementById("enlace-facebook");
                var enlaceInstagram = document.getElementById("enlace-instagram");
                var enlaceWhatsapp = document.getElementById("enlace-whatsapp");
                var aptitudesList = document.getElementById("aptitudes-list");

                if (data.length > 0) {
                    nombreElement.textContent = data[0].Nombre;
                    descripcionElement.textContent = data[0].Descripcion;
                    enlaceFacebook.href = data[0].Facebook;
                    enlaceInstagram.href = data[0].Instagram
                    enlaceWhatsapp.href = data[0].Whatsapp

                    // Obtén la cadena de aptitudes del objeto 'data'
                    var aptitudes = data[0].Aptitudes;

                    // Divide la cadena en un array usando el guion como separador
                    var aptitudesArray = aptitudes.split('-').filter(Boolean);

                    // Crea elementos de lista para cada aptitud
                    aptitudesArray.forEach(function (aptitud) {
                       var li = document.createElement("li");
                     li.textContent = aptitud;
                    aptitudesList.appendChild(li);
                     });
                }
            }
        };

        xhr.send(JSON.stringify(requestData));

        // Agregar eventos click a los campos de "Nombre" y "Descripción"
        var nombreElement = document.getElementById("nombre");
        var descripcionElement = document.getElementById("descripcion");

        nombreElement.addEventListener("click", mostrarBotonGuardar);
        descripcionElement.addEventListener("click", mostrarBotonGuardar);

        function mostrarBotonGuardar() {
            var guardarCambiosButton = document.getElementById("guardar-cambios");
            guardarCambiosButton.style.display = "block";
            // Desvincular los eventos click para evitar ocultar el botón cuando se hace clic en los campos nuevamente
            nombreElement.removeEventListener("click", mostrarBotonGuardar);
            descripcionElement.removeEventListener("click", mostrarBotonGuardar);
        }

        // Agregar evento click al botón "Guardar Cambios"
        var guardarCambiosButton = document.getElementById("guardar-cambios");
        guardarCambiosButton.addEventListener("click", guardarCambios);

        function guardarCambios() {
            var nuevoNombre = document.getElementById("nombre").textContent;
            var nuevaDescripcion = document.getElementById("descripcion").textContent;

            var datosActualizados = {
                "foto": "",
                "aptitudes": "-Diseño De Casas",
                "descripcion": nuevaDescripcion,
                "nombre": nuevoNombre,
                "usuario": usuario,
                "Puesto": "Ingeniero Civil"
            };

            var xhrGuardar = new XMLHttpRequest();
            xhrGuardar.open("POST", "http://www.talentosyhabilidades.somee.com/Perfil/EditaPerfil", true);
            xhrGuardar.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

            xhrGuardar.onreadystatechange = function() {
                if (xhrGuardar.readyState === 4 && xhrGuardar.status === 200) {
                    // Manejar la respuesta del servidor si es necesario
                    console.log("Cambios guardados con éxito.");
                    // Volver a vincular los eventos click para permitir la edición nuevamente
                    nombreElement.addEventListener("click", mostrarBotonGuardar);
                    descripcionElement.addEventListener("click", mostrarBotonGuardar);
                }
            };

            xhrGuardar.send(JSON.stringify(datosActualizados));
        }