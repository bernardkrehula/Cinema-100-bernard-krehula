import supabase from "../config/supabaseClient.js";
import dataJs from "../data/dataJs.js";

console.log(dataJs, 'ne radi')
/* const uploadData = async() => {
    try{
        const response = await supabase
        .form('movies')
        .insert(dataJs)
        console.log('radi', dataJs)
        return response.data;
    }
    catch(error){
        console.log(error);
    }
}
uploadData(); */