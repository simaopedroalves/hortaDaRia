const autoResponseMessage = document.querySelector('#autoResponseMessage');
const email = document.querySelector('#email');
const clientMessage = document.querySelector('#clientMessage');
const submitBtn = document.querySelector('#submitBtn');
const clientName = document.querySelector('#name');
const subjectNewMessage = document.querySelector('#newMessage')


// RESPOSTA AUTOMATICA DO NETLIFY PARA O CLIENTE

submitBtn.addEventListener('click', () => {

    subjectNewMessage.value = "Mensagem de " + clientName.value;
})