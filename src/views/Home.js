import { getPlants } from "../services/PlantService.js";

export default async function Home() {
    const plants = await getPlants();

    if (!plants || plants.length === 0) {
        return `<p>No plants available.</p>`;
    }

    const indices = new Set();
    while (indices.size < 3) {
        const randomIndex = Math.floor(Math.random() * plants.length);
        indices.add(randomIndex);
    }

    const randomPlants = Array.from(indices).map(i => plants[i]);

    // Generar las tarjetas
    const list = randomPlants.map(plant => `
        <div class="plant-card">
            <img src="${plant.imagen}" alt="${plant.nombre_comun}">
            <h3>${plant.nombre_comun}</h3>
            <p><em>${plant.nombre_cientifico}</em></p>
        </div>
    `).join("");


    return `
        <section class="home-section">
            <h2 class="home-title">Wellcome to WikiPlant</h2>
            <p class="home-subtitle">Take this random plants generated only for you</p>
            <div class="plant-list">
                ${list}
            </div>
        </section>
    `;

}
