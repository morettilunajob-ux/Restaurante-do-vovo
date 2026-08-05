# Restaurante do Vovó — Website

Site do Restaurante do Vovó em Pontal do Paraná. **Sem dependências, sem build — arquivo único para editar.**

---

## Como Editar o Site

**Tudo que você precisa mudar está em um arquivo: `js/dados.js`**

Abra em qualquer editor de texto (Notepad, Word, VS Code, qualquer um) e procure por `[CONFIRMAR]` ou `[PLACEHOLDER]`.

### Cardápio

Procure por:
```javascript
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
      ...
    ]
  }
}
```

**Para adicionar um prato:**
1. Procure a categoria (Café da Manhã, Almoço, etc)
2. Copie uma linha de prato
3. Troque `nome` e `preco`
4. Certifique de ter uma `,` no final de cada linha (menos a última)

Exemplo:
```javascript
{ nome: "Moqueca de peixe", preco: 35 }
```

### Horários

Procure por:
```javascript
horarios: [
  { dia: "Segunda", aberto: "07:00", fechado: "15:00" },
  ...
]
```

Se o horário mudar, troque `aberto` ou `fechado`. Se fecha mais cedo, por exemplo:
```javascript
{ dia: "Quinta", aberto: "07:00", fechado: "14:30" }
```

Se fecha domingo, deixe como está. Se abre domingo diferente, troque `"FECHADO"` por um horário:
```javascript
{ dia: "Domingo", aberto: "11:00", fechado: "15:00" }
```

### Contato

```javascript
telefone: "(41) 99835-1371",
whatsapp: "5541998351371",
```

Se mudar de número, troque os dois.

### Endereço

```javascript
endereco: {
  rua: "Rua [CONFIRMAR]",
  numero: "[CONFIRMAR]",
  complemento: "Pontal do Paraná, PR",
  cep: "[CONFIRMAR]",
  lat: -25.7112159,
  lng: -48.4796936
}
```

- `rua` e `numero`: nome e número da rua
- `cep`: CEP do restaurante
- `lat` e `lng`: deixe como está (coordenadas GPS, não precisa trocar)

### Avaliações

```javascript
avaliacoes: [
  {
    nota: 5,
    texto: "Comida deliciosa, ambiente acolhedor. Tem pimenta em todas as mesas!",
    autor: "Avaliação no Google"
  },
  ...
]
```

Deixe como está — vêm do Google Maps.

### Fotos

1. Crie uma pasta `img/` (já existe)
2. Coloque suas fotos lá: `fachada.jpg`, `salao.jpg`, `prato1.jpg`, etc
3. Avise o desenvolvedor para adicionar as fotos ao site

---

## Checklist — Antes de Ir ao Ar

- [ ] Cardápio completo e com preços reais
- [ ] Endereço confirmado (rua, número, CEP)
- [ ] Telefone e WhatsApp corretos
- [ ] Horários atualizados (especialmente dias de encerramento)
- [ ] Fotos reais (fachada, salão, pratos)
- [ ] Redes sociais (Instagram, Facebook — se tiver)
- [ ] Aprovação final do conteúdo

---

## Dados Confirmados com o Dono

- **Nome:** Restaurante do Vovó ✓
- **Descrição:** Comida caseira, 5,0★, 12 avaliações ✓
- **Localização:** Pontal do Paraná, PR ✓
- **Ticket:** R$ 20–40 ✓
- **Horários:** Seg–sab 7h–15h ✓
- **Diferencial:** Pimenta em todas as mesas ✓

**Pendentes:**
- Cardápio exato
- Fotos reais
- Rua e número do endereço
- Confirmar se abre domingo

---

## Técnico (Para Quem Mexer com Código)

- **Stack:** HTML + CSS + JS estático
- **Linguagem:** Português (Brasil)
- **Fonte de dados:** `js/dados.js` (objeto único)
- **Renderização:** `js/app.js` (inteligente, sem template engine)
- **Estilo:** `css/estilo.css` (responsivo, dark mode automático)
- **Mapa:** Leaflet (OpenStreetMap, lazy-loaded)
- **SEO:** JSON-LD `Restaurant`, robots.txt, sitemap.xml

### Estrutura

```
.
├─ index.html         (página única, semântica)
├─ css/estilo.css     (responsivo, acessível)
├─ js/dados.js        (fonte única de conteúdo)
├─ js/app.js          (renderização e status)
├─ img/               (fotos do restaurante)
├─ vendor/            (Leaflet: leaflet.js, leaflet.css)
├─ robots.txt         (SEO)
├─ sitemap.xml        (SEO)
└─ README.md          (este arquivo)
```

### Funcionalidades Implementadas

1. **Status ao vivo** — "Aberto agora" / "Fechado" com fuso São Paulo
2. **Cardápio renderizado** — gerado de `dados.js`, sem HTML hardcode
3. **Avaliações do Google** — 5,0★, 12 reviews (visual apenas, não JSON-LD)
4. **Mapa Leaflet** — OpenStreetMap, lazy-loaded, sem API key
5. **Barra fixa mobile** — Ligar · WhatsApp · Como chegar sempre visível
6. **Dark mode** — automático conforme sistema do usuário
7. **Acessibilidade** — WCAG AA, `prefers-reduced-motion`
8. **SEO** — Open Graph, JSON-LD, robots.txt, sitemap.xml

### Segurança

- Sem dependências externas (exceto Leaflet no vendor)
- Dados locais, sem requisições a APIs
- Sem autenticação, sem banco de dados
- Sem cookies de rastreamento
- LGPD-compliant

---

## Deploy

Quando pronto:

1. Registre um domínio `.com.br` em https://registro.br
2. Configure DNS apontando para Vercel (ou outro host estático)
3. Desenvolvedora faz deploy com `vercel deploy`

Até lá, o site fica em `restaurantedovovo.vercel.app` (funcional 100%).

---

## Suporte

Dúvidas sobre edição: Pergunte ao desenvolvedor.

Dúvidas sobre o restaurante (cardápio, horários, delivery, etc.): Entre em contato direto com o restaurante.

---

**Última atualização:** Janeiro 2025  
**Status:** Pronto para edição
