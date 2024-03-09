const autoResponseMessage = document.querySelector('#autoResponseMessage');
const email = document.querySelector('email');
const clientMessage = document.querySelector('#clientMessage');
const submitBtn = document.querySelector('#submitBtn');
const clientName = document.querySelector('#name');
const subjectNewMessage = document.querySelector('#newMessage')

// RESPOSTA AUTOMATICA DO FORMSUBMIT PARA O CLIENTE
// submitBtn.addEventListener('click', () => {
//     let message = "Obrigado pela tua mensagem! Responder-te-emos o mais breve possível. " +
//     "Eis a tua mensagem: ";
    
//     autoResponseMessage.value = message + clientMessage.value;
//     subjectNewMessage.value = "Mensagem de " + clientName.value
// })