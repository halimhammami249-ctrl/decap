async function loadProducts() {
  try {
    const res = await fetch('/products.json');
    const data = await res.json();

    const container = document.getElementById('products');

    // Your JSON format: { products: [...] }
    const products = data.products || [];

    if (!container) {
      console.error('Missing #products container in HTML');
      return;
    }

    container.innerHTML = products
      .map(
        (p) => `
      <div class="product">
        <h2>${p.name}</h2>

        <img 
          src="${p.image}" 
          width="150" 
          alt="${p.name}"
        />

        <p><strong>${p.price} $</strong></p>
        <p>${p.description}</p>
      </div>
    `,
      )
      .join('');
  } catch (err) {
    console.error('Error loading products.json:', err);
  }
}

// Run on page load
loadProducts();
