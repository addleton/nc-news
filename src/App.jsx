import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";
import "@fontsource/inter";
import { UserProvider } from "./context/UserContext";
import Nav from "./components/Nav";
import Error from "./components/Error";


function App() {
  return (
    <>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/articles/:articleid" element={<SingleArticle />} />
          <Route path="/articles/*" element={<Articles/>} />
          <Route path='/*' element={<Error message='Route not found...'/>} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;