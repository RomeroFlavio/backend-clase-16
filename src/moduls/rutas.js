const products = require('../class/Products');
const express = require('express');
const multer = require('multer');
const { Router } = express;
const router = Router();
const path = require('path');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
    res.render('formulario');
});
router.get('/productos', (req, res) => {
    products.getAll().then(date => {
        if(date.length!==0){
            date.forEach(element => res.render('productos', {element}));
        }else
            res.render('productos', {message:'No hay productos'});
    });
});
router.post('/productos', upload.single('myfile'), (req, res, next) => {
    const file = req.file;
    console.log(file)
    if(!file) {
        const err = new Error('No cargo el archivo,');
        err.httpStatusCode = 400;
        return next(err);
    }
    const { title, price } = req.body;
    const product = {
        title: title,
        price: price,
        thumbnail: file.path
    }
    products.addProdutcs(product);
    res.redirect('/');
});

module.exports = router;