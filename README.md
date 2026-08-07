# Restaurante do Vovô — site

Site de uma página só. Sem programa de build, sem framework: são arquivos que o navegador abre direto.

**No ar:** https://restaurante-do-vovo.vercel.app
**Código:** https://github.com/morettilunajob-ux/Restaurante-do-vovo

---

## Como mudar o conteúdo do site

Você só precisa mexer em **um arquivo**: `js/dados.js`

Abra ele em qualquer editor de texto (Bloco de Notas serve). Tudo que aparece no site está lá dentro. Depois de salvar e enviar para o GitHub, o site se atualiza sozinho em cerca de um minuto.

**Regra de ouro:** só coloque informação confirmada. Preço errado no site queima a confiança de quem chega na porta.

### Trocar telefone ou WhatsApp

```javascript
telefone: "(41) 99835-1371",
whatsapp: "5541998351371",
```

O `whatsapp` vai sem parênteses, sem traço e sem espaço — começa com `55` (Brasil) e depois o DDD.

### Mudar horário

```javascript
horarios: [
  { dia: "Segunda", abre: "07:00", fecha: "15:00" },
  ...
  { dia: "Domingo", abre: null,    fecha: null }
],
```

- Para mudar o horário de um dia, troque `abre` e `fecha`.
- Para marcar um dia como **fechado**, use `null` nos dois (sem aspas), como está no Domingo.

O aviso "Aberto agora / Fechado" no topo do site se ajusta sozinho a partir dessa tabela. Ele usa o horário de Brasília, então funciona certo mesmo para quem acessa de outro estado.

### Colocar o cardápio

Hoje o site mostra um aviso dizendo que o cardápio vem em breve. Para trocar pelo cardápio de verdade:

**Passo 1** — mude esta linha para `true`:

```javascript
cardapioPronto: true,
```

**Passo 2** — preencha os pratos:

```javascript
cardapio: {
  almoco: {
    titulo: "Almoço",
    itens: [
      {
        nome: "Prato do dia",
        descricao: "Arroz soltinho, feijão de panela de ferro, carne do dia e salada",
        preco: 28,
        destaque: true
      },
      {
        nome: "Bife acebolado",
        descricao: "Com arroz, feijão e batata frita",
        preco: 32
      }
    ]
  }
}
```

Sobre cada campo:

- **`nome`** — o nome do prato.
- **`descricao`** — o que vem no prato. Vale caprichar: "feijão de panela de ferro" vende mais que "feijão". Descreva o que a pessoa vai sentir.
- **`preco`** — só o número, com ponto se tiver centavos (`28` ou `28.50`). Não escreva "R$" nem vírgula — o site formata sozinho.
- **`destaque`** — opcional. Coloque `destaque: true` no carro-chefe e ele ganha um selo "da casa".

Atenção à pontuação: cada prato fica entre `{ }`, com vírgula depois — menos o último da lista.

### Trocar o endereço

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

Troque `rua`, `numero` e `cep`. **Não mexa em `lat` e `lng`** — são as coordenadas que posicionam o mapa.

### A frase da pimenta

```javascript
assinatura: "Tem pimenta em todas as mesas.",
```

É a frase grande que aparece logo abaixo do topo. Saiu das avaliações do Google — é o detalhe que os clientes mais lembram. Se quiser trocar, troque; mas ela é o que dá personalidade ao site.

---

## O que ainda falta (pendente com o dono)

- [ ] Cardápio real — pratos, descrições e preços
- [ ] Fotos reais — fachada, salão e 4 a 6 pratos
- [ ] Endereço completo — rua, número e CEP
- [ ] Confirmar se aceita pedido ou reserva pelo WhatsApp
- [ ] Confirmar se abre mesmo às 7h (café da manhã) ou só no almoço
- [ ] Instagram, se existir

### Sobre as fotos

Coloque os arquivos na pasta `img/`. Vale mais uma foto de celular do prato de verdade do que foto bonita de banco de imagens: as avaliações elogiam justamente o lugar ser autêntico, e a pessoa percebe na hora quando a foto não bate com o que chega à mesa.

Dicas para fotografar sem equipamento: use luz do dia perto da janela (nunca o flash), fotografe de cima ou a 45 graus, e limpe a borda do prato antes.

---

## Para quem for mexer no código

**Arquivos**

| Arquivo | O que faz |
|---|---|
| `index.html` | Estrutura da página. Não tem conteúdo escrito — tudo vem do `dados.js`. |
| `css/estilo.css` | Todo o visual. É a única folha de estilo; não há `<style>` no HTML. |
| `js/dados.js` | Fonte única de conteúdo. |
| `js/app.js` | Renderiza a página a partir do `dados.js`, calcula o status e carrega o mapa. |
| `vendor/leaflet.*` | Biblioteca do mapa, hospedada localmente (sem CDN, sem chave de API). |

**Decisões que valem manter**

- **O status usa `Intl.DateTimeFormat` fixado em `America/Sao_Paulo`**, nunca o relógio do visitante. É a funcionalidade mais útil da página; se errar, é pior do que não existir. Atualiza a cada 60 segundos.
- **O mapa (Leaflet, ~140 KB) só carrega quando a seção se aproxima da tela**, via `IntersectionObserver`. Não mover para o carregamento inicial.
- **O JSON-LD não declara `aggregateRating`.** As 12 avaliações são do Google, não do site. Marcá-las como próprias viola as diretrizes de dados estruturados e pode gerar penalidade manual. A nota aparece na tela com a fonte declarada — só não vai no schema.
- **Os preços aparecem junto da descrição, sem "R$" e sem coluna alinhada à direita.** Coluna de preços faz a pessoa comparar por preço; preço embutido na descrição a faz escolher por vontade.
- **Nada de número sem fonte.** Se o dado não veio do restaurante ou do Google, não entra na página.

**Rodar localmente**

```bash
npx http-server . -p 4321 -c-1
```

**Publicar**

O deploy é automático: todo push na branch `main` do GitHub gera um novo deploy na Vercel.

O domínio `.com.br` precisa ser registrado pessoalmente no [registro.br](https://registro.br) (exige CPF/CNPJ e pagamento). Até lá o site fica no endereço da Vercel, funcionando normalmente.
