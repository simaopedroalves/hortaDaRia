const secErvas = document.querySelector('.ervas')

async function callData() {
    return (await fetch('/productsList.json')).json()
}

document.addEventListener('DOMContentLoaded', async () => {

    let ervasNames = ''

    try {
        ervasNames = await callData();
    }
    catch (error) {
        console.error('ERROR')
        console.log(error)
    }

    for (let i = 0; i < ervasNames.ervasAromaticasECha.length; i++) {
    
        let name = ervasNames.ervasAromaticasECha[i].name;
        let price = ervasNames.ervasAromaticasECha[i].price;
        let img = ervasNames.ervasAromaticasECha[i].image;

        secErvas.innerHTML += `
        `
    }
})