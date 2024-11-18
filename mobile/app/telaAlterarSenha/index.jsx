import React, { useEffect, useState, useContext } from "react";
import { Text, TextInput, View, StyleSheet, Image, Pressable } from "react-native";
import { Link, router } from "expo-router"
import InputPlace from "../inputPlace/InputPlace";
import { AppContext } from "../../scripts/AppContext";


export default TelaLogin = () => {
    const { user, setUser } = useContext(AppContext)
    const [novaSenha, setNovaSenha] = React.useState('');
    const [confirmarNovaSenha, setConfirmarNovaSenha] = React.useState('');

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8000/user/change_user_password/${user.id}`, {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify({
                    "novaSenha": confirmarNovaSenha
                })
            })

            if (response.ok) { // Compare com === para evitar coerção de tipo
                alert("Senha alterada com sucesso");
                router.replace("/telaPerfil");
            } else {
                console.warn("Falha ao alterar senha. Status:", response.status);
            }
        } catch (error) {
            console.error("Erro: ", error)
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Alterar Senha</Text>
            <View>
                <InputPlace value={novaSenha} onChangeTextHandler={setNovaSenha}  label={"Nova Senha"} />
                <InputPlace value={confirmarNovaSenha} onChangeTextHandler={setConfirmarNovaSenha} label={"Confirmar Nova Senha"} />

            </View>
            <Pressable style={styles.button} onPress={fetchData}><Text style={{ color: '#ffffff' }}>Alterar</Text></Pressable>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 100
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#333333',
        width: 250,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    }
})