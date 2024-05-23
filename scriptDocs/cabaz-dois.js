import {updateNumbItemsOnCart} from '/script.js'


const secCabazDois = document.querySelector('.cabaz-dois');

async function callCabazDois() {
    return (await fetch('/productsList.json')).json()
}

document.addEventListener('DOMContentLoaded', async () => {
   
    let object = '';
   
    try {
        object = await callCabazDois();
    }
    catch (error) {
        console.error('ERROR');
        console.log(error);
    }

    // for (let i = 0; i < object.cabazes.length; i++) {

        let cabazName = object.cabazes[1].name;
        let cabazPrice =  object.cabazes[1].price;
        let cabazContent = object.cabazes[1].content;
        let cabazNumOne = object.cabazes[0].open;
        let cabazNumThree = object.cabazes[2].open;
        let createCabaz = object.cabazes[3].open;
        let imageCabazOne = object.cabazes[0].image;
        let imageCabazTwo = object.cabazes[1].image;
        let imageCabazThree = object.cabazes[2].image;
        let imageCreateCabaz = object.cabazes[3].image;

         console.log('Nome: ' + cabazName + '\n' + 'Preço: ' + cabazPrice + '\n' + 'Conteudo: ' + cabazContent)
      
        // console.log(cabazContent)
        // console.log(typeof(cabazContent.toString()))

        cabazContent = cabazContent.toString().replaceAll(',', '<br>')
        secCabazDois.innerHTML += `
        <h2 class="cabaz-name-title">${cabazName}</h2>

        <div class="cabaz-content">
            <div class="cabaz-list">
                ${cabazContent}
            </div>
            <button type="button" class="add-to-cart">Adicionar ao Carrinho</button>
        </div>

            <h4 class="sugestionsTitle">Outras Sugestões:</h4>

            <div class="sugestionsContent">

                <div class="sugestionOne sugestion">
                    <a href="${cabazNumOne}">
                        <img src="${imageCabazOne}" alt="">
                        <span>Cabaz nº 1</span>
                    </a>
                </div> 

                <div class="sugestionTwo sugestion">
                    <a href="${cabazNumThree}">
                        <img src="${imageCabazThree}" alt="">
                        <span>Cabaz nº 3</span>
                    </a>
                </div>

                <div class="sugestionThree sugestion">
                    <a href="${createCabaz}">
                        <img src="${imageCreateCabaz}" alt="">
                        <span>Criar Cabaz</span>
                    </a>
                </div>

            </div>

        `

        let sugOne = document.querySelector('.sugestionOne')
            
        sugOne.addEventListener('click', () => {
            window.open(`${newPage}`)
        })
            
    // }
    updateNumbItemsOnCart()
})
