import logo from '../assets/logo.png';


export default function Header() {
    return `
    <header class="header">
        <nav class="nav">
            <div class="logo">
                <img src="${logo}">
                <h2>Wikiplant</h2>
            </div>

            <ul class="nav-links">
                <li><a href="#/">Home</a></li>
                <li><a href="#/plantlist">Plant List</a></li>
                <li><a href="#/favourites">Favourites</a></li>
            </ul>
        </nav>
    </header>
    `;
}
