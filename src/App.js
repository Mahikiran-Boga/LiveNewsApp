import React, { useEffect, useState } from 'react';
import './App.css';
import News from './News';

function App() {
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('india');

  useEffect(() => {
    fetchNews();
  }, [category]);

  const fetchNews = () => {
    fetch(`https://newsapi.org/v2/everything?q=${category}&from=2023-12-11&apiKey=0e9e67ced62d43c9af654ce043cbcf11`)
      .then((response) => response.json())
      .then((news) => {
        if (news.articles && news.articles.length > 0) {
          setArticles(news.articles);
        } else {
          setArticles([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <header className="header">
        <h1>News App</h1>
        <input
          type="text"
          onChange={(event) => {
            if (event.target.value !== '') {
              setCategory(event.target.value);
            } else {
              setCategory('india');
            }
          }}
          placeholder="Search News"
        />
      </header>
      <section className="news-articles">
        {articles.length !== 0 ? (
          articles.map((article, index) => {
            return <News key={index} article={article} />;
          })
        ) : (
          <h1>No News Found for Searched Text</h1>
        )}
      </section>
    </div>
  );
}

export default App;
