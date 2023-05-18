import "./CSS/App.css";
import "./CSS/SingleArticle.css";
import "./CSS/Comments.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Articles from "./components/Articles";
import SingleArticle from "./components/SingleArticle";
import NavBar from "./components/NavBar";
import Topics from "./components/Topics";

function App() {
  return (
    <div className="App">
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/topic/:topic" element={<Topics />} />
          <Route path="/articles/:article_id" element={<SingleArticle />} />
        </Routes>
      </div>
      <NavBar />
    </div>
  );
}

export default App;
