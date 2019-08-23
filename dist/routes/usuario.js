"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var usuario_model_1 = require("../models/usuario.model");
var userRoutes = express_1.Router();
userRoutes.post('/create', function (req, res) {
    // request
    var user = {
        nombre: req.body.nombre,
        email: req.body.email,
        password: req.body.password,
    };
    // guardar en base de datos
    usuario_model_1.Usuario.create(user).then(function (userDB) {
        res.json({
            ok: true,
            user: userDB
        });
    }).catch(function (err) {
        res.json({
            ok: false,
            err: err
        });
    });
    /*
    res.json({
        ok: true,
        mensaje: 'funciona bien'
    })
    */
});
exports.default = userRoutes;
