/* ============================================================
   RESTAURANTE DO VOVÔ — FONTE ÚNICA DE CONTEÚDO
   ------------------------------------------------------------
   Este é o único arquivo que precisa ser editado para mudar
   o conteúdo do site. Instruções completas no README.md.

   REGRA: só entra aqui o que for confirmado pelo restaurante.
   Nada de número estimado ou inventado.
   ============================================================ */

const DADOS = {
  nome: "Restaurante do Vovô",
  descricao: "Comida caseira em Pontal do Paraná",

  /* A frase que ninguém esquece. Veio das avaliações do Google. */
  assinatura: "Tem pimenta em todas as mesas.",

  telefone: "(41) 99835-1371",
  whatsapp: "5541998351371",

  /* Mensagem que abre já digitada no WhatsApp.
     Trata dúvida, não pedido — ainda não sabemos se aceitam pedido remoto. */
  whatsappMensagem: "Olá! Vocês estão abertos hoje?",

  endereco: {
    rua: "Av. Leste, Rua das Monções",
    numero: "92",
    bairro: "Monções",
    complemento: "Pontal do Paraná, PR",
    cep: "83255-000",
    /* Coordenadas geocodificadas a partir do CEP (nível de bairro,
       não do número exato) — o CEP existe no OpenStreetMap, a rua
       ainda não. As coordenadas antigas (-25.71, -48.48) apontavam
       para Praia de Leste, ~8 km de distância daqui: provavelmente
       vinham de um endereço diferente usado antes deste ser
       confirmado. Trocar por coordenadas exatas assim que possível
       (abrir o local no Google Maps e copiar de "compartilhar"). */
    lat: -25.6454002,
    lng: -48.4384731
  },

  /* Nota do Google. NÃO é avaliação do site — por isso não vai
     para o JSON-LD, só aparece na tela com a fonte declarada. */
  avaliacaoGoogle: {
    nota: 5.0,
    total: 12
  },

  horarios: [
    { dia: "Segunda", abre: "07:00", fecha: "15:00" },
    { dia: "Terça",   abre: "07:00", fecha: "15:00" },
    { dia: "Quarta",  abre: "07:00", fecha: "15:00" },
    { dia: "Quinta",  abre: "07:00", fecha: "15:00" },
    { dia: "Sexta",   abre: "07:00", fecha: "15:00" },
    { dia: "Sábado",  abre: "07:00", fecha: "15:00" },
    { dia: "Domingo", abre: null,    fecha: null }
  ],

  /* ---------------------------------------------------------
     CARDÁPIO
     Ainda não temos os pratos reais. Enquanto cardapioPronto
     for false, o site mostra um aviso honesto no lugar da lista
     — nunca pratos inventados com preço plausível.

     Quando os pratos chegarem:
     1. troque cardapioPronto para true
     2. preencha as categorias abaixo
     --------------------------------------------------------- */
  cardapioPronto: false,

  cardapioAviso: "Ainda estamos organizando o cardápio completo. Ligue e pergunte o prato do dia.",

  cardapio: {
    almoco: {
      titulo: "Almoço",
      itens: [
        /* Exemplo de como preencher (apague e ponha os reais):
        {
          nome: "Prato do dia",
          descricao: "Arroz soltinho, feijão de panela de ferro, carne do dia e salada da horta",
          preco: 28,
          destaque: true
        },
        */
      ]
    },
    cafe: {
      titulo: "Café da manhã",
      itens: []
    }
  },

  avaliacoes: [
    {
      nota: 5,
      texto: "Comida deliciosa, ambiente acolhedor. Tem pimenta em todas as mesas!",
      autor: "avaliação no Google"
    },
    {
      nota: 5,
      texto: "Comida caseira de qualidade. Voltamos sempre.",
      autor: "avaliação no Google"
    },
    {
      nota: 5,
      texto: "Prato farto, preço justo. Recomendo!",
      autor: "avaliação no Google"
    }
  ],

  redesSociais: {
    instagram: null,
    facebook: null
  }
};
