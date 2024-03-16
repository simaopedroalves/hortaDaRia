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
        let newPage = object.cabazes[1].open;



         console.log('Nome: ' + cabazName + '\n' + 'Preço: ' + cabazPrice + '\n' + 'Conteudo: ' + cabazContent)
      
        // console.log(cabazContent)
        // console.log(typeof(cabazContent.toString()))

        cabazContent = cabazContent.toString().replaceAll(',', '<br>')
        secCabazDois.innerHTML += `
        <h2 class="cabaz-name-title">${cabazName}</h2>

        <div class="cabaz-content">
            <!-- <h4>O ${cabazName} é composto por:</h4> -->
            <div class="cabaz-list">
                <!-- <li class="cabaz-item">Cenoura</li>  -->
                <!-- <li class="cabaz-item">Mini-Acelgas</li>  -->
                <!-- <li class="cabaz-item">Salada-Mix</li>  -->
                <!-- <li class="cabaz-item">Tangerinas</li>  -->
                <!-- <li class="cabaz-item">Microverdes</li>  -->
                ${cabazContent}
            </div>
            <img src="/images/cabaz-photo.jpeg" alt="">
            <button type="button" class="add-to-cart">Adicionar ao Carrinho</button>
        </div>

        <div class="sugestions">

            <h4 class="sugestionsTitle">Outras Sugestões:</h4>

            <div class="sugestionsContent">

                <div class="sugestionOne sugestion">
                    <!-- <a href=""> -->
                        <img src="/images/cabaz-photo.jpeg" alt="">
                        <span>Cabaz nº 2</span>
                    <!-- </a> -->
                </div>

                <div class="sugestionTwo sugestion">
                    <a href="">
                        <img src="/images/cabaz-photo.jpeg" alt="">
                        <span>Cabaz nº 3</span>
                    </a>
                </div>

                <div class="sugestionThree sugestion">
                    <a href="/html/criar-cabaz.html">
                        <img src="/images/cabaz-photo.jpeg" alt="">
                        <span>Criar Cabaz</span>
                    </a>
                </div>

            </div>

        </div>
        `

        let sugOne = document.querySelector('.sugestionOne')
            
        sugOne.addEventListener('click', () => {
            window.open(`${newPage}`)
        })
            
    // }
})
