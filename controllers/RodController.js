var Rod = require('../models/Rod');

module.exports.getOne = (req,res,next) => {
    Rod.findOne({
        name: req.params.name
    },)
    .then((foundRod) =>{
        if(foundRod){
            //return res.render('uno', {rodi: foundRod});
            return res.status(200).json(foundRod);
        }
        else{
            //return res.redirect('/uno/')
            return res.status(400).json(null);
        }
    })
    .catch(err =>{
        next(err);
    })
}

module.exports.getAll = (req,res,next) => {
    var perPage = Number(req.query.size) || 10,
        page = req.query.page > 0 ? req.query.page : 0;

    var sortProperty = req.query.sortby || "name",
        sort = req.query.sort || "asc";

    Rod.find({})
        .limit(perPage)
        .skip(perPage * page)
        .sort({[sortProperty]: sort})
        .then((rods)=>{
            //return res.render('todo', {rods: rods});
            return res.status(200).json(rods);
        })
        .catch((err)=>{
            next(err);
        })
}

module.exports.create = (req,res,next) =>{
    Rod.findOne({
        name: req.body.name
    }, "-wood -core -long -flex")
    .then((foundRod) =>{
        if(foundRod) {
            throw new Error(`Varita duplicada ${req.body.name}`);
        } else {
            let newRod = new Rod({
                name: req.body.name,
                wood: req.body.wood,
                core: req.body.core,
                long: req.body.long,
                flex: req.body.flex
            });
            return newRod.save();
        }
    }).then(rod =>{
        return res
            .header('Location', '/rods/' + rod._id)
            .status(201)
            .json({
                name: rod.name
            });
    }).catch(err =>{
        return res.status(400).json("Ha ocurrido un error");
    })
}

module.exports.update = (req,res,next) => {
    let update = {
        ...req.body
    };

    Rod.findOneAndUpdate({
        name: req.params.name
    }, update, {
        new: true
    })
    .then((updated) =>{
        if(updated)
            return res.status(200).json(updated);
        else
            return res.status(400).json(null);
    }).catch(err => {
        return res.status(400).json("Ha ocurrido un error");
    });
}

module.exports.delete = (req,res,next) =>{
    Rod.findOneAndDelete({
        name: req.params.name
    })
    .then((data) => {
        if(data)
            return res.status(200).json(data);
        else
            return res.status(404).send();
    }).catch(err =>{
        next(err);
    })
}