import { supabase } from "./supabase";
import { decode } from "base64-arraybuffer";
import { nanoid } from "nanoid";

const uploadToSupabase = async (
    base64Image: string,
    imageExtension = "jpg",
    bucketName = "images"
): Promise<string | null> => {
    try {
        const base64Str = base64Image.includes("base64,")
            ? base64Image.substring(
                  base64Image.indexOf("base64,") + "base64,".length
              )
            : base64Image;
        const res = decode(base64Str);


        if (!(res.byteLength > 0)) {
            console.error("[uploadToSupabase] ArrayBuffer is null");
            return null;
        }

        const { data, error } = await supabase.storage
            .from(bucketName)
            .upload(`${nanoid()}.${imageExtension}`, res, {
                contentType: `image/${imageExtension}`,
            });

        if (!data) {
            console.error("[uploadToSupabase] Data is null");
            return null;
        }

        if (error) {
            console.error("[uploadToSupabase] upload: ", error);
            return null;
        }
        const { data: publicData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(data.path);


        if (!publicData.publicUrl) {
            console.error("[uploadToSupabase] publicURL is null");
            return null;
        }

        return publicData.publicUrl;
    } catch (err) {
        console.error(err);
        return null;
    }
};

export default uploadToSupabase;
