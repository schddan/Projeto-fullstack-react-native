import { Artist, Album, Music } from "../db.js";
const listarRecomendados = async (req, res) => {
    try {
        const recomendados = await Album.findAll({
            limit: 10, 
            order: [["anoLancamento", "DESC"]],
        });

        res.status(200).send(recomendados);
    } catch (error) {
        console.error(error);
        res.status(500).send("Houve um problema ao listar os álbuns recomendados");
    }
};

const listarArtistas = async (req, res) => {
    try {
        const artistas = await Artist.findAll();
        res.status(200).send(artistas);
    } catch (error) {
        console.error(error);
        res.status(500).send("Houve um problema ao listar os artistas");
    }
};

const listarAlbuns = async (req, res) => {
    try {
        const albuns = await Album.findAll();
        res.status(200).send(albuns);
    } catch (error) {
        console.error(error);
        res.status(500).send("Houve um problema ao listar os álbuns");
    }
};

const exibirAlbumEspecifico = async (req, res) => {
    try {
        const { id } = req.params;
        const album = await Album.findByPk(id, {
            include: {
                model: Music,
                attributes: ["id", "titulo", "duracao"]
            }
        });

        if (!album) {
            res.status(404).send("Álbum não encontrado");
            return;
        }

        res.status(200).send(album);
    } catch (error) {
        console.error(error);
        res.status(500).send("Houve um problema ao exibir o álbum");
    }
};

const exibirMusicaEspecifica = async (req, res) => {
    try {
        const { id } = req.params;
        const musica = await Music.findByPk(id, {
            include: {
                model: Album,
                attributes: ["id", "titulo", "anoLancamento"]
            }
        });

        if (!musica) {
            res.status(404).send("Música não encontrada");
            return;
        }

        res.status(200).send(musica);
    } catch (error) {
        console.error(error);
        res.status(500).send("Houve um problema ao exibir a música");
    }
};

const adicionarArtista = async (req, res) => {
    try {
        const { nome } = req.body;
        if (!nome) {
            res.status(400).send("O nome do artista é obrigatório");
            return;
        }

        const novoArtista = await Artist.create({ nome });
        res.status(201).send({ msg: "Artista adicionado com sucesso", artista: novoArtista });
    } catch (error) {
        console.error(error);
        res.status(500).send("Houve um problema ao adicionar o artista");
    }
};

const adicionarAlbum = async (req, res) => {
    try {
        const { titulo, anoLancamento, coverImage } = req.body;
        if (!titulo || !anoLancamento) {
            res.status(400).send("Título e ano de lançamento são obrigatórios");
            return;
        }

        const novoAlbum = await Album.create({ titulo, anoLancamento, coverImage });
        res.status(201).send({ msg: "Álbum adicionado com sucesso", album: novoAlbum });
    } catch (error) {
        console.error(error);
        res.status(500).send("Houve um problema ao adicionar o álbum");
    }
};

const adicionarMusica = async (req, res) => {
    try {
        const { titulo, duracao, albumId, artistas, coverImage } = req.body;

        if (!titulo || !duracao || !albumId || !artistas || !Array.isArray(artistas)) {
            res.status(400).send("Título, duração, álbum e lista de artistas são obrigatórios");
            return;
        }

        const album = await Album.findByPk(albumId);
        if (!album) {
            res.status(404).send("Álbum não encontrado");
            return;
        }

        const novaMusica = await Music.create({
            titulo,
            duracao,
            albumId,
            coverImage
        });

        const artistasEncontrados = await Artist.findAll({
            where: {
                id: artistas
            }
        });

        await novaMusica.addArtists(artistasEncontrados);

        res.status(201).send({
            msg: "Música adicionada com sucesso",
            musica: novaMusica,
            artistas: artistasEncontrados
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Houve um problema ao adicionar a música");
    }
};




export default {
    adicionarArtista,
    adicionarAlbum,
    adicionarMusica,
    listarArtistas,
    listarAlbuns,
    exibirAlbumEspecifico,
    exibirMusicaEspecifica,
    listarRecomendados,
};

//Adicionei artistas, albuns e músicas pelo Postman mandando como body para cada rota:

/* {
    "nome": "Lady Gaga"
  }
*/

/* {
    "titulo": "The Fame Monster",
    "anoLancamento": 2024,
    "coverImage": "https://i.scdn.co/image/ab67616d0000b273eb8bcd7eda9787adb4a977b1"
  }
*/

/* 
  {
    "titulo": "Bad Romance",
    "duracao": 300,
    "albumId": 2,
    "artistas": [1],
    "coverImage": "https://i.scdn.co/image/ab67616d0000b273eb8bcd7eda9787adb4a977b1"
  }
 */