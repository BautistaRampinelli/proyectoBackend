import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

const productMosck = {
    name: "Test product",
    description: "Test product",
    price: 100,
    stock: 100,
}

describe('Tests for productos', () => {
    it('The user need authorization for upload product', async () => {
        const result = await requester.post('/api/products').send(productMosck);
        expect(result.status).to.be.equal(401);
    })
    it('The user need authorization for modify producto', async () => {
        const result = await requester.put('/api/products/1').send(productMosck);
        expect(result.status).to.be.equal(401);
    })
    it('The user need authorization for deleted product', async () => {
        const result = await requester.delete('/api/products/1');
        expect(result.status).to.be.equal(401);
    })
})