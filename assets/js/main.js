$(function(){
  const WHATSAPP_NUMBER = "5518988071968";

  function updateClock(){
    const now = new Date();
    $('#clock').text(new Intl.DateTimeFormat('pt-BR',{
      hour:'2-digit', minute:'2-digit', hour12:false,
      timeZone:'America/Sao_Paulo'
    }).format(now));
  }
  updateClock(); setInterval(updateClock, 1000);

  function closeMenu(){
    $('.menu-overlay').removeClass('active').attr('aria-hidden','true');
    $('body').removeClass('menu-open');
  }
  $('.menu-toggle').on('click', function(){
    $('.menu-overlay').addClass('active').attr('aria-hidden','false');
    $('body').addClass('menu-open');
  });
  $('.menu-close,.menu-nav a').on('click', closeMenu);

  $('.back-to-top').on('click', function(){
    $('html, body').animate({scrollTop:0}, 600);
  });

  const projects = {
    1:{
      number:'01', title:'FILMAGENS',
      description:'Seleção visual de produções audiovisuais, bastidores e registros cinematográficos.',
      items:[
        {type:'image',url:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=85',wide:true},
        {type:'image',url:'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85'},
        {type:'image',url:'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1000&q=85'}
      ]
    },
    2:{
      number:'02', title:'EVENTOS',
      description:'Momentos, pessoas e experiências registrados de forma autêntica.',
      items:[
        {type:'image',url:'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1600&q=85',wide:true},
        {type:'image',url:'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=85'},
        {type:'image',url:'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1000&q=85'}
      ]
    },
    3:{
      number:'03', title:'MARCAS',
      description:'Conteúdo pensado para identidade, posicionamento e presença digital.',
      items:[
        {type:'image',url:'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1600&q=85',wide:true},
        {type:'image',url:'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85'},
        {type:'image',url:'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85'}
      ]
    },
    4:{
      number:'04', title:'AÉREO',
      description:'Perspectivas amplas e imagens que valorizam lugares, eventos e experiências.',
      items:[
        {type:'image',url:'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=1600&q=85',wide:true},
        {type:'image',url:'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=85'},
        {type:'image',url:'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85'}
      ]
    }
  };

  function openProject(id){
    const project=projects[id];
    if(!project)return;
    $('#galleryNumber').text(project.number);
    $('#galleryTitle').text(project.title);
    $('#galleryDescription').text(project.description);
    const grid=$('#galleryGrid').empty();
    project.items.forEach(item=>{
      const card=$('<div class="gallery-item"></div>');
      if(item.wide) card.addClass('wide');
      if(item.type==='video'){
        card.append(`<video controls playsinline preload="metadata"><source src="${item.url}" type="video/mp4"></video>`);
      }else{
        card.append(`<img src="${item.url}" loading="lazy" alt="${project.title}">`);
      }
      grid.append(card);
    });
    $('#galleryModal').addClass('active').attr('aria-hidden','false');
    $('body').addClass('modal-open');
    $('#galleryModal').scrollTop(0);
  }
  $('.project-row').on('click',function(){openProject($(this).data('project'));});
  function closeGallery(){
    $('#galleryModal').removeClass('active').attr('aria-hidden','true');
    $('body').removeClass('modal-open');
    $('#galleryGrid video').each(function(){this.pause();});
  }
  $('#galleryClose').on('click',closeGallery);
  $(document).on('keydown',function(e){
    if(e.key==='Escape'){closeMenu();closeGallery();}
  });

  let counted=false;
  function animateCounters(){
    if(counted)return;
    const stats=$('.stats');
    if(!stats.length)return;
    if($(window).scrollTop()+$(window).height() > stats.offset().top+100){
      counted=true;
      $('.counter').each(function(){
        const el=$(this), target=Number(el.data('target'));
        const prefix=el.data('prefix')||'', suffix=el.data('suffix')||'';
        $({n:0}).animate({n:target},{
          duration:1500,
          step:function(){el.text(prefix+Math.floor(this.n)+suffix);},
          complete:function(){el.text(prefix+target+suffix);}
        });
      });
    }
  }
  $(window).on('scroll',animateCounters);
  animateCounters();

  $('#whatsappForm').on('submit',function(e){
    e.preventDefault();

    const name=$('#name').val().trim();
    const eventType=$('#eventType').val();
    const date=$('#eventDate').val();
    const proposal=$('#proposal').val();
    const message=$('#message').val().trim();

    if(!name || !eventType || !date || !proposal){
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const formattedDate = new Date(date+'T12:00:00').toLocaleDateString('pt-BR');
    const text =
`Olá! Gostaria de solicitar uma proposta.

*Nome:* ${name}
*Tipo de evento/projeto:* ${eventType}
*Data do evento:* ${formattedDate}
*Proposta desejada:* ${proposal}
${message ? `*Mais detalhes:* ${message}` : ''}

Aguardo o retorno. Obrigado(a)!`;

    // IMPORTANTE: altere o número no início deste arquivo.
    const url='https://wa.me/'+WHATSAPP_NUMBER+'?text='+encodeURIComponent(text);
    window.open(url,'_blank','noopener');
  });

  /* =======================================================
     CURSOR PERSONALIZADO
  ======================================================= */
  const cursor = $('<div class="cursor" aria-hidden="true"></div>');
  $('body').append(cursor);

  let mouseX = -100, mouseY = -100;
  let cursorX = -100, cursorY = -100;

  $(document).on('mousemove', function(e){
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor(){
    cursorX += (mouseX - cursorX) * 0.18;
    cursorY += (mouseY - cursorY) * 0.18;
    cursor.css('transform', `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`);
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  $('a, button, input, select, textarea').on('mouseenter', function(){
    cursor.addClass('is-hover');
  }).on('mouseleave', function(){
    cursor.removeClass('is-hover');
  });

  $('.project-row').on('mouseenter', function(){
    cursor.addClass('is-project');
  }).on('mouseleave', function(){
    cursor.removeClass('is-project');
  });

  /* =======================================================
     PARALLAX GLOBAL
  ======================================================= */
  function updateParallax(){
    const scrollTop = $(window).scrollTop();
    const viewport = $(window).height();

    $('.hero-title').each(function(){
      const offset = $(this).offset().top;
      const distance = scrollTop - offset;
      $(this).css('transform', `translateY(${distance * 0.10}px)`);
    });

    $('.about-photo img').each(function(){
      const rect = this.getBoundingClientRect();
      if(rect.bottom > 0 && rect.top < viewport){
        const progress = (rect.top + rect.height/2 - viewport/2) / viewport;
        $(this).css('transform', `scale(1.08) translateY(${progress * 35}px)`);
      }
    });

    $('.stats-grid article').each(function(index){
      const rect = this.getBoundingClientRect();
      if(rect.bottom > 0 && rect.top < viewport){
        const progress = (rect.top + rect.height/2 - viewport/2) / viewport;
        const speed = (index % 2 === 0 ? 1 : -1);
        $(this).find('.counter').css('transform',
          `translateY(${progress * speed * 18}px)`
        );
      }
    });

    $('.project-row').each(function(index){
      const rect = this.getBoundingClientRect();
      if(rect.bottom > 0 && rect.top < viewport){
        const progress = (rect.top + rect.height/2 - viewport/2) / viewport;
        $(this).find('strong').css('transform',
          `translateX(${progress * (index % 2 === 0 ? 12 : -12)}px)`
        );
      }
    });
  }

  /* =======================================================
     REVEAL AO SCROLL
  ======================================================= */
  $('.about h2, .about-copy, .projects-list, .stats-grid, .services-title, .service-list, .contact-grid')
    .addClass('reveal-on-scroll');

  function revealElements(){
    $('.reveal-on-scroll').each(function(){
      const rect = this.getBoundingClientRect();
      if(rect.top < window.innerHeight * 0.86){
        $(this).addClass('is-visible');
      }
    });
  }

  let ticking = false;
  $(window).on('scroll resize', function(){
    if(!ticking){
      requestAnimationFrame(function(){
        updateParallax();
        revealElements();
        ticking = false;
      });
      ticking = true;
    }
  });

  updateParallax();
  revealElements();

});
