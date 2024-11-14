import React, { useEffect, useState } from "react";
import { Text, TextInput, View, StyleSheet, Image, Pressable } from "react-native";

//1 ajeitar o use context

export default TelaPerfil = () => {
    const [user, setUser] = useState(null)

    const handleSendImage = async () => {
        try{
            const data = {
                "file": image,
                "upload_preset": "ml_default",
            }
            const res = await fetch("https://api.cloudinary.com/v1_1/dwescvnsn/upload", {
                method: "POST",
                headers: {
                    "content-type": "application/json" 

                },
                body: JSON.stringify(data)
            });
            const result = await res.json()
            setImage(result.url)
            setUser({...user, profile_image: result.url})
            await saveNewImageURLonBackend(result)
        }catch(e){
            console.log(e)
        }
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/5987/5987462.png" }} style={{ height: 100, width: 100 }} />
            <View>
                <Text>Nome: {user.nome} {user.sobrenome}</Text>
                <Text>Email: {user.email}</Text>
                <Text>Data de nascimento: {user.dataNascimento}</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'space-around'
    }
})