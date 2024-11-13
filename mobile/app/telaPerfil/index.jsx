import React, { useEffect, useState } from "react";
import { Text, TextInput, View, StyleSheet, Image, Pressable } from "react-native";


export default TelaPerfil = ({userData}) => {
    const [user, setUser] = useState(null)

    useEffect(async () => {
        try {
            const response = await fetch(`http://localhost:8000/user/get_user/1`)
            const json = await response.json()
            console.log(json)
        } catch (error) {
            console.error("Erro: ", error)
        }
    })
    return (
        <View style={styles.container}>
            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/5987/5987462.png" }} style={{ height: 100, width: 100 }} />
            <View>
                <Text>Nome: Daniel Alexandre</Text>
                <Text>Email: Daniel Alexandre</Text>
                <Text>Data de nascimento: Daniel Alexandre</Text>
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