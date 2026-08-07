/* ============================================================
   RESTAURANTE DO VOVÓ — renderização e comportamento
   Lê tudo de dados.js. Não há conteúdo escrito aqui.
   ============================================================ */

(function () {
  'use strict';

  var TZ = 'America/Sao_Paulo';
  var DIA_INDICE = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  /* ---------- Utilidades ---------- */

  function $(id) { return document.getElementById(id); }

  function texto(el, valor) { if (el) el.textContent = valor; }

  /* Hora atual no fuso de São Paulo — nunca o relógio do
     visitante, que pode estar em outro fuso ou errado. */
  function agoraEmSaoPaulo() {
    var partes = new Intl.DateTimeFormat('en-US', {
      timeZone: TZ,
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).formatToParts(new Date());

    var mapa = {};
    partes.forEach(function (p) { mapa[p.type] = p.value; });

    var hora = parseInt(mapa.hour, 10);
    if (hora === 24) hora = 0;              // meia-noite em alguns motores

    return {
      dia: DIA_INDICE[mapa.weekday],        // 0 = domingo
      minutos: hora * 60 + parseInt(mapa.minute, 10)
    };
  }

  /* dados.js lista de Segunda a Domingo; getDay() usa 0 = domingo */
  function horarioDoDia(dia) {
    return DADOS.horarios[dia === 0 ? 6 : dia - 1];
  }

  function paraMinutos(hhmm) {
    var p = hhmm.split(':');
    return parseInt(p[0], 10) * 60 + parseInt(p[1], 10);
  }

  function humanizarHora(hhmm) {
    var p = hhmm.split(':');
    return p[1] === '00' ? p[0].replace(/^0/, '') + 'h'
                         : p[0].replace(/^0/, '') + 'h' + p[1];
  }

  function humanizarDuracao(min) {
    if (min < 60) return min + ' min';
    var h = Math.floor(min / 60);
    var m = min % 60;
    return m === 0 ? h + 'h' : h + 'h' + (m < 10 ? '0' : '') + m;
  }

  /* ---------- Status aberto / fechado ---------- */

  function calcularStatus() {
    var agora = agoraEmSaoPaulo();
    var hoje = horarioDoDia(agora.dia);

    if (hoje && hoje.abre) {
      var abre = paraMinutos(hoje.abre);
      var fecha = paraMinutos(hoje.fecha);

      if (agora.minutos >= abre && agora.minutos < fecha) {
        var restante = fecha - agora.minutos;
        return {
          aberto: true,
          texto: 'Aberto agora · fecha em ' + humanizarDuracao(restante)
        };
      }

      if (agora.minutos < abre) {
        return {
          aberto: false,
          texto: 'Fechado · abre hoje às ' + humanizarHora(hoje.abre)
        };
      }
    }

    /* Fechado: procura o próximo dia com expediente */
    for (var i = 1; i <= 7; i++) {
      var proximo = horarioDoDia((agora.dia + i) % 7);
      if (proximo && proximo.abre) {
        var quando = i === 1 ? 'amanhã' : proximo.dia.toLowerCase();
        return {
          aberto: false,
          texto: 'Fechado · abre ' + quando + ' às ' + humanizarHora(proximo.abre)
        };
      }
    }

    return { aberto: false, texto: 'Fechado' };
  }

  function pintarStatus() {
    var s = calcularStatus();
    var el = $('status');
    if (!el) return;
    texto($('status-texto'), s.texto);
    el.className = 'status ' + (s.aberto ? 'status--aberto' : 'status--fechado');
  }

  /* ---------- Links de contato ---------- */

  function montarLinks() {
    var tel = 'tel:+55' + DADOS.telefone.replace(/\D/g, '');
    var zap = 'https://wa.me/' + DADOS.whatsapp +
              '?text=' + encodeURIComponent(DADOS.whatsappMensagem);
    var coord = DADOS.endereco.lat + ',' + DADOS.endereco.lng;

    [['cta-telefone', tel], ['barra-telefone', tel], ['rodape-telefone', tel],
     ['barra-whatsapp', zap], ['rodape-whatsapp', zap],
     ['link-gmaps', 'https://www.google.com/maps/search/?api=1&query=' + coord],
     ['link-waze', 'https://waze.com/ul?ll=' + coord + '&navigate=yes']
    ].forEach(function (par) {
      var el = $(par[0]);
      if (el) el.href = par[1];
    });

    texto($('rodape-telefone'), DADOS.telefone);
  }

  /* ---------- Assinatura ---------- */

  function pintarAssinatura() {
    var el = $('assinatura');
    if (!el || !DADOS.assinatura) return;

    /* Destaca a palavra "pimenta" sem usar innerHTML */
    var partes = DADOS.assinatura.split(/(pimenta)/i);
    partes.forEach(function (parte) {
      if (/^pimenta$/i.test(parte)) {
        var em = document.createElement('em');
        em.textContent = parte;
        el.appendChild(em);
      } else if (parte) {
        el.appendChild(document.createTextNode(parte));
      }
    });
  }

  /* ---------- Avaliações ---------- */

  function pintarAvaliacoes() {
    var g = DADOS.avaliacaoGoogle;

    texto($('nota-valor'), g.nota.toFixed(1).replace('.', ','));
    texto($('nota-estrelas'), '★★★★★');
    texto($('nota-fonte'), g.total + ' avaliações no Google');

    var alvo = $('depoimentos');
    if (!alvo) return;

    DADOS.avaliacoes.forEach(function (av) {
      var fig = document.createElement('figure');
      fig.className = 'depoimento entra';

      var quote = document.createElement('blockquote');
      quote.textContent = '“' + av.texto + '”';

      var cap = document.createElement('figcaption');
      cap.textContent = av.autor;

      fig.appendChild(quote);
      fig.appendChild(cap);
      alvo.appendChild(fig);
    });
  }

  /* ---------- Cardápio ---------- */

  function pintarCardapio() {
    var alvo = $('cardapio-conteudo');
    if (!alvo) return;

    /* Sem pratos reais: aviso honesto, não pratos inventados. */
    if (!DADOS.cardapioPronto) {
      var aviso = document.createElement('div');
      aviso.className = 'aviso';

      var p = document.createElement('p');
      p.textContent = DADOS.cardapioAviso;

      var btn = document.createElement('a');
      btn.className = 'btn btn--contorno';
      btn.href = 'tel:+55' + DADOS.telefone.replace(/\D/g, '');
      btn.textContent = 'Ligar para ' + DADOS.telefone;

      aviso.appendChild(p);
      aviso.appendChild(btn);
      alvo.appendChild(aviso);
      return;
    }

    Object.keys(DADOS.cardapio).forEach(function (chave) {
      var cat = DADOS.cardapio[chave];
      if (!cat.itens.length) return;

      var bloco = document.createElement('div');
      bloco.className = 'categoria entra';

      var titulo = document.createElement('h3');
      titulo.className = 'categoria__titulo';
      titulo.textContent = cat.titulo;
      bloco.appendChild(titulo);

      cat.itens.forEach(function (item) {
        var prato = document.createElement('div');
        prato.className = 'prato' + (item.destaque ? ' prato--destaque' : '');

        var nome = document.createElement('p');
        nome.className = 'prato__nome';
        nome.textContent = item.nome;
        prato.appendChild(nome);

        /* Nested pricing: preço junto da descrição, sem "R$"
           e sem coluna à direita. */
        var desc = document.createElement('p');
        desc.className = 'prato__descricao';
        if (item.descricao) {
          desc.appendChild(document.createTextNode(item.descricao + ' '));
        }
        var preco = document.createElement('span');
        preco.className = 'prato__preco';
        preco.textContent = item.preco.toFixed(2).replace('.', ',');
        desc.appendChild(preco);
        prato.appendChild(desc);

        bloco.appendChild(prato);
      });

      alvo.appendChild(bloco);
    });
  }

  /* ---------- Horários ---------- */

  function pintarHorarios() {
    var alvo = $('horarios-lista');
    if (!alvo) return;

    var hoje = agoraEmSaoPaulo().dia;
    var nomeHoje = horarioDoDia(hoje).dia;

    DADOS.horarios.forEach(function (h) {
      var linha = document.createElement('div');
      linha.className = 'horario' +
        (h.dia === nomeHoje ? ' horario--hoje' : '') +
        (h.abre ? '' : ' horario--fechado');

      var dia = document.createElement('span');
      dia.className = 'horario__dia';
      dia.textContent = h.dia;

      var faixa = document.createElement('span');
      faixa.textContent = h.abre
        ? humanizarHora(h.abre) + ' – ' + humanizarHora(h.fecha)
        : 'Fechado';

      linha.appendChild(dia);
      linha.appendChild(faixa);
      alvo.appendChild(linha);
    });
  }

  /* ---------- Endereço ---------- */

  function pintarEndereco() {
    var e = DADOS.endereco;
    var completo = e.rua + ', ' + e.numero;

    var el = $('endereco');
    if (el) {
      el.appendChild(document.createTextNode(completo));
      el.appendChild(document.createElement('br'));
      el.appendChild(document.createTextNode(e.complemento));
    }

    texto($('rodape-endereco'), completo);
  }

  /* ---------- Mapa (Leaflet sob demanda) ---------- */

  function carregarMapa() {
    var alvo = $('mapa');
    if (!alvo || alvo.dataset.pronto) return;
    alvo.dataset.pronto = '1';

    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = '/vendor/leaflet.css';
    document.head.appendChild(css);

    var js = document.createElement('script');
    js.src = '/vendor/leaflet.js';
    js.onload = function () {
      var e = DADOS.endereco;
      var mapa = L.map('mapa', { scrollWheelZoom: false }).setView([e.lat, e.lng], 16);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 19
      }).addTo(mapa);

      L.marker([e.lat, e.lng]).addTo(mapa)
        .bindPopup(DADOS.nome);
    };
    document.body.appendChild(js);
  }

  /* ---------- Disparar algo quando o elemento chega perto da tela ----------
     Usa IntersectionObserver quando existe, mas mantém um plano B por
     evento de rolagem: se o observer não disparar por qualquer motivo,
     o conteúdo ainda aparece e o mapa ainda carrega. */

  function quandoVisivel(el, acao, margem) {
    margem = margem || 0;
    var feito = false;
    var io = null;

    function perto() {
      var r = el.getBoundingClientRect();
      return r.top < window.innerHeight + margem && r.bottom > -margem;
    }

    function limpar() {
      window.removeEventListener('scroll', aoRolar);
      window.removeEventListener('resize', aoRolar);
      if (io) io.disconnect();
    }

    function disparar() {
      if (feito) return;
      feito = true;
      limpar();
      acao();
    }

    function aoRolar() { if (perto()) disparar(); }

    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(function (entradas) {
        if (entradas[0].isIntersecting) disparar();
      }, { rootMargin: margem + 'px' });
      io.observe(el);
    }

    window.addEventListener('scroll', aoRolar, { passive: true });
    window.addEventListener('resize', aoRolar);
    aoRolar();
  }

  /* ---------- Entrada dos blocos ao rolar ---------- */

  function observarEntrada() {
    /* Quem pediu menos movimento no sistema não recebe a animação:
       sem a classe, o CSS deixa tudo visível desde o início. */
    var querMenosMovimento = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (querMenosMovimento) return;

    /* Só esconde o que será revelado depois de garantir que há como
       revelar. Sem esta classe, o CSS deixa tudo visível. */
    document.documentElement.classList.add('js-anima');

    Array.prototype.forEach.call(
      document.querySelectorAll('.entra'),
      function (el) {
        quandoVisivel(el, function () { el.classList.add('visivel'); });
      }
    );
  }

  /* ---------- Início ---------- */

  document.addEventListener('DOMContentLoaded', function () {
    montarLinks();
    pintarStatus();
    pintarAssinatura();
    pintarAvaliacoes();
    pintarCardapio();
    pintarHorarios();
    pintarEndereco();
    observarEntrada();

    /* O status precisa continuar correto sem recarregar a página */
    setInterval(pintarStatus, 60000);

    /* Leaflet só entra quando a seção do mapa se aproxima (~140 KB) */
    var mapa = $('mapa');
    if (mapa) quandoVisivel(mapa, carregarMapa, 300);
  });
})();
