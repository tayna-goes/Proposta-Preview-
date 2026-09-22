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

    (function setupReelCarousel() {
        const track = document.getElementById('reelTrack');
        if (!track) return;

        const REEL_IMAGES = [
            './assets/images/carousel/1.jpeg',
            './assets/images/carousel/2.jpeg',
            './assets/images/carousel/3.jpeg',
            './assets/images/carousel/4.jpeg',
            './assets/images/carousel/5.jpeg',
            './assets/images/carousel/6.jpeg',
            './assets/images/carousel/7.jpeg',
            './assets/images/carousel/8.jpeg',
            './assets/images/carousel/9.jpeg',
            './assets/images/carousel/10.jpeg',
            './assets/images/carousel/11.jpeg',
            './assets/images/carousel/12.jpeg',
            './assets/images/carousel/13.jpeg',
            './assets/images/carousel/14.jpeg',
            './assets/images/carousel/15.jpeg',
            './assets/images/carousel/16.jpeg',
            './assets/images/carousel/17.jpeg',
            './assets/images/carousel/18.jpeg',
            './assets/images/carousel/19.jpeg',
            './assets/images/carousel/20.jpeg',
            './assets/images/carousel/21.jpeg',
            './assets/images/carousel/22.jpeg',
            './assets/images/carousel/23.jpeg',
            './assets/images/carousel/24.jpeg',
            './assets/images/carousel/25.jpeg'
        ];

        // Fisher-Yates
        function shuffle(arr) {
            const a = arr.slice();
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }

        const shuffled = shuffle(REEL_IMAGES);

        function appendSet(hidden) {
            shuffled.forEach(function (url) {
                const img = document.createElement('img');
                img.src = url;
                img.alt = '';
                img.loading = 'lazy';
                if (hidden) img.setAttribute('aria-hidden', 'true');
                track.appendChild(img);
            });
        }

        appendSet(false);
        appendSet(true);
    })();

    const IMAGE_POOL = [
        './assets/images/carousel/1.jpeg',
        './assets/images/carousel/2.jpeg',
        './assets/images/carousel/3.jpeg',
        './assets/images/carousel/4.jpeg',
        './assets/images/carousel/5.jpeg',
        './assets/images/carousel/6.jpeg',
        './assets/images/carousel/7.jpeg',
        './assets/images/carousel/8.jpeg',
        './assets/images/carousel/9.jpeg',
        './assets/images/carousel/10.jpeg',
        './assets/images/carousel/11.jpeg',
        './assets/images/carousel/12.jpeg',
        './assets/images/carousel/13.jpeg',
        './assets/images/carousel/14.jpeg',
        './assets/images/carousel/15.jpeg',
        './assets/images/carousel/16.jpeg',
        './assets/images/carousel/17.jpeg',
        './assets/images/carousel/18.jpeg',
        './assets/images/carousel/19.jpeg',
        './assets/images/carousel/20.jpeg',
        './assets/images/carousel/21.jpeg',
        './assets/images/carousel/22.jpeg',
        './assets/images/carousel/23.jpeg',
        './assets/images/carousel/24.jpeg',
        './assets/images/carousel/25.jpeg'
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

    (function setMinEventDate() {
        const dateInput = document.getElementById('eventDate');
        if (!dateInput) return;
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        dateInput.min = `${yyyy}-${mm}-${dd}`;
    })();

    /* =======================================================
       PROPOSTA EM CASCATA — depende do Tipo de Evento
       Casamento → Silver / Gold / Black (os planos)
       Outro tipo → lista normal de serviços
    ======================================================= */
    const PROPOSAL_OPTIONS = {
        casamento: ['Silver', 'Gold', 'Black'],
        outros: ['Filmagem Completa', 'Fotografia', 'Fotos + Vídeos', 'Vídeo para Redes Sociais',
            'Imagens Aéreas com Drone', 'Proposta Personalizada']
    };

    function populateProposalOptions(eventTypeValue) {
        const proposalField = document.getElementById('proposal');
        if (!proposalField) return;

        proposalField.innerHTML = '';

        if (!eventTypeValue) {
            const opt = document.createElement('option');
            opt.value = '';
            opt.textContent = 'Selecione o tipo de evento primeiro';
            proposalField.appendChild(opt);
            proposalField.value = '';
            proposalField.disabled = true;
            return;
        }

        const placeholder = document.createElement('option');
        placeholder.value = '';
        placeholder.textContent = 'Selecione a proposta';
        proposalField.appendChild(placeholder);

        const isWedding = eventTypeValue === 'Casamento';
        const list = isWedding ? PROPOSAL_OPTIONS.casamento : PROPOSAL_OPTIONS.outros;

        list.forEach(function (label) {
            const opt = document.createElement('option');
            opt.value = label;
            opt.textContent = isWedding ? ('Pacote ' + label) : label;
            proposalField.appendChild(opt);
        });

        proposalField.disabled = false;
    }

    (function setupProposalCascade() {
        const eventTypeField = document.getElementById('eventType');
        if (!eventTypeField) return;
        populateProposalOptions(eventTypeField.value); // estado inicial
        eventTypeField.addEventListener('change', function () {
            populateProposalOptions(this.value);
        });
    })();

    function sendToNetlify(formEl) {
        const body = new URLSearchParams(new FormData(formEl)).toString();
        return fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body
        }).catch(function () {
        });
    }

    // Alternativa portátil via Web3Forms (grátis: https://web3forms.com) — útil se um
    // dia o site sair do Netlify. Só dispara se uma chave real tiver sido configurada.
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

        sendToNetlify($form.get(0));

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
       PLANOS — "Escolher Plano" leva pro formulário já preenchido
       (Tipo de Evento = Casamento, Proposta = plano escolhido)
    ======================================================= */
    const PLAN_NAMES = { 'btn-silver': 'Silver', 'btn-gold': 'Gold', 'btn-black': 'Black' };

    document.querySelectorAll('.btn-choose').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const card = btn.closest('.pricing-card');
            const planName = PLAN_NAMES[btn.id];

            document.querySelectorAll('.pricing-card').forEach(c => c.classList.remove('is-selected'));
            if (card) card.classList.add('is-selected');

            const eventTypeField = document.getElementById('eventType');
            if (eventTypeField) {
                eventTypeField.value = 'Casamento';
                populateProposalOptions('Casamento');
            }
            const proposalField = document.getElementById('proposal');
            if (proposalField && planName) {
                proposalField.value = planName;
            }

            document.getElementById('contato').scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(function () {
                const nameField = document.getElementById('name');
                if (nameField) nameField.focus();
            }, 500);
        });
    });

    /* =======================================================
       PLANEJAMENTO & CONDIÇÕES — abas de ano atualizam o preço
       exibido em cada card de plano (2027 = +15% / 2028 = +35%)
    ======================================================= */
    (function setupPricingConditions() {
        const tabsWrap = document.getElementById('pcTabs');
        if (!tabsWrap) return;

        const BASE_PRICES = {
            silver: 1599,
            gold: 1999,
            black: 2399
        };

        const YEARS = {
            '2026': { multiplier: 1, tagLabel: null },
            '2027': { multiplier: 1.15, tagLabel: '+15%' },
            '2028': { multiplier: 1.35, tagLabel: '+35%' }
        };

        const tabs = tabsWrap.querySelectorAll('.pc-tab');

        function formatPrice(value) {
            const hasCents = Math.round(value * 100) % 100 !== 0;
            return value.toLocaleString('pt-BR', {
                minimumFractionDigits: hasCents ? 2 : 0,
                maximumFractionDigits: 2
            });
        }

        function renderYear(year) {
            const info = YEARS[year] || YEARS['2026'];

            Object.keys(BASE_PRICES).forEach(function (slug) {
                const priceEl = document.getElementById('price-' + slug);
                const tagEl = document.getElementById('tag-' + slug);
                if (!priceEl || !tagEl) return;

                const price = BASE_PRICES[slug] * info.multiplier;
                priceEl.textContent = formatPrice(price);

                if (info.tagLabel) {
                    tagEl.textContent = info.tagLabel;
                    tagEl.hidden = false;
                } else {
                    tagEl.hidden = true;
                }
            });
        }

        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                tabs.forEach(function (t) {
                    t.classList.remove('is-active');
                    t.setAttribute('aria-selected', 'false');
                });
                tab.classList.add('is-active');
                tab.setAttribute('aria-selected', 'true');
                renderYear(tab.dataset.year);
            });
        });

        renderYear('2026');
    })();

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

    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (hasFinePointer) {
        document.body.classList.add('has-custom-cursor');
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

                    gsap.utils.toArray('.reveal-on-scroll').forEach(function (el) {
                        gsap.fromTo(el, { opacity: 0 }, {
                            opacity: 1, duration: 0.6,
                            scrollTrigger: { trigger: el, start: 'top 90%' }
                        });
                    });
                    return;
                }

                const heroStrength = isMobile ? 0.4 : 1;

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

                gsap.fromTo('.about-photo img',
                    { yPercent: -8, scale: 1.12 },
                    {
                        yPercent: 8, scale: 1.12, ease: 'none',
                        scrollTrigger: { trigger: '.about-photo', start: 'top bottom', end: 'bottom top', scrub: 0.5 }
                    }
                );

                gsap.utils.toArray('.stats-grid article').forEach(function (article, i) {
                    const dir = i % 2 === 0 ? 1 : -1;
                    gsap.to(article.querySelector('.counter'), {
                        yPercent: 14 * dir * heroStrength,
                        ease: 'none',
                        scrollTrigger: { trigger: article, start: 'top bottom', end: 'bottom top', scrub: 0.5 }
                    });
                });

                gsap.utils.toArray('.project-row').forEach(function (row, i) {
                    const dir = i % 2 === 0 ? 1 : -1;
                    gsap.to(row.querySelector('strong'), {
                        xPercent: 6 * dir,
                        ease: 'none',
                        scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: 0.5 }
                    });
                });

                gsap.fromTo('.finish-bg',
                    { scale: 1.05 },
                    {
                        scale: 1.18, ease: 'none',
                        scrollTrigger: { trigger: '.finish', start: 'top bottom', end: 'bottom top', scrub: 0.5 }
                    }
                );

                /* ---- Parallax extra entre seções (contínuo, ativa a cada scroll) ---- */

                gsap.utils.toArray('.service-list > div').forEach(function (item, i) {
                    const dir = i % 2 === 0 ? 1 : -1;
                    gsap.to(item, {
                        yPercent: 10 * dir * heroStrength,
                        ease: 'none',
                        scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: 0.6 }
                    });
                });

                gsap.utils.toArray('.process-grid article').forEach(function (article, i) {
                    const dir = i % 2 === 0 ? -1 : 1;
                    gsap.to(article, {
                        yPercent: 12 * dir * heroStrength,
                        ease: 'none',
                        scrollTrigger: { trigger: article, start: 'top bottom', end: 'bottom top', scrub: 0.6 }
                    });
                });

                /* Anima o miolo do card (não o .pricing-card em si), pra não
                   brigar com o transform do hover/seleção definido em CSS. */
                gsap.utils.toArray('.pricing-card').forEach(function (card, i) {
                    const inner = card.querySelector(':scope > div');
                    if (!inner) return;
                    const dir = i % 2 === 0 ? 1 : -1;
                    gsap.to(inner, {
                        yPercent: 5 * dir * heroStrength,
                        ease: 'none',
                        scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 0.6 }
                    });
                });

                gsap.utils.toArray('.testimonial-card').forEach(function (card) {
                    gsap.fromTo(card,
                        { yPercent: 6 },
                        {
                            yPercent: -6, ease: 'none',
                            scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 0.6 }
                        }
                    );
                });

                gsap.utils.toArray('.faq-item').forEach(function (item, i) {
                    const dir = i % 2 === 0 ? 1 : -1;
                    gsap.to(item, {
                        xPercent: 3 * dir,
                        ease: 'none',
                        scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: 0.6 }
                    });
                });

                if (document.querySelector('.coverage-map')) {
                    gsap.fromTo('.coverage-map',
                        { scale: 1.08 },
                        {
                            scale: 1, ease: 'none',
                            scrollTrigger: { trigger: '.coverage', start: 'top bottom', end: 'bottom top', scrub: 0.5 }
                        }
                    );
                }

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
        document.querySelectorAll('.reveal-on-scroll').forEach(function (el) {
            el.style.opacity = 1;
        });
    }
});
