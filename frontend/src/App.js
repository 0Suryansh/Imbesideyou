import React from "react";
import Home from "./pages/Home";
import InputText from "./pages/InputText";
import InputArticle from "./pages/InputArticle";
import InputTweet from "./pages/InputTweet";
import TextSummarize from "./pages/TextSummarize";
import TweetGeneration from "./pages/TweetGeneration";
import ArticleGeneration from "./pages/ArticleGeneration";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/text-summarize" element={<TextSummarize />} />
        <Route path="/tweet-generation" element={<TweetGeneration />} />
        <Route path="/article-generation" element={<ArticleGeneration />} />
        <Route path="/input-text" element={<InputText />} />
        <Route path="/input-tweet" element={<InputTweet />} />
        <Route path="/input-article" element={<InputArticle />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
