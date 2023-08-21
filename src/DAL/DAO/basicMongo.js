export default class BasicMongo {
    constructor(model) {
        this.model = model;
    }

    async findAll() {
        try {
            const result = await this.model.find();
            return result;
        } catch (error) {
            return error;
        }
    }

    async findById(id) {
        try {
            const result = await this.model.findById(id);
            return result;
        } catch (error) {
            return error;
        }
    }

    async create(data) {
        try {
            const result = await this.model.create(data);
            return result;
        } catch (error) {
            return error;
        }
    }

    async update(id, data) {
        try {
            const result = await this.model.findOneAndUpdate({ _id: id }, data, { new: true });
            return result;
        } catch (error) {
            return error;
        }
    }

    async delete(id) {
        try {
            const result = await this.model.findByIdAndDelete(id);
            return result;
        } catch (error) {
            return error;
        }
    }

    async deleteSoft(id) {
        try {
            const result = await this.model.findOneAndUpdate({ _id: id },
                {
                    status: 'inactive',
                    deleteAt: Date.now()
                },
                { new: true });
            return result;
        } catch (error) {
            return error;
        }
    }

    async findByField(field, value) {
        try {
            const result = await this.model.find({ [field]: value });
            return result;
        } catch (error) {
            return error;
        }
    }
}