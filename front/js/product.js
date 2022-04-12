// récupérer l'id du produit a partir de l'URL
const PRODUCTURL = new URL(document.location).searchParams;
const ID = PRODUCTURL.get("id");
// Je récupére le produit depuis mon API
const APIPRODUCT => {
    fetch(`http://localhost:3000/api/product${ID}`)
      .then((res) => res.json())
      .then((data) => (product = data))
  };