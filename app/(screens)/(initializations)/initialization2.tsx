import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../../../constants/Colors'
import ADIcon from "@expo/vector-icons/AntDesign";
import { useRouter } from 'expo-router'
import ProfileBorder from '../../../assets/vectors/ProfileBorder';
import { styles } from '../../stylesheets/styles';
import LogoDark from '../../../assets/vectors/LogoDark';
import { SafeAreaView } from 'react-native-safe-area-context';
import BasicInput from '../../../components/BasicInput';


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
      <SafeAreaView style={[styles.mainContainer]}>
          <LogoDark width={35} height={40} />
          <Text style={[styles.titletext, { paddingTop: "10%" }]}>
              Build Your Profile
          </Text>

          <View
              style={{
                  position: "absolute",
                  left: "35%",
                  top: "35%",
                  width: "100%",
                  height: "40%",
              }}
          >
              <ProfileBorder width={150} height={150} />
              <View style={localStyles.uploadButtonContainer}>
                  <TouchableOpacity style={localStyles.uploadButton}>
                      <ADIcon name="upload" size={15} color="#fff" />
                      <Text style={localStyles.uploadButtonText}>
                          Upload Image
                      </Text>
                  </TouchableOpacity>
              </View>
          </View>
          <View style={localStyles.emptySpacing} />
          <View style={localStyles.inputContainer}>
              <Text style={[styles.text]}>What's Your Name?</Text>
              <BasicInput
                  changeTextHandler={setName}
                  value={name}
                  style={{ marginTop: 5 }}
              ></BasicInput>
          </View>
          <Text style={[styles.text, {marginTop: 20, marginBottom: 10}]}>Select All That Apply:</Text>
          <View style={localStyles.optionsContainer}>
              {familyOptions.map((option) => (
                  <TouchableOpacity
                      style={[
                          localStyles.familyCodeButton,
                          { opacity: option.selected ? 1 : 0.5 },
                      ]}
                      key={option.title}
                      onPress={() => {
                          toggleFamilyOption(option.title);
                      }}
                  >
                      <Text style={localStyles.familyOptionText}>
                          {option.title}
                      </Text>
                  </TouchableOpacity>
              ))}
          </View>
          {/*

          <View style={localStyles.optionsContainer}>
              {familyOptions.map((option) => (
                  <TouchableOpacity
                      style={[
                          localStyles.familyCodeButton,
                          { opacity: option.selected ? 1 : 0.5 },
                      ]}
                      key={option.title}
                      onPress={() => {
                          toggleFamilyOption(option.title);
                      }}
                  >
                      <Text style={localStyles.familyOptionText}>
                          {option.title}
                      </Text>
                  </TouchableOpacity>
              ))}
          </View>
          <View style={localStyles.buttonGroup}>
              <TouchableOpacity
                  onPress={previous}
                  style={[localStyles.navigationButton, { opacity: 0.5 }]}
              >
                  <FAIcon name="angle-left" size={30} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                  onPress={next}
                  style={localStyles.navigationButton}
              >
                  <FAIcon name="angle-right" size={30} color="#fff" />
              </TouchableOpacity>
          </View> */}
      </SafeAreaView>
  );
}

export default initialization2

const localStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#222",
    },
    inputContainer: {
        width: "100%",
    },
    uploadButton: {
        backgroundColor: Colors.blue,
        borderRadius: 50,
        width: 90,
        height: 90,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    emptySpacing: {
        height: "35%",
    },
    uploadButtonText: {
        color: "#fff",
        fontSize: 14,
        textAlign: "center",
        fontFamily: "open-sans",
    },
    uploadButtonContainer: {
        position: "absolute",
        left: "8.5%",
        top: "11%",
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
    optionsContainer: {
        width: "80%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        rowGap: 10,
        gap: 5,
    },
});

