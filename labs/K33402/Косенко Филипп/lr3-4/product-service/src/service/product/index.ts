import Product , { ProductAtributes, ProducCreationAttributes }  from "../../models/product";

class ProductServic {
    async getAll(){
        try{
            const result = Product.findAll();
            return result != undefined ? result : 'Sorry yuor DB is empty';
        }catch (err){
            console.log(err);
            return err;
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

    async createProduct(productData: ProducCreationAttributes){
        try{
            const product = await Product.create(productData);
            return product;
        }catch (err){
            console.log(err);
            return err;
        }
    };

    async getQuantity(productId: number){
        try{
            const quantity : any = await Product.findByPk(productId);
            return quantity;
        }catch (err){
            console.log(err);
            return err;
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
            return err;
        }
    };

    async subQuantity(productId: number, count: number){
        try{
            const product = await Product.findByPk(productId);
            if(product === null){
                throw Error
            }
            const nCount = product.quantity - count 
            const result: any = await Product.update(
                {quantity: nCount},
                {where:{id: productId}}
            );
            return result;
        }catch (err){
            console.log(err);
            return err;
        }
    };

}

export default ProductServic