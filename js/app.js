// Função para calcular status aberto/fechado em São Paulo
function calcularStatusAberto() {
  const agora = new Date();

  // Converter para fuso de São Paulo
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    weekday: 'long'
  });

  const partes = formatter.formatToParts(agora);
  const hora = parseInt(partes.find(p => p.type === 'hour').value);
  const minuto = parseInt(partes.find(p => p.type === 'minute').value);
  const diaSemana = partes.find(p => p.type === 'weekday').value;

  const agoras_minutos = hora * 60 + minuto;
  const abre_minutos = 7 * 60; // 07:00
  const fecha_minutos = 15 * 60; // 15:00

  // Domingo = fechado
  if (diaSemana === 'domingo') {
    return {
      aberto: false,
      mensagem: 'Fechado · Abre segunda 7h',
      hora_fechamento: null
    };
  }

  // Horário de operação
  if (agoras_minutos >= abre_minutos && agoras_minutos < fecha_minutos) {
    return {
      aberto: true,
      mensagem: `Aberto agora · Fecha ${hora + (minuto >= 30 ? 1 : 0)}h`,
      hora_fechamento: 15 * 60
    };
  } else if (agoras_minutos < abre_minutos) {
    return {
      aberto: false,
      mensagem: 'Fechado · Abre hoje 7h',
      hora_fechamento: null
    };
  } else {
    return {
      aberto: false,
      mensagem: 'Fechado · Abre amanhã 7h',
      hora_fechamento: null
    };
  }
}

// Renderizar dados
function renderizar() {
  // Status
  const status = calcularStatusAberto();
  const statusEl = document.querySelector('header .status');
  if (statusEl) {
    statusEl.textContent = status.mensagem;
    statusEl.className = 'status ' + (status.aberto ? 'aberto' : 'fechado');
  }

  // Cardápio
  const cardapioEl = document.getElementById('cardapio-conteudo');
  if (cardapioEl) {
    let html = '';
    for (const [chave, categoria] of Object.entries(DADOS.cardapio)) {
      html += `
        <div class="cardapio-categoria">
          <h3>${categoria.titulo}</h3>
          ${categoria.itens.map(item => `
            <div class="cardapio-item">
              <span class="cardapio-nome">${item.nome}</span>
              <span class="cardapio-preco">R$ ${item.preco.toFixed(2).replace('.', ',')}</span>
            </div>
          `).join('')}
        </div>
      `;
    }
    cardapioEl.innerHTML = html;
  }

  // Avaliações
  const avaliacoesEl = document.getElementById('avaliacoes-conteudo');
  if (avaliacoesEl) {
    avaliacoesEl.innerHTML = DADOS.avaliacoes.map(av => `
      <div class="avaliacao-card">
        <div class="rating-stars">${'★'.repeat(av.nota)}</div>
        <p class="avaliacao-texto">"${av.texto}"</p>
        <p class="avaliacao-autor">— ${av.autor}</p>
      </div>
    `).join('');
  }

  // Horários
  const horariosEl = document.getElementById('horarios-conteudo');
  if (horariosEl) {
    const formatter = new Intl.DateTimeFormat('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      weekday: 'long'
    });
    const hoje = formatter.format(new Date()).toLowerCase();

    let html = `<table class="horarios-tabela">
      <thead>
        <tr><th>Dia</th><th>Horário</th></tr>
      </thead>
      <tbody>`;

    DADOS.horarios.forEach(h => {
      const isHoje = h.dia.toLowerCase() === hoje;
      const horario = h.aberto === "FECHADO" ? "Fechado" : `${h.aberto} – ${h.fechado}`;
      html += `
        <tr ${isHoje ? 'class="hoje"' : ''}>
          <td>${h.dia}</td>
          <td>${horario}</td>
        </tr>
      `;
    });

    html += `</tbody></table>`;
    horariosEl.innerHTML = html;
  }

  // Links de contato
  const whatsappLink = `https://wa.me/${DADOS.whatsapp}?text=Olá! Gostaria de saber mais sobre o Restaurante do Vovó.`;
  const gmapsLink = `https://maps.google.com/?q=${DADOS.endereco.lat},${DADOS.endereco.lng}`;
  const wazeLink = `https://waze.com/ul?ll=${DADOS.endereco.lat},${DADOS.endereco.lng}`;

  document.querySelectorAll('[data-href="whatsapp"]').forEach(el => {
    el.href = whatsappLink;
  });

  document.querySelectorAll('[data-href="mapa"]').forEach(el => {
    el.href = gmapsLink;
  });

  // Endereço no rodapé
  const enderecoEl = document.getElementById('endereco-completo');
  if (enderecoEl) {
    enderecoEl.innerHTML = `
      ${DADOS.endereco.rua}, ${DADOS.endereco.numero}<br>
      ${DADOS.endereco.complemento}
    `;
  }

  // Telefone no rodapé
  const telefoneEl = document.getElementById('telefone');
  if (telefoneEl) {
    telefoneEl.href = `tel:${DADOS.telefone.replace(/\D/g, '')}`;
    telefoneEl.textContent = DADOS.telefone;
  }
}

// Lazy-load Leaflet
function inicializarMapa() {
  const mapaEl = document.getElementById('mapa');
  if (!mapaEl || mapaEl.dataset.carregado === 'true') return;

  mapaEl.dataset.carregado = 'true';

  // Injetar Leaflet CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/vendor/leaflet.css';
  document.head.appendChild(link);

  // Injetar Leaflet JS
  const script = document.createElement('script');
  script.src = '/vendor/leaflet.js';
  script.onload = () => {
    const mapa = L.map('mapa').setView(
      [DADOS.endereco.lat, DADOS.endereco.lng],
      16
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 19
    }).addTo(mapa);

    L.marker([DADOS.endereco.lat, DADOS.endereco.lng])
      .bindPopup(`<strong>${DADOS.nome}</strong><br>${DADOS.endereco.rua}`)
      .addTo(mapa);
  };
  document.body.appendChild(script);
}

// Observer para lazy-load do mapa
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting && entrada.target.id === 'mapa') {
      inicializarMapa();
      observador.unobserve(entrada.target);
    }
  });
}, { rootMargin: '100px' });

// Iniciar
document.addEventListener('DOMContentLoaded', () => {
  renderizar();

  const mapaEl = document.getElementById('mapa');
  if (mapaEl) {
    observador.observe(mapaEl);
  }

  // Atualizar status a cada minuto
  setInterval(() => {
    renderizar();
  }, 60000);
});
