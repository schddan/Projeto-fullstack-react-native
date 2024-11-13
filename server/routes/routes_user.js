import express from 'express';
const routes_user = express.Router(); 
import controller_user from '../controllers/controller_user.js';


routes_user.get('/get_user/:id', controller_user.get_user)


export default routes_user //Exporta a rota