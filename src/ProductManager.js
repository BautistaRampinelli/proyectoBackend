const fs = require('fs');
const { json } = require('stream/consumers');
const path = 'productos.json';


export default class ProductManager {

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
            return [];
        }
    }

    addProduct = async(product) => {
        const products = await this.getProducts();
        const id = this.#createId(products);
        const newProduct = {id, ...product};
        products.push(newProduct);
        await fs.promises.writeFile(path, JSON.stringify(null, 4, products));
        return newProduct;
    }

    getProductById = async(id) => {
        const products = await this.getProducts();
        const productByID = products.filter(product => product.id === id)[0];
        if(!productByID) throw new Error(`El producto con id ${id} no existe`);
        return productByID;
    }

    updateProduct = async (id, obj) => {
		const products = await this.getProducts();
		const indexProduct = products.findIndex(product => product.id === id);
		if (indexProduct === -1) {
			throw new Error('Producto no encontrado');
		}
		const productUpdated = { ...products[indexProduct], ...obj };
		products.splice(indexProduct, 1, productUpdated);
		await fs.promises.writeFile(this.path, JSON.stringify(products));
		console.log('Producto actualizado.');
	};

    deleteProducts = async () => {
		if (fs.existsSync(this.path)) {
			await fs.promises.unlink(this.path);
		} else {
			console.log('Archivo no encontrado.');
		}
	};

    deleteProductById = async (id) => {
		const products = await this.getProducts();
		const newArrayProducts = products.filter(product => product.id !== id);
		await fs.promises.writeFile(this.path, JSON.stringify(newArrayProducts));
		console.log('Producto eliminado.');
	};

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


// let product1 = {
//     title: "producto de prueba",
//     description: "Este es un producto de prueba",
//     price: 200,
//     thumbnail: "Sin imagen",
//     code: "abc123",
//     stock: 25,
// };

// let product2 = {
//     title: "producto de prueba 2",
//     description: "Este es un producto de prueba 2",
//     price: 10,
//     thumbnail: "Sin imagen",
//     code: "123",
//     stock: 250,
// };

// let product3 = {
//     title: "producto de prueba 3",
//     description: "Este es un producto de prueba 3",
//     price: 250,
//     thumbnail: "Sin imagen",
//     code: "abc",
//     stock: 20,
// };
// async function prueba () {
//     const manager1 = new productManager(path);
//     await manager1.addProduct(product1);
//     await manager1.addProduct(product2);
//     await manager1.addProduct(product3);
//     console.log( await manager1.getProducts());
//     console.log( await manager1.getProductById(5));
//     console.log( await manager1.getProductById(1));
//     await manager1.updateProduct(1, {price:250, stock:10})
//     console.log( await manager1.getProductById(1));

// }

// prueba();

