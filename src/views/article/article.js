import React, { Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import axios from 'axios'

import {Button, Form, Container, Jumbotron} from 'react-bootstrap';
import './article.css'

const config = require('../../config.json')
const api = require('../../api.json')


class Article extends Component {

    state ={
        currentArticle : null,
        searchArticle: null
    }

    componentDidMount = () => {
        if(this.props.isCategory){
            //console.log('HERE', this.props.article)
            this.setState({currentArticle: this.props.article, searchArticle: this.props.article})
        }
        else{
            let currentArticleId = this.props.match.params.id;
            let searchArticle = this.props.topArticles.filter(article => article.id === parseInt(currentArticleId))[0];

            this.setState({ searchArticle })

            //console.log(api.getArticle + "?api-key=" + config.apiKey + "&q=" + searchArticle.title)
            axios.get(api.getArticle + "?api-key=" + config.apiKey + "&q=" + searchArticle.title)
                .then(result => {
                    let temp = result.data.response.docs.filter(doc =>doc.uri === searchArticle.uri)[0];
                    this.setState({currentArticle: temp})
                })
                .catch(error => {throw error;})
        }
    }
    
    articleInfo = () => {
         
        let currentArticle = this.state.currentArticle;
        if(currentArticle === undefined)
            return <a href={ this.state.searchArticle.url } target="_blank"> We could not find the requested article, please read it HERE. </a>;
        
        return(
            <div id="article-info-body">
                <Container >
                    <div id="article-info-title">{ currentArticle.headline ?  currentArticle.headline.main : this.state.searchArticle.title }</div>
                    <div className="article-info-little">{ moment(currentArticle.pub_date).format("YYYY, MMMM DD") }</div>
                    <img style={{ width:'inherit', margin:'15px'}} src={ this.props.isCategory ? currentArticle.multimedia[4].url : 'http://nytimes.com/'+currentArticle.multimedia[0].url }></img>

                    
                    { !this.props.isCategory ? <div className="article-info-little">{ currentArticle.section_name + ' - ' + currentArticle.subsection_name }</div> : null }
                </Container>
                
                <Container>
                    { currentArticle.snippet 
                        ? 
                            <Jumbotron fluid>
                                <Container>
                                    {currentArticle.snippet}
                                </Container>
                            </Jumbotron>
                        : null }
                    <div id="article-info-lead" >{ currentArticle.lead_paragraph ? <p>{currentArticle.lead_paragraph}</p> : this.state.searchArticle.abstract }</div>
                    
                    { !this.props.isCategory ? <a href={currentArticle.web_url} target="_blank">More...</a> : <a href={currentArticle.url} target="_blank">More...</a>}
                    <br />
                    <div className="article-info-little">{ currentArticle.byline.original }</div>
                    
                    <br />
                </Container>
            </div>)
    }

    loading = () =><div>Loading...</div>;
    

    render = () =>{

        return (
        <div>
            <div className="home-header">
                    <div className="home-title">
                        Pomelo Times <span style={{fontSize:'10px', textAlign:'center'}}>by Rodrigo Medina</span>
                    </div>
                        <Form onSubmit={e => e.preventDefault() }>
                            <Form.Row className="justify-content-md-center"> 
                                <Button onClick={() => this.props.history.goBack()}> Return to list </Button>
                            </Form.Row>
                        </Form>
                            
                </div>
            { this.state.currentArticle === null ? this.loading() : this.articleInfo() }
           
        </div>
        )
    }
}

const mapStateToProps = state => {
    let { topArticles, isCategory, article } = state.articleReducer;

    return {
        topArticles,
        isCategory,
        article
    }
}

export default connect(mapStateToProps)(Article);