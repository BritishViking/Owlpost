// @flow
// import ReactDOM from 'react-dom';
 import {Redirect} from 'react-router-dom';
import * as React from 'react';
import { NavLink} from 'react-router-dom';
import { Component } from 'react-simplified';
import {ArtBody, Comment, DateParser} from '../src/art-core.js';
import {Commentbox} from "./art-widgets";
import {ArticleService} from "./ArticleService";




export class ViewArticle extends Component<{ match: { params: { id: number } } }>{

    constructor(){
        super();
        this.state = {
            art: ArtBody,
        }
    }

    componentDidMount(){



        this.setState({
            art: new ArtBody(-1, undefined,undefined,undefined,undefined,undefined,new Date("12-12-2019 12:00"),undefined,undefined)
        });
        ArticleService.getArticle(this.props.match.params.id)
            .then(data => data[0])
            .then((data) => {

                this.setState({
                    art: new ArtBody(data.id, data.author, data.overskrift, data.bildesti, data.imgalt, data.imgdesc, new Date("12-12-2019 12:00"), data.innhold, undefined)
                });
                console.log(data)
            })

    }
    render(){
        console.log("Article ID: "+ this.props.match.params.id);


        let body = "There was a new crisis today as all eagals in the world attacked the scared  citizens of earth fled from the horror. All leaders in the world have been arrested and is in jail. I am typing this as the eagle troops storms our headquarters. Hide humanity! And when we have organized ourselves, we will return and take back what is rightfully ours! Vive la homo sapiens!";
        let date = new Date("2016-03-09 08:02");
        // TODO make db call to get full article
            let art  =  this.state.art;


            if(art.id !== -1) {
                let comDate = new Date("2016-03-09 09:03");
                let comt = [
                    new Comment("Karianne Kariannedottir", comDate, "OMG noo i dont want to die" , "testRes/profPic.png"),
                    new Comment("Kalvin Klein", comDate, "I for one welcome our new eagle overlords", "testRes/profPic.png"),
                    new Comment("Bob Burger the third", comDate, "This article is stupid", "testRes/profPic.png"),
                ];

                art.comments = comt;
                return (

                    <div className="container">

                        <h1>{art.headline}</h1>

                        <img src={art.imgsrc} alt={art.imgalt}/>
                        <div className="img-text-m">
                            {art.imgdesc}
                        </div>
                        <div className="container-m">
                            <div className="art-content-m">
                                <div className="art-body-m">
                                    {art.body}
                                </div>
                                <div className="comments-container-m">
                                    <Commentbox comt={art.comments[0]}/>
                                    <Commentbox comt={art.comments[1]}/>
                                    <Commentbox comt={art.comments[2]}/>
                                    <br/>
                                </div>
                            </div>
                            <div className="settings-content-m">
                                <div>
                                    <a href={'#/article/' + +art.id + '/edit'} className="btn btn-secondary btn-dark"
                                       role="button"
                                    >Edit article</a>
                                    <br/> <br/> <br/> <br/>
                                    <p><b> - Author - </b></p>
                                    <p>{art.author}</p>
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }else{
                return(<div></div>)
            }
    }
}
export class EditArticle extends Component<{ match: { params: { id: number } } }>{
    art =  new ArtBody();
    head = "";

    constructor(){

        super();

        this.state = {
            art: ArtBody,
        }
    }

    componentDidMount(){

        this.setState({
            art: new ArtBody(-1, undefined,undefined,undefined,undefined,undefined,new Date("12-12-2019 12:00"),undefined,undefined)
        });
        ArticleService.getArticle(this.props.match.params.id)
            .then(data => data[0])
            .then((data) => {
                this.art = new ArtBody(data.id, data.author, data.overskrift, data.bildesti, data.imgalt, data.imgdesc, new Date("12-12-2019 12:00"), data.innhold, undefined);
                console.log(data);
            })

    }

    render() {
        if(this.state.art !== -1) {
            return (
                <div>
                    <form style={{margin: 10 + 'px'}}>
                        <p>Headline</p>
                        <textarea

                            value={this.art.headline}
                            style={{width: 30 + '%', height: 60 + 'px'}}
                            onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.art.headline= event.target.value)}
                        />
                        <p>Body</p>
                        <textarea

                            value={this.art.body}
                            style={{width: 50 + '%', height: 100 + 'px'}}
                            onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.art.body = event.target.value)}
                        />
                        <p>Desc</p>
                        <input
                            type="text"
                            value={this.art.imgdesc}
                            onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.art.imgdesc = event.target.value)}
                        />

                        <p>Img alt</p>
                        <input
                            type="text"
                            value={this.art.imgalt}
                            onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.art.imgalt = event.target.value)}
                        />
                        <br/> <br/>
                        <button type="button" className="btn btn-dark" onClick={this.save}>Save</button>
                    </form>
                </div>
            );
        }else{
            return (<div>n</div>)
        }
    }

    // Initialize component state (firstName, lastName, email) when the component has been inserted into the DOM (mounted)
   /* mounted() {

        // TODO get article
        let comDate = new Date("2016-03-09 09:03");
        let comt = [
            new Comment("Karianne Kariannedottir", comDate, "OMG noo i dont want to die" , "testRes/profPic.png"),
            new Comment("Kalvin Klein", comDate, "I for one welcome our new eagle overlords", "testRes/profPic.png"),
            new Comment("Bob Burger the third", comDate, "This article is stupid", "testRes/profPic.png"),
        ];
        let body = "There was a new crisis today as all eagals in the world attacked the scared  citizens of earth fled from the horror. All leaders in the world have been arrested and is in jail. I am typing this as the eagle troops storms our headquarters. Hide humanity! And when we have organized ourselves, we will return and take back what is rightfully ours! Vive la homo sapiens!";
        let date = new Date("2016-03-09 08:02");
        let art  = new ArtBody(1, "Maria McCulloch", "Eagles attack human society, imposes new leadership on entire globe", "testRes/eagles.jpg", "orner", "An eagle sores above, asserting to all humans its new leadership", date, body, comt)

        if (!art) {
           //TODO  Alert.danger('Student not found: ' + this.props.match.params.id);
            return;
        }

        this.art = art;
    }*/
    save(){

        console.log(this.art);
        ArticleService.editArticle(this.art);
       // window.open("/article/"+this.art.id);
        this.props.history.push('/article/' + this.art.id);

    }
}

export class NewArticle extends Component<{ match: { params: { id: number } } }>{
    art =  new ArtBody();

    render() {
        return (
            <div>
                <form style={{margin: 10 + 'px'}}>
                    <p>Headline</p>
                    <textarea

                        value={this.art.headline}
                        style={{width: 30 +'%', height: 60 + 'px'}}
                        onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.art.headline = event.target.value)}
                    />
                    <p>Body</p>
                    <textarea

                        value={this.art.body}
                        style={{width: 50 +'%', height: 100 + 'px'}}
                        onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.art.body = event.target.value)}
                    />
                    <p>Desc</p>
                    <input
                        type="text"
                        value={this.art.imgdesc}
                        onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.art.headline = event.target.value)}
                    />

                    <p>Img alt</p>
                    <input
                        type="text"
                        value={this.art.imgalt}
                        onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.art.imgalt = event.target.value)}
                    />
                    <p>Author</p>
                    <input
                        type="text"
                        value={this.art.author}
                        onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.art.author = event.target.value)}
                    />
                    <br/>  <br/>
                    <button type="button" className="btn btn-dark" onClick={this.save}>Save</button>
                </form>
            </div>
        );
    }

    // Initialize component state (firstName, lastName, email) when the component has been inserted into the DOM (mounted)

    save(){

        // date img
        // TODO save article
        // TODO redirect to new article
        console.log(this.ar);
    }
}
