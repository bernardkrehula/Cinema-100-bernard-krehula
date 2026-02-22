import supabase from "#/config/supabaseClientVite";

export const reuqestMovieList = async(movieRange: {from: number, to: number}) => {
    const {from, to} = movieRange;
    try{
        const { data } = await supabase
        .from("movies")
        .select("id, image")
        .range(from, to);
        console.log(data) 
        return data;
    }
    catch(error){
        throw Error
    }
}
