export default function showMoreText (button, text) {  
    
    let div = button.parentElement.parentElement.parentElement;
    let paragraphs = div.querySelectorAll(text);
    
    paragraphs.forEach(paragraph => {
        paragraph.classList.remove('description-hidden');
        button.style.display = 'none';    
    })
}

const buttonSeeMoreAboutUsDescription = document.querySelector('.see-more-button-aboutUs-description button');
const buttonMissionDescription = document.querySelector('.see-more-button-mission button');
const buttonWebSiteExplanation = document.querySelector('.see-more-button-website-explanation button');

buttonSeeMoreAboutUsDescription.addEventListener('click', () => {
   showMoreText(buttonSeeMoreAboutUsDescription, '.description-hidden');
});

buttonMissionDescription.addEventListener('click', () => {
    showMoreText(buttonMissionDescription, '.description-hidden');
});


buttonWebSiteExplanation.addEventListener('click', () => {
    showMoreText(buttonWebSiteExplanation, '.description-hidden');
});


// update number of items to be equal to the number
// displayed on basket on top of the page
function updateNumbItemsOnCart() {
    let numbOfItemsOnCart = document.querySelectorAll('div .article-number');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    numbOfItemsOnCart.forEach(el => {
        el.textContent = '0'

        for (let i = 0; i < cart.length; i++) {
            if (cart.length > 0) {
                el.textContent = cart.length
            }
            if (cart.length <= 0) {
                el.textContent = '0'
            }
            else return
        }
    })
}

updateNumbItemsOnCart()