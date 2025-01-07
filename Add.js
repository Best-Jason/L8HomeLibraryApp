import React, { useState } from 'react';
import { TextInput, View, Text, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = ({ navigation, route }) => {
    const [Name, setName] = useState('');
    const [ISBN, setISBN] = useState('');
    const [Url, setUrl] = useState('');
    const [OwnedNum, setOwnedNum] = useState('');

    const setData = async (value) => {
        AsyncStorage.setItem("alphadata", value);
        navigation.navigate("Home");
    }

    return (
        <View style={{ padding: 10, marginTop: 50 }}>
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Title:</Text>
                <TextInput
                    style={{ borderWidth: 1 }}
                    onChangeText={(text) => setName(text)}
                />
            </View>

            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>ISBN:</Text>
                <TextInput
                    style={{ borderWidth: 1 }}
                    onChangeText={(text) => setISBN(text)}
                />
            </View>

            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Image URL:</Text>
                <TextInput
                    style={{ borderWidth: 1 }}
                    onChangeText={(text) => setUrl(text)}
                />
            </View>

            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Copies Owned:</Text>
                <TextInput
                    style={{ borderWidth: 1 }}
                    onChangeText={(text) => setOwnedNum(text)}
                />
            </View>

            <Button
                title="SUBMIT"
                onPress={async () => {
                    let mydata = JSON.parse(await AsyncStorage.getItem("alphadata")) || numbers;

                    const entry = {
                        name: Name,
                        key: Url,
                        ISBN: ISBN,
                        OwnedNum: OwnedNum
                    };

                    let indexNum = 0; // You can set this dynamically based on your app's requirement (e.g., "EX Rarity")
                    mydata[indexNum].data.push(entry);

                    await AsyncStorage.setItem("alphadata", JSON.stringify(mydata));

                    navigation.navigate("Home");
                }}
            />
        </View>
    );
};
export default Add;
