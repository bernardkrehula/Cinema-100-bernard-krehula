import { createContext, useState } from "react"

export const CinemaContext = createContext({});

const CinemaProvider = ({children}) => {
    const [data, setData] = useState();

    return <CinemaContext.Provider>
        {children}
    </CinemaContext.Provider>

}