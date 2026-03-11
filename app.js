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
