// toggle class active
const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// klik di luar sidebar untuk menghilangkan nav
const hamburger = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

let cart = [];

const buttons = document.querySelectorAll(".add-to-cart");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    const price = Number(button.getAttribute("data-price"));

    // Cek apakah produk sudah ada di keranjang
    const existing = cart.find((item) => item.name === name);
    if (existing) {
      existing.qty += 1; // tambah jumlah
    } else {
      cart.push({ name: name, price: price, qty: 1 });
    }

    console.log(cart);
    alert(name + " berhasil ditambahkan ke keranjang!");
    // Bisa update tampilan keranjang di sini
  });
});

// Ambil semua tombol tambah ke keranjang
const addToCartButtons = document.querySelectorAll(".add-to-cart");

// Keranjang disimpan di sini (dan localStorage)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Simpan keranjang ke localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Render isi keranjang ke HTML
function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} x${item.qty} - Rp ${item.price * item.qty}`;
    cartItems.appendChild(li);
    total += item.price * item.qty;
  });

  cartTotal.textContent = total.toLocaleString("id-ID");
}

// Tambah produk ke keranjang
function addToCart(product) {
  const existing = cart.find((item) => item.name === product.name);
  if (existing) {
    existing.qty++;
  } else {
    product.qty = 1;
    cart.push(product);
  }
  saveCart();
  renderCart();
}

// Pasang event listener ke setiap tombol tambah ke keranjang
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    const price = parseInt(button.getAttribute("data-price"));

    addToCart({ name, price });
  });
});

// Render keranjang saat halaman dimuat
renderCart();

// Ambil tombol tambah ke keranjang & elemen keranjang
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartEl = document.getElementById("cart");
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const shoppingCartIcon = document.getElementById("shopping-cart");
const closeCartBtn = document.getElementById("close-cart");

// Ambil data keranjang dari localStorage atau inisialisasi baru
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Simpan ke localStorage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Render isi keranjang ke dalam #cart-items dan update total
function renderCart() {
  cartItemsEl.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = "<li>Keranjang kosong</li>";
  } else {
    cart.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} x${item.qty} - Rp ${
        item.price * item.qty
      }`;
      cartItemsEl.appendChild(li);
      total += item.price * item.qty;
    });
  }

  cartTotalEl.textContent = total.toLocaleString("id-ID");
}

// Fungsi tambah produk ke keranjang
function addToCart(product) {
  const existing = cart.find((item) => item.name === product.name);
  if (existing) {
    existing.qty++;
  } else {
    product.qty = 1;
    cart.push(product);
  }
  saveCart();
  renderCart();
}

// Pasang event listener tombol tambah ke keranjang
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    const price = parseInt(button.getAttribute("data-price"));
    addToCart({ name, price });
    alert(`${name} berhasil ditambahkan ke keranjang!`);
  });
});

// Toggle tampil/tutup keranjang saat ikon cart diklik
shoppingCartIcon.addEventListener("click", (e) => {
  e.preventDefault();
  if (cartEl.style.display === "none" || cartEl.style.display === "") {
    cartEl.style.display = "block";
  } else {
    cartEl.style.display = "none";
  }
});

// Tombol tutup keranjang
closeCartBtn.addEventListener("click", () => {
  cartEl.style.display = "none";
});

// Render keranjang saat pertama kali halaman dimuat
renderCart();
