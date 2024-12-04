import express from "express";
import controladorConteudo from "../controllers/controlador_conteudo.js";

const router = express.Router();

router.get("/artistas", controladorConteudo.listarArtistas);
router.get("/albuns", controladorConteudo.listarAlbuns);
router.get("/albuns/:id", controladorConteudo.exibirAlbumEspecifico);
router.get("/musicas/:id", controladorConteudo.exibirMusicaEspecifica);
router.post("/addArtista", controladorConteudo.adicionarArtista);
router.get("/recomendados", controladorConteudo.listarRecomendados);
router.post("/addAlbum", controladorConteudo.adicionarAlbum);
router.post("/addMusica", controladorConteudo.adicionarMusica);


export default router;
