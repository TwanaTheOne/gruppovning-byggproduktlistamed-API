
// uiComponent.js

// --- Status / meddelanden ---

export function showLoading() {
  const statusArea = document.getElementById("statusArea");
  statusArea.innerHTML = "";
  const p = document.createElement("p");
  p.className = "status-message status-loading";
  p.textContent = "Laddar produkter...";
  statusArea.appendChild(p);
}

export function showError(message) {
  const statusArea = document.getElementById("statusArea");
  statusArea.innerHTML = "";
  const p = document.createElement("p");
  p.className = "status-message status-error";
  p.textContent = message;
  statusArea.appendChild(p);
}

export function clearStatus() {
  const statusArea = document.getElementById("statusArea");
  statusArea.innerHTML = "";
}

// --- Produktlista ---

export function renderProducts(products, onProductClick) {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  if (!products || products.length === 0) {
    const p = document.createElement("p");
    p.textContent = "Inga produkter matchar din sökning.";
    productList.appendChild(p);
    return;
  }

  products.forEach((product) => {
    const card = createProductCard(product);
    // Interaktivitet: addEventListener (inte onclick)
    card.addEventListener("click", () => onProductClick(product));
    productList.appendChild(card);
  });
}

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";
  card.tabIndex = 0; // så att man kan tabba till kortet

  const imageWrapper = document.createElement("div");
  imageWrapper.className = "product-image-wrapper";

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.title;
  imageWrapper.appendChild(img);

  const title = document.createElement("h2");
  title.className = "product-title";
  title.textContent = product.title;

  const price = document.createElement("p");
  price.className = "product-price";
  price.textContent = product.price.toFixed(2) + " $";

  card.appendChild(imageWrapper);
  card.appendChild(title);
  card.appendChild(price);

  return card;
}

// --- Modal ---

export function setupModal() {
  const modal = document.getElementById("productModal");
  const closeButtons = modal.querySelectorAll("[data-close-modal]");

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => hideModal());
  });

  // Stäng med Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hideModal();
    }
  });
}

export function showProductDetails(product) {
  const modal = document.getElementById("productModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalCategory = document.getElementById("modalCategory");
  const modalDescription = document.getElementById("modalDescription");
  const modalPrice = document.getElementById("modalPrice");

  modalImage.src = product.image;
  modalImage.alt = product.title;
  modalTitle.textContent = product.title;
  modalCategory.textContent = "Kategori: " + product.category;
  modalDescription.textContent = product.description;
  modalPrice.textContent = "Pris: " + product.price.toFixed(2) + " $";

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

export function hideModal() {
  const modal = document.getElementById("productModal");
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}
