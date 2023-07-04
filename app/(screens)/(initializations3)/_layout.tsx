import { Navigator, Slot } from "expo-router";
import InitializationScreenNav from "../../../components/InitializationScreenNav";
import { createContext, useState } from "react";
import PreviewScreenNav from "../../../components/PreviewScreenNav";
interface FormContextProps {
    firstName: string;
    lastName: string;
    birthday: Date;
    familyCode: number;
    uid: string;
    phoneNumber: string;
    familyInterests: string[];
    familyName: string;
    relationship: string;

    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
    setBirthday: (birthday: Date) => void;
    setFamilyCode: (familyCode: number) => void;
    setUid: (uid: string) => void;
    setPhoneNumber: (phoneNumber: string) => void;
    setFamilyInterests: (familyInterests: string[]) => void;
    setFamilyName: (familyName: string) => void;
    setRelationship: (relationship: string) => void;
}

export const FormContext = createContext({} as FormContextProps);

const _layout = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState(new Date());
    const [familyCode, setFamilyCode] = useState(0);
    const [uid, setUid] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [familyInterests, setFamilyInterests] = useState<string[]>([]);
    const [familyName, setFamilyName] = useState("");
    const [relationship, setRelationship] = useState("");

    return (
        <FormContext.Provider
            value={{
                firstName: firstName,
                lastName: lastName,
                birthday: birthday,
                familyCode: familyCode,
                uid: uid,
                phoneNumber: phoneNumber,
                familyInterests: familyInterests,
                familyName: familyName,
                relationship: relationship,

                setFirstName,
                setLastName,
                setBirthday,
                setFamilyCode,
                setUid,
                setPhoneNumber,
                setFamilyInterests,
                setFamilyName,
                setRelationship,
            }}
        >
            <Navigator>
                <Slot />
                <InitializationScreenNav />
            </Navigator>
        </FormContext.Provider>
    );
};

export default _layout;
