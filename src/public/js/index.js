const socketClient = io();

document.querySelector('#productForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const price = document.querySelector('#price').value;
  
    socket.emit('newProduct', { title, price });
    document.querySelector('#title').value = '';
    document.querySelector('#price').value = '';
  });
  
  socket.on('updateProducts', (products) => {
    const productsList = document.querySelector('ul');
    productsList.innerHTML = '';
  
    products.forEach((product) => {
      const li = document.createElement('li');
      const text = document.createTextNode(`${product.title} - ${product.price}`);
      li.appendChild(text);
      productsList.appendChild(li);
    });
  });