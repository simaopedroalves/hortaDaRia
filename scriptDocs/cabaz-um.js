const secCabazUm = document.querySelector('.cabaz-um');

async function callCabazUm() {
    return (await fetch('/productsList.json')).json()
}

document.addEventListener('DOMContentLoaded', async () => {
   
    let object = '';
   
    try {
        object = await callCabazUm();
    }
    catch (error) {
        console.error('ERROR');
        console.log(error);
    }

    for (let i = 0; i < object.cabazes.length; i++) {

        let cabazName = object.cabazes[0].name;
        let cabazPrice =  object.cabazes[0].price;
        let cabazContent = object.cabazes[0].content;

        console.log('Nome: ' + cabazName + '\n' + 'Preço: ' + cabazPrice + '\n' + 'Conteudo: ' + cabazContent)
      
        // console.log('Nome: ' + ervaName + '\n' + 'Preço: ' + ervaPrice)
        
        secCabazUm.innerHTML += `
        
    `
    }

    
})