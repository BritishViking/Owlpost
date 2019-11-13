// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { createHashHistory } from 'history';
import {Artbox} from "./art-widgets";
import {ArticleService} from "./ArticleService"
import {EditArticle, ViewArticle, NewArticle} from "./singleArticle";

// Use history.push(...) to programmatically change path, for instance after successfully saving a student



const history = createHashHistory();
console.log(history.valueOf());

class Menu extends Component{
    render(){
        return(
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark navbar-m">
                    <a className="navbar-brand" href="/">Home</a>

                    <ul className="navbar-nav">
                        <li className="nav-item">

                                <NavLink style={{color: 'black'}} activeStyle={{ color: 'gray' }} to="/newArticle">
                                    New Article
                                </NavLink>

                        </li>

                    </ul>
                </nav>
            </div>
        )
    }
}

class Home extends Component{

    constructor(){
        super();
        this.state = {
            metas: []
        }
    }

    componentDidMount(){
        ArticleService.getAllHeadlines()
            .then((data) => {
                this.setState({
                    metas: data
                });
            })
            .catch(error => console.error(error)); // TODO show user error
    }


    render(){

        let changeMe = 0;
        return(
            <div className="container">
                <div className="card-columns" id="artcontainer">
                    {this.state.metas.map(e=><Artbox key={changeMe++} art={e}/>)}
                </div>
            </div>
        );
    }


}

const root = document.getElementById('root');

if (root)
    ReactDOM.render(
        <HashRouter>
            <Menu/>
            <div>
                <Route exact path="/" component={Home} />
                <Route exact path="/article/:id" component={ViewArticle} />
                <Route exact path="/article/:id/edit" component={EditArticle} />
                <Route exact path="/newArticle" component={NewArticle} />
            </div>
        </HashRouter>,
        root
    );
/*

    <Alert />
    <Menu />
    <Route path="/students" component={StudentList} />
    <Route exact path="/students/:id" component={StudentDetails} />
    <Route exact path="/students/:id/edit" component={StudentEdit} />


 */