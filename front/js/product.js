// récupérer l'id du produit a partir de l'URL
const PRODUCTURL = new URLSearchParams(document.location.search);
const ID = PRODUCTURL.get("_id");
console.log(ID);
// Je récupére le produit depuis mon API
fetch(`http://localhost:3000/api/products/${ID}`)
  .then((res) => res.json())
  .then((kanap) => {
    //je créer les contantes pour chaque élément du produit
    const pageTitle = document.querySelector("title");
    const Img = document.querySelector(".item__img");
    const productTitle = document.querySelector("#title");
    const productPrice = document.querySelector("#price");
    const productDescription = document.querySelector("#description");
    const colorSelect = document.querySelector("#colors");
    // Je place les données aux bons endroits sur la page
    pageTitle.textContent = kanap.name;
    Img.innerHTML = `<img src="${kanap.imageUrl}" alt="${kanap.altTxt}">`;
    productTitle.textContent = kanap.name;
    productPrice.textContent = kanap.price;
    productDescription.textContent = kanap.description ;
    //je créer une boucle pour les couleurs
      for (let colors of kanap.colors) {
        colorSelect.innerHTML += 
        `<option value="${colors}">${colors}</option>` ;
      }
  })