import Product , { ProductAtributes, ProducCreationAttributes }  from "../../models/product";

class ProductServic {
    async getAll(){
        try{
            const result = Product.findAll();
            console.log(typeof(result))
            return result != undefined ? result : 'Sorry yuor DB is empty';
        }catch (err){
            console.log(err);
        }
    };

    async getById(id: number){
        try{
            const result : any = await Product.findByPk(id);
            return result;
        }catch (err){
            console.log(err);
            return err;
        }
    };

    async createProduct(productData: ProducCreationAttributes): Promise<Product>{
        try{
            const product = await Product.create(productData);
            return product;
        }catch (err) {
            console.log(err);
            throw err;
        }
    };

    async getQuantity(productId: number): Promise<Product>{
        try{
            const quantity : any = await Product.findByPk(productId);
            return quantity;
        }catch (err){
            console.log(err);
            throw err;
        }
    };

    async update(productId: number, productData: Pick<ProducCreationAttributes, 'category' | 'name' | 'price' | 'quantity'>){
        try{
            const result: any = await Product.update(
                {category: productData.category, name: productData.name, price: productData.price, quantity: productData.quantity},
                {where: {id: productId}}
            );
            return result
        }catch (err){
            console.log(err);
        }
    };

    async subQuantity(productId: number, count: number){
        try{
            const result: any = await Product.update(
                {quantity: count},
                {where:{id: productId}}
            );
            return result;
        }catch(err){
            console.log(err);
        }
    };

}

export default ProductServic