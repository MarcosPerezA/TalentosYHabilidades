var apiUrl = "http://www.talentosyhabilidades.somee.com/Perfil/RecuperaPerfil";
const usuario = localStorage.getItem('usr');
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
        var oficio = document.getElementById("oficio");
        var aptitudesList = document.getElementById("aptitudes-list");
        var foto = document.getElementById("Foto");

        if (data.length > 0) {
            nombreElement.textContent = data[0].Nombre;
            descripcionElement.textContent = data[0].Descripcion;
            oficio.textContent = data[0].Puesto;
            enlaceFacebook.href = data[0].Facebook;
            enlaceInstagram.href = data[0].Instagram;
            enlaceWhatsapp.href = data[0].Whatsapp;
            foto.src = "/Fotos/"+data[0].Foto;

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


