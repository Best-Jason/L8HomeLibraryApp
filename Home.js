import React, { useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Text, View, SectionList, TouchableOpacity, Image, Button, StatusBar } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { numbers } from './Data';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({ navigation }) => {
    const [mydata, setMyData] = useState([]);

    const getData = async () => {
        let datastr = await AsyncStorage.getItem('alphadata');
        if (datastr) {
            let jsondata = JSON.parse(datastr);
            setMyData(jsondata);
        } else {
            setMyData(numbers);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            getData();
        }, [])
    );

    const renderItem = ({ item, index, section }) => {
        return (
            <TouchableOpacity
                style={styles.opacityStyle}
                onPress={() => {
                    let datastr = JSON.stringify(mydata);
                    navigation.navigate('Edit', {
                        datastring: datastr,
                        index: index,
                        type: section.title,
                        key: item.key,
                        name: item.name,
                        ISBN: item.ISBN,
                        OwnedNum: item.OwnedNum
                    });
                }}
            >
                <View style={{ flex: 1 }}>
                    <Text style={styles.NameStyle}>{item.name}</Text>
                    <Text style={styles.textStyle}>ISBN: {item.ISBN}</Text>
                    <Text style={styles.textStyle}>Copies Owned: {item.OwnedNum}</Text>
                </View>
                <Image
                    source={{ uri: item.key }}
                    style={styles.imageStyle}
                />
            </TouchableOpacity>
        );
    };

    const renderSectionHeader = ({ section: { title, bgColor, ico, colo, outline } }) => (
        <View style={{ backgroundColor: bgColor, padding: 10 }}>
            <Text style={[styles.headerText, styles[outline], { color: colo }]}>
                <Icon name={ico} size={20} color={colo} />
                {title}
            </Text>
        </View>
    );

    return (
        <View style={{ marginBottom: 105, marginTop: 50 }}>
            <SectionList
                sections={mydata}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity
                style={{
                    borderRadius: 20,
                    backgroundColor: "blue",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 10,
                    marginBottom: 10000000,
                }}
                onPress={() => {
                    navigation.navigate('Add');
                }}
            >
                <Text style={{ color: "white", fontSize: 16 }}>Add Books button</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    headerText: {
        fontSize: 20,
        margin: 10,
        textAlign: "center",
        fontWeight: "bold",
    },
    opacityStyle: {
        flexDirection: 'row',
        borderWidth: 1,
        padding: 10,
        alignItems: 'center',
    },
    NameStyle: {
        fontSize: 15,
        marginRight: 10,
        textAlign: "left",
        fontWeight: "bold",
        flex: 1,
    },
    textStyle: {
        fontSize: 15,
        marginRight: 10,
        textAlign: "left",
        flex: 1,
    },
    imageStyle: {
        width: 200,
        height: 300,
        borderRadius: 5,
    },
});

export default Home;
