const autoResponseMessage = document.querySelector('#autoResponseMessage');
const email = document.querySelector('#email');
const clientMessage = document.querySelector('#clientMessage');
const submitBtn = document.querySelector('#submitBtn');
const clientName = document.querySelector('#name');
const subjectNewMessage = document.querySelector('#newMessage')
const divThankYouMessage = document.querySelector('.thankYouMessage')


// RESPOSTA AUTOMATICA DO NETLIFY PARA O CLIENTE

submitBtn.addEventListener('click', () => {

    let message =   `
                        <span>Obrigado ${clientName}!</span>\n 
                        A tua mensagem foi enviada com sucesso.\n 
                    `;

     divThankYouMessage += message;

    subjectNewMessage.value = "Mensagem de " + clientName.value;
})