import React, { Component } from 'react';

const API_KEY = 'fd6ac6af694b4aad9a8daf570e04232f';

class News extends Component {
    state = {
        articles: [],
        country: 'us'

    }

    componentDidMount() {
        fetch('https://newsapi.org/v2/top-headlines?' +
            'country=' + this.state.country + '&pageSize=100&' +
            'apiKey=' + API_KEY)
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    articles: result.articles,
                });
            },
            )
    }

    selectCountryHandler = (event) => {
        this.setState({
            country: event.target.value
        })
    }


    render() {

        return (
            <div className="News">
                <div>
                    <select value={this.state.country} onChange={this.selectionHandler}>
                        <option value='us'>us</option>
                        <option value='ru'>ru</option>
                    </select>
                </div>
                {this.state.articles.map((news, i) => {
                    return (
                        <div className="card" key={i}>
                            <a href={news.url} target="_blank" rel="noopener noreferrer">
                                <div className="content">
                                    <div className="image">
                                        <img src={news.urlToImage} alt="news" />
                                    </div>
                                    <h3 className="news-title">
                                        {news.title}
                                    </h3>
                                    <p className="news-description">{news.description}</p>
                                    <div className="author">
                                        <p>
                                            By <i>{news.author ? news.author : news.source.name}</i>
                                        </p>
                                        <p>{news.publishedAt}</p>
                                        <p>News №{i + 1}</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                    );
                })}
            </div>
        );
    }

}

export default News;
