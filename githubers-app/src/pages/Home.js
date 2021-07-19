import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { cleanAction, fetchAPIbyQuery } from '../actions'


class Home extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
    }
  }
  handleTitle = ({ target, type }) => {
    if(type === "mouseover") {
      target.className = 'title-mouseover';
      return target.innerHTML = 'Users and Repos';
    }
    target.className = 'title-initial';
    target.innerHTML = 'GitHubers';
  }
  handleChange = ({target}) => {
    const { clean } = this.props;
    clean();
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }
  searchUser = (user) => {
    const { fetchQuery } = this.props;
    if(user) {
      fetchQuery(user);
    } else {
      alert('type something')
    }
  }
  render() { 
    const { queryResults, isLoading } = this.props;
    const { query } = this.state;
    return (  
      <div className="home-body">
        <img src="https://img.icons8.com/material-outlined/180/ffffff/github.png" alt="GitHub"/>
        <h1 className="title-initial" onMouseOver={(e) => this.handleTitle(e)} onMouseLeave={ (e) => this.handleTitle(e) }>GitHubers</h1>
        <div className="search-div">
          <label htmlFor="query">
            <input type="text" name="query" id="query" placeholder="user" onChange={(e) => this.handleChange(e)}/>
          </label>
          <button className="search-icon" onClick={ () => this.searchUser(query) }>
            <img src="https://img.icons8.com/ios/23/ffffff/search--v1.png" alt="search-icon"/>
          </button>
        </div>
        <div className="results-div">
          {isLoading && (
            <img className="loading" alt="loading" src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif"/>
          )}
          {queryResults && queryResults.items
          .map((result, index) => index < 5
          ? (
            <Link className="noDecoration" key={index} to={`/details/${result.login}`}>
              <div className="dropdown-item">
                <img className="dropdown-avatar" alt="avatar" src={result.avatar_url}/>
                <p>{result.login}</p>
              </div>
            </Link>
          )
          : ''
          )}
        </div>
      </div>
    );
  }
}
 
const mapStateToProps = (state) => ({
  queryResults: state.reducer.queryResults,
  isLoading: state.reducer.isLoading,
})

const mapDispatchToProps = (dispatch) => ({
  clean: () => dispatch(cleanAction()),
  fetchQuery: (value) => dispatch(fetchAPIbyQuery(value))
})

export default connect(mapStateToProps, mapDispatchToProps) (Home);