const Categories = require('../models/categories.model');

exports.getCategories = (req, res)=> {
    try{
        Categories.find((err, data) => {
            if(err){
                return res.status(400).send({message: 'Error while getting categories.'})
            }

            res.status(200).send({categories: data});
        })
    }catch(error){
        res.status(500).send({message: 'Internal Server Error'})
    }
};

exports.addCategory = (req, res)=> {
    try{
        const newCategory = new Categories(req.body);

        newCategory.save((err, data) => {
            if(err){
                return res.status(400).send({message: 'Error while adding a new category.'})
            }

            res.status(200).send({categoryId: data._id, message: 'A new category has been created.'});
        })
    }catch(error){
        res.status(500).send({message: 'Internal Server Error'})
    }
};