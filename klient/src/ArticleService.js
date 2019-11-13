// @flow


import * as React from 'react';
import { createHashHistory } from 'history';
import {ArtMeta, ArtBody} from "./art-core";
import axios from 'axios';
import {Artbox} from "./art-widgets";


export class ArticleService {
    static getAllHeadlines(){
        return axios.get<Student[]>('/importantHeadlines')
           .then(response => writeData(response.data));


        function writeData(array){
            console.log(array);

            let metas = [];
            if(array){
                for(var i =0; i<array.length; i++){
                    console.log(array[i]);
                    metas.push(new ArtMeta(array[i].id, "ikke vikitg", array[i].headline,  array[i].path, "img", "Et bilde", new Date(array[i].tidspunkt) ));
                }
            }
            return metas;
        }
    }

    static editArticle(art: ArtBody){
        axios.put('/article', {
            headline: art.headline, body: art.body, importance: 1, categoryid: 1, imgsrc: art.imgsrc, rating: art.rating, author: art.author, imgid: art.imgid, imgdesc: art.imgdesc, imgalt: art.imgalt,  idnokkel: art.id
        });
    }


    static getArticle(id: number){
        return axios.get<Object>('article/' + id)
            .then(response => response.data);
    }

    static createArticle(art: ArtBody){
        axios.post("/article", {

        })
    }
}