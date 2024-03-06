 const openMenu = document.querySelector('.openMenu');
 const menu = document.querySelector('.menu-list')
// OPEN AND CLOSE THE MENU

openMenu.addEventListener('click', () => {
    menu.classList.toggle('show')
    openMenu.classList.toggle('fa-x')
})

const cabazOne = document.querySelector('.cabazOne')
const cabazTwo = document.querySelector('.cabazTwo')
const cabazThree = document.querySelector('.cabazThree')
const cabazFour = document.querySelector('.cabazFour')




async function callData() {
    return (await fetch('/productsList.json')).json()
}

document.addEventListener('DOMContentLoaded', async () => {

    let object = ''

    try {
        object = await callData();
    }
    catch (error) {
        console.error('ERROR')
        console.log(error)
    }

    // for (let i = 0; i < object.ervasAromaticasECha.length; i++) {

    //     let name = object.ervasAromaticasECha[i].name;
    //     let price = object.ervasAromaticasECha[i].price;
    //     let img = object.ervasAromaticasECha[i].image;

    //     secErvas.innerHTML += `
    //     `
    // }


    // for (let i = 0; i < object.cabazes.length; i++) {

        // let names = object.cabazes[i].name;
        // let prices = object.cabazes[i].price;
        let nameOne = object.cabazes[0].name
        let priceOne = object.cabazes[0].price

        cabazOne.innerHTML += `
            <div class="cabazContent">
                <h4 class="cabazName">${nameOne}</h4>
                <span class="cabazPrice">${priceOne}€</span>
            </div>
        `
        let nameTwo = object.cabazes[1].name
        let priceTwo = object.cabazes[1].price

        cabazTwo.innerHTML += `
            <div class="cabazContent">
                <h4 class="cabazName">${nameTwo}</h4>
                <span class="cabazPrice">${priceTwo}€</span>
            </div>
        `
        let nameThree = object.cabazes[2].name
        let priceThree = object.cabazes[2].price

        cabazThree.innerHTML += `
            <div class="cabazContent">
                <h4 class="cabazName">${nameThree}</h4>
                <span class="cabazPrice">${priceThree}€</span>
            </div>
        `
        let nameFour = object.cabazes[3].name
        let priceFour = object.cabazes[3].price

        cabazFour.innerHTML += `
            <div class="cabazContent">
                <h4 class="cabazName">${nameFour}</h4>
            </div>
        `

    // }


})


