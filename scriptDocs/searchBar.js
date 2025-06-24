const closeSearchBar = document.querySelector('.close-searchbar');
closeSearchBar.title = 'Fechar barra de pesquisa';

const searchBarDiv = document.querySelector('.searchBar-div');
const searchButton = document.querySelector('.fa-magnifying-glass');
const searchBarInput = document.querySelector('.searchBarInput');
const resultList = document.querySelector(".searchResults");

let allProductsThatMatches = [];

searchButton.addEventListener('click', () => {
  searchBarDiv.style.display = 'grid';
  document.body.style.overflowY = "hidden";
});

closeSearchBar.addEventListener('click', () => {
  searchBarDiv.style.display = 'none';
  document.body.style.overflowY = "auto";
});

// Map category names to their corresponding HTML files
const categoryToPageMap = {
  'ovos': 'ovos.html',
  'verduras': 'verduras.html',
  'raizes': 'raizes.html',
  'carnes': 'carnes.html',
  'cogumelos': 'cogumelos.html',
  'compotas': 'compotas.html',
  'Compotas': 'compotas.html',
  'ervasAromaticasECha': 'ervasECha.html',
  'floresComestiveis': 'floresComestiveis.html',
  'horticulas': 'horticulas.html',
  'leguminosas': 'leguminosas.html',
  'microverdes': 'microverdes.html',
  'plantasEmVaso': 'plantasEmVaso.html',
  'sabaoNatural': 'sabaoNatural.html',
  'saladas': 'saladas.html'
};

fetch("/ProductsData/allProducts.json")
  .then((response) => response.json())
  .then((data) => {
    const allProducts = data.allProductsData[0];

    for (const [category, items] of Object.entries(allProducts)) {
      items.forEach((product) => {
        if (product.name) {
          allProductsThatMatches.push({
            ...product,
            category,
          });
        }
      });
    }
  })
  .catch((err) => console.error("Erro ao carregar dados:", err));

searchBarInput.addEventListener('input', () => {
  const searchValue = searchBarInput.value.toLowerCase();
  resultList.innerHTML = "";

  if (!searchValue) return;

  const filtered = allProductsThatMatches.filter(item =>
    item.name.toLowerCase().includes(searchValue)
  );

  filtered.forEach(product => {
     const li = document.createElement("li");
    li.style.cursor = "pointer";
    li.style.listStyle = "none";
    li.style.marginBottom = "1em";
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.gap = "1em";

    // Use the mapping to get the correct page URL
    const categoryPage = categoryToPageMap[product.category] || '/html/products.html';
    
    // li.onclick = () => {
    //     window.location.href = `/html/${categoryPage}` + '#' + `${product.image}`;
    // };

    li.innerHTML = `
    <a href="/html/${categoryPage}#${product.productId}" style="text-decoration: none; color: inherit; display: flex; gap: 1em; background-color: var(--green); padding: 0.5em; border-radius: 0.5em; box-shadow: 0 2px 4px rgba(0,0,0,0.1); min-width: 100%; align-items: center;">
      <img src="${product.image || '/images/logo.png'}" alt="${product.name}" style="min-width: 75px; max-height: 75px; object-fit: cover; border-radius: 50%; border: 1px solid var(--orange);">
       <div>
        <strong style="text-transform: uppercase">${product.name}</strong><br>
        <small>${product.category}</small>
        </div>
    </a>
   
    `;

    resultList.appendChild(li);
    // console.log(`/html/${categoryPage}#${product.image}`);

  });

  console.log("Filtered products:", filtered);

  if (filtered.length === 0) {
    resultList.style.marginTop = "2rem";
    // resultList.style.textAlign = "center";
    resultList.innerHTML = "<h3>Nenhum produto encontrado. Tenta novamente!</h3>";
  }

  resultList.style.zIndex = "101";
});