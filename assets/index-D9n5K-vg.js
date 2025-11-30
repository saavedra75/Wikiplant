(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(e){if(e.ep)return;e.ep=!0;const i=n(e);fetch(e.href,i)}})();const m="http://localhost:3000/plants";async function d(){try{const t=await fetch(m);if(!t.ok)throw new Error(`Error en la API: ${t.status}`);return await t.json()}catch(t){return console.error(t),[]}}async function f(t){const a=await d();return!t||t==="all"?a:a.filter(n=>n.categoria===t)}async function p(){const t=await d();if(!t||t.length===0)return"<p>No plants available.</p>";const a=new Set;for(;a.size<3;){const e=Math.floor(Math.random()*t.length);a.add(e)}return`
        <section class="home-section">
            <h2 class="home-title">Wellcome to WikiPlant</h2>
            <p class="home-subtitle">Take this random plants generated only for you</p>
            <div class="plant-list">
                ${Array.from(a).map(e=>t[e]).map(e=>`
        <div class="plant-card">
            <img src="${e.imagen}" alt="${e.nombre_comun}">
            <h3>${e.nombre_comun}</h3>
            <p><em>${e.nombre_cientifico}</em></p>
        </div>
    `).join("")}
            </div>
        </section>
    `}async function h(){const t=await d();if(!t||t.length===0)return"<p>No plants available.</p>";const n=`
    <section class="plant-list-section">
      <h2>Plants</h2>
      <label for="categoryFilter">Filter by category:</label>
      <select id="categoryFilter">
        <option value="all">Todas</option>
        ${[...new Set(t.map(o=>o.categoria))].map(o=>`<option value="${o}">${o}</option>`).join("")}
      </select>
      <div class="plant-list" id="plantListContainer"></div>
    </section>
  `;return setTimeout(()=>{const o=document.getElementById("plantListContainer"),e=document.getElementById("categoryFilter"),i=async r=>{o.innerHTML=r.map(s=>`
        <div class="plant-card">
          <img src="${s.imagen}" alt="${s.nombre_comun}">
          <h3>${s.nombre_comun}</h3>
          <p><em>${s.nombre_cientifico}</em></p>
          <p class="plant-category">${s.categoria}</p>
          <div class="plant-buttons">
            <button class="btn-details" data-id="${s.id}">View details</button>
            <button class="btn-fav" data-id="${s.id}">Add to favourites</button>
          </div>
        </div>
      `).join(""),o.querySelectorAll(".btn-details").forEach(s=>{s.addEventListener("click",c=>{const l=c.target.dataset.id;location.hash=`#/plantdetail/${l}`})}),o.querySelectorAll(".btn-fav").forEach(s=>{s.addEventListener("click",c=>{const l=c.target.dataset.id;g(l,r)})})};i(t),e.addEventListener("change",async()=>{const r=e.value,s=r==="all"?t:await f(r);i(s)})},0),n}function g(t,a){const n=a.find(e=>e.id==t);if(!n)return;const o=JSON.parse(localStorage.getItem("favorites"))||[];o.some(e=>e.id==t)?alert(`${n.nombre_comun} ya está en favoritos`):(o.push(n),localStorage.setItem("favorites",JSON.stringify(o)),alert(`${n.nombre_comun} añadida a favoritos!`))}function v(){const t=JSON.parse(localStorage.getItem("favorites"))||[];if(t.length===0)return"<p>You have no favourites plants yet.</p>";const a=t.map(n=>`
    <div class="plant-card">
      <img src="${n.imagen}" alt="${n.nombre_comun}">
      <h3>${n.nombre_comun}</h3>
      <p><em>${n.nombre_cientifico}</em></p>
      <p class="plant-category">${n.categoria}</p>
      <button class="btn-remove" data-id="${n.id}">Remove</button>
    </div>
  `).join("");return setTimeout(()=>{document.querySelectorAll(".btn-remove").forEach(n=>{n.addEventListener("click",o=>{const e=o.target.dataset.id;b(e)})})},0),`
    <section class="plant-list">
      ${a}
    </section>
  `}function b(t){let a=JSON.parse(localStorage.getItem("favorites"))||[];a=a.filter(n=>n.id!=t),localStorage.setItem("favorites",JSON.stringify(a)),alert("Plant removed from favourites."),location.reload()}async function y(){const a=location.hash.split("/")[2];try{const n=await fetch(`http://localhost:3000/plants/${a}`);if(!n.ok)throw new Error("Planta no encontrada");const o=await n.json();return`
      <section class="plant-detail">
        <div class="plant-detail-card">
          <img src="${o.imagen}" alt="${o.nombre_comun}" class="plant-detail-image">
          <div class="plant-info">
            <h2>${o.nombre_comun}</h2>
            <h4><em>${o.nombre_cientifico}</em></h4>
            <p>${o.descripcion}</p>
            <p class="plant-category"><strong>Categoría:</strong> ${o.categoria}</p>

            <button class="btn-fav" data-id="${o.id}">Agregar a favoritos</button>
          </div>
        </div>
      </section>
    `}catch(n){return`<p>${n.message}</p>`}}function $(){return`
    <section class="not-found">
        <div class="not-found-box">
            <h1>404</h1>
            <h2>Page not found</h2>
            <p>That is not the static living thing you are looking for</p>
            <button id="btn-go-home">Back to Home</button>
        </div>
    </section>
    `}setTimeout(()=>{const t=document.getElementById("btn-go-home");t&&t.addEventListener("click",()=>{location.hash="#/"})},0);function u(){const t=document.getElementById("view"),a=location.hash.slice(1).toLowerCase()||"/",n={"/":p,"/plantlist":h,"/favourites":v};let o;a.startsWith("/plantdetail/")?o=()=>y(a.split("/")[2]):o=n[a]||$,Promise.resolve(o()).then(e=>{t.innerHTML=e})}const w="/Wikiplant/assets/logo-BHmMt28d.png";function P(){return`
    <header class="header">
        <nav class="nav">
            <div class="logo">
                <img src="${w}">
                <h2>Wikiplant</h2>
            </div>

            <ul class="nav-links">
                <li><a href="#/">Home</a></li>
                <li><a href="#/plantlist">Plant List</a></li>
                <li><a href="#/favourites">Favourites</a></li>
            </ul>
        </nav>
    </header>
    `}function L(){return`
    <footer class="footer">
        <p>© 2025 Plantpedia • All rights reserved</p>
    </footer>
    `}document.querySelector("#app").innerHTML=`
${P()}
<main id="view"></main>
${L()}
`;u();window.addEventListener("hashchange",u);
