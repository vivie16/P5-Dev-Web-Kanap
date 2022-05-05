// je récupère les donné du localstorage
let cart = JSON.parse(localStorage.getItem("cart"));
// je créer la constante pour indiqué le lieu d'insertion des produits
const items = document.getElementById("cart__items");
let kanap
// création de la boucle
for ( kanap of cart) {
    items.innerHTML += 
    `<article class="cart__item" data-id="${kanap.id}" data-color="${kanap.color}">
    <div class="cart__item__img">
    <img src="${kanap.img}" alt="${kanap.alt}">
    </div>
    <div class="cart__item__content">
        <div class="cart__item__content__description">
        <h2>${kanap.name}</h2>
        <p>${kanap.color}</p>
        <p>${kanap.price}€</p>
        </div>
        <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${kanap.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
        </div>
        </div>
    </div>
</article>`
}
const products = document.querySelectorAll(".cart__item");
const deleteItem = document.querySelectorAll(".deleteItem");
const quantity = document.querySelectorAll(".itemQuantity");
// je créer la boucle pour modifier la quantiter
for (let i = 0; i < products.length; i++) {
  // j'empèche que la quantité soit superieur à 100
  const qty = quantity[i];
  const cartProducts = cart[i];
  qty.addEventListener("change", (event) => {
    //j'enregistre la nouvelle quantiter
    cartProducts.quantity = parseInt(event.target.value);
    // // je mes à jour le localstorage
    localStorage.setItem("cart", JSON.stringify(cart));
    // on lance la fonction qui va mettre à jour le prix et le total de la page panier
    calcultateTotalPrice();
    });
}
//suprimer du panier un produit
for (let i = 0; i < products.length; i++) {
  const del = deleteItem[i];
  let colorId = cart[i].color;
  let dataId = cart[i].id;
  del.addEventListener("click", () => {
    // je supprime de notre panier l'élément de la boucle selectionné via splice()
    let filtre = cart.filter(function (article) {
      return article.id != dataId || article.color != colorId;
    });
    cart = filtre;

    // on supprime le code HTML de ce même élément
    document.querySelector(
        `[data-id='${dataId}']` && `[data-color='${colorId}']`
      )
      .remove();
    // On met à jour le localstorage
    localStorage.setItem("panier", JSON.stringify(panier));
    // on lance la fonction qui va mettre à jour le prix et le total de la page panier
    calcultateTotalPrice();
  });
}
// le nombre d'article et le prix total
function calcultateTotalPrice(products) {
  //Définir les variables des totaux quantité et prix pour le panier  
    let totalPrice = 0; 
    let totalQuantity = 0; 
  //Faire une boucle pour récupérer toutes les quantités et prix dans le localstorage puis calculer les totaux 
  for (let i = 0; i < products.length; i++) {
      let kanapQuantity = products[i].quantity; 
      let price = products[i].price; 
      totalQuantity += parseInt(quantity); 
      totalPrice += kanapQuantity * price; 
    }
  //Insérer les totaux dans le DOM
    document.querySelector("#totalPrice").innerHTML = totalPrice;
    document.querySelector("#totalQuantity").innerHTML = totalQuantity;
}