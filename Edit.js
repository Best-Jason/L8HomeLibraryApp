import React, { useState } from 'react';
import { TextInput, View, Text, Button,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Edit = ({ navigation, route }) => {

    let mydata = route.params?.datastring
        ? JSON.parse(route.params.datastring) // Safely parse datastring
        : []; // Fallback to an empty array if datastring is undefined

    let myIndex = route.params.index;

    const [name, setName] = useState(route.params.name); //
    const [ISBN, setISBN] = useState(route.params.ISBN)
    const [Url, setUrl] = useState(route.params.key); //
    const [OwnedNum, setOwnedNum] = useState(route.params.OwnedNum)

    const setData = async(value) => {
        AsyncStorage.setItem("alphadata", value);
        navigation.navigate("Home");
    }

    return (
        <View style={{ padding: 10, marginTop: 50 }}>

            {/* Name/Title INPUT */}

            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Title:</Text>
                <TextInput
                    value={name}
                    style={{ borderWidth: 1}}
                    onChangeText={(text) => setName(text)}
                />
            </View>
            {/*Isbn input*/}
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>ISBN:</Text>
                <TextInput
                    value={ISBN}
                    style={{ borderWidth: 1}}
                    onChangeText={(text) => setISBN(text)}
                />
            </View>


            {/* URL IMG INPUT */}

            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Image URL:</Text>
                <TextInput
                    value={Url}
                    style={{ borderWidth: 1}}
                    onChangeText={(text) => setUrl(text)}
                />
            </View>

            {/* Copies Owned INPUT */}

            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Copies Owned:</Text>
                <TextInput
                    value={OwnedNum}
                    style={{ borderWidth: 1}}
                    onChangeText={(text) => setOwnedNum(text)}
                />
            </View>




            {/* BUTTONS */}
            <View style={{ padding: 10,flexDirection: 'row', justifyContent: 'space-between' }}>

                {/* SAVE BUTTON */}
                <View style={{flex:1, margin: 10}}>
                    <Button title="SAVE"
                            onPress={() => {
                                let indexNum=0

                                mydata[indexNum].data[route.params.index].key = Url;
                                mydata[indexNum].data[route.params.index].name = name;
                                mydata[indexNum].data[route.params.index].ISBN = ISBN;
                                mydata[indexNum].data[route.params.index].OwnedNum = OwnedNum;
                                let stringdata = JSON.stringify(mydata);
                                setData(stringdata);
                            }}/>
                </View>

                {/* DELETE BUTTON */}
                <View style={{flex:1, margin: 10}}>
                    <Button title="DELETE"
                            onPress={() => {
                                let indexNum=0

                                Alert.alert("Are you sure?", '',
                                    [{text:'Yes', onPress: () => {
                                            mydata[indexNum].data.splice(route.params.index, 1);
                                            let stringdata = JSON.stringify(mydata);
                                            setData(stringdata);                                        }},
                                        {text: 'No'}])
                            }}
                    />
                </View>

            </View>




        </View>
    );
};

export default Edit;
