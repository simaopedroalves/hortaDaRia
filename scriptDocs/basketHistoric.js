async function callDataImages () {
    return (await fetch('/basketImagesHistoric.json')).json();
  }

document.addEventListener('DOMContentLoaded', async () => {

    let images = '';
  
    try {
        images = await callDataImages();
    } catch (error) {
        console.error('ERROR')
        console.log(error)
    }

    let imagesHtmlSection = document.querySelector(".historic-images");

        for (let i = 0; i < images.baskets.length; i++) {
        
            let date = images.baskets[i].date;
            let image = images.baskets[i].image;
            
            imagesHtmlSection.innerHTML += `
                <div class="img-div">
                    <figure>
                        <img src="${image}" alt="">
                        <figcaption>${date}</figcaption>
                    </figure>
                </div>
            `
        
    }

})

