import { User } from "../db.js";

const get_user = async (req, res) => {
    const id_req = req.params.id
    const user = await User.findOne({ where: { id: id_req } })
    if (!user) {
        res.status(404).send("Usuário não encontrado")
        return
    }
    res.status(200).send({nome: user.nome, sobrenome: user.sobrenome, email: user.email, dataNascimento: user.dataNascimento, profile_image: user.profile_image})
    return

}

export default { get_user }