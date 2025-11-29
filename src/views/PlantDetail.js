import { addToFavorites } from './PlantList.js';

export default async function PlantDetail() {
  const hash = location.hash; // ej: #/plantdetail/3
  const id = hash.split('/')[2]; // "3"

  try {
    // Traemos solo la planta que necesitamos
    const res = await fetch(`http://localhost:3000/plants/${id}`);
    if (!res.ok) throw new Error('Planta no encontrada');
    const plant = await res.json();

    return `
      <section class="plant-detail">
        <div class="plant-detail-card">
          <img src="${plant.imagen}" alt="${plant.nombre_comun}" class="plant-detail-image">
          <div class="plant-info">
            <h2>${plant.nombre_comun}</h2>
            <h4><em>${plant.nombre_cientifico}</em></h4>
            <p>${plant.descripcion}</p>
            <p class="plant-category"><strong>Categoría:</strong> ${plant.categoria}</p>

            <button class="btn-fav" data-id="${plant.id}">Agregar a favoritos</button>
          </div>
        </div>
      </section>
    `;
  } catch (error) {
    return `<p>${error.message}</p>`;
  }
}
//Hay que exportar esto para poder llavarla al main
export { addToFavorites };
