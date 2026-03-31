import supabase from "#/config/supabaseClientVite";

export const requestMoviesArrayLength = async() => {
    try{
        const { count } = await supabase
        .from("movies")
        .select("*", { count: "exact" })
        
        return count;
    }
    catch(error){
        throw Error
    }
}