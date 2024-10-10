// 商品数据示例
const products = [
  { id: 1, name: "手机", price: 5999, category: "electronics" },
  { id: 2, name: "T恤", price: 199, category: "clothing" },
  { id: 3, name: "沙发", price: 2999, category: "furniture" },
  { id: 4, name: "耳机", price: 499, category: "electronics" }
];

// 初始化展示全部商品
function displayProducts(category) {
  const productGrid = document.getElementById("product-grid");
  productGrid.innerHTML = ''; // 清空现有商品
  const filteredProducts = category === "all" ? products : products.filter(p => p.category === category);

  filteredProducts.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
      <h3>${product.name}</h3>
      <p>价格: ¥${product.price}</p>
    `;
    productGrid.appendChild(productCard);
  });
}

// 监听分类点击
document.getElementById("category-list").addEventListener("click", function(event) {
  const category = event.target.getAttribute("data-category");
  displayProducts(category);
});

// 默认显示全部商品
displayProducts("all");
