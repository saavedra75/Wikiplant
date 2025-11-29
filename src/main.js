import { router } from "./router";
import Header from './components/header';
import Footer from './components/footer';
import './style/styles.css';


document.querySelector('#app').innerHTML = `
${Header()}
<main id="view"></main>
${Footer()}
`;

router();

// Escuchamos cambios de hash para navegación SPA
window.addEventListener('hashchange', router);

