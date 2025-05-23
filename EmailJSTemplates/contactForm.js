function sendMail() {
    let clientData = {
        //dados do cliente e formulario de entrega
        nome: document.getElementById("name").value,
        email: document.getElementById("email").value,
        telemovel: document.getElementById("phoneNumber").value,
        mensagem: document.getElementById("clientMessage").value,
    }
    // emailjs.send('Email Service', 'Template ID', function with data)
    emailjs.send('service_3u285ss', 'contactFormHortaDaRia', clientData) 
    .then(function() {
        // alert("Email sent successfully!");
    }, function(error) {
        console.log('FAILED...', error);
        alert("De momento não é possível enviar a tua mensagem. Por favor, tenta mais tarde. Obrigado!");
    });
    console.log(clientData);

}

function openSuccessPage(event) {
    event.preventDefault(); // Prevent the default form submission
 setTimeout(function() {
    // Redirect to the success page
    window.location.href = "/html/success.html";
 }, 1000)}; 

const submitButton = document.getElementById("submitBtn");
submitButton.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent the default form submission
    sendMail();

    openSuccessPage(event);
})

