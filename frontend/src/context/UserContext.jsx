import { createContext, useState, useContext, useEffect } from "react";

// Initial context object
const defaultUserContext = {
  UserDetails: null,
  setUserDetails: () => {},
  isInitialized: false,
};

// Create context
const UserContext = createContext(defaultUserContext);

// Custom hook to access user context
export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {
  const [UserDetails, setUserDetails] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const updateFromStorage = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUserDetails(parsedUser);
        } catch (error) {
          console.error("Error parsing user:", error);
          setUserDetails(null);
        }
      } else {
        setUserDetails(null);
      }
      setIsInitialized(true);
    };

    updateFromStorage();
    window.addEventListener("storage", updateFromStorage);

    return () => {
      window.removeEventListener("storage", updateFromStorage);
    };
  }, []);

  return (
    <UserContext.Provider
      value={{ UserDetails, setUserDetails, isInitialized }}
    >
      {children}
    </UserContext.Provider>
  );
};
