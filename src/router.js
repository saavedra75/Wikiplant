import Home from "./views/Home.js";
import PlantList from "./views/PlantList.js";
import Favourites from "./views/Favourites.js";
import PlantDetail from "./views/PlantDetail.js";
import NotFound from "./views/NotFound.js";

export function router() {
    const view = document.getElementById('view');

    // Remove the # and convert to lowercase
    const route = location.hash.slice(1).toLowerCase() || "/";

    // Route table 
    const routes = {
        "/": Home,
        "/plantlist": PlantList,
        "/favourites": Favourites,
        "/plantdetail": PlantDetail,
        "/notfound": NotFound
    };

    const screen = routes[route] || NotFound;
    view.innerHTML = screen();
}

export default router;
