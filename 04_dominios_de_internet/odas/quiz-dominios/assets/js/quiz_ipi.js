const tabs = $('.tabs button');
const questoes = $('.questao');
const modal = $('.browser-modal-feedback');
let questoesCorretas = 0;
const audio = new Audio();

// esconder modais
modal.hide();
$('.browser-final').hide();

const feedbacks = {
   0: 'Parabéns, você selecionou a alternativa correta!',
   1: 'O DNS é o sistema responsável por associar nomes de domínio a endereços IP, mas não é um protocolo para conexão direta.',
   2: 'Os nomes de domínio devem ser únicos na internet, não podendo ser compartilhados entre sites.',
   3: 'Um nome de domínio não é um endereço físico, mas sim um identificador único para acessar serviços web.',
   4: 'O nome de domínio não faz parte do endereço IP nem pode ser alterado livremente. Ele é registrado e deve ser exclusivo. ',
   5: 'Parabéns, você selecionou a alternativa correta!',
   6: 'O DNS autoritativo não armazena endereços permanentemente; ele fornece informações sobre um domínio quando solicitado.',
   7: 'O DNS não realiza consultas diretamente ao navegador; ele responde a consultas de outros servidores e resolvedores.',
   8: 'O DNS autoritativo não substitui o DNS recursivo, ele responde às consultas quando o recursivo não tem a informação em cache.  ',
   9: 'O DNS autoritativo não altera endereços IP, ele apenas fornece o IP associado ao domínio solicitado. ',
   10: 'Parabéns, você selecionou a alternativa correta!',
   11: 'Nomes de domínio podem conter números com limite de caracteres de 2 a 63, e não exatamente 63.',
   12: 'O domínio não pode começar ou terminar com um hífen, e o limite de caracteres é de 63, não 100.',
   13: 'Nomes de domínio podem conter números e hifens, além de letras, e o limite é de 63 caracteres, não 50.',
   14: 'O limite de caracteres para domínios é de 63, e a renovação não é automática, mas sim necessária para evitar a perda do domínio.',
   15: 'Parabéns, você selecionou a alternativa correta!',
   16: 'O certificado SSL protege a transmissão de dados, mas não substitui a necessidade de um domínio registrado para o site.',
   17: 'Embora o SSL ajude a garantir a segurança, ele não substitui a autenticação via login e senha para acesso ao site.',
   18: 'O SSL é focado na criptografia de dados entre servidor e usuário, e não tem relação com a criação de e-mails personalizados.',
   19: 'O SSL não substitui o serviço de hospedagem; ele apenas protege a comunicação entre o servidor e o navegador.',
   20: 'Parabéns, você selecionou a alternativa correta!',
   21: 'O WHOIS não armazena chaves criptográficas; ele consulta informações de registro de domínio.',
   22: 'O WHOIS não é um serviço de hospedagem; ele consulta informações sobre domínios e protege os dados do registrador.',
   23: 'O WHOIS não gera certificados digitais, ele verifica informações sobre registros de domínio.',
   24: 'Embora o WHOIS possa ser usado para verificar informações sobre a validade de um domínio, sua principal função é fornecer informações sobre o registro, não apenas a expiração.',
}

const mensagensFinais = {
   0: 'Parabéns! Você acertou todas as questões',
   1: 'Você entende do assunto, mas ainda ocorreram alguns erros!',
   2: 'Não foi desta vez! Revise o conteúdo e tente novamente!'
}

const URLs = {
   0: 'https://oqueedominio.com.br/o-que-e-dominio',
   1: 'https://oqueedominio.com.br/dns-autoritativo',
   2: 'https://oqueedominio.com.br/regras-nome-dominio',
   3: 'https://oqueedominio.com.br/certificado-digital-ssl',
   4: 'https://oqueedominio.com.br/whois'
}

function changeUrl() {
   for (let i = 0; i < tabs.length; i++) {
      const tab = tabs[i];
      if ($(tab).hasClass('active')) { $('.browser-url-placeholder')[0].innerText = URLs[i] }
   }
};

// esconde questoes, menos a primeira:
for (let i = 1; i < questoes.length; i++) {
   const element = questoes[i];
   $(element).hide();
};

// event listener nas tabs para mostrar as questoes
for (let i = 0; i < tabs.length; i++) {
   const tab = tabs[i];
   const questao = questoes[i];

   $(tab).click(function () {
      $(questoes).hide();
      $('.active').removeClass('active');
      $(tab).addClass('active');
      $(questao).fadeIn();
      changeUrl();
   });

}

$('.browser-opcao').click(function () {
   if ($(this).hasClass('correta')) {
      const outrxs = $(this).siblings();
      $(this).addClass('selecionada');
      for (let index = 0; index < outrxs.length; index++) {
         const element = outrxs[index];
         $(element).addClass('done');
      };
      $('.tabs .active').addClass('tab-correta');
      $('.tabs .active .question-checkbox').prop('checked', true)
      audio.setAttribute('src', 'assets/audio/acerto.mp3');
      audio.load();
      audio.play();
      //trocar feedback para positivo
      $(modal).fadeIn();
      questoesCorretas++;

   } else {
      $(this).addClass('incorreto');
      const outrxs = $(this).siblings();
      for (let index = 0; index < outrxs.length; index++) {
         const element = outrxs[index];
         $(element).addClass('done');
      };
      $('.tabs .active').addClass('tab-incorreta');
      $('.tabs .active .question-checkbox').prop('checked', true)
      audio.setAttribute('src', 'assets/audio/erro.mp3');
      audio.load();
      audio.play();
      //trocar feedback para negativo
      $(modal).fadeIn();
   }
   //mostra texto de feedback de acordo com opcao selecionada
   const feedbackId = $(this)[0].dataset.feedback;
   $('.feedback-text')[0].innerText = feedbacks[feedbackId];
});

$('.browser-start-btn').click(function () {
   $(this).parents('.browser-start').fadeOut();
   changeUrl();
});

$('.browser-modal-btn').click(function () {
   const questaoAtiva = $('.questao:not([style="display: none;"])');

   $('.browser-modal-feedback').fadeOut();
   $(questaoAtiva).fadeOut();

   if ($('.tabs .active').next().length == 0) {
      if (questoesCorretas < 2) {
         $('.browser-final .msg p')[0].innerText = mensagensFinais[2];
      }
      if (questoesCorretas >= 2 && questoesCorretas < 5) {
         $('.browser-final .msg p')[0].innerText = mensagensFinais[1];
      }
      if (questoesCorretas == 5) {
         $('.browser-final .msg p')[0].innerText = mensagensFinais[0];
      }
      $('.browser-final').fadeIn();
   }

   setTimeout(() => {
      $(questaoAtiva).next().fadeIn();
      const nextTab = $('.tabs .active').next();
      $('.tabs .active').removeClass('active');
      $(nextTab).addClass('active');
      changeUrl();
   }, 500);
});

$('.browser-btn-inicio').click(function () {
   $('.browser-start').fadeIn();
});

//reseta td
$('.browser-restart-btn').click(function () {
   questoesCorretas = 0;
   $('.done').removeClass('done');
   $('.selecionada').removeClass('selecionada');
   $('.incorreto').removeClass('incorreto');
   $('.tab-correta').removeClass('tab-correta');
   $('.tab-incorreta').removeClass('tab-incorreta');
   $('.questao').fadeOut();
   $('.browser-final').fadeOut();
   $('.tabs .question-checkbox').prop('checked', false);
   document.querySelector('.tabs button').classList.add('active');
   setTimeout(() => {
      $($('.questao')[0]).fadeIn();
      changeUrl();
   }, 500);
});