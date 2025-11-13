// main.js

import { fetchProducts } from "./apiService.js";
import {
  showLoading,
  showError,
  clearStatus,
  renderProducts,
  setupModal,
  showProductDetails,
} from "./uiComponent.js";

let allProducts = []; // global state i denna modul

async function init() {
  setupModal();
  setupSearch();

  showLoading();

  try {
    const products = await fetchProducts();
    allProducts = products;
    clearStatus();
    renderProducts(allProducts, handleProductClick);
  } catch (error) {
    showError("Kunde inte hämta produkter. Försök igen senare.");
  }
}

function setupSearch() {
  const searchInput = document.getElementById("searchInput");

  // input-händelse för live-filtrering
  searchInput.addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase().trim();

    const filtered = allProducts.filter((product) =>
      product.title.toLowerCase().includes(query)
    );

    renderProducts(filtered, handleProductClick);
  });
}

function handleProductClick(product) {
  // När man klickar på ett kort visas modal med mer detaljer
  showProductDetails(product);
}

// Starta applikationen
init();

