const buttonSeeMoreAboutUsDescription = document.querySelector('.see-more-button-aboutUs-description button');
const buttonMissionDescription = document.querySelector('.see-more-button-mission button');
const buttonWebSiteExplanation = document.querySelector('.see-more-button-website-explanation button');

const aboutUsHiddenDescription = document.querySelectorAll('.description-hidden');

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('span').forEach(button => {
        button.classList.add('see-more-button');
    })
});

// buttonSeeMoreAboutUsDesccription.addEventListener('click', () => {
//     console.log('click');

//     aboutUsHiddenDescription.forEach(paragraph => {
//         paragraph.classList.remove('about-us-description-hidden');
//         buttonSeeMoreAboutUsDesccription.style.display = 'none';    
//     })
// });



buttonSeeMoreAboutUsDescription.addEventListener('click', () => {
   showMoreText(buttonSeeMoreAboutUsDescription, '.description-hidden');
});

buttonMissionDescription.addEventListener('click', () => {
    showMoreText(buttonMissionDescription, '.description-hidden');
});

buttonWebSiteExplanation.addEventListener('click', () => {
    showMoreText(buttonWebSiteExplanation, '.description-hidden');
});

function showMoreText (button, text) {  
    console.log(text);
    
    let div = button.parentElement.parentElement.parentElement;
    let paragraphs = div.querySelectorAll(text);
    
    paragraphs.forEach(paragraph => {
        paragraph.classList.remove('description-hidden');
        button.style.display = 'none';    
    })
}