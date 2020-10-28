import React, { Component } from 'react';

import NewsSelector from '../NewsSelector/NewsSelector';

import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import moment from 'moment'
import axios from 'axios';

import noImage from '../../assets/image/no_image.jpg'

const API_KEY = 'fd6ac6af694b4aad9a8daf570e04232f';

const styles = theme => ({
    root: {
        margin: 10,
        flex: '0 40%',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

class News extends Component {
    state = {
        articles: [],
        totalResults: null,
        category: 'business',
        country: 'us'

    }

    getArticles = () => {
        axios.get(`https://newsapi.org/v2/top-headlines?country=${this.state.country}&category=${this.state.category}&pageSize=100&apiKey=${API_KEY}`)
            .then(response => {
                console.log(response)
                this.setState({
                    articles: response.data.articles,
                    totalResults: response.data.totalResults
                })
            })

    }

    componentDidMount() {
        this.getArticles();
        console.log("mounted")

    }
    componentDidUpdate(nextProps, nextState) {
        if (this.state.category !== nextState.category) {
            console.log('update')
            this.getArticles()
        }

    }

    selectCategoryHandler = (event) => {
        console.log('Select Value Changed!')
        this.setState({
            category: event.target.value
        })
    }

    render() {
        const { classes } = this.props;
        const newsList = this.state.articles.map((news, i) => {
            return (
                <Card className={classes.root} key={i}>
                    <a className="card-link" href={news.url} target="_blank" rel="noopener noreferrer">
                        <CardMedia
                            className={classes.media}
                            image={news.urlToImage ? news.urlToImage : noImage}
                            src="img"
                            title="news"
                        />
                        <CardHeader
                            title={news.title}
                            subheader={moment(news.publishedAt).format('MMMM Do YYYY, h:mm:ss a')}
                        />
                        <CardContent>
                            <Typography variant="h5" component="h2">
                                {news.author ? news.author : news.source.name}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                {news.description}
                            </Typography>
                        </CardContent>
                    </a>
                </Card>
            );
        })
        return (
            <div className="News">
                <div className="news-selector-wrapper">
                    <NewsSelector category={this.state.category} selectCategoryHandler={this.selectCategoryHandler} />
                </div>
                <div className="cards-wrapper">
                    {newsList}
                </div>

            </div>
        );
    }

}

export default withStyles(styles, { withTheme: true })(News);
