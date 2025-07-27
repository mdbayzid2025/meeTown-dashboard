import React, { createContext,  useEffect,  useState } from "react"
import { useGetProfileQuery } from "../redux/features/auth/authApi";
 
export const UserContext = createContext< any | undefined>(undefined);
export const UserProvider =  ({children}: {children: React.ReactNode})=>{
    const [user, setUser] = useState<any|null>(null);
    const {data: userData, refetch, isSuccess} = useGetProfileQuery(null);

    useEffect(()=>{
        if(isSuccess && userData){
            setUser(userData)
        }
    },[isSuccess, refetch, ]);

    return <UserContext.Provider value={{user, setUser, refetch}}>
        {children}
    </UserContext.Provider>
}