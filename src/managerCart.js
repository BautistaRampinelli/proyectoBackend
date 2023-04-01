import fs from 'fs';

export class ManagerCart {
    constructor(path){
        this.path = path;
    }

    async getCarts(){
        const cartsFile = await fs.promises.readFile(this.path, 'utf-8');
        return JSON.parse(cartsFile);
    }

    async getCart(id){
        const cartsFile = await this.getCarts();
        const cart = cartsFile.find((cart) => cart.id === id);
        return cart || null;
    }

    async createCart(){
        const cartsFile = await this.getCarts();
        const newCart = {
            id: this.#createId(cartsFile),
            products: [],
        }
        cartsFile.push(newCart);
        await fs.promises.writeFile(this.path,JSON.stringify(cartsFile));
        return newCart;
    }

    async addProductToCart(idCart,idProduct){
        const cartsFile = await this.getCarts();
        const cartIndex = cartsFile.findIndex(c => c.id===idCart);
        if (cartIndex === -1) return 'El carrito no existe.';
        const cart = cartsFile[cartIndex];
        const productIndex = cart.products.findIndex(p => p.product===idProduct);
        if(productIndex === -1) return 'El producto no existe';
        if(productIndex !== -1){
            cart.products[productIndex].quantity++;
        } else {
            cart.products.push({product:idProduct,quantity:1});
        }
        cartsFile.splice(cartIndex,1,cart);
        await fs.promises.writeFile(this.path,JSON.stringify(cartsFile));
        return 'Producto añadido.';
    }

    #createId = (carts) => {
        let id;
        if (carts.length === 0) {
            id = 1;
        } else {
            id = carts[carts.length - 1].id + 1;
        }
        return id;
    }
}
