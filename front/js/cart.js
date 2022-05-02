// je récupère les donné du localstorage
let cart = JSON.parse(localStorage.getItem('cart'));
// je récupérè les produits depuis l'api
fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => productcart (data))
// je créer la fonction pour afficher les produits de l'api
function productcart(article) {
    // je créer la constante pour indiqué le lieu d'insertion des produits
    const items = document.getElementById("cart__items");
    // création de la boucle
    for (let kanap of article) {
      items.innerHTML += 
      `<article class="cart__item" data-id="${kanap.id}" data-color="${kanap.color}">
        <div class="cart__item__img">
        <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
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
}