var cartaSage = {
  nome: "Sage",
  imagem:
    "https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt8a627ec10b57f4f2/5eb7cdc16509f3370a5a93b7/V_AGENTS_587x900_sage.png",
  atributos: {
    ataque: 60,
    defesa: 90,
    magia: 40,
  },
};

var cartaDragonKnight = {
  nome: "Dragon Knight",
  imagem:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY-ySfhsGF-0x9qyWM65CVlsDFiMsEy303Jw&usqp=CAU",
  atributos: {
    ataque: 40,
    defesa: 50,
    magia: 45,
  },
};

var cartaMaquina = {
  nome: "Maquina de Costurar",
  imagem:
    "https://images-na.ssl-images-amazon.com/images/I/513HkQutwKL._AC_SY450_.jpg",
  atributos: {
    ataque: 70,
    defesa: 46,
    magia: 80,
  },
};

var cartaHarry = {
  nome: "Harry Potter",
  imagem:
    "https://static.wikia.nocookie.net/harrypotter/images/5/53/550w_movies_harry_potter_order_of_phoenix_1.jpg/revision/latest/scale-to-width-down/140?cb=20150215221208&path-prefix=pt-br",
  atributos: {
    ataque: 40,
    defesa: 16,
    magia: 106,
  },
};

var cartaNezuko = {
  nome: "Nezuko",
  imagem:
    "https://i.pinimg.com/originals/89/f6/2a/89f62aeb5b2c134b5c592e2023a283da.jpg",
  atributos: {
    ataque: 108,
    defesa: 78,
    magia: 10,
  },
};

var cartaTanjirou = {
  nome: "Tanjirou",
  imagem:
    "https://a-static.besthdwallpaper.com/demon-slayer-kamado-tanjirou-papel-de-parede-25601_L.jpg",
  atributos: {
    ataque: 200,
    defesa: 90,
    magia: 60,
  },
};

var cartaLong = {
  nome: "Long",
  imagem:
    "https://www.looper.com/img/gallery/why-long-from-wish-dragon-sounds-so-familiar/intro-1623377372.jpg",
  atributos: {
    ataque: 10,
    defesa: 15,
    magia: 25,
  },
};


var cartaJogador;
var CartaMaquina;


var cartas = [
  cartaSage,
  cartaDragonKnight,
  cartaMaquina,
  cartaHarry,
  cartaNezuko,
  cartaTanjirou,
  cartaLong,
];

var pontosJogador = 0
var pontosMaquina = 0

atualizaPlacar()
atualizaQuantidadeDeCartas()

function atualizaQuantidadeDeCartas() {
    var divQuantidadeCartas = document.getElementById('quantidade-cartas')
    var html = "Quantidade de cartas no jogo: " + cartas.length

    divQuantidadeCartas.innerHTML = html
}

function atualizaPlacar() {
    var divPlacar = document.getElementById('placar')
    var html = "Jogador " + pontosJogador + "/" + pontosMaquina + " Máquina"

    divPlacar.innerHTML = html
}

function sortearCarta() {
    var numeroCartaMaquina = parseInt(Math.random() * cartas.length)
    cartaMaquina = cartas[numeroCartaMaquina]
    cartas.splice(numeroCartaMaquina, 1)

    var numeroCartaJogador = parseInt(Math.random() * cartas.length)
    cartaJogador = cartas[numeroCartaJogador]
    cartas.splice(numeroCartaJogador, 1)

    document.getElementById('btnSortear').disabled = true
    document.getElementById('btnJogar').disabled = false

    exibeCartaJogador()
}

function exibeCartaJogador() {
    var divCartaJogador = document.getElementById("carta-jogador")
    var moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
    divCartaJogador.style.backgroundImage = `url(${cartaJogador.imagem})`
    var nome = `<p class="carta-subtitle">${cartaJogador.nome}</p>`
    var opcoesTexto = ""

    for (var atributo in cartaJogador.atributos) {
        opcoesTexto += "<input type='radio' name='atributo' value='" + atributo + "'>" + atributo + " " + cartaJogador.atributos[atributo] + "<br>"
    }

    var html = "<div id='opcoes' class='carta-status'>"

    divCartaJogador.innerHTML = moldura + nome + html + opcoesTexto + '</div>'
}

function obtemAtributoSelecionado() {
    var radioAtributo = document.getElementsByName('atributo')
    for (var i = 0; i < radioAtributo.length; i++) {
        if (radioAtributo[i].checked) {
            return radioAtributo[i].value
        }
    }
}

function jogar() {
    var divResultado = document.getElementById("resultado")
    var atributoSelecionado = obtemAtributoSelecionado()

    if (cartaJogador.atributos[atributoSelecionado] > cartaMaquina.atributos[atributoSelecionado]) {
        htmlResultado = '<p class="resultado-final">Venceu</p>'
        pontosJogador++
    } else if (cartaJogador.atributos[atributoSelecionado] < cartaMaquina.atributos[atributoSelecionado]) {
        htmlResultado = '<p class="resultado-final">Perdeu</p>'
        pontosMaquina++
    } else {
        htmlResultado = '<p class="resultado-final">Empatou</p>'
    }

    if (cartas.length <= 1) {
        alert("Fim de jogo")
        if (pontosJogador > pontosMaquina) {
            htmlResultado = '<p class="resultado-final">Venceu</p>'
        } else if (pontosMaquina > pontosJogador) {
            htmlResultado = '<p class="resultado-final">Perdeu</p>'
        } else {
            htmlResultado = '<p class="resultado-final">Empatou</p>'
        }
    } else {
        document.getElementById('btnProximaRodada').disabled = false
    }

    divResultado.innerHTML = htmlResultado
    document.getElementById('btnJogar').disabled = true

    atualizaPlacar()
    exibeCartaMaquina()
    atualizaQuantidadeDeCartas()
}

function exibeCartaMaquina() {
    var divCartaMaquina = document.getElementById("carta-maquina")
    var moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
    divCartaMaquina.style.backgroundImage = `url(${cartaMaquina.imagem})`
    var nome = `<p class="carta-subtitle">${cartaMaquina.nome}</p>`
    var opcoesTexto = ""

    for (var atributo in cartaMaquina.atributos) {
        console.log(atributo)
        opcoesTexto += "<p type='text' name='atributo' value='" + atributo + "'>" + atributo + " " + cartaMaquina.atributos[atributo] + "<br>"
    }

    var html = "<div id='opcoes' class='carta-status --spacing'>"

    divCartaMaquina.innerHTML = moldura + nome + html + opcoesTexto + '</div>'
}

function proximaRodada() {
    var divCartas = document.getElementById('cartas')

    divCartas.innerHTML = `<div id="carta-jogador" class="carta"></div> <div id="carta-maquina" class="carta"></div>`

    document.getElementById('btnSortear').disabled = false
    document.getElementById('btnJogar').disabled = true
    document.getElementById('btnProximaRodada').disabled = true

    var divResultado = document.getElementById('resultado')
    divResultado.innerHTML = ""
}
/*
var pontosJogador = 0;
var pontosMaquina = 0;

atualizaPlacar();
atualizaQuantidadeDeCartas();




Sorteia a carta e ainda tira duas cartas
function sortearCarta() {
  var numeroCartaMaquina = parseInt(Math.random() * cartas.length); // add cartas.length
  cartaMaquina = cartas[numeroCartaMaquina];
  cartas.splice(numeroCartaMaquina, 1); //SPLICE funciona para retirar um elementos ou mais, e ele precisa de 2 paramêtros, o que vai ser retirado e a quantidade, que no caso seria (numerocartamaqquina e 1)

  var numeroCartaJogador = parseInt(Math.random() * cartas.length);
  cartaJogador = cartas[numeroCartaJogador];
  cartas.splice(numeroCartaJogador, 1);

  document.getElementById("btnSortear").disabled = true;
  document.getElementById("btnJogar").disabled = false;
  

  exibeCartaJogador();
  
}

//Carta do jogador
function exibeCartaJogador() {
  var divCartaJogador = document.getElementById("carta-jogador");
  var moldura = `<img src="card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute;>`; //style=" width:inherit; height; position: absolute;"

  divCartaJogador.style.backgroundImage = `url(${cartaJogador.imagem})`;
  var nome = `<p class="carta-subtitle">${cartaJogador.nome}</p>`;
  var opcoesTexto = "";

  for (var atributo in cartaJogador.atributos) {
    opcoesTexto +=
      "<input type='radio' name='atributo' value='" +
      atributo +
      "'>" +
      atributo +
      " " +
      cartaJogador.atributos[atributo] +
      "<br>";
  }

  var html = "<div id=`opcoes` class=`carta-status` --spacing'>";

  divCartaJogador.innerHTML = moldura + nome + html + opcoesTexto + "</div>";
}

//Carta maquina
function exibeCartaMaquina() {
  var divCartaMaquina = document.getElementById("carta-maquina");
  var moldura = `<img src="card-super-trunfo-transparent-ajustado.png" style=" width: inherit; height: inherit; position: absolute;>`; //style=" width:inherit; height; position: absolute;"

  divCartaMaquina.style.backgroundImage = `url(${cartaMaquina.imagem})`;
  var nome = `<p class="carta-subtitle">${cartaMaquina.nome}</p>`;
  var opcoesTexto = "";

  for (var atributo in cartaMaquina.atributos) {
    opcoesTexto +=
      "<p ' value=type='text' name='atributo'" +
      atributo +
      "'>" +
      atributo +
      " " +
      cartaMaquina.atributos[atributo] +
      "<br>";
  }

  var html = "<div id=`opcoes` class=`carta-status`";

  divCartaMaquina.innerHTML = moldura + nome + html + opcoesTexto + "</div>";
}

//Retorna o valor do atributo para fazer a validação
function obtemAtributoSelecionado() {
  var radioAtributo = document.getElementsByName("atributo");
  for (var i = 0; i < radioAtributo.length; i++) {
    if (radioAtributo[i].checked) {
      return radioAtributo[i].value;
    }
  }
}

//Onde o jogo acontece e compara os valores das cartas
function jogar() {
  var divResultado = document.getElementById("resultado");
  var atributoSelecionado = obtemAtributoSelecionado();

  if (
    cartaJogador.atributos[atributoSelecionado] >
    cartaMaquina.atributos[atributoSelecionado]
  ) {
    htmlResultado = '<p class="resultado-final">Venceu a carta da Maquina</p>';
    pontosJogador++;
  } else if (
    cartaJogador.atributos[atributoSelecionado] <
    cartaMaquina.atributos[atributoSelecionado]
  ) {
    htmlResultado = '<p class="resultado-final">Perdeu!</p>';
    pontosMaquina++;
  } else {
    htmlResultado = '<p class="resultado-final">Empatou!</p>';
  }

  atualizaPlacar(); // APENAS FUNCIONA AQUI
  atualizaQuantidadeDeCartas();
  exibeCartaMaquina();

  if (cartas.length <= 1) {
    alert("Fim de jogo");

    if (pontosJogador > pontosMaquina) {
      htmlResultado = '"<p class"=resultado-final">Venceu</p>';
    } else if (pontosMaquina > pontosJogador) {
      htmlResultado = '"<p class"=resultado-final">Perdeu</p>';
    } else {
      htmlResultado = '"<p class"=resultado-final">Empatou</p>';
    }
  } else{
   
  //document.getElementById("btnProximaRodada").disabled = false;
    divResultado.innerHTML = htmlResultado;  
    document.getElementById("btnJogar").disabled = true;
    document.getElementById("btnProximaRodada").disabled = false;
  }

}




*/