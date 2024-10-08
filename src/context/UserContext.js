import { Component, createContext, useContext } from "react";

export const UserContext = createContext();

class UserContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInformation: null,
    };
    this.setUserInformation = this.setUserInformation.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  setUserInformation(userInformation) {
    this.setState({ userInformation });
  }

  handleLogout() {
    this.setUserInformation(null);
    localStorage.removeItem("accessToken");
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          setUserInformation: this.setUserInformation,
          handleLogout: this.handleLogout,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) throw Error("Context must be not null.");
  return context;
};

export default UserContextProvider;
