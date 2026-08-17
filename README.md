# 🥬 Sacolão Vida Verde - Sistema de Caixa

Sistema de caixa para ponto de venda (PDV) web, interativo e leve, desenvolvido em HTML, CSS (Bootstrap 5) e JavaScript. O sistema simula o atendimento a clientes, registro de compras, aplicação de descontos progressivos, processamento de pagamento e geração de cupom fiscal estilizado.

---

## 🚀 Funcionalidades

- **Identificação do Cliente:** Registro do nome do cliente no início do atendimento.
- **Carrinho de Compras Interativo:** Seleção de produtos por menu interativo com cálculo automático de subtotal por item.
- **Descontos Progressivos Automáticos:**
  - Compras acima de **R$ 150,00**: **10%** de desconto.
  - Compras acima de **R$ 80,00**: **5%** de desconto.
  - Compras até **R$ 80,00**: Sem desconto.
- **Formas de Pagamento:** Suporte para Dinheiro, Cartão, Pix e Vale-Alimentação.
- **Cálculo de Troco:** Validação do valor entregue pelo cliente e cálculo automático de troco em compras em dinheiro.
- **Emissão de Cupom Fiscal:** Geração de um cupom visual completo com serrilha decorativa, código de barras simulado, detalhamento de itens, totais, descontos e data/hora.

---

## 📂 Estrutura do Projeto

```text
.
├── index.html       # Aplicação completa (HTML + Estilos + Lógica JS)
└── README.md        # Documentação do projeto
```

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estrutura base da aplicação.
- **CSS3 / Bootstrap 5.3:** Layout responsivo, tipografia e componentes visuais.
- **Bootstrap Icons:** Ícones para representação das formas de pagamento e marca.
- **Google Fonts:** Fontes *Fredoka* e *Space Mono* para acabamento visual de cupom fiscal.
- **JavaScript (ES6+):** Lógica do caixa, estruturas de repetição, cálculos de desconto, manipulação do DOM e fluxos de decisão.

---

## 💻 Como Executar

1. Baixe ou clone este repositório.
2. Abra o arquivo `index.html` diretamente em qualquer navegador moderno (Chrome, Firefox, Edge, Safari).
3. Siga as instruções exibidas nas caixas de diálogo (`prompt` e `alert`) na tela:
   - Digite o nome do cliente.
   - Escolha os produtos e informe as quantidades desejadas.
   - Digite `0` para encerrar a inclusão de itens.
   - Selecione a forma de pagamento (`D`, `C`, `P` ou `V`).
   - Se for em dinheiro, informe o valor entregue.
4. Visualize o cupom gerado na tela.

---

## 🛒 Tabela de Produtos Cadastrados

| ID | Produto | Preço Unitário |
|---|---|---|
| 1 | Arroz | R$ 25,90 |
| 2 | Feijão | R$ 9,50 |
| 3 | Leite | R$ 5,80 |
| 4 | Café | R$ 18,90 |
| 5 | Açúcar | R$ 4,75 |

---

## 📄 Licença

Este projeto é de livre utilização para fins de estudo e aprendizado.
