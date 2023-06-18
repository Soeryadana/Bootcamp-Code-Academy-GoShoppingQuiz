import { v4 as uuidv4 } from 'uuid'

const findAll = async (req, res) => {
    try {
         const category = await req.context.models.category.findAll({});
         res.send(category);        
    } catch (error) {
         res.send(error)
    }
 }

 const findOne = async (req, res) => {
    try {
         const category = await req.context.models.category.findOne({
            where: { cate_id: req.body.id }
         });
         res.send(category);        
    } catch (error) {
         res.send(error)
    }
 }

const create = async (req, res) => {
   try {
        const category = await req.context.models.category.create({
            cate_id: uuidv4(),
            cate_name: req.body.cate_name
        });
        res.send(category);        
   } catch (error) {
        res.send(error)
   }
}

export default {
    create,
    findAll,
    findOne
}