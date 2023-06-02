import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'
import FAIcon from '@expo/vector-icons/FontAwesome'
import ADIcon from "@expo/vector-icons/AntDesign";
import { useRouter } from 'expo-router'




const initialization2 = () => {
    const router = useRouter();
    const [name, setName] = React.useState("");
    const initialFamilyOptions = [
      {title: "Son", selected: false},
      {title: "Daughter", selected: false},
      {title: "Child", selected: false},
      {title: "Mother", selected: false},
      {title: "Father", selected: false},
      {title: "Parent", selected: false},
      {title: "Grandmother", selected: false},
      {title: "Grandfather", selected: false},
      {title: "Grandparent", selected: false},
    ]

    const [familyOptions, setFamilyOptions] = React.useState(initialFamilyOptions);

    const next = () => {
        router.push({pathname: "(screens)/(initializations)/initialization3", params: {name: name}});
    };

    const previous = () => {
        router.push("(screens)/(initializations)/initialization1");
    };

    const toggleFamilyOption = (title: string) => {
        const newFamilyOptions = familyOptions.map((option) => {
            if (option.title === title) {
                return {
                    ...option,
                    selected: !option.selected,
                };
            }
            return option;
        });
        setFamilyOptions(newFamilyOptions);
    };


  return (
      <View style={styles.container}>
          <Text style={styles.text}>initialization2</Text>
          <Text style={styles.bigText}>Build Your Profile</Text>
          <TouchableOpacity style={styles.uploadButton}>
              <ADIcon name="upload" size={10} color="#fff" />
              <Text style={styles.buttonText}>Upload Image</Text>
          </TouchableOpacity>
          <Text style={styles.text}>What's Your Name?</Text>
          <TextInput
              style={styles.input}
              onChangeText={setName}
              value={name}
              autoCapitalize="none"
              placeholder="Start typing..."
              placeholderTextColor={"#000"}
          ></TextInput>
          <View style={styles.optionsContainer}>
              {familyOptions.map((option) => (
                  <TouchableOpacity
                      style={[
                          styles.familyCodeButton,
                          { opacity: option.selected ? 1 : 0.5 },
                      ]}
                      key={option.title}
                      onPress={() => {
                          toggleFamilyOption(option.title);
                      }}
                  >
                      <Text style={styles.familyOptionText}>
                          {option.title}
                      </Text>
                  </TouchableOpacity>
              ))}
          </View>
          <View style={styles.buttonGroup}>
              <TouchableOpacity
                  onPress={previous}
                  style={[styles.navigationButton, { opacity: 0.5 }]}
              >
                  <FAIcon name="angle-left" size={30} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={next} style={styles.navigationButton}>
                  <FAIcon name="angle-right" size={30} color="#fff" />
              </TouchableOpacity>
          </View>
      </View>
  );
}

export default initialization2

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#222",
    },
    bigText: {
        fontSize: 30,
        color: "#fff",
    },
    text: {
        fontSize: 20,
        color: "#fff",
    },
    uploadButton: {
        backgroundColor: Colors.blue,
        padding: 10,
        borderRadius: 37,
        width: 75,
        height: 75,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    navigationButton: {
        backgroundColor: Colors.blue,
        padding: 10,
        borderRadius: 25,
        width: 50,
        height: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 10,
        textAlign: "center",
    },
    buttonGroup: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "50%",
        marginTop: 20,
    },
    input: {
        width: "80%",
        height: 40,
        margin: 12,
        borderWidth: 1,
        color: "#000",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
    },
    familyCodeButton: {
        backgroundColor: Colors.blue,
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    familyOptionText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
    },
    optionsContainer:{
        width: "80%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        rowGap: 10,
        gap: 5,
    }
});

