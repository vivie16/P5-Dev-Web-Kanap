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
let kanap 
// Je récupére le produit depuis mon API
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
  if (colorSelect.value ===''){
    alert ("Veuillez choisir une couleur")
    return
  }
  //quantité
  let quantitySelect = document.querySelector("#quantity");
  if (quantitySelect) {
    quantitySelect = parseInt(quantitySelect.value);
  }
  if(quantitySelect <1 ||quantitySelect>100){
    alert ("Veuillez choisir une quantité")
    return
  };
  //je crée la constate tableau pour le localstorage
  const cart = {
    id : productId,
    name : 'kanap.name',
    img : 'kanap.imageUrl',
    alt : 'kanap.altTxt',
    color : colorSelect,
    quantity : quantitySelect,
  }
  // je récupère les données dans le localstorage
  let productLocalStorage = JSON.parse(localStorage.getItem ("all"));
  // je verifie que le produit n'est pas dans le localstorage
  if (productLocalStorage === null) {
    productLocalStorage = [];
  }
  //  la varable si le produit existe pas
  let exist = false
    if (exist) {
      productLocalStorage.push(cart);
    }
  // si le produit existe
  for (let i = 0; i < productLocalStorage.length; i++){
    if (productLocalStorage[i].id === productId && productLocalStorage[i].color === colorSelect) {
      productLocalStorage[i].quantity += quantitySelect
      exist = true
    }
  }
  //Convertir l'objet JS en chaine de caractere Json afin de le stocker ds le localstorage    
  localStorage.setItem("productLocalStorage", JSON.stringify(productLocalStorage)); 
  // Créer un message d'alerte pr confimer que le produit a été ajouté au panier
  alert("Votre produit a bien été ajouté au panier");   
}

