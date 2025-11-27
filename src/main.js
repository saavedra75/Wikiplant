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

window.addEventListener('hashchange', router);