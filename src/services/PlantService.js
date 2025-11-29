const API_URL = 'http://localhost:3000/plants';

export async function getPlants() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`Error en la API: ${res.status}`);
    const plants = await res.json();
    return plants;
  } catch (error) {
    console.error(error);
    return [];
  }
}


export async function getPlantsByCategory(category) {
  const plants = await getPlants();
  if (!category || category === 'all') return plants;
  return plants.filter(p => p.categoria === category);
}