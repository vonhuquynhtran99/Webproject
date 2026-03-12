const PRODUCTS = [
  {
    id: "darkchocolate",
    name: "Chocolate Dark 72%",
    price: 24.95,
    unit: "100g",
    image: "img/darkchocolate.jpg",
    tags: ["dark chocolate"],
    desc: "Dark chocolate with a round and rich chocolate flavor and a full-bodied character. Cocoa content 72%.",
    nutrition: {
      Energy: 490,
      Fat: 23,
      Carbohydrate: 60,
      Sugars: 51,
      Protein: 8.7,
      Salt: 0.52,
    },
  },
  {
    id: "kex",
    name: "Biscuit chocolate Cloetta",
    price: 9.5,
    unit: "60g",
    image: "img/kex.JPG",
    tags: ["biscuit", "chocolate"],
    desc: "Crispy layered wafers coated in rich chocolate.",
    nutrition: {
      Energy: 520,
      Fat: 24,
      Carbohydrate: 61,
      Sugars: 42,
      Protein: 9.7,
      Salt: 0.41,
    },
  },
  {
    id: "fazer",
    name: "Chocolate pralines Milk chocolate",
    price: 57.95,
    unit: "150g",
    image: "img/fazer.jpg",
    tags: ["milk chocolate", "blueberry", "raspberry"],
    desc: "Finnish milk chocolate with sweetness, creamy finish with raspberry yoghurt and blueberry truffle.",
    nutrition: {
      Energy: 550,
      Fat: 33,
      Carbohydrate: 49,
      Sugars: 48,
      Protein: 11,
      Salt: 0.35,
    },
  },
  {
    id: "ferrero",
    name: "Ferrero Rocher",
    price: 64.95,
    unit: "16 pieces",
    image: "img/ferrero.jpg",
    tags: ["hazelnut", "chocolate", "wafer"],
    desc: "Whole hazelnut center, smooth hazelnut cream, crisp wafer shell, and chocolate coating with nut pieces.",
    nutrition: {
      Energy: 603,
      Fat: 42.7,
      Carbohydrate: 44.4,
      Sugars: 39.9,
      Protein: 8.2,
      Salt: 0.153,
    },
  },
  {
    id: "kitkat",
    name: "KitKat 4-finger Nestle",
    price: 8.95,
    unit: "41.5g",
    image: "img/kitkat.jpg",
    tags: ["wafer", "chocolate", "biscuit"],
    desc: "Crisp wafer fingers coated in smooth milk chocolate.",
    nutrition: {
      Energy: 514,
      Fat: 26.8,
      Carbohydrate: 58.4,
      Sugars: 45.1,
      Protein: 8.2,
      Salt: 0.15,
    },
  },
  {
    id: "lindt",
    name: "Chocolate cake LES GRANDES Milk Chocolate Hazelnut",
    price: 14.95,
    unit: "38g",
    image: "img/lindtstick.jpg",
    tags: ["milk chocolate", "pistachio"],
    desc: "Premium Swiss milk chocolate with pistachio.",
    nutrition: {
      Energy: 623,
      Fat: 47,
      Carbohydrate: 44,
      Sugars: 42,
      Protein: 5,
      Salt: 0.17,
    },
  },
  {
    id: "marabou",
    name: "Marabou Oreo",
    price: 27.95,
    unit: "160g",
    image: "img/marabou.jpg",
    tags: ["milk chocolate", "oreo"],
    desc: "Swedish milk chocolate with Oreo and rich cocoa flavor.",
    nutrition: {
      Energy: 538,
      Fat: 30,
      Carbohydrate: 60,
      Sugars: 55,
      Protein: 4.7,
      Salt: 0.32,
    },
  },
  {
    id: "milka",
    name: "Milka strawberry",
    price: 19,
    unit: "100g",
    image: "img/milka.jpg",
    tags: ["milk chocolate", "strawberry"],
    desc: "Creamy Alpine milk chocolate with strawberry flavor.",
    nutrition: {
      Energy: 515,
      Fat: 26,
      Carbohydrate: 68,
      Sugars: 53,
      Protein: 8.9,
      Salt: 0.15,
    },
  },
];

function formatCurrency(number) {
  return new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
  }).format(number);
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "{}");
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  const count = Object.values(cart).reduce((total, qty) => total + qty, 0);
  const cartCount = document.querySelector("[data-cart-count]");
  if (cartCount) {
    cartCount.textContent = count;
  }
}

function addToCart(id) {
  const cart = getCart();
  cart[id] = (cart[id] || 0) + 1;
  saveCart(cart);
}

function removeFromCart(id) {
  const cart = getCart();
  delete cart[id];
  saveCart(cart);
}

function setQuantity(id, qty) {
  const cart = getCart();
  if (qty <= 0) {
    delete cart[id];
  } else {
    cart[id] = qty;
  }
  saveCart(cart);
}

function findProduct(id) {
  return PRODUCTS.find((product) => product.id === id);
}

function renderProductsGrid(selector) {
  const container = document.querySelector(selector);
  if (!container) return;

  container.innerHTML = PRODUCTS.map(
    (product) => `
    <article class="product">
      <a href="product.html?id=${product.id}" class="product-media">
        <img src="${product.image}" alt="${product.name}" style="width:100%; height:160px; object-fit:cover;">
      </a>

      <div class="product-body">
        <div class="row" style="justify-content:space-between;">
          <a href="product.html?id=${product.id}">
            <strong>${product.name}</strong>
          </a>
          <span class="price">${formatCurrency(product.price)}</span>
        </div>

        <div class="muted">${product.unit}</div>

        <div class="row">
          ${product.tags.map((tag) => `<span class="pill">${tag}</span>`).join("")}
        </div>

        <div class="row" style="margin-top:10px;">
          <a class="btn" href="product.html?id=${product.id}">More information</a>
          <button class="btn" data-add="${product.id}">Add to cart</button>
        </div>
      </div>
    </article>
  `,
  ).join("");

  container.querySelectorAll("[data-add]").forEach((button) => {
    button.addEventListener("click", () => {
      addToCart(button.getAttribute("data-add"));
    });
  });
}

function renderProductDetail() {
  const container = document.querySelector("[data-product-detail]");
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || "darkchocolate";
  const product = findProduct(id) || PRODUCTS[0];

  container.innerHTML = `
    <section class="detail">
      <div class="detail-media">
        <img src="${product.image}" alt="${product.name}" style="max-height:300px; object-fit:cover;">
      </div>

      <div class="detail-box">
        <div class="muted">Chocolate / ${product.unit}</div>
        <h1>${product.name}</h1>
        <p>${product.desc}</p>

        <div class="row">
          ${product.tags.map((tag) => `<span class="pill">${tag}</span>`).join("")}
        </div>

        <div class="row" style="justify-content:space-between; margin-top:20px;">
          <div>
            <div class="muted">Price</div>
            <div class="price" style="font-size:24px;">${formatCurrency(product.price)}</div>
          </div>

          <div class="row">
            <button class="btn" data-add="${product.id}">Add to cart</button>
            <a class="btn" href="cart.html">Go to cart</a>
          </div>
        </div>

        <div class="nutrition-box">
          <strong>Nutritional value per 100g</strong>
          <p class="muted">Values are approximate.</p>

          <div class="row" style="justify-content:space-between;">
            <span>Energy</span>
            <strong>${product.nutrition.Energy} kcal</strong>
          </div>
          <div class="row" style="justify-content:space-between;">
            <span>Fat</span>
            <strong>${product.nutrition.Fat} g</strong>
          </div>
          <div class="row" style="justify-content:space-between;">
            <span>Carbohydrate</span>
            <strong>${product.nutrition.Carbohydrate} g</strong>
          </div>
          <div class="row" style="justify-content:space-between;">
            <span>Sugars</span>
            <strong>${product.nutrition.Sugars} g</strong>
          </div>
          <div class="row" style="justify-content:space-between;">
            <span>Protein</span>
            <strong>${product.nutrition.Protein} g</strong>
          </div>
          <div class="row" style="justify-content:space-between;">
            <span>Salt</span>
            <strong>${product.nutrition.Salt} g</strong>
          </div>
        </div>
      </div>
    </section>
  `;

  container.querySelector("[data-add]").addEventListener("click", () => {
    addToCart(product.id);
  });
}

function renderCart() {
  const body = document.querySelector("[data-cart-body]");
  const total = document.querySelector("[data-cart-total]");
  const empty = document.querySelector("[data-cart-empty]");
  if (!body || !total) return;

  const cart = getCart();
  const items = Object.entries(cart)
    .map(([id, qty]) => {
      const product = findProduct(id);
      return product ? { ...product, qty } : null;
    })
    .filter(Boolean);

  if (items.length === 0) {
    body.innerHTML = "";
    total.textContent = formatCurrency(0);
    if (empty) empty.style.display = "block";
    return;
  }

  if (empty) empty.style.display = "none";

  let totalPrice = 0;

  body.innerHTML = items
    .map((item) => {
      const linePrice = item.price * item.qty;
      totalPrice += linePrice;

      return `
      <tr>
        <td>
          <div class="row">
            <img class="cart-thumb" src="${item.image}" alt="${item.name}">
            <div>
              <strong>${item.name}</strong>
              <div class="muted">${item.unit}</div>
            </div>
          </div>
        </td>
        <td>${formatCurrency(item.price)}</td>
        <td>
          <span class="qty">
            <button class="btn" data-dec="${item.id}">-</button>
            <strong>${item.qty}</strong>
            <button class="btn" data-inc="${item.id}">+</button>
          </span>
        </td>
        <td><strong>${formatCurrency(linePrice)}</strong></td>
        <td>
          <button class="btn btn-danger" data-remove="${item.id}">Remove</button>
        </td>
      </tr>
    `;
    })
    .join("");
  total.textContent = formatCurrency(totalPrice);

  body.querySelectorAll("[data-remove]").forEach((button) => {
    button.addEventListener("click", () => {
      removeFromCart(button.getAttribute("data-remove"));
      renderCart();
    });
  });

  body.querySelectorAll("[data-inc]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-inc");
      const cart = getCart();
      setQuantity(id, (cart[id] || 0) + 1);
      renderCart();
    });
  });

  body.querySelectorAll("[data-dec]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-dec");
      const cart = getCart();
      setQuantity(id, (cart[id] || 0) - 1);
      renderCart();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderProductsGrid("[data-products-grid]");
  renderProductDetail();
  renderCart();
});
