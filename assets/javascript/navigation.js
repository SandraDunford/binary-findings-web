const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {

        nav.classList.toggle("show");

        menuToggle.textContent =
            nav.classList.contains("show") ? "✕" : "☰";

    });

    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("show");
            menuToggle.textContent = "☰";

        });

    });

}