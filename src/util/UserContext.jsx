import {useState, useEffect, createContext, useContext} from 'react';
import Login from '../components/Login';
import axios from 'axios';

const UserContext = createContext();



export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {

        const fetchCurrentUser = async () => {
              const response = await axios.get('current-user', {withCredentials: true});
            
              console.log(response);
              if (response.data.success === true) {
                setCurrentUser(response.data.data.username);
              } 
          };
      
          fetchCurrentUser();
    },[]);

    console.log(currentUser)

    return (
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
            {/* { currentUser ? {children} : <Login />} */}
            {children}
        </UserContext.Provider>
    )
}

export function useAuth() { 
    return useContext(UserContext);
}