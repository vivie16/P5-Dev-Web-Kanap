// je récupère le numéro de commande a partir de l'URL
const orderUrl = new URLSearchParams(document.location.search);
const orderId = orderUrl.get("id");
// Affichage du n° de commande
document.getElementById("orderId").textContent = orderId;
// je vide le localStorage
localStorage.clear();