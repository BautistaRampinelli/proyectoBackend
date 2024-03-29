import fs from 'fs';
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
        const newProduct = {
            id: this.#createId(products),
            ...product,
            status: product.status ?? true,
            thumbnails: product.thumbnails ?? []
        };
        const requiredFields = ['title', 'description', 'code', 'price', 'stock', 'category'];
        for (const field of requiredFields) {
            if (!newProduct[field]) {
                throw new Error(`El campo ${field} es obligatorio`);
            }
        }
        products.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 4));
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
