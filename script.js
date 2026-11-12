
document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       MENU MOBILE
    ========================================== */

    const menuToggle = document.getElementById("menu-toggle");
    const nav = document.getElementById("nav");
    const navLinks = document.querySelectorAll(".nav a");

    if (menuToggle && nav) {

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

        window.addEventListener("resize", () => {

            if (window.innerWidth > 760) {

                nav.classList.remove("active");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute("aria-expanded", "false");

            }

        });

    }


    /* ==========================================
       CURSOR GLOW
    ========================================== */

    const cursorGlow = document.querySelector(".cursor-glow");

    if (cursorGlow) {

        if (window.matchMedia("(pointer: fine)").matches) {

            document.addEventListener("mousemove", event => {

                cursorGlow.style.left = `${event.clientX}px`;
                cursorGlow.style.top = `${event.clientY}px`;

            });

        } else {

            cursorGlow.style.display = "none";

        }

    }


    /* ==========================================
       SCROLL BUILD ENGINE
    ========================================== */

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    const main = document.querySelector("main");

    if (!main) return;

    const excludedSelectors = [
        "script",
        "style",
        "noscript",
        ".marquee",
        ".logo",
        ".menu-toggle",
        ".cursor-glow",
        ".noise",
        ".status-dot",
        "[aria-hidden='true']"
    ].join(",");

    const walker = document.createTreeWalker(
        main,
        NodeFilter.SHOW_TEXT,
        {
            acceptNode(node) {

                if (!node.nodeValue.trim()) {
                    return NodeFilter.FILTER_REJECT;
                }

                if (node.parentElement.closest(excludedSelectors)) {
                    return NodeFilter.FILTER_REJECT;
                }

                return NodeFilter.FILTER_ACCEPT;

            }
        }
    );

    const textNodes = [];

    while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
    }

    const characters = [];

    textNodes.forEach(node => {

        const text = node.nodeValue;
        const fragment = document.createDocumentFragment();

        [...text].forEach(char => {

            if (/\s/.test(char)) {

                fragment.appendChild(
                    document.createTextNode(char)
                );

                return;

            }

            const span = document.createElement("span");

            span.className = "build-char";
            span.textContent = char;

            fragment.appendChild(span);

            characters.push(span);

        });

        node.parentNode.replaceChild(fragment, node);

    });


    /* ==========================================
       BUILD HUD
    ========================================== */

    const hud = document.createElement("div");

    hud.className = "build-hud";

    hud.innerHTML = `
        <div class="build-hud-top">
            <div class="build-hud-status">
                <span class="build-hud-dot"></span>
                <span>SCROLL ENGINE</span>
            </div>

            <span id="build-percent">000%</span>
        </div>

        <div class="build-hud-binary" id="build-binary">
            01001010
        </div>

        <div class="build-hud-bar">
            <div class="build-hud-progress" id="build-progress"></div>
        </div>
    `;

    document.body.appendChild(hud);

    const percentElement = document.getElementById("build-percent");
    const binaryElement = document.getElementById("build-binary");
    const progressElement = document.getElementById("build-progress");


    /* ==========================================
       ANIMAÇÃO REVERSÍVEL
    ========================================== */

    let ticking = false;

    const clamp = (value, min, max) => {
        return Math.max(min, Math.min(max, value));
    };

    function updateBuild() {

        ticking = false;

        const viewportHeight = window.innerHeight;

        const startPoint = viewportHeight * 0.88;
        const endPoint = viewportHeight * 0.38;

        let visibleCharacters = 0;

        characters.forEach((char, index) => {

            const rect = char.getBoundingClientRect();

            const distance = startPoint - rect.top;

            let progress = clamp(
                distance / (startPoint - endPoint),
                0,
                1
            );

            progress = progress * progress * (3 - 2 * progress);

            const opacity = 0.04 + (progress * 0.96);

            const translateY = (1 - progress) * 12;

            const blur = (1 - progress) * 5;

            char.style.opacity = opacity;

            char.style.transform =
                `translate3d(0, ${translateY}px, 0)`;

            char.style.filter = `blur(${blur}px)`;

            if (progress > 0.98) {
                visibleCharacters++;
            }

            if (progress > 0.05 && progress < 0.85) {

                char.classList.add("is-building");

            } else {

                char.classList.remove("is-building");

            }

        });


        /* PROGRESSO GERAL */

        const pageHeight =
            document.documentElement.scrollHeight - viewportHeight;

        const scrollProgress = pageHeight > 0
            ? clamp(window.scrollY / pageHeight, 0, 1)
            : 0;

        const percentage = Math.round(scrollProgress * 100);

        percentElement.textContent =
            `${String(percentage).padStart(3, "0")}%`;

        progressElement.style.width =
            `${percentage}%`;

        binaryElement.textContent =
            Math.round(scrollProgress * 255)
                .toString(2)
                .padStart(8, "0");

    }


    /* ==========================================
       SCROLL + RESIZE
    ========================================== */

    function requestBuild() {

        if (!ticking) {

            window.requestAnimationFrame(updateBuild);

            ticking = true;

        }

    }

    window.addEventListener("scroll", requestBuild, {
        passive: true
    });

    window.addEventListener("resize", requestBuild);

    window.addEventListener("load", requestBuild);

    updateBuild();


    /* ==========================================
       ANO AUTOMÁTICO
    ========================================== */

    const footerYear = document.querySelector(".footer-bottom span");

    if (footerYear) {

        footerYear.textContent =
            `© ${new Date().getFullYear()} KAIROS PRODEV`;

    }

});
