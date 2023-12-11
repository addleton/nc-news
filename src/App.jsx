import { Route, Routes } from "react-router-dom";
import "./App.css";
import SingleArticle from "./components/SingleArticle";
import { useState } from "react";

function App() {
  const [articles, setArticles] = useState([]);
  return (
    <Routes>
      <Route path="/articles/:articleid" element={<SingleArticle articles={articles} setArticles={setArticles} />} />
    </Routes>
  );
}

export default App;
