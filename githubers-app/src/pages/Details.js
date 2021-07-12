import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { cleanAction, fetchAPIbyUser } from '../actions'

class Details extends Component {
  componentDidMount() {
    const { match, fetchUser } = this.props;
    const { user } = match.params;
    fetchUser(user);
  }

  render() { 
    const { clean, userInfo, userRepos } = this.props;
    const { login, name, avatar_url, bio, followers, following, location, html_url } = userInfo;
    return ( 
      <div className="detail-body">
        <div className="side-bar">
          <img className="detail-avatar" src={ avatar_url } alt={name}/>
          <div className="text-control">
            <h1 className="name">{name}</h1>
            <span className="login">{login}</span>
            <span className="bio">{bio}</span>
            <div className="stats">
              <img src="https://img.icons8.com/material-rounded/16/ffffff/conference-call.png" alt="people-logo"/>
              <span className="stats-item">
                {followers}
                <p className="follow-text">followers</p>
              </span>
              <span className="stats-item">
                {following}
                <p className="follow-text">following</p>   
              </span>
            </div>
            <div className="stats">
              <img src="https://img.icons8.com/android/16/ffffff/worldwide-location.png" alt="world-logo"/>
              <p className="follow-text">{location}</p>
            </div>
          </div>
        </div>
        <div className="repos-div">
          <div className="repos-title">
            <div className="title-b1">
              <img src="https://img.icons8.com/ios-filled/50/ffffff/repository.png" alt="repository-logo"/>
              <h2 className="name">Repositories</h2>
            </div>
            <div className="title-b1">
             {userRepos.length >= 5 
              ? <p className="nrepos">{`5 of ${userRepos.length}`}</p> 
              : <p className="nrepos">{`${userRepos.length} of ${userRepos.length}`}</p> 
             }
            </div>
          </div>
          <div className="repos-control">
            {[...userRepos.sort((a, b) => b.stargazers_count - a.stargazers_count)].map((repo, index) => index < 5 
              ? <a  key={index} href={repo.html_url} target="_blank" className="repo-link" rel="noreferrer">
                  <div className="repo-div">
                    <div className="repo-name"><h3>{repo.name}</h3></div>
                    <div className="repo-full-name"><p>{repo.full_name}</p></div>
                    <div className="repo-fork">
                      <img src="https://img.icons8.com/material-rounded/18/ffffff/code-fork.png" alt="fork-logo"/>
                      {repo.forks}
                    </div>
                    <div className="repo-star">
                    <img className="star" src="https://img.icons8.com/ios/16/ffffff/star--v1.png" alt="star-logo"/>
                      {repo.stargazers_count}
                    </div>
                  </div>
                </a>
              : ''
            )}
          </div>
          <div className="buttons-div">
            <Link to="/" onClick={() => clean()}><button className="home">Home</button></Link>
            <a href={html_url} target="_blank" rel="noreferrer"><button className="github">GitHub</button></a>
          </div>
        </div>
      </div>
    );
  }
}
 
const mapStateToProps = (state) => ({
  userInfo: state.reducer.userInfo,
  userRepos: state.reducer.userRepos,
})

const mapDispatchToProps = (dispatch) => ({
  clean: () => dispatch(cleanAction()),
  fetchUser: (user) => dispatch(fetchAPIbyUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps) (Details);