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
        
            let image = images.baskets[i].image;
            
            imagesHtmlSection.innerHTML += `
                <div class="img-div">
                    <img src="${image}" alt="" class="cb-image">
                </div>
            `
            zoomImage()
        }

        const imageToZoom = document.querySelector('.zoom-div');

        function zoomImage() {
            let allImages = document.querySelectorAll('.historic-images img');
            allImages.forEach(el => {
               el.addEventListener('click', (event) => {
                    let image = event.target.src;        
                    let newDiv = `
                        <img src="${image}" alt="" class="zoom-image">
                    `
                    imageToZoom.classList.toggle('test-show')
                    imageToZoom.innerHTML = newDiv
                    imagesHtmlSection.classList.toggle('zoom-image-section')
                })
            });
        }
      

})


