// je récupère l'id du produit a partir de l'URL
const productUrl = new URLSearchParams(document.location.search);
const productId = productUrl.get("_id");
const pageTitle = document.querySelector("title");
//je crée les contantes pour chaque élément du produit
const productImg = document.querySelector(".item__img");
const productTitle = document.querySelector("#title");
const productPrice = document.querySelector("#price");
const productDescription = document.querySelector("#description");
const colorSelect = document.querySelector("#colors");
// Je récupére le produit depuis mon API^
let kanap
fetch(`http://localhost:3000/api/products/${productId}`)
  .then((res) => res.json())
  .then((kanap) => {
  // Je place les données aux bons endroits sur la page
  pageTitle.textContent = kanap.name;
  productImg.innerHTML = `<img src="${kanap.imageUrl}" alt="${kanap.altTxt}">`;
  productTitle.textContent = kanap.name;
  productPrice.textContent = kanap.price;
  productDescription.textContent = kanap.description ;
  //je créer une boucle pour les couleurs
    for (let colors of kanap.colors) {
      colorSelect.innerHTML += 
      `<option value="${colors}">${colors}</option>` ;
    }
})
// je récupère les donnés pour le panier
const btnPanier = document.querySelector("#addToCart")
btnPanier.addEventListener("click",addLocalStorage);
function addLocalStorage (){
  //couleur
  let colorChoice = document.querySelector("#colors")
  if (colorChoice.value ===''){
    alert ("Veuillez choisir une couleur");
    return
  };
  colorChoice = colorChoice.value;
  //quantité
  let quantitySelect = document.querySelector("#quantity");
  if (quantitySelect) {
    quantitySelect = parseInt(quantitySelect.value);
  }
  if(quantitySelect <1 ||quantitySelect>100){
    alert ("Veuillez choisir une quantité");
    return
  };
  //je crée la constate tableau pour le localstorage
  const cart = {
    id : productId,
    name : productTitle.textContent,
    img : productImg.innerHTML,
    color : colorChoice,
    quantity : quantitySelect,
  };
  // je récupère les données dans le localstorage
  let storage = JSON.parse(localStorage.getItem ("all"));
  // je verifie que le produit n'est pas dans le localstorage
  if (storage == null) {
    storage = [];
  }
  //  la varable si le produit existe pas
  let exist = false;
  // si le produit existe
  for (let i = 0; i < storage.length; i++){
    if (storage[i].id === productId && storage[i].color === colorSelect) {
      storage[i].quantity += quantitySelect
      exist = true
    }
  }
  if (!exist) {
    storage.push(cart);
  }
  //Convertir l'objet JS en chaine de caractere Json afin de le stocker ds le localstorage    
  localStorage.setItem("all", JSON.stringify(storage)); 
  // Créer un message d'alerte pr confimer que le produit a été ajouté au panier
  alert("Votre produit a bien été ajouté au panier");   
};

