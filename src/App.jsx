import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";
import "@fontsource/inter";
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/articles/:articleid" element={<SingleArticle />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
