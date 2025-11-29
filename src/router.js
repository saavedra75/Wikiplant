import Home from "./views/Home.js";
import PlantList from "./views/PlantList.js";
import Favourites from "./views/Favourites.js";
import PlantDetail from "./views/PlantDetail.js";
import NotFound from "./views/NotFound.js";

export function router() {
    const view = document.getElementById('view');

    // Quitar # y poner en minúsculas
    const hash = location.hash.slice(1).toLowerCase() || "/";

    // Rutas normales
    const routes = {
        "/": Home,
        "/plantlist": PlantList,
        "/favourites": Favourites
    };

    let screen;

    //  si es /plantdetail/:id
    if (hash.startsWith("/plantdetail/")) {
        screen = () => PlantDetail(hash.split("/")[2]); // pasar id
    }
    else {
        screen = routes[hash] || NotFound;
    }

    Promise.resolve(screen()).then(html => {
        view.innerHTML = html;
    });
}

export default router;
