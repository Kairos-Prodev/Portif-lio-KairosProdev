
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
       ANO AUTOMÁTICO
    ========================================== */

    const footerYear = document.querySelector(".footer-bottom span");

    if (footerYear) {
        footerYear.textContent =
            `© ${new Date().getFullYear()} KAIROS PRODEV`;
    }


    /* ==========================================
       REVEAL ORIGINAL
    ========================================== */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }

            });

        }, {
            threshold: 0.12
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* ==========================================
       INTRODUÇÃO CINEMATOGRÁFICA
    ========================================== */

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
        reducedMotion ||
        window.location.hash ||
        !document.querySelector("main")
    ) {
        return;
    }

    const introStyle = document.createElement("style");

    introStyle.textContent = `

        .intro-screen {
            position: fixed;
            inset: 0;
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            background: rgba(5, 9, 7, 0.72);
            color: #c3f56a;
            font-family: 'DM Mono', monospace;
            pointer-events: all;
            opacity: 1;
            transition: opacity 0.55s ease;
        }

        .intro-screen.finished {
            opacity: 0;
            pointer-events: none;
        }

        .intro-grid {
            position: absolute;
            inset: 0;
            opacity: 0.15;
            background-image:
                linear-gradient(rgba(195,245,106,.12) 1px, transparent 1px),
                linear-gradient(90deg, rgba(195,245,106,.12) 1px, transparent 1px);
            background-size: 45px 45px;
        }

        .intro-scan {
            position: absolute;
            left: 0;
            top: -5%;
            width: 100%;
            height: 2px;
            background: #c3f56a;
            box-shadow:
                0 0 12px #c3f56a,
                0 0 35px rgba(195,245,106,.6);
            animation: introScan 1.7s linear infinite;
        }

        .intro-center {
            position: relative;
            z-index: 2;
            width: min(420px, 85vw);
            text-align: center;
        }

        .intro-logo {
            font-family: 'Space Grotesk', sans-serif;
            font-size: clamp(65px, 13vw, 105px);
            font-weight: 700;
            line-height: 1;
            letter-spacing: -8px;
            color: #c3f56a;
            text-shadow: 0 0 35px rgba(195,245,106,.25);
            animation: introPulse 1.5s ease-in-out infinite alternate;
        }

        .intro-name {
            margin-top: 12px;
            color: #ffffff;
            font-family: 'Space Grotesk', sans-serif;
            font-size: 15px;
            font-weight: 600;
            letter-spacing: 5px;
        }

        .intro-status {
            margin-top: 35px;
            font-size: 10px;
            letter-spacing: 2px;
            color: #c3f56a;
        }

        .intro-progress {
            width: 100%;
            height: 2px;
            margin-top: 15px;
            background: rgba(255,255,255,.12);
        }

        .intro-progress-fill {
            width: 0%;
            height: 100%;
            background: #c3f56a;
            box-shadow: 0 0 12px #c3f56a;
        }

        .intro-footer {
            display: flex;
            justify-content: space-between;
            margin-top: 12px;
            color: rgba(255,255,255,.55);
            font-size: 9px;
            letter-spacing: 1px;
        }

        .intro-corner {
            position: absolute;
            color: rgba(195,245,106,.65);
            font-size: 9px;
            letter-spacing: 1px;
        }

        .intro-corner.top-left {
            top: 25px;
            left: 25px;
        }

        .intro-corner.top-right {
            top: 25px;
            right: 25px;
        }

        .intro-corner.bottom-left {
            bottom: 25px;
            left: 25px;
        }

        .intro-corner.bottom-right {
            bottom: 25px;
            right: 25px;
        }

        @keyframes introScan {
            from {
                transform: translateY(0);
            }
            to {
                transform: translateY(110vh);
            }
        }

        @keyframes introPulse {
            from {
                opacity: .75;
                transform: scale(.97);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        @media (max-width: 600px) {

            .intro-grid {
                background-size: 30px 30px;
            }

            .intro-corner {
                font-size: 7px;
            }

            .intro-logo {
                letter-spacing: -5px;
            }

        }

    `;

    document.head.appendChild(introStyle);


    /* ==========================================
       CRIAR INTERFACE
    ========================================== */

    const intro = document.createElement("div");

    intro.className = "intro-screen";

    intro.innerHTML = `

        <div class="intro-grid"></div>
        <div class="intro-scan"></div>

        <span class="intro-corner top-left">
            KAIROS PRODEV / 2026
        </span>

        <span class="intro-corner top-right">
            SYSTEM INITIALIZATION
        </span>

        <span class="intro-corner bottom-left">
            DIGITAL EXPERIENCE
        </span>

        <span class="intro-corner bottom-right">
            <span id="intro-percent">000%</span>
        </span>

        <div class="intro-center">

            <div class="intro-logo">K.</div>

            <div class="intro-name">
                KAIROS PRODEV
            </div>

            <div class="intro-status" id="intro-status">
                INITIALIZING PORTFOLIO
            </div>

            <div class="intro-progress">
                <div class="intro-progress-fill" id="intro-progress"></div>
            </div>

            <div class="intro-footer">
                <span>BUILDING EXPERIENCE</span>
                <span id="intro-binary">01001010</span>
            </div>

        </div>

    `;

    document.body.appendChild(intro);


    /* ==========================================
       CONTROLE DA ANIMAÇÃO
    ========================================== */

    const percent = document.getElementById("intro-percent");
    const progressBar = document.getElementById("intro-progress");
    const status = document.getElementById("intro-status");
    const binary = document.getElementById("intro-binary");

    const durationDown = 1700;
    const durationUp = 1300;
    const pauseDuration = 250;

    let animationRunning = true;
    let animationFrame = null;

    const clamp = (value, min, max) => {
        return Math.max(min, Math.min(max, value));
    };

    const easeInOut = value => {
        return value < 0.5
            ? 4 * value * value * value
            : 1 - Math.pow(-2 * value + 2, 3) / 2;
    };

    function updateHUD(value) {

        const percentage = Math.round(value);

        percent.textContent =
            `${String(percentage).padStart(3, "0")}%`;

        progressBar.style.width = `${percentage}%`;

        binary.textContent = percentage
            .toString(2)
            .padStart(8, "0");

    }

    function animateScroll(start, end, duration, onUpdate, onComplete) {

        const startTime = performance.now();

        function frame(currentTime) {

            if (!animationRunning) return;

            const elapsed = currentTime - startTime;

            const rawProgress = clamp(elapsed / duration, 0, 1);

            const easedProgress = easeInOut(rawProgress);

            const currentPosition =
                start + (end - start) * easedProgress;

            window.scrollTo(0, currentPosition);

            if (onUpdate) {
                onUpdate(rawProgress);
            }

            if (rawProgress < 1) {

                animationFrame = requestAnimationFrame(frame);

            } else {

                window.scrollTo(0, end);

                if (onComplete) {
                    onComplete();
                }

            }

        }

        animationFrame = requestAnimationFrame(frame);

    }


    /* ==========================================
       BLOQUEAR INTERAÇÃO DURANTE A ABERTURA
    ========================================== */

    function preventInteraction(event) {

        if (animationRunning) {
            event.preventDefault();
        }

    }

    function preventKeys(event) {

        const blockedKeys = [
            "ArrowDown",
            "ArrowUp",
            "PageDown",
            "PageUp",
            "Home",
            "End",
            " "
        ];

        if (animationRunning && blockedKeys.includes(event.key)) {
            event.preventDefault();
        }

    }

    window.addEventListener("wheel", preventInteraction, {
        passive: false
    });

    window.addEventListener("touchmove", preventInteraction, {
        passive: false
    });

    window.addEventListener("keydown", preventKeys);


    /* ==========================================
       EXECUTAR ABERTURA
    ========================================== */

    function finishIntro() {

        animationRunning = false;

        window.scrollTo(0, 0);

        status.textContent = "SYSTEM READY";

        updateHUD(100);

        intro.classList.add("finished");

        window.removeEventListener("wheel", preventInteraction);
        window.removeEventListener("touchmove", preventInteraction);
        window.removeEventListener("keydown", preventKeys);

        setTimeout(() => {
            intro.remove();
            introStyle.remove();
        }, 600);

    }

    function startIntro() {

        window.scrollTo(0, 0);

        const pageHeight = Math.max(
            0,
            document.documentElement.scrollHeight - window.innerHeight
        );

        if (pageHeight < 50) {
            finishIntro();
            return;
        }

        animateScroll(
            0,
            pageHeight,
            durationDown,

            progress => {
                status.textContent = "BUILDING PORTFOLIO";
                updateHUD(progress * 50);
            },

            () => {

                status.textContent = "SCANNING COMPONENTS";

                setTimeout(() => {

                    if (!animationRunning) return;

                    animateScroll(
                        pageHeight,
                        0,
                        durationUp,

                        progress => {
                            status.textContent = "FINALIZING INTERFACE";
                            updateHUD(50 + progress * 50);
                        },

                        finishIntro
                    );

                }, pauseDuration);

            }
        );

    }


    /* ==========================================
       INICIAR APÓS CARREGAMENTO
    ========================================== */

    if (document.readyState === "complete") {

        setTimeout(startIntro, 300);

    } else {

        window.addEventListener("load", () => {
            setTimeout(startIntro, 300);
        }, { once: true });

    }

});
