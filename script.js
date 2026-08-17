// ===================== DADOS DOS PRODUTOS =====================
let nomeProduto1 = "Arroz";
let precoProduto1 = 25.9;

let nomeProduto2 = "Feijão";
let precoProduto2 = 9.5;

let nomeProduto3 = "Leite";
let precoProduto3 = 5.8;

let nomeProduto4 = "Café";
let precoProduto4 = 18.9;

let nomeProduto5 = "Açúcar";
let precoProduto5 = 4.75;

// ===================== REGRAS DE DESCONTO =====================
// Faixas progressivas: quanto maior a compra, maior o desconto.
const FAIXA_DESCONTO_ALTA = 150;
const PERCENTUAL_DESCONTO_ALTA = 0.1;

const FAIXA_DESCONTO_MEDIA = 80;
const PERCENTUAL_DESCONTO_MEDIA = 0.05;

function formatarMoeda(valor) {
  const valorArredondado = Math.round(valor * 100) / 100;
  console.log("Arredondando valor:", valor, "=>", valorArredondado);
  return valorArredondado.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function iniciarCaixa() {
  console.log("Iniciando o caixa do Sacolão Vida Verde...");

  const nomeCliente = prompt("Digite o nome do cliente:");
  console.log("Nome do cliente digitado:", nomeCliente);

  if (!nomeCliente || nomeCliente.trim() === "") {
    console.log("Compra cancelada: nome do cliente não informado.");
    alert("Compra cancelada: nome do cliente não informado.");
    return;
  }

  const carrinho = montarCarrinho();
  console.log("Carrinho final:", carrinho);

  if (carrinho.length === 0) {
    console.log("Carrinho vazio. Compra cancelada.");
    alert("Nenhum produto foi adicionado. Compra cancelada.");
    return;
  }

  const totalBruto = carrinho.reduce(
    (acumulado, item) => acumulado + item.subtotal,
    0,
  );

  const { desconto, percentualAplicado } = calcularDesconto(totalBruto);
  const totalFinal = totalBruto - desconto;

  console.log("Total bruto:", totalBruto);
  console.log("Desconto:", desconto);
  console.log("Total final:", totalFinal);

  const formaPagamento = escolherFormaPagamento(totalFinal);
  console.log("Forma de pagamento escolhida:", formaPagamento);

  const { valorPago, troco } = processarPagamento(
    formaPagamento,
    totalFinal,
  );
  console.log("Valor pago:", valorPago.toFixed(2));
  console.log("Troco:", troco);

  exibirResumo({
    nomeCliente: nomeCliente.trim(),
    carrinho,
    totalBruto,
    desconto,
    percentualAplicado,
    totalFinal,
    formaPagamento,
    valorPago,
    troco,
  });
}

function calcularDesconto(totalBruto) {
  let percentualAplicado = 0;

  if (totalBruto > FAIXA_DESCONTO_ALTA) {
    percentualAplicado = PERCENTUAL_DESCONTO_ALTA;
    console.log("Compra acima de R$ 150. Desconto de 10% aplicado.");
  } else if (totalBruto > FAIXA_DESCONTO_MEDIA) {
    percentualAplicado = PERCENTUAL_DESCONTO_MEDIA;
    console.log("Compra acima de R$ 80. Desconto de 5% aplicado.");
  } else {
    console.log("Compra igual ou abaixo de R$ 80. Sem desconto.");
  }

  const desconto = totalBruto * percentualAplicado;
  return { desconto, percentualAplicado };
}

function montarCarrinho() {
  const carrinho = [];
  let continuarComprando = true;

  while (continuarComprando) {
    let menu = "SACOLÃO VIDA VERDE\n\nEscolha um produto:\n\n";
    menu += `1 - ${nomeProduto1} ====> R$ ${formatarMoeda(precoProduto1)}\n`;
    menu += `2 - ${nomeProduto2} ====> R$ ${formatarMoeda(precoProduto2)}\n`;
    menu += `3 - ${nomeProduto3} ====> R$ ${formatarMoeda(precoProduto3)}\n`;
    menu += `4 - ${nomeProduto4} ====> R$ ${formatarMoeda(precoProduto4)}\n`;
    menu += `5 - ${nomeProduto5} ====> R$ ${formatarMoeda(precoProduto5)}\n`;
    menu += "\n0 - Finalizar compra";

    const entrada = prompt(menu);
    console.log("Opção digitada no menu:", entrada);

    if (entrada === null) {
      continuarComprando = false;
      continue;
    }

    const escolha = Number(entrada);

    if (escolha === 0) {
      console.log("Cliente finalizou a compra.");
      continuarComprando = false;
      continue;
    }

    let nomeSelecionado = "";
    let precoSelecionado = 0;

    if (escolha === 1) {
      nomeSelecionado = nomeProduto1;
      precoSelecionado = precoProduto1;
    } else if (escolha === 2) {
      nomeSelecionado = nomeProduto2;
      precoSelecionado = precoProduto2;
    } else if (escolha === 3) {
      nomeSelecionado = nomeProduto3;
      precoSelecionado = precoProduto3;
    } else if (escolha === 4) {
      nomeSelecionado = nomeProduto4;
      precoSelecionado = precoProduto4;
    } else if (escolha === 5) {
      nomeSelecionado = nomeProduto5;
      precoSelecionado = precoProduto5;
    } else {
      console.log("Produto inválido:", entrada);
      alert("Produto inválido. Tente novamente.");
      continue;
    }

    const quantidadeEntrada = prompt(`Quantidade de ${nomeSelecionado}:`);
    const quantidade = Number(quantidadeEntrada);
    console.log(
      `Quantidade digitada para ${nomeSelecionado}:`,
      quantidadeEntrada,
    );

    if (!quantidadeEntrada || quantidade <= 0 || isNaN(quantidade)) {
      console.log("Quantidade inválida:", quantidadeEntrada);
      alert("Quantidade inválida.");
      continue;
    }

    const subtotal = precoSelecionado * quantidade;

    const itemCarrinho = {
      nome: nomeSelecionado,
      preco: precoSelecionado,
      quantidade,
      subtotal,
    };

    carrinho.push(itemCarrinho);
    console.log("Produto adicionado ao carrinho:", itemCarrinho);

    alert(
      "Produto adicionado com sucesso.\n\n" +
        `Produto: ====> ${nomeSelecionado}\n` +
        `Quantidade: => ${quantidade}\n` +
        `Subtotal: ====> R$ ${formatarMoeda(subtotal)}`,
    );
  }

  return carrinho;
}

function escolherFormaPagamento(totalFinal) {
  let formaPagamento = "";

  while (!formaPagamento) {
    const escolha = prompt(
      `Total da compra: R$ ${formatarMoeda(totalFinal)}\n\n` +
        "Escolha a forma de pagamento:\n\n" +
        "D ====> Dinheiro\n" +
        "C ====> Cartão\n" +
        "P ====> Pix\n" +
        "V ====> Vale-alimentação",
    );

    const opcao = (escolha || "").trim().toUpperCase();
    console.log("Forma de pagamento digitada:", escolha);

    if (opcao === "D") {
      formaPagamento = "Dinheiro";
    } else if (opcao === "C") {
      formaPagamento = "Cartão";
    } else if (opcao === "P") {
      formaPagamento = "Pix";
    } else if (opcao === "V") {
      formaPagamento = "Vale-alimentação";
    } else {
      console.log("Opção de pagamento inválida:", escolha);
      alert("Opção inválida. Digite D, C, P ou V.");
    }
  }

  return formaPagamento;
}

function processarPagamento(formaPagamento, totalFinal) {
  if (formaPagamento !== "Dinheiro") {
    console.log("Pagamento sem troco (Cartão, Pix ou Vale-alimentação).");
    return { valorPago: totalFinal, troco: 0 };
  }

  let valorPago = 0;
  let valido = false;

  while (!valido) {
    const entrada = prompt(
      `Total da compra:\nR$ ${formatarMoeda(totalFinal)}\n\n` +
        "Digite o valor entregue pelo cliente:",
    );

    valorPago = Number(entrada);
    console.log("Valor entregue pelo cliente digitado:", entrada);

    if (entrada && valorPago >= totalFinal) {
      valido = true;
    } else {
      console.log("Valor insuficiente:", entrada);
      alert("Valor insuficiente para cobrir o total da compra.");
    }
  }

  const troco = valorPago - totalFinal;
  return { valorPago, troco };
}

function exibirResumo(dados) {
  const {
    nomeCliente,
    carrinho,
    totalBruto,
    desconto,
    percentualAplicado,
    totalFinal,
    formaPagamento,
    valorPago,
    troco,
  } = dados;

  console.log("Exibindo cupom de compra na tela...");

  // Monta as linhas do cupom, uma por produto comprado.
  let linhasCupom = "";
  carrinho.forEach((item, indice) => {
    linhasCupom += `
      <div class="linha-item">
        <div class="linha-item-topo">
          <span class="item-nome">${indice + 1}. ${item.nome}</span>
          <span class="item-subtotal">R$ ${formatarMoeda(item.subtotal)}</span>
        </div>
        <div class="linha-item-detalhe">${item.quantidade} x R$ ${formatarMoeda(item.preco)}</div>
      </div>
    `;
  });

  const totalItens = carrinho.reduce(
    (acumulado, item) => acumulado + item.quantidade,
    0,
  );

  let linhaTroco = "";
  if (formaPagamento === "Dinheiro") {
    linhaTroco = `
      <div class="linha-total">
        <span>Troco</span>
        <span>R$ ${formatarMoeda(troco)}</span>
      </div>
    `;
  }

  const agora = new Date();
  const dataFormatada = agora.toLocaleDateString("pt-BR");
  const horaFormatada = agora.toLocaleTimeString("pt-BR");
  const numeroCupom = String(Math.floor(Math.random() * 900000) + 100000);

  const percentualExibido = `${(percentualAplicado * 100).toFixed(0)}%`;

  const iconesPagamento = {
    Dinheiro: "bi-cash-stack",
    Cartão: "bi-credit-card-fill",
    Pix: "bi-qr-code",
    "Vale-alimentação": "bi-ticket-perforated-fill",
  };
  const iconePagamento = iconesPagamento[formaPagamento] || "bi-wallet2";

  // Gera as barras do código de barras decorativo do rodapé do cupom.
  let barrasCodigo = "";
  for (let i = 0; i < 42; i++) {
    const altura = 14 + Math.floor(Math.random() * 24);
    const largura = Math.random() > 0.7 ? 2 : 3;
    barrasCodigo += `<span style="height:${altura}px; width:${largura}px;"></span>`;
  }

  document.write(`
   
      <title>Sacolão Vida Verde - Cupom</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="style.css">
    </head>
    <body>

      <div class="faixa-topo">
        <div class="container d-flex align-items-center gap-3">
          <div class="logo-loja"><i class="bi bi-basket3-fill"></i></div>
          <div>
            <div class="nome-loja">Sacolão Vida Verde</div>
            <div class="slogan-loja">Fresco todos os dias</div>
          </div>
        </div>
      </div>

      <main>
        <div class="cupom-area">
          <div class="serrilha topo"></div>
          <div class="cupom">

            <div class="cupom-cabecalho">
              <div class="titulo">SACOLÃO VIDA VERDE</div>
              <div class="subtitulo">Cupom de compra</div>
              <div class="cupom-meta">
                <span>${dataFormatada} ${horaFormatada}</span>
                <span>Cupom #${numeroCupom}</span>
              </div>
            </div>

            <div class="divisor"></div>

            <div class="alerta-cliente-mobile"><strong>Cliente:</strong> ${nomeCliente}</div>

            <div class="divisor"></div>

            ${linhasCupom}

            <div class="divisor"></div>

            <div class="linha-total">
              <span>Itens</span>
              <span>${totalItens}</span>
            </div>
            <div class="linha-total">
              <span>Subtotal</span>
              <span>R$ ${formatarMoeda(totalBruto)}</span>
            </div>
            <div class="linha-total desconto">
              <span>Desconto (${percentualExibido})</span>
              <span>- R$ ${formatarMoeda(desconto)}</span>
            </div>

            <div class="divisor"></div>

            <div class="bloco-total">
              <div class="linha-total final">
                <span>TOTAL</span>
                <span>R$ ${formatarMoeda(totalFinal)}</span>
              </div>
              <div class="carimbo">Pago</div>
            </div>

            <div class="divisor"></div>

            <div class="d-flex justify-content-between align-items-center mb-1">
              <span class="pagamento-tag"><i class="bi ${iconePagamento}"></i> ${formaPagamento}</span>
              <span class="valor-pago-info">R$ ${formatarMoeda(valorPago.toFixed(2))} pago</span>
            </div>
            ${linhaTroco}

            <div class="cupom-rodape">
              Obrigado pela preferência, ${nomeCliente}!<br>
              Volte sempre ao Sacolão Vida Verde 🥬
            </div>

            <div class="codigo-barras">
              ${barrasCodigo}
            </div>
            <div class="cupom-numero">${numeroCupom}${numeroCupom}</div>

          </div>
          <div class="serrilha base"></div>
        </div>
      </main>

    </body>
  `);

  document.close();
}

window.addEventListener("load", iniciarCaixa);
