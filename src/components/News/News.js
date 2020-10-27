import React, { Component } from 'react';

import { withStyles } from "@material-ui/core/styles";

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';


import axios from 'axios';

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
        category: 'business',
        country: 'us'

    }

    getArticles = () => {
        axios.get(`https://newsapi.org/v2/top-headlines?country=${this.state.country}&category=${this.state.category}&pageSize=100&apiKey=${API_KEY}`)
            .then(response => {
                this.setState({
                    articles: response.data.articles
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
            console.log(nextState)
            this.getArticles()
        }

    }

    selectCategoryHandler = (event) => {
        console.log(event.target.value)
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
                            image={news.urlToImage}
                            src="img"
                            title="news"
                        />
                        <CardHeader
                            title={news.title}
                            subheader="September 14, 2016"
                        />
                        <CardContent>
                            {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {news.title}
                            </Typography> */}
                            <Typography variant="h5" component="h2">
                                {news.author ? news.author : news.source.name}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                {news.description}
                            </Typography>
                            {/* <Typography variant="body2" component="p">
                                well meaning and kindly.
                         <br />
                                {'"a benevolent smile"'}
                            </Typography> */}
                        </CardContent>
                    </a>
                </Card>
            );
        })
        return (
            <div className="News">
                <FormControl>
                    <InputLabel htmlFor="category-native-simple">Category</InputLabel>
                    <Select
                        native
                        value={this.state.category}
                        onChange={this.selectCategoryHandler}
                        inputProps={{
                            name: 'Category',
                            id: 'category-native-simple',
                        }}
                    >
                        <option value='business'>Business</option>
                        <option value='technology'>Technology</option>
                        <option value='science'>Science</option>
                        <option value='health'>Health</option>
                        <option value='entertainment'>Entertainment</option>
                        <option value='sports'>Sports</option>
                    </Select>
                </FormControl>
                <div className="cards-wrapper">
                    {newsList}

                </div>

            </div>
        );
    }

}

export default withStyles(styles, { withTheme: true })(News);
