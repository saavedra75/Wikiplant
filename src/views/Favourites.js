// Favourites.js
export default function Favourites() {
  const favs = JSON.parse(localStorage.getItem('favorites')) || [];

  if (favs.length === 0) {
    return `<p>No tienes plantas favoritas aún.</p>`;
  }

  const list = favs.map(plant => `
    <div class="plant-card">
      <img src="${plant.imagen}" alt="${plant.nombre_comun}">
      <h3>${plant.nombre_comun}</h3>
      <p><em>${plant.nombre_cientifico}</em></p>
      <p class="plant-category">${plant.categoria}</p>
      <button class="btn-remove" data-id="${plant.id}">Quitar de favoritos</button>
    </div>
  `).join('');

  // Espera a que se renderice para agregar eventos
  setTimeout(() => {
    document.querySelectorAll('.btn-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        removeFromFavorites(id);
      });
    });
  }, 0);

  return `
    <section class="plant-list">
      ${list}
    </section>
  `;
}

function removeFromFavorites(id) {
  let favs = JSON.parse(localStorage.getItem('favorites')) || [];
  favs = favs.filter(p => p.id != id);
  localStorage.setItem('favorites', JSON.stringify(favs));
  alert('Planta eliminada de favoritos');
  // Volvemos a renderizar la vista
  location.reload();
}
