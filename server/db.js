import Sequelize from 'sequelize' //npm i sequelize pg pg-hstore

const sequelize = new Sequelize(
    'spotfake', //nome do DB
    'postgres', //usuário
    'postgres', //senha
    {
        host: 'localhost',
        port: 5432,
        dialect: 'postgres'
    }
)

const User = sequelize.define('user', {
    nome: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    sobrenome: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    dataNascimento: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: Sequelize.DataTypes.ENUM('ativo', 'inativo'),
        allowNull: false,
        defaultValue: 'inativo'
    },
    profile_image: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
        defaultValue: 'https://static.vecteezy.com/ti/vetor-gratis/p1/9734564-default-avatar-profile-icon-of-social-media-user-vetor.jpg'
    }
}, { freezeTableName: true })

// Tabela de artistas
const Artist = sequelize.define('artist', {
    nome: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    }
}, { freezeTableName: true })

// Tabela de álbuns
const Album = sequelize.define('album', {
    titulo: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    anoLancamento: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
    }
}, { freezeTableName: true })

// Tabela de músicas
const Music = sequelize.define('music', {
    titulo: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
    },
    duracao: {
        type: Sequelize.DataTypes.INTEGER, // Duração em segundos
        allowNull: false,
    }
}, { freezeTableName: true })

// Relacionamentos
Artist.belongsToMany(Music, { through: 'MusicArtist' }) // Muitos para muitos entre Artistas e Músicas
Music.belongsToMany(Artist, { through: 'MusicArtist' })

Album.hasMany(Music) // Um álbum pode ter várias músicas
Music.belongsTo(Album) // Uma música pertence a um álbum

const criarTabelas = () => {
    sequelize.authenticate().then(() => {
        console.log('Conectado ao banco de dados!')
    })
        .catch((err) => {
            console.error('Erro ao conectar ao banco:', err)
        })
    sequelize.sync({ force: true }).then(() => {
        console.log('Tabelas criadas com sucesso!')
    }).catch((err) => {
        console.error('Erro ao criar tabelas:', err)
    })
}

export { User, Artist, Album, Music, sequelize, criarTabelas }
