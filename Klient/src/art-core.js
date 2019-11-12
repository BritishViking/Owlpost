// @flow
export class ArtMeta {
    author: string;
    headline: string;
    date: Date;
    imgsrc: string;
    imgalt: string;
    imgdesc: string;
    id: number;

    constructor(id: number, author: string, headline: string, imgsrc: string, imgalt: string, imgdesc: string, date: Date ) {
        this.id = id;
        this.imgsrc = imgsrc;
        this.imgalt = imgalt;
        this.imgdesc = imgdesc;
        this.headline = headline;
        this.date = date;
        this.author = author;
    }
}
export class Comment {
    poster: string;
    date: Date;
    content: string;
    profile: string;

    constructor(poster: string, date: Date, content: string, profile: string){
        this.poster = poster;
        this.content = content;
        this.date = date;
        this.profile = profile;
    }

}
export class ArtBody extends ArtMeta{
    comments: Comment[];
    body: string;

    constructor(id: number, author: string, headline: string, imgsrc: string, imgalt: string, imgdesc: string, date: Date, body: string, comments: Comment[] ) {
        super(id, author,headline,imgsrc,imgalt, imgdesc, date);
        this.body = body;
        this.comments = comments;
    }

}

export class DateParser{
    static getFullDateTime(date: Date){
        console.log("DateParer Called");
        let day = date.getDate();
        if(day<10){
            day = '0' + day;
        }

        let month = (date.getMonth() + 1);
        if(month<10){
            month = '0' + month;
        }

        let year = date.getFullYear();

        let hour = date.getHours();
        if(hour<10){
            hour = '0' + hour;
        }


        let min = date.getMinutes();
        if(min<10){
            min = '0' + min;
        }

        return(day+"/"+month+"/"+year+" " + hour+":"+ min)
    }
}

