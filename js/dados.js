const DADOS = {
  nome: "Restaurante do Vovó",
  descricao: "Comida caseira em Pontal do Paraná",
  telefone: "(41) 99835-1371",
  whatsapp: "5541998351371",

  endereco: {
    rua: "Rua [CONFIRMAR]",
    numero: "[CONFIRMAR]",
    complemento: "Pontal do Paraná, PR",
    cep: "[CONFIRMAR]",
    lat: -25.7112159,
    lng: -48.4796936
  },

  horarios: [
    { dia: "Segunda", aberto: "07:00", fechado: "15:00" },
    { dia: "Terça", aberto: "07:00", fechado: "15:00" },
    { dia: "Quarta", aberto: "07:00", fechado: "15:00" },
    { dia: "Quinta", aberto: "07:00", fechado: "15:00" },
    { dia: "Sexta", aberto: "07:00", fechado: "15:00" },
    { dia: "Sábado", aberto: "07:00", fechado: "15:00" },
    { dia: "Domingo", aberto: "FECHADO", fechado: null }
  ],

  cardapio: {
    cafe: {
      titulo: "Café da Manhã",
      itens: [
        { nome: "[PLACEHOLDER] Café com pão", preco: 5 },
        { nome: "[PLACEHOLDER] Bolo caseiro", preco: 8 }
      ]
    },
    almoco: {
      titulo: "Almoço",
      itens: [
        { nome: "[PLACEHOLDER] Prato do dia", preco: 25 },
        { nome: "[PLACEHOLDER] Arroz, feijão, salada", preco: 20 },
        { nome: "[PLACEHOLDER] Sobremesa", preco: 8 }
      ]
    }
  },

  avaliacoes: [
    {
      nota: 5,
      texto: "Comida deliciosa, ambiente acolhedor. Tem pimenta em todas as mesas!",
      autor: "Avaliação no Google"
    },
    {
      nota: 5,
      texto: "Comida caseira de qualidade. Voltamos sempre.",
      autor: "Avaliação no Google"
    },
    {
      nota: 5,
      texto: "Prato farto, preço justo. Recomendo!",
      autor: "Avaliação no Google"
    }
  ],

  redes_sociais: {
    instagram: null,
    facebook: null
  }
};
