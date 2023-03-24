const dados_todos = [];

function safe(){

  this.formatar();
  if(this.validarcampos() === 'vazio'){
    
  }
  else{
    this.teste();

  const Descrição = document.getElementById("Descrição").value
  const forma = document.getElementById("forma").value
  const valor = document.getElementById("numnegativo").value.toString().replace(".",",");
  
  const Parcela_mes = document.getElementById("Parcela_mes").value
  const Parcela_total = document.getElementById("Parcela_total").value
  const Data = document.getElementById("Data").value

  const dados = {Descrição, forma, valor, Parcela_mes, Parcela_total, Data}

  dados_todos.push(dados)

  let mostrar_tudo = '';
  dados_todos.map((todos) => {
     mostrar_tudo += '<h1> --------<br>' + todos.Descrição + ' <br> ' + todos.valor + ' <br>[' + todos.Parcela_mes + ' / ' + todos.Parcela_total + ']' + '<br>' + todos.Data +  '</h1>';
    const print = document.getElementById("mostrar");
    print.innerHTML = mostrar_tudo;
  })

  console.log(dados_todos)
  }
}


function Enviar(){
  fetch('https://sheetdb.io/api/v1/ut97qvbxxykin', {
  method: 'POST',
  name:'PLAPI',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(dados_todos)
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error(error))

setTimeout(function() {
  this.Limpar()
  this.recarregarPagina()
}, 2000);


}

function Consultar(){

  fetch('https://sheetdb.io/api/v1/ut97qvbxxykin?sheet=resultado')
  .then((response) => response.json())
  .then((data) => {
    // console.log(data)
    // console.log(typeof data)
    const objdata = data
    // console.log(typeof objdata)
    objdata.map((conta) => {
        console.log(conta.valor)
        const print = document.getElementById("mostrar");
        print.innerHTML = '<h1>' + conta.valor  + '</h1>'
    })
  })
}

function Colsultar_Ultimo_Lancamento(){
  fetch('https://sheetdb.io/api/v1/ut97qvbxxykin')
  .then((response) => response.json())
  .then((data) => {
    // console.log(data)
    // console.log(typeof data)
    const objdata = data
    // console.log(typeof objdata)
    objdata.map((conta) => {
        console.log(conta.valor)
        const print = document.getElementById("mostrar");
        print.innerHTML = '<h1>'+ conta.Descrição + "   " + conta.valor  + '</h1>'
    })
  })
}

function teste(){
  const select = document.getElementById("opc");
  const teste = document.getElementById("numnegativo").value;

  
  if(teste > 0 && select.value === "deb"){
    var testenegativo = teste - teste * 2
    console.log(testenegativo)
    document.getElementById("numnegativo").value = testenegativo;
  }

  if(teste < 0 && select.value === "cred"){
    var testepositivo = Math.abs(teste);
    console.log(testepositivo)
    document.getElementById("numnegativo").value = testepositivo;
  }
}

function Ver_todos(){
  fetch('https://sheetdb.io/api/v1/ut97qvbxxykin')
  .then((response) => response.json())
  .then((data) => {
    const objeto_data = data
    let mostrar_tudo = '';
    objeto_data.map((todos) => {
      mostrar_tudo += '<h1> --------<br>' + todos.Descrição + ' <br> ' + todos.valor + ' <br>[' + todos.Parcela_mes + ' / ' + todos.Parcela_total + ']' + '<br>' + todos.Data +  '</h1>';
      // console.log(todos.Descrição + '  ' + todos.valor + '  ' + todos.Parcela_mes + '  ' + todos.Parcela_total)
      const print = document.getElementById("mostrar");
      print.innerHTML = mostrar_tudo;
    })

  })
}

function Limpar(){
  // Limpar a parte que exibe os resultados
  const print = document.getElementById("mostrar");
  print.innerHTML = '';

  // Limpar os inputs
  document.getElementById("formulario").reset();

  this.Carregadata();
  this.recarregarPagina();
}

function Carregadata(){
  var today = new Date();
  var yyyy = today.getFullYear();
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var dd = String(today.getDate()).padStart(2, '0');
  var dateStr = yyyy + '-' + mm + '-' + dd;
  document.getElementById("Data").value = dateStr;

}

function recarregarPagina() {
  location.reload();
}

function validarcampos(){
  const Descrição = document.getElementById("Descrição").value
  const forma = document.getElementById("opc").value
  const valor = document.getElementById("numnegativo").value

  if(Descrição === ''){
    alert("Campo descrição não foi preechido!")
    const campo = 'vazio';
    return campo
  }
  else if(forma === ''){
    alert("Selecione o tipo de operação!")
    const campo = 'vazio';
    return campo
  }
  else if(valor === ''){
    alert("DIgite o valor!")
    const campo = 'vazio';
    return campo
  }
  else{
    const seguir = 'letsgo';
    return  seguir
  }
}


//FUNÇÃO PARA FORMATAR O INPUT DO VALOR COM OS PONTOS


const campoInput = document.getElementById('numnegativo');

function formatar(){
    let campo = campoInput.value;

    // Remove espaços em branco e substitui ponto por vírgula para permitir a formatação correta
    campo = campo.trim().replace('.', ',');

    // Verifica o comprimento do número
    if (campo.length <= 2) {
      // Insere zero e vírgula no início
      campo = '0,' + campo.padStart(2, '0');
    } else {
      // Remove zeros à esquerda
      campo = campo.replace(/^0+/, '');
      
      // Verifica se já existe uma vírgula no número
      const posicaoVirgula = campo.indexOf(',');
      if (posicaoVirgula === -1) {
        // Se não existir, insere vírgula após as duas primeiras casas decimais
        campo = campo.substring(0, campo.length - 2) + ',' + campo.substring(campo.length - 2);
      } else if (posicaoVirgula === campo.length - 3) {
        // Se já existir e estiver na posição correta, não faz nada
      } else {
        // Se já existir e estiver em outra posição, remove a vírgula existente e insere na posição correta
        campo = campo.replace(',', '');
        campo = campo.substring(0, campo.length - 2) + ',' + campo.substring(campo.length - 2);
      }
    }

    // Substitui vírgula por ponto para exibir a formatação correta
    campo = campo.replace(',', '.');

    campoInput.value = campo; // atualiza o valor do campo
};


// TESTES TESTES TESTES TESTES TESTES TESTES TESTES TESTES TESTES TESTES TESTES TESTES TESTES