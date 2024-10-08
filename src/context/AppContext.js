import { Component, createContext, useContext } from "react";

export const AppContext = createContext();

class AppContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: "INITIALIZED",
      theme: "LIGHT",
      cart: [],
      productList: [],
    };
    this.setAppState = this.setAppState.bind(this);
    this.setTheme = this.setTheme.bind(this);
    this.setCart = this.setCart.bind(this);
    this.setProductList = this.setProductList.bind(this);
  }

  setAppState(appState) {
    this.setState({ appState });
  }

  setTheme(theme) {
    this.setState({ theme });
  }

  setCart(cart) {
    this.setState({ cart });
  }

  setProductList(productList) {
    this.setState({ productList }); // Eksik parantez eklendi
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          setAppState: this.setAppState,
          setTheme: this.setTheme,
          setCart: this.setCart,
          setProductList: this.setProductList,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw Error("Context must be not null.");
  return context;
};

export default AppContextProvider;
