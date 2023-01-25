import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "state";
import { ChakraProvider, Box, Flex, Container } from "@chakra-ui/react";
import { theme } from "utils/theme";
import Header from "components/header";
import Products from "pages/Products";
import ProductDetail from "pages/ProductDetail";
import Purchase from "pages/Purchase";
import { ScrollTop } from "components/ScrollTop";

export const App = () => {
  // const store = useStore(pageProps.initialReduxState);

  return (
    <Router>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
        <PersistGate loading={null} persistor={persistor}>
          <Header />
          <Box textAlign="center" fontSize="xl">
            <Container maxW="8xl">
              <Flex minH="100vh" py={16} flexDirection="column" gap="2">
                <Routes>
                  <Route path="/" element={<Products />} />
                  <Route path="product/detail/:id" element={<ProductDetail />} />
                  <Route path="payments/purchase" element={<Purchase />} />
                </Routes>
              </Flex>
            </Container>
            <ScrollTop />
          </Box>
          </PersistGate>
        </ChakraProvider>
      </Provider>
    </Router>
  );
};
