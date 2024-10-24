let produtosCarrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
let totalValor = 0;

function adicionar(nomeProduto, precoProduto){
    const product = { produto: nomeProduto, preco: precoProduto};

    Swal.fire({
        title: "Que legal!",
        text: `Voce adicionou ${nomeProduto} - R$${precoProduto},00 ao carrinho`,
        icon: "success"
    }).then ((result)=>{
        if (result.isConfirmed){
            produtosCarrinho.push(product);
            localStorage.setItem('carrinho', JSON.stringify(produtosCarrinho));
        }
    });
}

function mostrarCarrinho(){
    if (produtosCarrinho.length === 0){
        Swal.fire({
            title: "Carrinho vazio",
            text: "Seu Carrinho esta vazio!",
            icon: "info"
        });
    } else {
        const listaProdutos = ListaProdutos();

        Swal.fire ({
            title:"Seu carrinho",
            icon: "info",
            confirmButtonText: "Finalizar compra",
            showCancelButton: true,
            html: `
            <table>
                <tr>Nome<th>valor</th></tr>
                ${listaProdutos}
                <tr><td><strong>Total:</strong></td><td><strong>R$ ${totalValor},00</strong></td></tr>
            </table>
            `
        }).then((result) => {
            if (result.isConfirmed){
                finalizarCart();
            }
        });
    } 
}

function ListaProdutos(){
    let listaProdutos = '';
    totalValor = 0;

    produtosCarrinho.forEach((produto) => {
        listaProdutos += `
        <tr>
        <td> ${produto.produto}</td>
        <td>R$ ${produto.preco},00</td>
        </tr>`;

        totalValor += produto.preco;    
    });
    return listaProdutos;
}

function finalizarCart(){
    Swal.fire({
        icon: "question",
        confirmButtonText:"Enviar pedido",
        showCancelButton: true,
        title: " Digite as informações de entrega!",
        html: `
        <form>
            <input id= "end" placeholder="Endereço"  required></input>
            <input id= "tel" placeholder="Telefone"  required></input>
            <input id= "pag" placeholder="Forma de pagamento"  required></input>
        </form>
     `
    }).then((result) => {
        if(result.isConfirmed){
            enviaWhats();
            window.location.reload();
        }
    });
}

function enviaWhats(){
    const endereco = document.getElementById("end").value;
    const telefone = document.getElementById("tel").value;
    const pagamento = document.getElementById("pag").value;

    const mensagem = `
    Olá, gostaria de fazer um pedido! 
    Endereço: ${endereco}
    Telefone: ${telefone}
    Forma de pagamento: ${pagamento}
    Total de produtos: ${produtosCarrinho} 
    `;

    let produtos = ListaProdutos();

    const whatsappUrl =
    `https://wa.me/5515997604794?text=
    ${encodeURIComponent(
        mensagem + produtos + `\nTotal: R$ ${totalValor},00`
    )}`;
    localStorage.clear();
    window.open(whatsappUrl, '_blank');
}