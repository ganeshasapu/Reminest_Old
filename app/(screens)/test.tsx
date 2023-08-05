import React, { useState, useEffect } from "react";
import { supabase } from "../../supabase";
import { FamiliesType, PostCollectionsType } from "../../schema";

function FamilyInfo() {
    const [family, setFamily] = useState<FamiliesType | null>(null);
    const [postCollections, setPostCollections] = useState<PostCollectionsType[]>([]);


    useEffect(() => {
        const fetchFamilyAndPostCollections = async () => {
            try {
                let userId = (await supabase.auth.getUser()).data.user?.id
                // Fetch family
                let { data: familyMembers, error } = await supabase
                    .from("family_members")
                    .select("family_id")
                    .eq("user_id", userId);

                if (error) throw error;
                if (!familyMembers)
                    throw new Error("User not found in any family");

                let { data: families, error: familyError } = await supabase
                    .from("families")
                    .select("*")
                    .eq("id", familyMembers[0].family_id);

                if (familyError) throw familyError;

                if (!families) throw new Error("Family not found");
                setFamily(families[0] as FamiliesType);

                // Fetch post collections
                let { data: postCollections, error: postCollectionError } =
                    await supabase
                        .from("post_collections")
                        .select("*")
                        .eq("family_id", familyMembers[0].family_id);

                if (postCollectionError) throw postCollectionError;
                if (!postCollections) throw new Error("No post collections");
                setPostCollections(postCollections as PostCollectionsType[]);
            } catch (err) {
                console.error(err);
            }
        };

        fetchFamilyAndPostCollections();
    }, []);

    if (!family) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Family Info</h1>
            <h2>Family Name: {family.family_name}</h2>
            <h2>Family Interests: {family.family_interests.join(", ")}</h2>

            <h1>Post Collections</h1>
            {postCollections.map((postCollection) => (
                <div key={postCollection.id}>
                    <h3>Prompt: {postCollection.prompt}</h3>
                    <p>Highlighted: {postCollection.highlighted}</p>
                </div>
            ))}
        </div>
    );
}

export default FamilyInfo;
