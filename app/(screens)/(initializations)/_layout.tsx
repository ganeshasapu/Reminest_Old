import { Navigator, Slot } from "expo-router";
import { createContext, useState } from "react";

interface FamilyRelation {
    title: string;
    selected: boolean;
}

interface FamilyInterest {
    title: string;
    selected: boolean;
}

interface UserFormContextProps {
    firstName: string;
    lastName: string;
    birthday: Date;
    familyCode: number;
    phoneNumber: string;
    familyInterests: string[];
    relationships: FamilyRelation[];
    countryCode: string;
    uid: string;

    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
    setBirthday: (birthday: Date) => void;
    setFamilyCode: (familyCode: number) => void;
    setPhoneNumber: (phoneNumber: string) => void;
    setFamilyInterests: (familyInterests: string[]) => void;
    setRelationships: (relationship: string) => void;
    setCountryCode: (countryCode: string) => void;
    setUid: (uid: string) => void;
}

interface FamilyFormContextProps {
    familyName: string;
    heritageOptions: FamilyInterest[];
    activityOptions: FamilyInterest[];
    milestoneOptions: FamilyInterest[];


    setFamilyName: (familyName: string) => void;
    setHeritageOptions: (historyOption: string) => void;
    setActivityOptions: (activityOption: string) => void;
    setMilestoneOptions: (milestoneOption: string) => void;
}

export const UserFormContext = createContext({} as UserFormContextProps);

export const FamilyFormContext = createContext({} as FamilyFormContextProps);


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

const initialHistoryOptions = [
    { title: "Ancestry", selected: false },
    { title: "Growing Up Stories", selected: false },
    { title: "Education", selected: false },
    { title: "Immigration Story", selected: false },
    { title: "Language", selected: false },
    { title: "Culture", selected: false },
];

const initialActivityOptions = [
    { title: "Arts and Crafts", selected: false },
    { title: "Baking and Cooking", selected: false },
    { title: "Travel", selected: false },
    { title: "Books and Games", selected: false },
    { title: "Sports", selected: false },
];

const initialMilestoneOptions = [
    { title: "Birthdays", selected: false },
    { title: "Vacation Memories", selected: false },
    { title: "New Family", selected: false },
    { title: "Wedding", selected: false },
    { title: "School and Career", selected: false },
    { title: "Anniversaries", selected: false },
];

const _layout = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [countryCode, setCountryCode] = useState("+1" as string);
    const [birthday, setBirthday] = useState(new Date());
    const [familyCode, setFamilyCode] = useState(0);
    const [uid, setUid] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [familyInterests, setFamilyInterests] = useState<string[]>([]);
    const [relationships, setRelationships] = useState(familyOptions);

     const [heritageOptions, setHeritageOptions] = useState<FamilyInterest[]>(
         initialHistoryOptions
     );
     const [activityOptions, setActivityOptions] = useState<FamilyInterest[]>(
         initialActivityOptions
     );
     const [milestoneOptions, setMilestoneOptions] = useState<FamilyInterest[]>(
         initialMilestoneOptions
     );
    const [familyName, setFamilyName] = useState("");



    function handleSetRelationships (relationship: string) {
        const newRelationships = relationships.map((relation) => {
            if (relation.title === relationship) {
                return { ...relation, selected: !relation.selected };
            }
            return relation;
        });
        setRelationships(newRelationships);
    }

    function handleSetHeritageOptions (historyOption: string) {
        const newHistoryOptions = heritageOptions.map((option) => {
            if (option.title === historyOption) {
                return { ...option, selected: !option.selected };
            }
            return option;
        });
        setHeritageOptions(newHistoryOptions);
    }

    function handleSetActivityOptions (activityOption: string) {
        const newActivityOptions = activityOptions.map((option) => {
            if (option.title === activityOption) {
                return { ...option, selected: !option.selected };
            }
            return option;
        })
        setActivityOptions(newActivityOptions);
    };

    function handleSetMilestoneOptions (milestoneOption: string) {
        const newMilestoneOptions = milestoneOptions.map((option) => {
            if (option.title === milestoneOption) {
                return { ...option, selected: !option.selected };
            }
            return option;
        });
        setMilestoneOptions(newMilestoneOptions);
    }

    return (
            <FamilyFormContext.Provider
                value={{
                    familyName: familyName,
                    heritageOptions: heritageOptions,
                    activityOptions: activityOptions,
                    milestoneOptions: milestoneOptions,

                    setFamilyName: setFamilyName,
                    setHeritageOptions: handleSetHeritageOptions,
                    setActivityOptions: handleSetActivityOptions,
                    setMilestoneOptions: handleSetMilestoneOptions,
                }}
            >
                <UserFormContext.Provider
                    value={{
                        firstName: firstName,
                        lastName: lastName,
                        birthday: birthday,
                        familyCode: familyCode,
                        phoneNumber: phoneNumber,
                        familyInterests: familyInterests,
                        relationships: relationships,
                        countryCode: countryCode,
                        uid: uid,

                        setFirstName,
                        setLastName,
                        setBirthday,
                        setFamilyCode,
                        setPhoneNumber,
                        setFamilyInterests,
                        setRelationships: handleSetRelationships,
                        setCountryCode,
                        setUid,
                    }}
                >
                    <Navigator>
                        <Slot />
                    </Navigator>
                </UserFormContext.Provider>
            </FamilyFormContext.Provider>
    );
};

export default _layout;
