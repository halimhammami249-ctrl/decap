fetch('/products.json')
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById('products');

    container.innerHTML = '';

    // CASE 1: Decap "list field" format (your setup)
    const products = data.products || data;

    products.forEach((product) => {
      container.innerHTML += `
        <div>
          <h2>${product.name}</h2>
          <img src="${product.image}" width="150" />
          <p>${product.price} $</p>
          <p>${product.description}</p>
        </div>
      `;
    });
  })
  .catch((err) => {
    console.error('Error loading products:', err);
  });
