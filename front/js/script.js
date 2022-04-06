// Récupéré les produits depuis l'api
fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => product (data))

// fonction pour afficher les produits de l'api
function product(index) {
    let Article = document.getElementById("items");
    // création de la boucle
    for (let article of index) {
      Article.innerHTML += 
      `<a href="./product.html?_id=${article._id}">
        <article>
            <img src="${article.imageUrl}" alt="${article.altTxt}">
            <h3 class="productName">${article.name}</h3>
            <p class="productDescription">${article.description}</p>
        </article>
    </a>`;
    }
  }