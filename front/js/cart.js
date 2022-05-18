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
calcultateTotal()
}
const products = document.querySelectorAll(".cart__item");
const deleteItem = document.querySelectorAll(".deleteItem");
const quantity = document.querySelectorAll(".itemQuantity");
// je créer la boucle pour modifier la quantiter
for (let i = 0; i < products.length; i++) {
  const qty = quantity[i];
  const cartProducts = cart[i];
  if (qty) {
    qty.addEventListener("change", (event) => {
      //j'enregistre la nouvelle quantiter
      cartProducts.quantity = parseInt(event.target.value);
      // je mes à jour le localstorage
      localStorage.setItem("cart", JSON.stringify(cart));
    })}
    if (qty.value > 100) {
      qty.value = 100;
    }
      calcultateTotal();
}
// suprimer du panier un produit
for (let i = 0; i < products.length; i++) {
  const del = deleteItem[i];
  let colorId = cart[i].color;
  let dataId = cart[i].id;
  del.addEventListener("click", () => {
    // je supprime de notre panier l'élément de la boucle
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
    calcultateTotal();
  });
}
// le nombre d'article et le prix total
function calcultateTotal() {
  let panier = JSON.parse(localStorage.getItem("cart"));
  // je déclare les variables en tant que nombre
  let totalArticle = 0;
  let totalPrix = 0;
  // je créer la boucle pour récupéré les quantités et calculer le prix total
  for (let article of panier) {
    totalArticle += parseInt(article.quantity);
    totalPrix += parseInt(article.quantity) * parseInt(article.price);
  }
  document.getElementById("totalQuantity").textContent = totalArticle;
  document.getElementById("totalPrice").textContent = totalPrix;
}
// le formulaire
// je créer la constante pour indiqué le lieu du formulaire
const form = document.querySelector(".cart__order__form");
//je crée les contantes pour chaque élément du formulaire
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const email = document.querySelector("#email");
// je créer les constantes des regex
const nameCityRegex = new RegExp ("[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$");
const addressRegex = new RegExp ("[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$");
const emailRegex = new RegExp("^([A-Za-z0-9.-_]{1,100})+@([A-Za-z0-9.-_]{1,100})+.+[a-z]{2,10}$");
// Ecoute les modification
form.firstName.addEventListener('change', function() {
  validFirstName(this);
});
form.lastName.addEventListener('change', function() {
  validLastName(this);
});
form.address.addEventListener('change', function() {
  validAddress(this);
});
form.city.addEventListener('change', function() {
  validCity(this);
});
form.email.addEventListener('change', function() {
  validEmail(this);
});
// partie validation
const validFirstName = function (inputFirstName) {
  let firstNameErrorMsg = inputFirstName.nextElementSibling;
  if (nameCityRegex.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = '';
      return true;
  } else {
      firstNameErrorMsg.innerHTML = 'Veuillez renseigner votre prénom.';
      return false;
  }
};
const validLastName = function (inputLastName) {
  let lastNameErrorMsg = inputLastName.nextElementSibling;
  if (nameCityRegex.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = '';
      return true;
  } else {
      lastNameErrorMsg.innerHTML = 'Veuillez renseigner votre nom.';
      return false;
  }
};
const validAddress = function (inputAddress) {
  let addressErrorMsg = inputAddress.nextElementSibling;
  if (addressRegex.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = '';
      return true;
  } else {
      addressErrorMsg.innerHTML = 'Veuillez renseigner votre adresse.';
      return false;
  }
};
const validCity = function (inputCity) {
  let cityErrorMsg = inputCity.nextElementSibling;
  if (nameCityRegex.test(inputCity.value)) {
      cityErrorMsg.innerHTML = '';
      return true;
  } else {
      cityErrorMsg.innerHTML = 'Veuillez renseigner votre ville.';
      return false;
  }
};
const validEmail = function (inputEmail) {
  let emailErrorMsg = inputEmail.nextElementSibling;
  if (emailRegex.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = '';
      return true;
  } else {
      emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
      return false;
  }
};
  // je créer la constante du bouton commander
  const btn_commander = document.getElementById('order');
  btn_commander.addEventListener('click', (event) => {
  event.preventDefault();
  // je verififie que tous les champs sont remplie
  if (validFirstName(firstName) && validLastName(lastName) && validAddress(address) && validCity(city) && validEmail(email)) {
    const order = {
    contact : {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    },
      products: cart.map(function (product) {
        return product.id 
    })
    };
    console.log(order)
    // pour la methode d'envoye
    const options = {
    method: 'POST',
    body: JSON.stringify(order),
    headers: {  
      "Accept": "application/json",
      'Content-Type': 'application/json' 
    }
    };
    // l'envoie
    fetch("http://localhost:3000/api/products/order",options)
      .then(response => response.json())
      .then(data => {
      localStorage.setItem('orderId', data.orderId);
      document.location.href = 'confirmation.html?id='+ data.orderId;
      });
    }
  })