import React, { useState } from 'react';
const UserContext = React.createContext([{}, p => {}]);

const UserProvider = (props) => {
    const [user, setUser] = useState({});
    return (
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };