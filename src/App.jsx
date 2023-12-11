import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";
import { useState } from "react";

function App() {
  const [articles, setArticles] = useState([]);
  return (
    <>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route
          path="/articles/:articleid"
          element={
            <SingleArticle articles={articles} setArticles={setArticles} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
