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
                    <img src="${image}" alt="cabaz de legumes" class="cb-image">
                </div>
            `
            zoomImage()
        }

        const imageToZoom = document.querySelector('.zoom-div');

        // IF THE USER WANTS TO ZOOM THE IMAGE, JUST CLIK ON THAT IMAGE TO ZOOM IT,
        // THE REVERSE HAPPENS WHEN THE USER CLICK AGAIN ON THE IMAGE
        function zoomImage() {
            let allImages = document.querySelectorAll('.historic-images img');
            let footer = document.querySelector('.media-and-contacts')
           
            allImages.forEach(el => {
               el.addEventListener('click', (event) => {
                    let image = event.target.src;        
                    let newDiv = `
                        <img src="${image}" alt="" class="zoom-image">
                    `
                    imageToZoom.classList.toggle('show-image')
                    imagesHtmlSection.classList.toggle('disappear')
                    footer.classList.toggle('disappear')
                    imageToZoom.innerHTML = newDiv

                    if (imageToZoom.classList.contains('show-image') === true) {
                        imageToZoom.addEventListener('click', () => {
                            imageToZoom.classList.remove('show-image')
                            imagesHtmlSection.classList.remove('disappear')
                            footer.classList.remove('disappear')
                        })
                    }
                })
            });
        }
})


