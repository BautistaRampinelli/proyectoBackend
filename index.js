const fs = require('fs');
const { json } = require('stream/consumers');
const path = 'productos.json';

class productManager {

    constructor(path) {
        this.path = path;
    }

    getProducts = async () => {
        if (fs.existsSync(this.path)) {
            const infoFile = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(infoFile);
            return products;
        } else {
            console.log('El archivo no existe.');
            return[];
        }
    }

    addProduct = async(product) => {
        const products = await this.getProducts();
        const id = this.#createId(products);
        const newProduct = {id, ...product};
        products.push(newProduct);
        await fs.promises.writeFile(path, JSON.stringify(products));
        return newProduct;
    }


    getProductById = async(id) => {
        const products = await this.getProducts();
        const productByID = products.filter(product => product.id === id);
        if (productByID.length > 0) {
            return productByID;
        } else {
            console.log(`El producto con id=${id} no fue encontrado.`);
        }
    }

    #createId = (products) => {
        let id;
        if (products.length === 0) {
            id = 1;
        } else {
            id = products[products.length - 1].id + 1;
        }
        return id;
    }
}


let product1 = {
    title: "producto de prueba",
    description: "Este es un producto de prueba",
    priice: 200,
    thunmbail: "Sin imagen",
    code: "abc123",
    stock: 25,
};

let product2 = {
    title: "producto de prueba 2",
    description: "Este es un producto de prueba 2",
    priice: 10,
    thunmbail: "Sin imagen",
    code: "123",
    stock: 250,
};

let product3 = {
    title: "producto de prueba 3",
    description: "Este es un producto de prueba 3",
    priice: 250,
    thunmbail: "Sin imagen",
    code: "abc",
    stock: 20,
};
async function prueba () {
    const manager1 = new productManager(path);
    await manager1.addProduct(product1);
    // await manager1.addProduct(product2);
    // await manager1.addProduct(product3);
    console.log(manager1.getProducts());
    console.log(manager1.getProductById(1));
    console.log(manager1.getProductById(5));

}

prueba();

