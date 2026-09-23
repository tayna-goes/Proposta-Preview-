$(function () {
    'use strict';

    const WHATSAPP_NUMBER = "5518988071968";

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
        const maxDate = new Date(today);
        maxDate.setFullYear(maxDate.getFullYear() + 3);
        dateInput.max = `${maxDate.getFullYear()}-${String(maxDate.getMonth() + 1).padStart(2, '0')}-${String(maxDate.getDate()).padStart(2, '0')}`;
    })();


    const formLoadedAt = Date.now();
    (function stampLoadTime() {
        const el = document.getElementById('loadedAt');
        if (el) el.value = String(formLoadedAt);
    })();


    (function setupPhoneMask() {
        const phoneInput = document.getElementById('phone');
        if (!phoneInput) return;

        function maskPhone(value) {
            let digits = value.replace(/\D/g, '').slice(0, 11);
            if (digits.length === 0) return '';
            if (digits.length <= 2) return '(' + digits;
            if (digits.length <= 6) return '(' + digits.slice(0, 2) + ') ' + digits.slice(2);
            if (digits.length <= 10) {
                return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 6) + '-' + digits.slice(6);
            }
            return '(' + digits.slice(0, 2) + ') ' + digits.slice(2, 7) + '-' + digits.slice(7);
        }

        phoneInput.addEventListener('input', function () {
            const cursorWasAtEnd = phoneInput.selectionEnd === phoneInput.value.length;
            phoneInput.value = maskPhone(phoneInput.value);
            if (cursorWasAtEnd) {
                phoneInput.selectionStart = phoneInput.selectionEnd = phoneInput.value.length;
            }
        });
        phoneInput.addEventListener('paste', function () {
            setTimeout(function () { phoneInput.value = maskPhone(phoneInput.value); }, 0);
        });
    })();


    const FORM_VALIDATORS = {
        name: function (value) {
            const v = value.trim();
            if (!v) return 'Digite seu nome.';
            if (v.length < 3) return 'Nome muito curto.';
            if (!/^[A-Za-zÀ-ÖØ-öø-ÿ' ]{3,80}$/.test(v)) return 'Use apenas letras e espaços.';
            if (!/[A-Za-zÀ-ÖØ-öø-ÿ]{2,}/.test(v)) return 'Digite um nome válido.';
            return '';
        },
        phone: function (value) {
            const digits = value.replace(/\D/g, '');
            if (!digits) return 'Informe seu WhatsApp.';
            if (digits.length < 10 || digits.length > 11) return 'Telefone incompleto. Ex: (18) 99999-9999.';
            if (/^(\d)\1+$/.test(digits)) return 'Telefone inválido.';
            return '';
        },
        email: function (value) {
            const v = value.trim();
            if (!v) return '';
            const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
            return ok ? '' : 'E-mail inválido.';
        },
        eventType: function (value) {
            return value ? '' : 'Selecione o tipo de evento.';
        },
        eventDate: function (value, input) {
            if (!value) return 'Escolha uma data.';
            const min = input.min;
            const max = input.max;
            if (min && value < min) return 'A data precisa ser a partir de hoje.';
            if (max && value > max) return 'Data muito distante. Fale direto pelo WhatsApp.';
            return '';
        },
        proposal: function (value) {
            return value ? '' : 'Selecione a proposta desejada.';
        }
    };

    function showFieldError(fieldName, message) {
        const $field = $('#' + fieldName).closest('.field');
        const $error = $('#err-' + fieldName);
        if (message) {
            $field.addClass('has-error');
            $error.text(message);
        } else {
            $field.removeClass('has-error');
            $error.text('');
        }
    }

    function validateField(fieldName) {
        const validator = FORM_VALIDATORS[fieldName];
        if (!validator) return true;
        const input = document.getElementById(fieldName);
        if (!input) return true;
        const message = validator(input.value, input);
        showFieldError(fieldName, message);
        return !message;
    }

    (function setupLiveValidation() {
        Object.keys(FORM_VALIDATORS).forEach(function (fieldName) {
            const input = document.getElementById(fieldName);
            if (!input) return;
            input.addEventListener('blur', function () { validateField(fieldName); });
            input.addEventListener('input', function () {
                if ($('#' + fieldName).closest('.field').hasClass('has-error')) validateField(fieldName);
            });
            input.addEventListener('change', function () { validateField(fieldName); });
        });
    })();

    const PROPOSAL_OPTIONS = {
        casamento: ['Silver', 'Gold', 'Black'],
        outros: ['Filmagem Completa', 'Fotografia', 'Fotos + Vídeos', 'Vídeo para Redes Sociais', 'Imagens Aéreas com Drone', 'Proposta Personalizada']
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

    function sendEmailCopy(fields) {
        const accessKey = document.getElementById('web3formsKey').value;
        if (!accessKey || accessKey === 'COLE_SUA_CHAVE_WEB3FORMS_AQUI') return;

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(fields)
        }).catch(function () {
        });
    }

    function sanitizeSingleLine(value) {
        return value.replace(/[\r\n]+/g, ' ').trim();
    }

    $('#whatsappForm').on('submit', function (e) {
        e.preventDefault();

        const $form = $(this);
        const $button = $form.find('.send-button');
        if ($button.prop('disabled')) return;
        if ($('#botcheck').val()) return;
        if (Date.now() - formLoadedAt < 2000) return;

        const fieldsToValidate = ['name', 'phone', 'email', 'eventType', 'eventDate', 'proposal'];
        let firstInvalid = null;
        let allValid = true;
        fieldsToValidate.forEach(function (fieldName) {
            const ok = validateField(fieldName);
            if (!ok) {
                allValid = false;
                if (!firstInvalid) firstInvalid = fieldName;
            }
        });

        if (!allValid) {
            const el = document.getElementById(firstInvalid);
            if (el) { el.focus(); el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
            return;
        }

        const name = sanitizeSingleLine($('#name').val());
        const phoneRaw = $('#phone').val();
        const phone = sanitizeSingleLine(phoneRaw);
        const email = sanitizeSingleLine($('#email').val());
        const eventType = $('#eventType').val();
        const date = $('#eventDate').val();
        const proposal = $('#proposal').val();
        const message = $('#message').val().trim().slice(0, 600);

        const formattedDate = new Date(date + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
        const emojis = {
            wave: String.fromCodePoint(0x1F44B),
            smile: String.fromCodePoint(0x1F60A),
            clipboard: String.fromCodePoint(0x1F4CB),
            person: String.fromCodePoint(0x1F464),
            phone: String.fromCodePoint(0x1F4F1),
            party: String.fromCodePoint(0x1F389),
            calendar: String.fromCodePoint(0x1F4C5),
            money: String.fromCodePoint(0x1F4B0),
            note: String.fromCodePoint(0x1F4DD),
            sparkle: String.fromCodePoint(0x2728),
            pray: String.fromCodePoint(0x1F64F)
        };

const text = `${emojis.wave} Olá, Caio Dossi! Tudo bem?

Vim pelo site e gostaria de solicitar uma proposta. ${emojis.smile}

${emojis.clipboard} *Dados da solicitação*

${emojis.person} *Nome:* ${name}
${emojis.phone} *WhatsApp:* ${phone}
${emojis.party} *Tipo de evento/projeto:* ${eventType}
${emojis.calendar} *Data do evento:* ${formattedDate}
${emojis.money} *Proposta desejada:* ${proposal}${message ? `

${emojis.note} *Mais detalhes:*
${message}` : ''}

${emojis.sparkle} Fico no aguardo do retorno com os próximos passos.

Obrigado(a)! ${emojis.pray}`;

const whatsappUrl = `https://wa.me/5518988071968?text=${encodeURIComponent(text)}`;

window.open(whatsappUrl, '_blank');

        sendToNetlify($form.get(0));

        sendEmailCopy({
            access_key: document.getElementById('web3formsKey').value,
            subject: 'Novo pedido de proposta — Dossi Maker',
            name: name,
            phone: phone,
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
            $form.get(0).reset();
            fieldsToValidate.forEach(function (fieldName) { showFieldError(fieldName, ''); });
            populateProposalOptions('');
        }, 2200);
    });


    function initTestimonialsDragSlider(root) {
        root = root || document;
        const sections = root.querySelectorAll('[data-effect="testimonials-drag-slider"]');

        sections.forEach(function (section) {
            const track = section.querySelector('[data-testimonials-track]');
            if (!track) return;

            const originals = Array.prototype.slice.call(track.querySelectorAll('[data-testimonial-slide]'));
            if (!originals.length) return;

            let i = 0;
            while (track.querySelectorAll('[data-testimonial-slide]').length < 10) {
                const clone = originals[i % originals.length].cloneNode(true);
                clone.setAttribute('data-cloned-slide', 'true');
                track.appendChild(clone);
                i++;
            }

            let items = [];
            let layers = [0, 0, 0];
            let current = 0;
            let lastTime = performance.now();
            let active = false;
            let resizing = false;
            let dragging = false;
            let dragStartScroll = 0;
            let pointerStartX = 0;
            let pointerStartY = 0;
            let totalMove = 0;
            let rafId = null;

            const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
            let reducedMotion = reduceMotionQuery.matches;
            if (reduceMotionQuery.addEventListener) {
                reduceMotionQuery.addEventListener('change', function (e) { reducedMotion = e.matches; });
            }

            function speedMultiplier() {
                return window.matchMedia('(min-width: 650px)').matches ? 2 : 3.5;
            }

            function setup() {
                resizing = true;
                const slides = Array.prototype.slice.call(track.querySelectorAll('[data-testimonial-slide]'));
                let offset = 0;
                items = slides.map(function (el, idx) {
                    const width = el.getBoundingClientRect().width;
                    const gap = parseFloat(getComputedStyle(el).marginLeft) || 0;
                    const start = offset + gap;
                    const end = start + width;
                    offset = end;
                    return {
                        el: el,
                        layer: idx % 3,
                        start: start,
                        end: end,
                        width: width,
                        rotation: (idx % 2 === 0 ? -1 : 1) * (Math.random() * 3 + 2)
                    };
                });
                const maxOffset = offset;
                requestAnimationFrame(function () { resizing = false; });
                return maxOffset;
            }

            let maxOffset = setup();

            function render() {
                if (resizing || !items.length) return;
                items.forEach(function (item) {
                    let x = gsap.utils.wrap(-(maxOffset - item.end), item.end, layers[item.layer]);
                    const start = -item.width - 40;
                    const end = maxOffset + 40;
                    if (x < start || x > end) {
                        item.el.style.visibility = 'hidden';
                        return;
                    }
                    item.el.style.visibility = '';
                    const velocityOffset = Math.round((layers[0] - current) * 1000) / 1000;
                    const rawTilt = velocityOffset * 0.03;
                    const tilt = Math.sign(rawTilt) * 10 * (1 - Math.exp(-Math.abs(rawTilt) / 10));
                    item.el.style.transform = 'translate3d(' + (-x) + 'px,0,0) rotate(' + (item.rotation + tilt) + 'deg)';
                });
            }

            function tick(time) {
                rafId = requestAnimationFrame(tick);
                const ratio = Math.max(0.25, Math.min(4, (time - lastTime) / 16.6667));
                lastTime = time;
                if (active && !dragging && !reducedMotion) current += 0.5 * ratio;
                layers[0] += (current - layers[0]) * 0.09 * ratio;
                layers[1] += (current - layers[1]) * 0.10 * ratio;
                layers[2] += (current - layers[2]) * 0.11 * ratio;
                render();
            }
            rafId = requestAnimationFrame(tick);

            section.addEventListener('wheel', function (e) {
                if (!active) return;
                current += e.deltaY * 0.5;
            }, { passive: true });

            function pointerDown(e) {
                const point = e.touches ? e.touches[0] : e;
                dragging = true;
                section.classList.add('is-dragging');
                pointerStartX = point.clientX;
                pointerStartY = point.clientY;
                totalMove = 0;
                dragStartScroll = current + pointerStartX * speedMultiplier();
            }

            function pointerMove(e) {
                if (!dragging) return;
                const point = e.touches ? e.touches[0] : e;
                const dx = point.clientX - pointerStartX;
                const dy = point.clientY - pointerStartY;
                totalMove = Math.abs(dx);
                if (Math.abs(dx) > Math.abs(dy) && e.cancelable) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                current = dragStartScroll - point.clientX * speedMultiplier();
            }

            function pointerUp() {
                if (!dragging) return;
                dragging = false;
                section.classList.remove('is-dragging');
                if (totalMove >= 10 && items.length) {
                    const snapPoints = items.map(function (item) { return item.start; });
                    const wrapped = gsap.utils.wrap(0, maxOffset, current);
                    const target = gsap.utils.snap(snapPoints, wrapped);
                    current += target - wrapped;
                }
            }

            section.addEventListener('mousedown', pointerDown);
            section.addEventListener('touchstart', pointerDown, { passive: true });
            section.addEventListener('mousemove', pointerMove, { passive: false });
            section.addEventListener('touchmove', pointerMove, { passive: false });
            window.addEventListener('mouseup', pointerUp);
            window.addEventListener('touchend', pointerUp);

            function moveToAdjacentSlide(direction) {
                if (!items.length) return;
                const wrapped = gsap.utils.wrap(0, maxOffset, current);
                const starts = items.map(function (item) { return item.start; }).sort(function (a, b) { return a - b; });
                let target;
                if (direction > 0) {
                    target = starts.find(function (p) { return p > wrapped + 1; });
                    if (target === undefined) target = starts[0] + maxOffset;
                } else {
                    const reversed = starts.slice().reverse();
                    target = reversed.find(function (p) { return p < wrapped - 1; });
                    if (target === undefined) target = starts[starts.length - 1] - maxOffset;
                }
                current += target - wrapped;
            }

            section.addEventListener('keydown', function (e) {
                if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    moveToAdjacentSlide(1);
                } else if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    moveToAdjacentSlide(-1);
                }
            });

            if (window.ScrollTrigger) {
                ScrollTrigger.create({
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    onToggle: function (self) { active = self.isActive; }
                });
            } else {
                active = true;
            }

            let resizeTimer;
            window.addEventListener('resize', function () {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function () { maxOffset = setup(); }, 200);
            });
        });
    }
    initTestimonialsDragSlider();

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

        const defaultText = 'Olá! Vim pelo site e gostaria de saber mais sobre os serviços do Dossi Maker.';
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
