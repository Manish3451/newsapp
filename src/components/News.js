import React, { Component } from 'react'
import NewsItems from './NewsItems'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'

export class News extends Component {

  static defaultProps= {
    category: "general",
    country: 'in'
  }

  static propTypes = {
    category: PropTypes.string,
  }





  articles = []
    constructor() {
      super();
      console.log("Hello I am constructor from News Component");
      this.state = {
        articles:[],
        loading:false,
        page:1,
        totalResults:0
        }
    }
  

  async componentDidMount(){
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ba7c9aadd91e4016967ef0979f98ba52&pageSize=60`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData)
    this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults})
  } 

  fetchMoreData = async () => {
    this.setState({page:this.state.page+1})
    const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ba7c9aadd91e4016967ef0979f98ba52&page=${this.state.page}&pageSize=60`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles:this.state.articles.concat(parsedData.articles),
      totalResults:parsedData.totalResults,
    })
  };
    
  
  

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">NewsDaily - Top Headlines</h2>
        <InfiniteScroll
                  dataLength={this.state.articles.length}
                  next={this.fetchMoreData}
                  style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                  inverse={true} //
                  hasMore={this.state.articles.length !== this.state.totalResults}
                  
                  scrollableTarget="scrollableDiv">
                <div className="row">
                {this.state.articles.map((element)=>{
                  return <div className="col-md-4"  key={element.url}>
                  <NewsItems title={element.title} description={element.description}  imageurl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt} />
                </div>
                })}
              </div>
      </InfiniteScroll>
      </div>
    )
  }
}

export default News
