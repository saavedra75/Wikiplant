export default function NotFound() {
    return `
    <section class="not-found">
        <div class="not-found-box">
            <h1>404</h1>
            <h2>Page not found</h2>
            <p>That is not the static living thing you are looking for</p>
            <button id="btn-go-home">Back to Home</button>
        </div>
    </section>
    `;
}

setTimeout(() => {
    const btn = document.getElementById("btn-go-home");
    if (btn) {
        btn.addEventListener("click", () => {
            location.hash = "#/";
        });
    }
}, 0);
