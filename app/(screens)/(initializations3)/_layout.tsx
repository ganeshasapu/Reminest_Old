import { Navigator, Slot } from "expo-router";
import { createContext, useState } from "react";
import InitializationFlowNav from "./initializationFlowNav";

interface FamilyRelation {
    title: string;
    selected: boolean;
}

interface FormContextProps {
    firstName: string;
    lastName: string;
    birthday: Date;
    familyCode: number;
    uid: string;
    phoneNumber: string;
    familyInterests: string[];
    familyName: string;
    relationships: FamilyRelation[];

    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
    setBirthday: (birthday: Date) => void;
    setFamilyCode: (familyCode: number) => void;
    setUid: (uid: string) => void;
    setPhoneNumber: (phoneNumber: string) => void;
    setFamilyInterests: (familyInterests: string[]) => void;
    setFamilyName: (familyName: string) => void;
    setRelationships: (relationship: string) => void;
}

export const FormContext = createContext({} as FormContextProps);

interface RouteContextProps {
    currentRouteIndex: number;
    setCurrentRouteIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const RouteContext = createContext({
} as RouteContextProps);

const familyOptions = [
    { title: "Son", selected: false },
    { title: "Daughter", selected: false },
    { title: "Child", selected: false },
    { title: "Mother", selected: false },
    { title: "Father", selected: false },
    { title: "Parent", selected: false },
    { title: "Grandmother", selected: false },
    { title: "Grandfather", selected: false },
    { title: "Grandparent", selected: false },
];

const _layout = () => {
    const [currentRouteIndex, setCurrentRouteIndex] = useState(1);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState(new Date());
    const [familyCode, setFamilyCode] = useState(0);
    const [uid, setUid] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [familyInterests, setFamilyInterests] = useState<string[]>([]);
    const [familyName, setFamilyName] = useState("");
    const [relationships, setRelationships] = useState(familyOptions);

    function handleSetRelationships (relationship: string) {
        const newRelationships = relationships.map((relation) => {
            if (relation.title === relationship) {
                return { ...relation, selected: !relation.selected };
            }
            return relation;
        });
        setRelationships(newRelationships);
    }

    return (
        <RouteContext.Provider
            value={{ currentRouteIndex, setCurrentRouteIndex }}
        >
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
                    relationships: relationships,

                    setFirstName,
                    setLastName,
                    setBirthday,
                    setFamilyCode,
                    setUid,
                    setPhoneNumber,
                    setFamilyInterests,
                    setFamilyName,
                    setRelationships: handleSetRelationships,
                }}
            >
                <Navigator>
                    <Slot />
                    <InitializationFlowNav />
                </Navigator>
            </FormContext.Provider>
        </RouteContext.Provider>
    );
};

export default _layout;
