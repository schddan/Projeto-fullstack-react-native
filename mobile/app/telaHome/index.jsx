import React, { useContext, useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, Image, Pressable } from "react-native";
import { AppContext } from "../../scripts/AppContext";
import { router } from "expo-router";

const TelaHome = () => {
    const { user, setUser } = useContext(AppContext);
    const [recommendedAlbums, setRecommendedAlbums] = useState([]);

    const carregarRecomendados = async () => {
        try {
            const response = await fetch("http://localhost:8000/conteudo/recomendados"); 
            const data = await response.json();
            setRecommendedAlbums(data); 
        } catch (error) {
            console.error("Erro ao carregar álbuns recomendados:", error);
        }
    };

    useEffect(() => {
        carregarRecomendados();
    }, []);

    const recentItems = [
        { id: 1, type: "Música", title: "Blinding Lights", image: "https://i.scdn.co/image/ab67616d0000b273a3eff72f62782fb589a492f9" },
        { id: 2, type: "Álbum", title: "After Hours", image: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36" },
        { id: 3, type: "Playlist", title: "Top Hits", image: "https://yt3.googleusercontent.com/1e5n7WMrB8pKP2zdjeUaK_RlmknQLxhHK9-JKjcw5Fok1I7QddjeE3ZXlRwYjYsE5RRSHcrNgQ=s900-c-k-c0x00ffffff-no-rj" },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Image
                        source={require('../../assets/images/logo.png')}
                        style={{ height: 100, width: 100, marginTop: -25, marginLeft: -20, borderRadius: 50 }}
                    />
                    <Text style={styles.title}>Bem-vindo!</Text>
                </View>
                <Pressable onPress={() => { router.replace("/telaPerfil") }}>
                    <Image source={{ uri: user.profile_image }} style={{ height: 50, width: 50, borderRadius: 50, marginTop: -20 }} />
                </Pressable>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recentes</Text>
                <View style={styles.recentItems}>
                    {recentItems.map((item) => (
                        <Pressable key={item.id} style={styles.recentItem}>
                            <Image source={{ uri: item.image }} style={styles.recentImage} />
                            <Text style={styles.recentText}>{item.title}</Text>
                        </Pressable>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recomendados</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
                    {recommendedAlbums.map((album) => (
                        <View key={album.id} style={styles.album}>
                            <Image
                                source={{ uri: album.coverImage }} 
                                style={styles.albumImage}
                            />
                            <Text style={styles.albumTitle}>{album.titulo}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#05142E",
        width: '100%',
        height: '100%',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#1B4184",
        marginBottom: 20,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#ffffff",
        marginBottom: 10,
    },
    recentItems: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    recentItem: {
        alignItems: "center",
        width: 90,
    },
    recentImage: {
        width: 70,
        height: 70,
        borderRadius: 10,
    },
    recentText: {
        marginTop: 5,
        fontSize: 12,
        color: "#ffffff",
        textAlign: "center",
    },
    scroll: {
        marginTop: 10,
    },
    album: {
        marginRight: 15,
        alignItems: "center",
    },
    albumImage: {
        width: 120,
        height: 120,
        borderRadius: 10,
    },
    albumTitle: {
        marginTop: 5,
        fontSize: 14,
        color: "#ffffff",
        textAlign: "center",
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerLeft: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    }
});

export default TelaHome;
