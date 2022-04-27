// je récupère l'id du produit a partir de l'URL
const PRODUCTURL = new URLSearchParams(document.location.search);
const ID = PRODUCTURL.get("_id");
const pageTitle = document.querySelector("title");
//je crée les contantes pour chaque élément du produit
const Img = document.querySelector(".item__img");
const productTitle = document.querySelector("#title");
const productPrice = document.querySelector("#price");
const productDescription = document.querySelector("#description");
const colorSelect = document.querySelector("#colors");
// je crée la constante du bouton
const btnPanier = document.querySelector("#addToCart")
let kanap 
// Je récupére le produit depuis mon API
fetch(`http://localhost:3000/api/products/${ID}`)
  .then((res) => res.json())
  .then((kanap) => {
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
  // je récupère les donnés
//couleur
colorSelect.addEventListener ("input", (event) => {
  const colorProduct = event.target.value;
});
//quantité
const quantitySelect = document.querySelector("#quantity");
quantitySelect.addEventListener ("input",(event) => {
  const quantityProduct = event.target.value;
});
// local storage
let storageProducts = [];
// si le localstorage existe j'ajoute le nouveau produit
if(localStorage.getItem ("products") !== null){
  console.log(localStorage.getItem("products"))
  storageProducts = JSON.parse(localStorage.getItem("products"));
}
//si le local storage n'existe pas
btnPanier.addEventListener ("click",()=> {
  storageProducts.push (kanap);
  localStorage.setItem("products",JSON.stringify(storageProducts));
})
