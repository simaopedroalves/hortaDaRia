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

    // for (let i = 0; i < object.cabazes.length; i++) {

        let cabazName = object.cabazes[0].name;
        let cabazPrice =  object.cabazes[0].price;
        let cabazContent = object.cabazes[0].content;
        let cabazNumTwo = object.cabazes[1].open;
        let cabazNumThree = object.cabazes[2].open;
        let createCabaz = object.cabazes[3].open;






        console.log('Nome: ' + cabazName + '\n' + 'Preço: ' + cabazPrice + '\n' + 'Conteudo: ' + cabazContent)
      
        console.log(cabazContent)
        console.log(typeof(cabazContent.toString()))

        cabazContent = cabazContent.toString().replaceAll(',', '<br>')
        secCabazUm.innerHTML += `
        <h2 class="cabaz-name-title">${cabazName}</h2>

        <div class="cabaz-content">
            <div class="cabaz-list">
                ${cabazContent}
            </div>
            <img src="/images/cabaz-photo.jpeg" alt="">
            <button type="button" class="add-to-cart">Adicionar ao Carrinho</button>
        </div>

        <div class="sugestions">

            <h4 class="sugestionsTitle">Outras Sugestões:</h4>

            <div class="sugestionsContent">

                <div class="sugestionOne sugestion">
                    <a href="${cabazNumTwo}">
                        <img src="/images/cabaz-photo.jpeg" alt="">
                        <span>Cabaz nº 2</span>
                    </a>
                </div>

                <div class="sugestionTwo sugestion">
                    <a href="${cabazNumThree}">
                        <img src="/images/cabaz-photo.jpeg" alt="">
                        <span>Cabaz nº 3</span>
                    </a>
                </div>

                <div class="sugestionThree sugestion">
                    <a href="${createCabaz}">
                        <img src="/images/cabaz-photo.jpeg" alt="">
                        <span>Criar Cabaz</span>
                    </a>
                </div>

            </div>

        </div>
        `

        // let sugOne = document.querySelector('.sugestionOne')
            
        // sugOne.addEventListener('click', () => {
        //     window.open(`${newPage}`)
        // })
            
    // }
})


