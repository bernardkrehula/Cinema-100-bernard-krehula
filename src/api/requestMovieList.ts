import supabase from "#/config/supabaseClientVite";

export const reuqestMovieList = async() => {
    try{
        const { data } = await supabase
        .from("movies")
        .select("*")
        .range(0, 9);
        console.log(data)
        return data;
    }
    catch(error){
        throw Error
    }
}
