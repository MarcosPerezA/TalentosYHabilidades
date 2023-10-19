// Hacer una solicitud a la API
fetch('http://www.talentosyhabilidades.somee.com/Perfil/todosPerfiles')
  .then(response => response.json())
  .then(data => {
    // Obtener el contenedor de tarjetas
    const cardContainer = document.querySelector('.swiper-wrapper');

    // Iterar sobre los datos y crear una tarjeta para cada registro
    data.forEach(profile => {
      const card = document.createElement('article');
      card.className = 'card__article swiper-slide';

      card.innerHTML = `
        <div class="card__image">
          <img src="/Fotos/${profile.Foto}" alt="image" class="card__img">
          <div class="card__shadow"></div>
        </div>
        <div class="card__data">
          <h3 class="card__name">${profile.Nombre}</h3>
          <p class="card__description">${profile.Puesto}</p>
          <a href="informacionMuestra.html" class="card__button" data-usuario="${profile.Usuario}">Ir Al Perfil</a>
        </div>
      `;

      cardContainer.appendChild(card);

      // Agregar evento de clic al botón "View More"
      const viewMoreButton = card.querySelector('.card__button');
      viewMoreButton.addEventListener('click', function (e) {
        e.preventDefault();
        const usuario = this.getAttribute('data-usuario');
        localStorage.setItem('usr', usuario);
        window.location.href = this.getAttribute('href');
      });
    });

    // Inicializar el slider después de crear las tarjetas
    const mySwiper = new Swiper('.swiper', {
      // Configuración de Swiper
    });

    // Agregar evento de cambio al select
    const filterSelect = document.getElementById('filterSelect');
    filterSelect.addEventListener('change', () => {
      const selectedValue = filterSelect.value;

      // Obtener todas las tarjetas
      const cards = document.querySelectorAll('.card__article');

      // Iterar sobre las tarjetas y mostrar u ocultar según el filtro
      cards.forEach(card => {
        const profileDescription = card.querySelector('.card__description').textContent;
        if (selectedValue === 'todos' || profileDescription.includes(selectedValue)) {
          card.style.display = 'block'; // Mostrar la tarjeta
        } else {
          card.style.display = 'none'; // Ocultar la tarjeta
        }
      });

      // Reinicializar el slider para ajustar las tarjetas visibles
      mySwiper.update();
    });
  })
  .catch(error => {
    console.error('Error al obtener datos de la API', error);
  });
