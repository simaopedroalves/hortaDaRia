const autoResponseMessage = document.querySelector('#autoResponseMessage');
const email = document.querySelector('#email');
const clientMessage = document.querySelector('#clientMessage');
const submitBtn = document.querySelector('#submitBtn');
const clientName = document.querySelector('#name');
const subjectNewMessage = document.querySelector('#newMessage')


// RESPOSTA AUTOMATICA DO NETLIFY PARA O CLIENTE

  //submitBtn.addEventListener('click', () => {

    // let message = `Obrigado pela tua mensagem ${clientName.value}! \n\nResponder-te-emos o mais breve possível. \n\nEis a tua mensagem: 
    //                 \n\n${clientMessage.value} 
    //             `
    // console.log(message)  

    // autoResponseMessage.value = message + clientMessage.value;
    //      subjectNewMessage.value = "Mensagem de " + clientName.value

         

// })


function emailSend() {

    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "simaaoweb@gmail.com",
        Password : "E45C3E9DC2EA7C380F415DF4252704AEB859",
        To : email.value,
        From : "simaaoweb@gmail.com",
        Subject : "This is the subject",
        Body : clientMessage.value
    }).then(
    message => alert(message)
    );

}
