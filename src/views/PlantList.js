import { getPlants, getPlantsByCategory } from '../services/PlantService.js';

export default async function PlantList() {
  const plants = await getPlants();

  if (!plants || plants.length === 0) {
    return `<p>No plants available.</p>`;
  }

  const categories = [...new Set(plants.map(p => p.categoria))];

  const html = `
    <section class="plant-list-section">
      <h2>Plants</h2>
      <label for="categoryFilter">Filter by category:</label>
      <select id="categoryFilter">
        <option value="all">Todas</option>
        ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
      </select>
      <div class="plant-list" id="plantListContainer"></div>
    </section>
  `;

  setTimeout(() => {
    const container = document.getElementById('plantListContainer');
    const filter = document.getElementById('categoryFilter');

    const render = async (plantsToRender) => {
      container.innerHTML = plantsToRender.map(plant => `
        <div class="plant-card">
          <img src="${plant.imagen}" alt="${plant.nombre_comun}">
          <h3>${plant.nombre_comun}</h3>
          <p><em>${plant.nombre_cientifico}</em></p>
          <p class="plant-category">${plant.categoria}</p>
          <div class="plant-buttons">
            <button class="btn-details" data-id="${plant.id}">View details</button>
            <button class="btn-fav" data-id="${plant.id}">Add to favourites</button>
          </div>
        </div>
      `).join('');

      container.querySelectorAll('.btn-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.target.dataset.id;
          location.hash = `#/plantdetail/${id}`;
        });
      });

      container.querySelectorAll('.btn-fav').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.target.dataset.id;
          addToFavorites(id, plantsToRender);
        });
      });
    };

    render(plants);

    filter.addEventListener('change', async () => {
      const selected = filter.value;
      const filteredPlants = selected === 'all' 
        ? plants 
        : await getPlantsByCategory(selected);
      render(filteredPlants);
    });
  }, 0);

  return html;
}

export function addToFavorites(id, plants) {
  const plant = plants.find(p => p.id == id);
  if (!plant) return;

  const favs = JSON.parse(localStorage.getItem('favorites')) || [];
  if (!favs.some(p => p.id == id)) {
    favs.push(plant);
    localStorage.setItem('favorites', JSON.stringify(favs));
    alert(`${plant.nombre_comun} añadida a favoritos!`);
  } else {
    alert(`${plant.nombre_comun} ya está en favoritos`);
  }
}
