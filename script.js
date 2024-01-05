function sendToWhatsApp() {
  var name = encodeURIComponent(document.getElementById('name').value);
  var email = encodeURIComponent(document.getElementById('email').value);
  var message = encodeURIComponent(document.getElementById('message').value);
  var phoneNumber = '5531989900850'; // Seu número de WhatsApp aqui

  // Decodificar
  name = decodeURIComponent(name);
  email = decodeURIComponent(email);
  message = decodeURIComponent(message);

  var whatsappUrl = 'https://api.whatsapp.com/send?phone=' + phoneNumber + '&text=' + encodeURIComponent('Nome: ' + name + '\nEmail: ' + email + '\nMensagem: ' + message);
  
  window.open(whatsappUrl);
}



$(document).ready(function() {
    var carrinho = [];
    var total = 0;

    function atualizarCarrinho() {
        var itensCarrinho = $("#itens-carrinho");
        itensCarrinho.empty();
        var novoTotal = 0;
    
        var contadorItens = {};
    
        carrinho.forEach(function(item) {
            if (contadorItens[item.nome]) {
                contadorItens[item.nome]++;
            } else {
                contadorItens[item.nome] = 1;
            }
        });
    
        for (var nomeProduto in contadorItens) {
            var quantidade = contadorItens[nomeProduto];
            var itemCarrinho = carrinho.find(item => item.nome === nomeProduto);
            var precoTotalItem = itemCarrinho.preco * quantidade;
            novoTotal += precoTotalItem;
    
            var li = $("<li></li>").text(`${nomeProduto} Qtd: ${quantidade} - R$${precoTotalItem.toFixed(2)}`);
            var removerBotao = $("<button class='remover-item'>Remover</button>");
            li.append(removerBotao);
            itensCarrinho.append(li);
        }
    
        // Animação "Recalculando" do valor total do carrinho
    var totalCarrinhoElement = $("#total-carrinho");
    var oldTotal = parseFloat(totalCarrinhoElement.text().replace("Total: R$ ", ""));
    var duration = 800; // Duração da animação em milissegundos

    $({ totalValue: oldTotal }).animate({ totalValue: novoTotal }, {
        duration: duration,
        step: function() {
            totalCarrinhoElement.text("Recalculando: R$ " + this.totalValue.toFixed(2));
        },
        complete: function() {
            totalCarrinhoElement.text("Total: R$ " + novoTotal.toFixed(2));
        }
    });

    total = novoTotal;
}
    

    function transformarTextoMaiusculas() {
        var options = $("#produtos option");
        options.each(function() {
            var option = $(this);
            var price = option.data("price");
            var text = option.text();
            
            var uppercaseText = text.toUpperCase();
            
            option.text(uppercaseText);
        });
    }

    $("#produtos").change(function() {
        var produtoSelecionado = $("#produtos option:selected");
        var nome = produtoSelecionado.val().toUpperCase(); 
        var preco = parseFloat(produtoSelecionado.data("price"));

       
        var servicoExistente = carrinho.find(item => item.nome === nome);
        if (servicoExistente) {
            alert("Este serviço já foi selecionado.");
            return;
        }

        carrinho.push({ nome: nome, preco: preco });
        atualizarCarrinho();
        $("#produtos option:first").prop("selected", true);
    });

    $("#itens-carrinho").on("click", ".remover-item", function() {
        var li = $(this).closest("li");
        var nomeProduto = li.text().split(" Qtd: ")[0];
        var indice = carrinho.findIndex(item => item.nome === nomeProduto);

        if (indice !== -1) {
            carrinho.splice(indice, 1);
            li.remove();
            atualizarCarrinho();
        }
    });

    $("#encomendar").click(function() {
        var nome = $("#nome").val();
        var celular = $("#numero_de_celular").val().replace(/\D/g, ""); 
        var endereco = $("#endereco").val();
        var dataPedido = $("#data_pedido").val();
        var dataFormatada = dataPedido.split("-").reverse().join("/");

        
        if (nome && celular && endereco && dataPedido && carrinho.length > 0) {
            var mensagem = "*SOLICITAÇÃO DE AGENDAMENTO*%0A%0A";
            mensagem += "Nome: " + nome + "%0A";
            mensagem += "Número de Celular: " + celular + "%0A";
            mensagem += "Endereço: " + endereco + "%0A";
            mensagem += "Data da Solicitação: " + dataFormatada + "%0A";
            mensagem += "%0A*Serviços:*%0A";

            var produtosEnviados = [];
            carrinho.forEach(function(item) {
                if (!produtosEnviados.includes(item.nome)) {
                    var quantidade = carrinho.filter(function(i) {
                        return i.nome === item.nome;
                    }).length;
                    var precoTotalItem = item.preco * quantidade;
                    mensagem += `- ${item.nome} Qtd: ${quantidade} (R$${precoTotalItem.toFixed(2)})%0A`;
                    produtosEnviados.push(item.nome);
                }
            });

            mensagem += "%0A";
            mensagem += "*Valor Total do Serviço:* R$" + total.toFixed(2) + "%0A";

            var url = 'https://wa.me/5531989900850/?text=' + mensagem;
            window.open(url);
        } else {
            alert("Por favor, preencha todos os campos do formulário e adicione algum serviço ao carrinho antes de fazer o agendamento.");
        }
    });

    transformarTextoMaiusculas();

    var uppercaseFields = $("input[type='text']");
    uppercaseFields.on("input", function() {
    var input = $(this);
    var originalValue = input.val();
    var uppercaseValue = originalValue.toUpperCase();
    input.val(uppercaseValue);
});



  var dataAtual = new Date();
  var diaAtual = dataAtual.getDate();
  var mesAtual = dataAtual.getMonth() + 1;
  var anoAtual = dataAtual.getFullYear();
  var dataFormatada = `${anoAtual}-${mesAtual.toString().padStart(2, '0')}-${diaAtual.toString().padStart(2, '0')}`;

  $("#data_pedido").val(dataFormatada);
  $("#data_pedido").attr("min", dataFormatada);

  $("#data_pedido").on("change", function() {
    var selectedDate = new Date($(this).val());
    var minDate = new Date(dataFormatada);

    if (selectedDate < minDate) {
        $(this).val(dataFormatada);
    }
    });
  });

// Atribui o evento de clique à imagem do PIX
$("#pix-link").click(function(event) {
    event.preventDefault();
    
    var chavePIX = "31989900850";
  
    // Cria um elemento de input oculto
    var inputTemp = $("<input>");
    $("body").append(inputTemp);
    
    // Define o valor do input como a chave PIX
    inputTemp.val(chavePIX).select();
    
    // Copia o conteúdo do input para a área de transferência
    document.execCommand("copy");
    
    // Remove o elemento de input oculto
    inputTemp.remove();
  
    // Exibe uma mensagem de sucesso
    alert("Chave PIX copiada para a área de transferência!");
  });
  
  





  function initMap() {
    const myLatLng = {
      lat: -19.771211624145508,
      lng: -43.87470626831055
    };
    const map = new google.maps.Map(document.getElementById("gmp-map"), {
      zoom: 18,
      mapTypeId: "hybrid",
      center: myLatLng,
      fullscreenControl: false,
      zoomControl: true,
      streetViewControl: false
    });

    // Marker on the map using initial coordinates
  const marker = new google.maps.Marker({
    position: myLatLng, // Using myLatLng for the marker position
    map: map,
    title: "My location"
  });

  // Infowindow with the address
  const infowindow = new google.maps.InfoWindow({
    content:
      '<h3>Endereço:</h3><p>R. Orison Fernandes Tofani, 42 - São João Batista, Santa Luzia - MG, 33030-122</p>',
  });

  // Set a custom position for the InfoWindow
  const customInfoWindowPosition = new google.maps.LatLng(
    myLatLng.lat - 0.0015, // Adjust the latitude offset as needed (negative value to shift down)
    myLatLng.lng // Keep the same longitude as the marker
  );

  // Event listener for a click on the marker to display the infowindow
  marker.addListener("click", () => {
    infowindow.setPosition(customInfoWindowPosition); // Set the custom position for the InfoWindow
    infowindow.open(map, marker);
  });

  // Open the infowindow by default when the map loads
  infowindow.setPosition(customInfoWindowPosition); // Set the custom position for the InfoWindow
  infowindow.open(map, marker);
}
  
  
  // Exibição gradual
  function animateOnScroll() {
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
  
    elementsToAnimate.forEach((element, index) => {
      if (isElementInViewport(element)) {
        // Add a delay based on the index of the element
        setTimeout(() => {
          element.classList.add('animated'); // Add the 'animated' class to trigger the animation
        }, index * 100); // Adjust the delay (100 milliseconds) to your preference
      }
    });
  }
  
  
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }
  
  // Call the function when the page loads
  window.addEventListener('load', function () {
    document.body.classList.remove('hidden');
    animateOnScroll(); // Trigger the initial animation check on page load
  });
  
  // Call the function when the page is scrolled
  window.addEventListener('scroll', animateOnScroll);
  
  
  // Adicione este código JavaScript para rolar a página até o topo quando o botão for clicado
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  
  // Monitora o evento de rolagem da página para mostrar/ocultar o botão de acordo com a posição
  window.addEventListener('scroll', function () {
    var scrollBtn = document.querySelector('.scroll-top-btn');
    if (window.scrollY > 300) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  });
  
  
  
  // Get the menu icon element
  const menuIcon = document.querySelector('.menu-icon');
  
  // Get the close menu icon element
  const closeMenuIcon = document.querySelector('.close-menu-icon');
  
  // Get the sidebar element
  const sidebar = document.querySelector('.sidebar');
  
  // Toggle the "show" class on the sidebar when the menu icon is clicked
  menuIcon.addEventListener('click', () => {
    sidebar.classList.add('show');
  });
  
  // Add event listener to close the sidebar when the close menu icon is clicked
  closeMenuIcon.addEventListener('click', () => {
    sidebar.classList.remove('show');
  });
  
  
  
  // Aguarde até que o DOM esteja completamente carregado
  document.addEventListener('DOMContentLoaded', function () {
    // Inicialize o Swiper com o efeito "coverflow"
    const mySwiper = new Swiper('.container5', {
      effect: 'coverflow', // Use o efeito de "coverflow"
      coverflowEffect: {
        rotate: 50, // Ângulo de rotação dos slides
        stretch: 0, // Espaçamento entre os slides
        depth: 100, // Profundidade dos slides (z-index)
        slideShadows: true, // Adicionar sombras aos slides
      },
      // Outras configurações do Swiper, se necessário
      slidesPerView: 1, // Quantidade de slides visíveis por vez
      loop: true, // Ativar loop do carrossel
      navigation: {
        nextEl: '.swiper-button-next', // Elemento da seta de próxima imagem
        prevEl: '.swiper-button-prev', // Elemento da seta de imagem anterior
      },
    });
  });
  
  
  
  // Adicione este código JavaScript para alternar entre os feedbacks
  const feedbacks = document.querySelectorAll(".client-feedback");
  const totalFeedbacks = feedbacks.length;
  let currentIndex = 0;
  
  function showNextFeedback() {
    feedbacks[currentIndex].classList.remove("active");
  
    currentIndex = (currentIndex + 1) % totalFeedbacks;
    feedbacks[currentIndex].classList.add("active");
  }
  
  // Mostra o primeiro feedback imediatamente ao carregar a página
  feedbacks[currentIndex].classList.add("active");
  
  // Inicia a troca de feedbacks após 7 segundos
  setInterval(showNextFeedback, 7000);




