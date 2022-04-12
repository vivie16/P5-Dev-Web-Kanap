// Récupéré les produits depuis l'api
fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => product (data))

// fonction pour afficher les produits de l'api
function product(article) {
    // création de la CONSANTE
    const items = document.getElementById("items");
    // création de la boucle
    for (let kanap of article) {
      items.innerHTML += 
      `<a href="./product.html?_id=${kanap._id}">
        <article>
            <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
            <h3 class="productName">${kanap.name}</h3>
            <p class="productDescription">${kanap.description}</p>
        </article>
    </a>`;
    }
  }