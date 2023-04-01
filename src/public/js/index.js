const socketClient = io();
const productsList = document.querySelector('ul');

document.querySelector('#productForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('#title').value;
  const price = document.querySelector('#price').value;

  socket.emit('newProduct', { title, price });
  document.querySelector('#title').value = '';
  document.querySelector('#price').value = '';
});

socket.on('updateProducts', (products) => {
  const oldProducts = Array.from(productsList.children).map(li => li.dataset.id);
  const newProducts = products.map(product => product.id);

  oldProducts.filter(id => !newProducts.includes(id)).forEach(id => {
    const li = productsList.querySelector(`li[data-id="${id}"]`);
    li.parentNode.removeChild(li);
  });

  products.forEach((product) => {
    const li = productsList.querySelector(`li[data-id="${product.id}"]`);

    if (li) {
      li.querySelector('.title').textContent = product.title;
      li.querySelector('.price').textContent = product.price;
    } else {
      const li = document.createElement('li');
      li.dataset.id = product.id;
      li.innerHTML = `
        <h3 class="title">${product.title}</h3>
        <p class="description">${product.description}</p>
        <p class="price">${product.price}</p>
        <p class="stock">${product.stock}</p>
      `;
      productsList.appendChild(li);
    }
  });
});
