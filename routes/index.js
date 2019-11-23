var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/crear/', function(req,res,next){
  res.render('crear');
})

router.post('/crear/', function(req,res,next){
  if(req.body.flex == 'on'){
    let rod = {
      name: req.body.name,
      wood: req.body.wood,
      core: req.body.core,
      long: req.body.long,
      flex: true
    }
    axios.post('/rods/', rod).then(ros =>{
      console.log("Se ha guardado en la BD");
      res.render('index');
    })
    .catch(()=>{
      res.render('crear');
    })
  }
  else{
    let rod = {
      name: req.body.name,
      wood: req.body.wood,
      core: req.body.core,
      long: req.body.long,
      flex: false
    }
    axios.post('/rods/', rod).then(ros =>{
      console.log("Se ha guardado en la BD");
      //alert("Se ha creado un usuario");
      res.render('index');
    })
  }

})

router.get('/borrar/', function(req,res,next){
  axios.get('/rods/').then(ros =>{
    res.render('borrar', {op: ros.data});
  })
})

router.post('/borrar/', function(req,res,next){
  var sel = req.body.selec;
  axios.delete(`/rods/${sel}`).then(ros=>{
    axios.get('/rods/').then(ras =>{
    res.render('borrar', {op: ras.data});
  })
  })
})

router.get('/editar', function(req,res,next){
  axios.get('/rods/').then(ros =>{
    res.render('editar', {op: ros.data, edit: null});
  })
})

router.post('/editar/', function(req,res,next){
  
    if(req.body.flexu == "on"){
      var toup = {
        name: req.body.selec,
        wood: req.body.woodu,
        core: req.body.coreu,
        long: req.body.longu,
        flex: true
      }

      axios.put(`/rods/${req.body.selec}`, toup).then(ros =>{
        axios.get('/rods/').then(ras =>{
          res.render('editar', {op: ras.data, edit:null});
        })
      })
    }
    else{
      var toup = {
        name: req.body.selec,
        wood: req.body.woodu,
        core: req.body.coreu,
        long: req.body.longu,
        flex: false
      }

      axios.put(`/rods/${req.body.nameu}`, toup).then(ros =>{
        axios.get('/rods/').then(ras =>{
          res.render('editar', {op: ras.data, edit:null});
        })
      }) 
    }
  })

router.get('/uno/', function(req,res,next){
  axios.get('/rods/').then(ros =>{
    res.render('uno', {op: ros.data, exists:null});
  })
})

router.post('/uno/', function(req,res,next){
  var search = req.body.search;
  axios.get(`/rods/${search}`).then(ros =>{
    var nice = ros.data;
    axios.get('/rods/').then(ras =>{
    res.render('uno', {op: ras.data, exists:nice});
  })
  })
})

router.get('/todo/', function(req,res,next){
  var query = null;
  axios.get('/rods/').then(ros =>{
    //console.log(res.data.name);
    query = ros.data;
    //console.log(query);
    res.render('todo', {rods: query});
  })
  .catch(()=>{
    console.log("No funciona")
  })
})

module.exports = router;
