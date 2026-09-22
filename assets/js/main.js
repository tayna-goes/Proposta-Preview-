$(function () {
    'use strict';

    const WHATSAPP_NUMBER = "5518988071968"; // IMPORTANTE: altere o número aqui se necessário.

    /* =======================================================
       RELÓGIO (BR)
    ======================================================= */
    function updateClock() {
        const now = new Date();
        $('#clock').text(new Intl.DateTimeFormat('pt-BR', {
            hour: '2-digit', minute: '2-digit', hour12: false,
            timeZone: 'America/Sao_Paulo'
        }).format(now));
    }
    updateClock();
    setInterval(updateClock, 1000);

    /* =======================================================
       MENU MOBILE
    ======================================================= */
    function closeMenu() {
        $('.menu-overlay').removeClass('active').attr('aria-hidden', 'true');
        $('.menu-toggle').attr('aria-expanded', 'false');
        $('body').removeClass('menu-open');
    }
    $('.menu-toggle').on('click', function () {
        const opening = !$('.menu-overlay').hasClass('active');
        $('.menu-overlay').toggleClass('active', opening).attr('aria-hidden', String(!opening));
        $('.menu-toggle').attr('aria-expanded', String(opening));
        $('body').toggleClass('menu-open', opening);
    });
    $('.menu-close, .menu-nav a').on('click', closeMenu);

    $('.back-to-top').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 600);
    });

    /* =======================================================
       GALERIA DE PROJETOS (com subseções internas)
    ======================================================= */
    // Pool de imagens placeholder — substitua por fotos/vídeos reais do trabalho.
    const IMAGE_POOL = [
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1465101162946-4377e57745c3?auto=format&fit=crop&w=1000&q=80'
    ];

    function buildSubsections(offset) {
        const labels = ['Projeto 1', 'Projeto 2', 'Trends', 'Teasers'];
        return labels.map(function (label, i) {
            const idxA = (offset + i * 2) % IMAGE_POOL.length;
            const idxB = (offset + i * 2 + 1) % IMAGE_POOL.length;
            return {
                label: label,
                items: [
                    { type: 'image', url: IMAGE_POOL[idxA], wide: true },
                    { type: 'image', url: IMAGE_POOL[idxB] }
                ]
            };
        });
    }

    const projects = {
        1: {
            number: '01', title: 'FILMAGENS',
            description: 'Seleção visual de produções audiovisuais, bastidores e registros cinematográficos.',
            subsections: buildSubsections(0)
        },
        2: {
            number: '02', title: 'EVENTOS',
            description: 'Momentos, pessoas e experiências registrados de forma autêntica.',
            subsections: buildSubsections(3)
        },
        3: {
            number: '03', title: 'MARCAS',
            description: 'Conteúdo pensado para identidade, posicionamento e presença digital.',
            subsections: buildSubsections(6)
        },
        4: {
            number: '04', title: 'AÉREO',
            description: 'Perspectivas amplas e imagens que valorizam lugares, eventos e experiências.',
            subsections: buildSubsections(9)
        }
    };

    let lastFocused = null;

    function renderSubsectionItems(project, subsection) {
        const grid = $('#galleryGrid').empty();
        subsection.items.forEach(item => {
            const card = $('<div class="gallery-item"></div>');
            if (item.wide) card.addClass('wide');
            if (item.type === 'video') {
                card.append(`<video controls playsinline preload="metadata"><source src="${item.url}" type="video/mp4"></video>`);
            } else {
                card.append(`<img src="${item.url}" loading="lazy" alt="${project.title} — ${subsection.label}">`);
            }
            grid.append(card);
        });
        $('#galleryGrid').scrollTop(0);
    }

    function openProject(id) {
        const project = projects[id];
        if (!project) return;
        lastFocused = document.activeElement;

        $('#galleryNumber').text(project.number);
        $('#galleryTitle').text(project.title);
        $('#galleryDescription').text(project.description);

        const tabsWrap = $('#galleryTabs').empty();
        project.subsections.forEach(function (subsection, i) {
            const tab = $('<button type="button" class="gallery-tab" role="tab"></button>')
                .text(subsection.label)
                .attr('aria-selected', i === 0 ? 'true' : 'false')
                .toggleClass('is-active', i === 0)
                .on('click', function () {
                    tabsWrap.find('.gallery-tab').removeClass('is-active').attr('aria-selected', 'false');
                    $(this).addClass('is-active').attr('aria-selected', 'true');
                    renderSubsectionItems(project, subsection);
                });
            tabsWrap.append(tab);
        });

        renderSubsectionItems(project, project.subsections[0]);

        $('#galleryModal').addClass('active').attr('aria-hidden', 'false');
        $('body').addClass('modal-open');
        $('#galleryModal').scrollTop(0);
        $('#galleryClose').trigger('focus');
    }

    function closeGallery() {
        $('#galleryModal').removeClass('active').attr('aria-hidden', 'true');
        $('body').removeClass('modal-open');
        $('#galleryGrid video').each(function () { this.pause(); });
        if (lastFocused) lastFocused.focus();
    }

    $('.project-row').on('click', function () { openProject($(this).data('project')); });
    $('#galleryClose').on('click', closeGallery);
    $(document).on('keydown', function (e) {
        if (e.key === 'Escape') { closeMenu(); closeGallery(); }
    });

    /* =======================================================
       CONTADORES (STATUS)
    ======================================================= */
    let counted = false;
    function animateCounters() {
        if (counted) return;
        const stats = $('.stats');
        if (!stats.length) return;
        if ($(window).scrollTop() + $(window).height() > stats.offset().top + 100) {
            counted = true;
            $('.counter').each(function () {
                const el = $(this), target = Number(el.data('target'));
                const prefix = el.data('prefix') || '', suffix = el.data('suffix') || '';
                $({ n: 0 }).animate({ n: target }, {
                    duration: 1500,
                    step: function () { el.text(prefix + Math.floor(this.n) + suffix); },
                    complete: function () { el.text(prefix + target + suffix); }
                });
            });
        }
    }
    $(window).on('scroll', animateCounters);
    animateCounters();

    /* =======================================================
       FORMULÁRIO WHATSAPP
    ======================================================= */
    // Não deixa escolher uma data no passado.
    (function setMinEventDate() {
        const dateInput = document.getElementById('eventDate');
        if (!dateInput) return;
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        dateInput.min = `${yyyy}-${mm}-${dd}`;
    })();

    // Envia uma cópia por e-mail via Web3Forms (grátis: https://web3forms.com).
    // Some silenciosamente se a chave ainda não foi configurada — o WhatsApp continua
    // funcionando normalmente de qualquer forma.
    function sendEmailCopy(fields) {
        const accessKey = document.getElementById('web3formsKey').value;
        if (!accessKey || accessKey === 'COLE_SUA_CHAVE_WEB3FORMS_AQUI') return;

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(fields)
        }).catch(function () {
            // Falha silenciosa: o pedido já segue pelo WhatsApp de qualquer forma.
        });
    }

    $('#whatsappForm').on('submit', function (e) {
        e.preventDefault();

        const $form = $(this);
        const $button = $form.find('.send-button');
        if ($button.prop('disabled')) return;

        // Honeypot anti-spam (Web3Forms): se preenchido, é bot — ignora silenciosamente.
        if ($('input[name="botcheck"]').is(':checked')) return;

        const name = $('#name').val().trim();
        const email = $('#email').val().trim();
        const eventType = $('#eventType').val();
        const date = $('#eventDate').val();
        const proposal = $('#proposal').val();
        const message = $('#message').val().trim();

        if (!name || !eventType || !date || !proposal) {
            alert('Preencha todos os campos obrigatórios.');
            return;
        }

        const todayStr = document.getElementById('eventDate').min;
        if (todayStr && date < todayStr) {
            alert('Escolha uma data a partir de hoje.');
            return;
        }

        const formattedDate = new Date(date + 'T12:00:00').toLocaleDateString('pt-BR');
        const text =
            `Olá! Gostaria de solicitar uma proposta.

*Nome:* ${name}
*Tipo de evento/projeto:* ${eventType}
*Data do evento:* ${formattedDate}
*Proposta desejada:* ${proposal}
${message ? `*Mais detalhes:* ${message}` : ''}

Aguardo o retorno. Obrigado(a)!`;

        const url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(text);

        sendEmailCopy({
            access_key: document.getElementById('web3formsKey').value,
            subject: 'Novo pedido de proposta — Dossi Maker',
            name: name,
            email: email || 'não informado',
            'Tipo de evento': eventType,
            'Data do evento': formattedDate,
            Proposta: proposal,
            Mensagem: message || '—'
        });

        const originalHtml = $button.html();
        $button.prop('disabled', true).addClass('is-sending').html('ABRINDO WHATSAPP... <span>↗</span>');

        window.open(url, '_blank', 'noopener');

        setTimeout(function () {
            $button.prop('disabled', false).removeClass('is-sending').html(originalHtml);
        }, 2200);
    });

    /* =======================================================
       CARROSSEL DE DEPOIMENTOS
    ======================================================= */
    (function setupTestimonialsCarousel() {
        const track = document.getElementById('testimonialsTrack');
        const prevBtn = document.getElementById('testimonialsPrev');
        const nextBtn = document.getElementById('testimonialsNext');
        const dotsWrap = document.getElementById('testimonialsDots');
        if (!track || !prevBtn || !nextBtn || !dotsWrap) return;

        const cards = Array.prototype.slice.call(track.children);
        if (!cards.length) return;

        cards.forEach(function (_, i) {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.setAttribute('aria-label', 'Ir para o depoimento ' + (i + 1));
            if (i === 0) dot.classList.add('is-active');
            dot.addEventListener('click', function () { goTo(i); });
            dotsWrap.appendChild(dot);
        });
        const dots = Array.prototype.slice.call(dotsWrap.children);

        function currentIndex() {
            return Math.round(track.scrollLeft / track.clientWidth);
        }

        function goTo(i) {
            const clamped = Math.max(0, Math.min(cards.length - 1, i));
            track.scrollTo({ left: clamped * track.clientWidth, behavior: 'smooth' });
        }

        function updateActiveDot() {
            const idx = currentIndex();
            dots.forEach(function (d, i) { d.classList.toggle('is-active', i === idx); });
        }

        prevBtn.addEventListener('click', function () { goTo(currentIndex() - 1); });
        nextBtn.addEventListener('click', function () { goTo(currentIndex() + 1); });

        let scrollTicking = false;
        track.addEventListener('scroll', function () {
            if (!scrollTicking) {
                requestAnimationFrame(function () { updateActiveDot(); scrollTicking = false; });
                scrollTicking = true;
            }
        });
        window.addEventListener('resize', updateActiveDot);
    })();

    /* =======================================================
       MODAL — DESENVOLVIDO POR
    ======================================================= */
    (function setupDevModal() {
        const trigger = document.getElementById('devCreditTrigger');
        const modal = document.getElementById('devModal');
        const closeBtn = document.getElementById('devModalClose');
        if (!trigger || !modal) return;

        let lastFocusedDev = null;

        function openDevModal() {
            lastFocusedDev = document.activeElement;
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.classList.add('modal-open');
            closeBtn.focus();
        }

        function closeDevModal() {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('modal-open');
            if (lastFocusedDev) lastFocusedDev.focus();
        }

        trigger.addEventListener('click', openDevModal);
        closeBtn.addEventListener('click', closeDevModal);
        modal.querySelectorAll('[data-close]').forEach(function (el) {
            el.addEventListener('click', closeDevModal);
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && modal.classList.contains('active')) closeDevModal();
        });
    })();

    /* =======================================================
       WHATSAPP FLUTUANTE
    ======================================================= */
    (function setupFloatingWhatsapp() {
        const floatBtn = document.getElementById('whatsappFloat');
        const hero = document.getElementById('inicio');
        if (!floatBtn) return;

        const defaultText = 'Olá! Vim pelo site e gostaria de saber mais sobre os serviços da Dossi Maker.';
        floatBtn.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(defaultText);

        if (!hero) {
            floatBtn.classList.add('is-visible');
            return;
        }

        let ticking = false;
        function toggleVisibility() {
            const heroBottom = hero.getBoundingClientRect().bottom;
            floatBtn.classList.toggle('is-visible', heroBottom < 0);
            ticking = false;
        }
        toggleVisibility();
        window.addEventListener('scroll', function () {
            if (!ticking) {
                requestAnimationFrame(toggleVisibility);
                ticking = true;
            }
        });
    })();

    /* =======================================================
       PLANOS — seleção de plano (log + destaque)
    ======================================================= */
    document.querySelectorAll('.btn-choose').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const card = btn.closest('.pricing-card');
            const tierEl = card ? card.querySelector('.plan-tier') : null;
            const planName = tierEl ? tierEl.textContent.trim() : 'Plano';
            document.querySelectorAll('.pricing-card').forEach(c => c.classList.remove('is-selected'));
            if (card) card.classList.add('is-selected');
            const proposalField = document.getElementById('proposal');
            if (proposalField) {
                proposalField.value = 'Filmagem Completa';
            }
            document.getElementById('contato').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    /* =======================================================
       FAQ (acordeão)
    ======================================================= */
    document.querySelectorAll('.faq-item').forEach(function (item) {
        const q = item.querySelector('.faq-question');
        q.addEventListener('click', function () {
            const wasOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
                if (openItem !== item) {
                    openItem.classList.remove('open');
                    openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                }
            });
            item.classList.toggle('open', !wasOpen);
            q.setAttribute('aria-expanded', String(!wasOpen));
        });
    });

    /* =======================================================
       CURSOR PERSONALIZADO (apenas desktop / ponteiro fino)
    ======================================================= */
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (hasFinePointer) {
        const cursor = $('<div class="cursor" aria-hidden="true"></div>');
        $('body').append(cursor);

        let mouseX = -100, mouseY = -100;
        let cursorX = -100, cursorY = -100;

        $(document).on('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.18;
            cursorY += (mouseY - cursorY) * 0.18;
            cursor.css('transform', `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`);
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        $('a, button, input, select, textarea').on('mouseenter', function () {
            cursor.addClass('is-hover');
        }).on('mouseleave', function () {
            cursor.removeClass('is-hover');
        });

        $('.project-row').on('mouseenter', function () {
            cursor.addClass('is-project');
        }).on('mouseleave', function () {
            cursor.removeClass('is-project');
        });
    }

    /* =======================================================
       PARALLAX + REVEAL — GSAP / ScrollTrigger
       (respeita prefers-reduced-motion e ajusta intensidade por breakpoint)
    ======================================================= */
    if (window.gsap && window.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);

        gsap.matchMedia().add(
            {
                reduceMotion: '(prefers-reduced-motion: reduce)',
                isMobile: '(max-width: 767px)',
                isDesktop: '(min-width: 768px)'
            },
            function (context) {
                const { reduceMotion, isMobile } = context.conditions;

                if (reduceMotion) {
                    // Sem parallax: apenas fade-in simples, sem movimento atrelado ao scroll.
                    gsap.utils.toArray('.reveal-on-scroll').forEach(function (el) {
                        gsap.fromTo(el, { opacity: 0 }, {
                            opacity: 1, duration: 0.6,
                            scrollTrigger: { trigger: el, start: 'top 90%' }
                        });
                    });
                    return;
                }

                const heroStrength = isMobile ? 0.4 : 1;

                // HERO — título e vídeo em profundidades diferentes
                gsap.to('.hero-title', {
                    yPercent: 22 * heroStrength,
                    ease: 'none',
                    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.4 }
                });
                gsap.to('.hero-meta', {
                    yPercent: 10 * heroStrength,
                    opacity: 0.4,
                    ease: 'none',
                    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.4 }
                });
                gsap.to('.hero-video', {
                    scale: 1.18,
                    ease: 'none',
                    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.4 }
                });

                // SOBRE — foto com profundidade
                gsap.fromTo('.about-photo img',
                    { yPercent: -8, scale: 1.12 },
                    {
                        yPercent: 8, scale: 1.12, ease: 'none',
                        scrollTrigger: { trigger: '.about-photo', start: 'top bottom', end: 'bottom top', scrub: 0.5 }
                    }
                );

                // STATUS — contadores com deslocamento alternado
                gsap.utils.toArray('.stats-grid article').forEach(function (article, i) {
                    const dir = i % 2 === 0 ? 1 : -1;
                    gsap.to(article.querySelector('.counter'), {
                        yPercent: 14 * dir * heroStrength,
                        ease: 'none',
                        scrollTrigger: { trigger: article, start: 'top bottom', end: 'bottom top', scrub: 0.5 }
                    });
                });

                // PROJETOS — leve deriva horizontal no título de cada linha
                gsap.utils.toArray('.project-row').forEach(function (row, i) {
                    const dir = i % 2 === 0 ? 1 : -1;
                    gsap.to(row.querySelector('strong'), {
                        xPercent: 6 * dir,
                        ease: 'none',
                        scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: 0.5 }
                    });
                });

                // FINAL — imagem de fundo com zoom sutil ligado ao scroll
                gsap.fromTo('.finish-bg',
                    { scale: 1.05 },
                    {
                        scale: 1.18, ease: 'none',
                        scrollTrigger: { trigger: '.finish', start: 'top bottom', end: 'bottom top', scrub: 0.5 }
                    }
                );

                // REVEAL — entrada suave dos blocos de conteúdo
                gsap.utils.toArray('.reveal-on-scroll').forEach(function (el) {
                    gsap.fromTo(el,
                        { opacity: 0, y: 45 },
                        {
                            opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
                            scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' }
                        }
                    );
                });
            }
        );
    } else {
        // Fallback sem GSAP: garante que o conteúdo fique visível.
        document.querySelectorAll('.reveal-on-scroll').forEach(function (el) {
            el.style.opacity = 1;
        });
    }
});
