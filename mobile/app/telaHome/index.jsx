import React, {useContext} from "react";
import { Text, View, StyleSheet, ScrollView, Image, Pressable } from "react-native";
import { AppContext } from "../../scripts/AppContext";


const HomeScreen = () => {
    const { user, setUser } = useContext(AppContext);

    const recentItems = [
        { id: 1, type: "Música", title: "Blinding Lights", image: "https://img.icons8.com/color/100/000000/music.png" },
        { id: 2, type: "Álbum", title: "After Hours", image: "https://img.icons8.com/color/100/000000/compact-disc.png" },
        { id: 3, type: "Playlist", title: "Top Hits", image: "https://img.icons8.com/color/100/000000/playlist.png" },
    ];

    const recommendedAlbums = [
        { id: 1, title: "Random Access Memories", image: "https://img.icons8.com/color/100/000000/album.png" },
        { id: 2, title: "Abbey Road", image: "https://img.icons8.com/color/100/000000/album.png" },
        { id: 3, title: "The Dark Side of the Moon", image: "https://img.icons8.com/color/100/000000/album.png" },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                            <Text style={styles.title}>Bem-vindo!</Text>
                            <Image source={{ uri: user.profile_image }} style={{ height: 100, width: 100, borderRadius: 50 }} />

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
                            <Image source={{ uri: album.image }} style={styles.albumImage} />
                            <Text style={styles.albumTitle}>{album.title}</Text>
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
});

export default HomeScreen;
