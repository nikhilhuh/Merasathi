import { UserProvider } from "./UserContext";

export const AppProvider = ({ children }) => {
  return <UserProvider>{children}</UserProvider>;
};
