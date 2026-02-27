// Produtos simulados
const products = [
  { id: 1, name: "Notebook Gamer", price: 4500 },
  { id: 2, name: "Smartphone Pro", price: 3200 },
  { id: 3, name: "Smart TV 50\"", price: 2800 },
  { id: 4, name: "Headphone Bluetooth", price: 350 }
];

let cart = [];

const productGrid = document.getElementById("productGrid");
const cartCount = document.getElementById("cartCount");
const searchInput = document.getElementById("searchInput");
const navMenu = document.getElementById("navMenu");
const menuToggle = document.getElementById("menuToggle");

// Renderizar produtos
function renderProducts(filteredProducts) {
  productGrid.innerHTML = "";
  filteredProducts.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>R$ ${product.price}</p>
      <button onclick="addToCart(${product.id})">Adicionar</button>
    `;

    productGrid.appendChild(card);
  });
}

// Adicionar ao carrinho
function addToCart(id) {
  cart.push(id);
  cartCount.textContent = cart.length;
}

// Busca
searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(term)
  );
  renderProducts(filtered);
});

// Menu mobile
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Carrossel automático
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 3000);

// Inicializar
renderProducts(products);