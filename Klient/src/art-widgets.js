// @flow


import { NavLink} from 'react-router-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import {ArtMeta, Comment} from '../src/art-core.js';
import {DateParser} from "../src/art-core";

type ArtboxProps = {
    art: ArtMeta
};
export class Artbox extends Component<ArtboxProps>{
    render(){
        var img = "";
        if(this.props.art.imgsrc){
           img =  <img src={this.props.art.imgsrc} className="card-img-top" alt={this.props.art.imgalt}/>
        }




        return(
            <div className="card card-link-m">
                {img}
                <div className="card-body">
                    <h5 className="card-title">{this.props.art.headline}</h5>
                    <p className="card-text">{DateParser.getFullDateTime(this.props.art.date)}</p>
                </div>
                <NavLink to={'/article/' + +this.props.art.id} className="stretched-link"></NavLink>
            </div>
        )
    }
}


export class Commentbox extends Component<{comt: Comment}>{
    render() {
        return (
            <div className="comment-grid-container-m">
                <div className="comments-img-m"><img src={this.props.comt.profile} alt="Commenter"/></div>
                <div className="comments-name-m"><p><b>{this.props.comt.poster}</b></p> { DateParser.getFullDateTime(this.props.comt.date)}</div>
                <div className="comments-content-m">{this.props.comt.content}</div>
            </div>
        );
    }
}