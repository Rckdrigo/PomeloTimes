import React, {Component} from 'react';
import {connect} from 'react-redux';

import { Card, Button, Form, Row, Container, ButtonToolbar, Col, Dropdown } from 'react-bootstrap';
import axios from 'axios';

import {setTopArticles, selectCategoryArticle} from '../../actions/articleActions';

import './homePage.css';

const api = require('../../api.json')
const config = require('../../config.json')


class HomePage extends Component{

    state = {
        filteredArticles : [],
        filterValue: '',
        maxSeconds: 300,
        seconds: 0,
        period: 1,
        category:null
    }

    componentDidMount = () =>{
        // this.setState({period:1, category:null})

        this.fetchMostViewedArticles(this.state.period);

        this.filterResults = this.filterResults.bind(this)

        this.interval = setInterval(() => this.tick(), 1000);    
    }

    componentWillUnmount = () =>{
        clearInterval(this.interval)
    }

    tick = () => {
        if (this.state.seconds === this.state.maxSeconds){            
            if(this.state.period !== null)
                this.fetchMostViewedArticles(this.state.period);
            else
                this.fetchArticlesByCategory(this.state.category);
            
            this.setState({seconds:0})
        } else {
            this.setState(prevState => ({ seconds: prevState.seconds + 1 }))
        }
    };

    fetchMostViewedArticles = (period) =>{
        this.setState({period, category:null, filteredArticles:[]})

        //console.log(api.getMostViewed.replace('{period}', period) + '?api-key=' + config.apiKey);
        axios.get(api.getMostViewed.replace('{period}', period) + '?api-key=' + config.apiKey)
            .then(result => {
                this.props.setTopArticles(result.data.results, false)
                this.setState({ filteredArticles: result.data.results });

                this.filterResults(this.state.filterValue)
            })
            .catch(error => { 
                //console.log(error);
                this.props.setTopArticles([], false) 
            })
    }

    fetchArticlesByCategory = (category) => {
        //console.log(category.toLowerCase())
        
        this.setState({ category: category.toLowerCase(), period: null ,filteredArticles:[]})

        //console.log(api.getTopStoriesByCategory.replace('{category}', category.toLowerCase()) + '?api-key=' + config.apiKey);
        axios.get(api.getTopStoriesByCategory.replace('{category}', category.toLowerCase()) + '?api-key=' + config.apiKey)
            .then(result => {
                
                this.props.setTopArticles(result.data.results, true)
                this.setState({ filteredArticles: result.data.results });

                this.filterResults(this.state.filterValue)
            })
            .catch(error => { 
                //console.log(error); 
                this.props.setTopArticles([], false)
            })
    }

    filterResults = (filterValue) => {
        //console.log(this.props.topArticles)
        let filteredArticles = this.props.topArticles.filter((function (item) {
            // if(this.props.isCategory) //console.log(item)
            return item['title'].toLowerCase().search(filterValue) !== -1  
                 || item['abstract'].toLowerCase().search(filterValue) !== -1;
        }));

        this.setState({filteredArticles, filterValue})

    }

    selectArticle = (article) => {
        if(!this.props.isCategory)
            this.props.history.push('/article/'+ article.id)
        else{
            this.props.selectCategoryArticle(article);  
            this.props.history.push('/article/' + article.section)
        }
    };
    
    loading = () =>(
        <div>Loading...</div>
    )

    newsGrid = () => (
        <Container id="article-container">              
            <Row id="article-grid">
            {
                this.state.filteredArticles.map((article, i)=>{
                    // //console.log(article,i)
                    return <Card className="article-card" key={'article_' + i}>
                        {
                            !this.props.isCategory
                                ? <Card.Img variant="top" src={ article.media[0]['media-metadata'][2].url } /> 
                                : (article.multimedia.length > 0 
                                    ? <Card.Img variant="top" src={ article.multimedia[2].url } /> 
                                    : <div  style={{width:'400px', height:'270px', border:'1px solid gray'}}/> )
                                    
                        }

                        <Card.Body>
                            <Card.Title>{article.title}</Card.Title>
                        <Card.Text>
                            {article.abstract}
                        </Card.Text>
                        <Button variant="primary" onClick={() => this.selectArticle(article )}>Read article</Button>
                        </Card.Body>
                </Card>
                })
            }

            </Row>
        </Container>
    )

    render = () => {
        return (
            <div id="home-body">
                <div className="home-header">
                    <div className="home-title">
                        Pomelo Times <span style={{fontSize:'10px', textAlign:'center'}}>by Rodrigo Medina</span>
                    </div>
                       <Form onSubmit={e => e.preventDefault() }>
                            <Form.Row className="justify-content-md-center"> 
                                <Form.Group as={Col} md={3}>
                                    <ButtonToolbar >
                                        <Button onClick={() => this.fetchMostViewedArticles(1)} >24 hours</Button>
                                        <Button onClick={() => this.fetchMostViewedArticles(7)} >7 days</Button>
                                        <Button onClick={() => this.fetchMostViewedArticles(30)} >30 days</Button>
                                        
                                        <Dropdown focusFirstItemOnShow={false} onSelect={ this.fetchArticlesByCategory }>
                                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                Category
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu style={{height:'300px', overflowY:'scroll'}}>
                                                { config.categories.map(category => <Dropdown.Item eventKey={category}>{category}</Dropdown.Item>)}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </ButtonToolbar>
                                </Form.Group>

                                <Form.Group  as={Col}  md={3} >
                                    <Form.Control type="text" placeholder="Search" onChange={e => this.filterResults(e.target.value.toLowerCase())}/>
                                </Form.Group>
                                

                            </Form.Row>
                        </Form>
                </div>

                { this.state.filteredArticles.length === 0 ? this.loading() : this.newsGrid()}
            </div>

            
        )
    }
}

const mapStateToProps = (state) => {
    let { topArticles, isCategory } = state.articleReducer;

    return {
        topArticles,
        isCategory
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectCategoryArticle : article => dispatch(selectCategoryArticle(article)),
        setTopArticles : (topArticles, isCategory) => dispatch(setTopArticles(topArticles, isCategory)),
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);