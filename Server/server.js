var express = require("express");
var mysql = require("mysql");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json()); // for å tolke JSON
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
var pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql.stud.iie.ntnu.no",
    user: "mariakmc",
    password: "QRwsly5A",
    database: "mariakmc",
    debug: false
});





/**
 *  Artikkelbehandlig og spørringer til mysql .-------------------------------------------
 *
 */

// get headlines from MYSQL


// få bestemt artikkel basert på id
app.get('/article/:artId', function (req, res) {
    console.log("Sendte Artikkel Request");

    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling");
            res.json({ error: "feil ved oppkobling" });
        } else {
            console.log("Fikk databasekobling");


            connection.query(
                "SELECT * FROM article LEFT JOIN artimg ON article.id = art_id WHERE article.id = ?;",
                [req.params.artId],
                (err, rows) => {
                    if (err) {
                        console.log(err);

                        res.status(500);
                        res.json({ error: "Feil ved insert" });
                    } else {
                        res.status(200);
                        res.json(rows);
                    }
                }
            );
        }


        connection.release();
    });

});

app.get('/allHeadlines', function (req, res) {
    console.log("Sendte Artikkel Request");

    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling");
            res.json({ error: "feil ved oppkobling" });
        } else {
            console.log("Fikk databasekobling");

            var val =req.body.idnokkel; //[req.body.idnokkel, req.body.navn, req.body.adresse, req.body.alder];
            console.log(val);
            connection.query(
                "SELECT headline, date, article.id, path, imgalt  FROM article  JOIN artimg ON article.id = artimg.art_id",
                val,
                (err, rows) => {
                    if (err) {
                        console.log(err);

                        res.status(500);
                        res.json({ error: "Feil ved insert" });
                    } else {
                        res.status(200);
                        res.json(rows);
                    }
                }
            );
        }

        connection.release();
    });
});




// få de 20 første vikitge artikkel hoder (overskrift, id og tid)
app.get('/importantHeadlines', function (req, res) {
    console.log("Sendte Headlines Request");
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling");
            res.json({ error: "feil ved oppkobling" });
        } else {
            console.log("Fikk databasekobling");

            connection.query(
                "SELECT headline, date, article.id, path, imgalt  FROM article  JOIN artimg ON article.id = artimg.art_id where importance = 1;",

                (err, rows) => {
                    if (err) {
                        console.log(err);
                        res.status(500);
                        res.json({ error: "Feil ved insert" });
                    } else {
                        res.status(200);
                        res.json(rows);
                    }
                }
            );
        }

        connection.release();
    });
});


// oppdater en artikkel

app.put('/article', function (req, res) {
    console.log("Sendte updateArticle Request");
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling");
            res.json({ error: "feil ved oppkobling" });
        } else {
            console.log("Fikk databasekobling");
            console.log(req.body);
            var val = [req.body.idnokkel, req.body.headline, req.body.body, req.body.importance, req.body.categoryid, req.body.rating, req.body.author, req.body.imgid,  req.body.imgsrc,   req.body.imgdesc, req.body.imgalt];

            connection.query(
                "CALL editArticle(?,?,?,?,?,?,?,?,?,?,?)",
                val,

                (err, rows) => {
                    if (err) {
                        console.log(err);
                        res.status(500);
                        res.json({ error: "Feil ved insert" });
                    } else {

                        res.status(200);
                        res.json(rows);
                    }
                }
            );
        }

        connection.release();
    });
});

// slett en artikkel

app.delete('/article', function (req, res) {
    console.log("Sendte updateArticle Request");
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling");
            res.json({ error: "feil ved oppkobling" });
        } else {
            console.log("Fikk databasekobling");
            connection.query(
                "Call deleteArticle(?)", req.body.idnokkel,


                (err, rows) => {
                    if (err) {
                        console.log(err);
                        res.status(500);
                        res.json({ error: "Feil ved insert" });
                    } else {

                        res.status(200);
                        res.json(rows);
                    }
                }
            );
        }

        connection.release();
    });
});
// opprett en artikkel

app.post('/article', function (req, res) {
    console.log("Sendte opprettArticle Request");
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling");
            res.json({ error: "feil ved oppkobling" });
        } else {
            console.log("Fikk databasekobling");
            let d = new Date();

            let timeString = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + " " + d.getHours() + ":" + d.getDay();

            console.log(timeString);

            let val = [req.body.headline, req.body.body, req.body.date, req.body.importance, req.body.categoryid,  req.body.author,   req.body.imgsrc,   req.body.imgdesc, req.body.imgalt];

            connection.query(
                "CALL newArticle(?,?,?,?,?,?,?,?,?)", val,

                (err, rows) => {
                    if (err) {
                        console.log(err);
                        res.status(500);
                        res.json({ error: "Feil ved insert" });
                    } else {

                        res.status(200);
                        res.json(rows);
                    }
                }
            );
        }

        connection.release();
    });
});

// få nyeste artikkel hode

app.get('/freshHeadlines', function (req, res) {
    console.log("Sendte opprettArticle Request");
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling");
            res.json({ error: "feil ved oppkobling" });
        } else {
            console.log("Fikk databasekobling");
            var d = new Date();

            var timeString = d.getFullYear() + "-" + d.getMonth() + "-" + d.getDate() + " " + d.getHours() + ":" + d.getDay();

            connection.query(
                "SELECT headline, date, id, path, imgalt FROM article JOIN artimg on article.id = artimg.art_id WHERE tidspunkt = ? ",timeString,


                (err, rows) => {
                    if (err) {
                        console.log(err);
                        res.status(500);
                        res.json({ error: "Feil ved insert" });
                    } else {

                        res.status(200);
                        res.json(rows);
                    }
                }
            );
        }

        connection.release();
    });
});
//  IKKE ØVIN GREIER /////////////////////////////////////////////////////////////////////////////////////////

app.get('/file', function (req, res, next) {

    res.sendFile('testy.html', {root: __dirname });
})

// sends css doc to client when they ask for it
app.get('/style.css', function(req, res) {
    console.log("Sendte css fil")
    res.sendFile(__dirname + "/" + "style.css");
});

// sends js doc to client when thay ask for it
app.get('/test.js', function(req, res) {
    console.log("Sendte JS fil")
    res.sendFile(__dirname + "/" + "test.js");
});


// send images to client
app.get('/images', function(req, res) {

    console.log("Klienten spurte om bildet: " + req.query.name );
    res.sendFile(__dirname + "/images/" + req.query.name);
});

app.get('/favicon.ico', function(req, res) {
    console.log("Klienten spurte om icon" );
    res.sendFile(__dirname + "/images/favicon.ico");
});


app.get('/reg.html', function (req, res, next) {
    console.log("whooo2222");
    res.sendFile('reg.html', {root: __dirname });
})

// listens to port 8080
var server = app.listen(4000);
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
/*
var pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql-ait.stud.idi.ntnu.no",
    user: "mariakmc",
    password: "QRwsly5A",
    database: "mariakmc",
    debug: false
});

app.get("/hello", (req, res) => {


    console.log("Fikk request fra klient");
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" });
        } else {
            res.send('Hola Worldo');
        }
    });
});


app.post("/person", (req, res) => {
        console.log("Fekk POST-request fra klienten");
    console.log("Navn: " + req.body.navn);
    pool.getConnection((err, connection) => {
            if (err) {
                console.log("Feil ved oppkobling");
                res.json({ error: "feil ved oppkobling" });
            } else {
                console.log("Fikk databasekobling");

                var val = [req.body.idnokkel, req.body.navn, req.body.adresse, req.body.alder];

                connection.query(
                    "insert into person (id,navn,adresse,alder) values (?,?,?,?)",
                    val,
                    err => {
                        if (err) {
                            console.log(err);
                            8 / 8
                            res.status(500);
                            res.json({ error: "Feil ved insert" });
                        } else {
                            console.log("insert ok");
                            res.send("");
                        }
                    }
                );
            }
    });
});*/




