class productManager {
    constructor() {
        this.products = [];
    }
    getProducts() {
        return this.products;
    }
    addProduct(title, description, price, thumbnail, code, stock){
        const id = this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1;
        
        const product = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        if (!title || !description || !price || !thumbnail || !stock) {
            console.error(`Se deben completar todos los campos del producto.`);
        } else if (this.products.filter(product => product.code === code).length > 0){
            console.error((`El código ${code} ya existe.`));
        } else {
            this.products.push(product);
        }
        
    }
    getProductById(id) {
        const productByID = this.products.filter(product => product.id === id);
        if (productByID.length > 0) {
            return productByID;
        } else {
            console.log(`El producto con id=${id} no fue encontrado.`);
        }
    }
}


const manager1 = new productManager();

manager1.addProduct(
    "producto de prueba",
    "Este es un producto de prueba",
    200,
    "Sin imagen",
    "abc123",
    25
);
manager1.addProduct(
    "producto de prueba2",
    "Este es un producto de prueba2",
    200,
    "Sin imagen",
    "abc123",
    25
);
manager1.addProduct(
    "producto de prueba 3",
    "Este es un producto de prueba 3",
    250,
    "Sin imagen",
    "abc1234",
    20
);
console.log(manager1.getProducts());
console.log(manager1.getProductById(1));
console.log(manager1.getProductById(5));
