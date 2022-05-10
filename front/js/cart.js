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
  const qty = quantity[i];
  const cartProducts = cart[i];
  qty.addEventListener("change", (event) => {
    //j'enregistre la nouvelle quantiter
    cartProducts.quantity = parseInt(event.target.value);
    // // je mes à jour le localstorage
    localStorage.setItem("cart", JSON.stringify(cart));
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
    // je supprime le code HTML
    document.querySelector(
        `[data-id='${dataId}']` && `[data-color='${colorId}']`
        )
      .remove();
    // je mes à jour le localstorage
    localStorage.setItem("cart", JSON.stringify(cart));
    calcultateTotalPrice();
  });
}
// le nombre d'article et le prix total
async function calcultateTotalPrice() {
  let panier = JSON.parse(localStorage.getItem("cart"));
  // je déclare les variables en tant que nombre
  let totalArticle = 0;
  let totalPrix = 0;
  // je créer la boucle pour récupéré les quantités et calculer le prix total
  for (let article of panier) {
    totalArticle += article.quantity;
    totalPrix += article.quantity * article.price;
  }
  // j'affichage le nombre d'article et le prix total
  totalArticle = document.getElementById("totalQuantity").textContent;
  totalPrix = document.getElementById("totalPrice").textContent;
}