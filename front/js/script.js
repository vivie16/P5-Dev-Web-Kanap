// Récupéré les produits depuis l'api
fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => product (data))

// fonction pour afficher les produits de l'api
function product(items) {
    // création de la CONSANTE
    const ARTICLE = document.getElementById("items");
    // création de la boucle
    for (let kanap of items) {
      ARTICLE.innerHTML += 
      `<a href="./product.html?_id=${kanap._id}">
        <article>
            <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
            <h3 class="productName">${kanap.name}</h3>
            <p class="productDescription">${kanap.description}</p>
        </article>
    </a>`;
    }
  }