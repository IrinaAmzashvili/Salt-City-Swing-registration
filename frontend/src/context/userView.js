import { createContext, useState, useContext } from "react";

export const UserViewContext = createContext();

export const useUserViewContext = () => useContext(UserViewContext);

const UserViewProvider = (props) => {
  const [userView, setUserView] = useState("upcoming");

  return (
    <UserViewContext.Provider
      value={{
        userView,
        setUserView,
      }}
    >
      {props.children}
    </UserViewContext.Provider>
  );
};

export default UserViewProvider;
