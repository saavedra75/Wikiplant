// Events.js
import { getPlants } from '../services/PlantService.js';
import { addToFavorites } from '../views/PlantList.js';

export function setupDelegation() {
  const view = document.getElementById('view');

  // Listener único para delegación
  view.addEventListener('click', async (e) => {
    // Botón Ver detalles
    const detailsBtn = e.target.closest('.btn-details');
    if (detailsBtn) {
      const id = detailsBtn.dataset.id;
      location.hash = `#/plantdetail/${id}`;
      return;
    }

    // Botón Agregar a favoritos
    const favBtn = e.target.closest('.btn-fav');
    if (favBtn) {
      const id = favBtn.dataset.id;
      const plants = await getPlants();
      addToFavorites(id, plants);
      return;
    }
  });
}
