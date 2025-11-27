// PlantList.js
import { getPlants } from './api.js'; // función fetch que definimos antes

export default async function PlantList() {
  const plants = await getPlants();

  // Si no hay plantas
  if (!plants || plants.length === 0) {
    return `<p>No plants avaible.</p>`;
  }

  // Generamos las tarjetas
  const html = plants.map(plant => `
    <div class="plant-card">
      <img src="${plant.image_url || 'placeholder.png'}" alt="${plant.common_name || plant.scientific_name}">
      <h3>${plant.common_name || 'No common name'}</h3>
      <p><em>${plant.scientific_name}</em></p>
    </div>
  `).join('');

  return `
    <section class="plant-list">
      ${html}
    </section>
  `;
}
