
document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav");
    const navLinks = document.querySelectorAll(".nav a");

    // MENU MOBILE

    menuToggle.addEventListener("click", () => {
        const isActive = nav.classList.toggle("active");

        menuToggle.classList.toggle("active", isActive);
        menuToggle.setAttribute("aria-expanded", String(isActive));
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });


    // ANIMAÇÕES DE ENTRADA

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // EFEITO DE LUZ SEGUINDO O MOUSE

    const cursorGlow = document.querySelector(".cursor-glow");

    if (window.matchMedia("(pointer: fine)").matches) {

        document.addEventListener("mousemove", event => {

            cursorGlow.style.left = `${event.clientX}px`;
            cursorGlow.style.top = `${event.clientY}px`;

        });

    } else {
        cursorGlow.style.display = "none";
    }


    // FECHAR MENU AO REDIMENSIONAR A TELA

    window.addEventListener("resize", () => {

        if (window.innerWidth > 760) {
            nav.classList.remove("active");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }

    });


    // ANO AUTOMÁTICO NO RODAPÉ

    const footerYear = document.querySelector(".footer-bottom span");

    if (footerYear) {
        footerYear.textContent = `© ${new Date().getFullYear()} KAIROS PRODEV`;
    }

});
