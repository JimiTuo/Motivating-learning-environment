/* 

    DOT-projekti: motivoiva oppimisympäristö

    GUI SQLite Databasen hallintaan saatavilla osoitteesta
    https://sqlitebrowser.org/dl/

*/
// Port used by express (default 8080)
var port = 8080;
// Read command-line arguments
process.argv.forEach(function (val, index, array) {
    if (index === 0 || index === 1) {
        /* Ignore node path and script path */
    }
    else if (val === "--expressPort" && !isNaN(array[index + 1])) {
        port = array[index + 1];
        console.log("[Startup] Received argument: " + val + " " + array[index + 1]);
    }
});
// Import SQLite3 support
const sqlite3 = require('sqlite3').verbose();
// Import Express support
const express = require('express');
const app = express();
// Use CORS middleware w/ express
let cors = require('cors');
app.use(cors());
// Use bodyParser w/ express
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Use express-session middleware w/ express -- Used for tracking logins
let session = require('express-session');
let SQLiteStore = require('connect-sqlite3')(session);
let methodOverride = require('method-override');
let cookieParser = require('cookie-parser');
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
    store: new SQLiteStore({
        db: 'sessions.db',
        dir: './db/',
        concurrentDB: true
    }),
    secret: 'xDD8jVp22gbNhTT9zFqqLwr6iiDo0Vaa',
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
    resave: true,
    saveUninitialized: false
}));
app.use(express.static(__dirname + '/client'));

// Import bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

/*console.log("Test password generation");
bcrypt.hash("password_here", saltRounds, function(error, hash) {
    console.log(hash);
});*/

// Load main SQLite database from /db/main.db
let database = new sqlite3.Database('./db/main.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log("[Startup] Connected to disk-based main database file.");
});



/* ---------------------- GET ---------------------- */

/*
    Get all signups for courses
*/
app.get('/courses/getSignups', (req, res) => {
    if (req.session.sid != null) {
        let sql = "SELECT * FROM Signup";
        database.all(sql, (err, rows) => {
            if (err) console.log("[Database] Error: \t" + err);
            //if (rows) console.log(rows);

            if (rows.length > 0) {
                res.jsonp({
                    auth: true,
                    action: "results",
                    data: { rows }
                });
            }
            else {
                res.jsonp({
                    auth: true,
                    action: "message",
                    data: "Kursseja ei löytynyt"
                });
            }
        });
    }
});

/*
    Get userdata (not values for password & admin)
*/
app.get('/courses/getUserdata', (req, res) => {
    if (req.session.sid != null) {
        let sql = "SELECT id, name, displayName, email, exp FROM User WHERE id IS " + req.session.userID;
        database.all(sql, (err, rows) => {
            if (err) console.log("[Database] Error: \t" + err);
            //if (rows) console.log(rows);

            if (rows.length > 0) {
                res.jsonp({
                    auth: true,
                    action: "results",
                    data: { rows }
                });
            }
            else {
                res.jsonp({
                    auth: true,
                    action: "message",
                    data: "Käyttäjiä ei löytynyt"
                });
            }
        });
    }
});


app.get('/loggedIn', (req, res) => {
    if (req.session.sid != null) {
        let sql = "SELECT id, name, displayName, email FROM User";
        database.all(sql, (err, rows) => {
            if (rows.length > 0) {
                res.jsonp({
                    auth: true,
                    data: { rows }
                });
            }
            else {
                res.jsonp({
                    auth: true,
                    data: "ei rivejä"
                });
            }
        });
    }else {
        res.jsonp({
            auth: false,
            data: "Sinulla ei ole tarvittavia käyttöoikeuksia"
        });
    }
});

/*
    "Tilastot"-sivulle 
*/
app.get('/users/getAchievementsForUsers', (req, res) => {
    if (req.session.sid != null) {
        let sql = "SELECT (SELECT displayName FROM User WHERE id IS userId) AS userName," +
        "(SELECT imageHREF FROM Achievements WHERE id IS aId) AS href," + 
        "(SELECT exp FROM User WHERE id IS userId) as exp," +
        "aId, userId FROM UserAchievements " +
        "ORDER BY exp DESC";
        database.all(sql, (err, rows) => {
            if (err) console.log("[Database] Error: \t" + err);
            //if (rows) console.log(rows);  
            
            if (rows.length > 0) {
                res.jsonp({
                    auth: true,
                    action: "results",
                    data: { rows }
                });
            }
            else {
                res.jsonp({
                    auth: true,
                    action: "message",
                    data: "'Achievement' osio tyhjä"
                });
            }
        });
    }
});

/*
    Get all achievements for all users
*/
app.get('/users/getAchievements', (req, res) => {
    if (req.session.sid != null) {
        let sql = "SELECT (SELECT * FROM Achievements)";
        database.all(sql, (err, rows) => {
            if (err) console.log("[Database] Error: \t" + err);
            //if (rows) console.log(rows);  
            
            if (rows.length > 0) {
                res.jsonp({
                    auth: true,
                    action: "results",
                    data: { rows }
                });
            }
            else {
                res.jsonp({
                    auth: true,
                    action: "message",
                    data: "'Achievement' osio tyhjä"
                });
            }
        });
    }
});

/*
    Get all data for tests
*/
app.get('/users/getTests', (req, res) => {
    if (req.session.sid != null) {
        let sql = "SELECT * FROM Test";
        database.all(sql, (err, rows) => {
            if (err) console.log("[Database] Error: \t" + err);
            //if (rows) console.log(rows);  
            
            if (rows.length > 0) {
                res.jsonp({
                    auth: true,
                    action: "results",
                    data: { rows }
                });
            }
            else {
                res.jsonp({
                    auth: true,
                    action: "message",
                    data: "Ei testejä"
                });
            }
        });
    }
});

/*
    Get all data for courses
*/
app.get('/users/getCourses', (req, res) => {
    if (req.session.sid != null) {
        let sql = "SELECT * FROM Course";
        database.all(sql, (err, rows) => {
            if (err) console.log("[Database] Error: \t" + err);
            //if (rows) console.log(rows);  
            
            if (rows.length > 0) {
                res.jsonp({
                    auth: true,
                    action: "results",
                    data: { rows }
                });
            }
            else {
                res.jsonp({
                    auth: true,
                    action: "message",
                    data: "Ei kursseja"
                });
            }
        });
    }
});

/* ---------------------- POST ---------------------- */

// Add user to invite table and send invite email
app.post('/users/addExp', (req,res) => {
    if (req.session.sid != null) {
        //console.log("req", req.body.value);

        let userID = req.session.userID;
        var currExp = 0;
        var addExp = parseInt(req.body.value);

        let sql = "SELECT exp FROM User WHERE id =" + userID;

        database.all(sql, (err, rows) => {
            if (err) console.log("[Database] Error: \t" + err);
            if (rows) console.log(rows);  
            
            currExp = parseInt(rows[0].exp);

            if (rows.length > 0) {
                res.jsonp({
                    auth: true,
                    action: "results",
                    data: { rows },
                });
                console.log("new xp: ", (currExp+addExp));
                database.run('UPDATE User SET exp =' + (currExp+addExp) + ' WHERE id =' + userID, function(err) {
                    if (err) return console.log(err.message);
                    console.log("[Database] Updated");
                    console.log("Tiedot päivitetty");
                });
            }
            else {
                res.jsonp({
                    auth: true,
                    action: "message",
                    data: "Ei kursseja"
                });
            }
        });
    }
});

// Add user to invite table and send invite email
app.post('/users/addAchievement', (req,res) => {
    if (req.session.sid != null) {

        let userID = req.session.userID;
        var aId = parseInt(req.body.aId);
    
        database.run('INSERT INTO UserAchievements VALUES (?, '+ userID +', ' + aId + ')', function(err) {
            if (err) return console.log(err.message);
            console.log("[Database] Updated");
            console.log("Suoritusmerkintä lisätty käyttäjälle " + userID);
        });
    }
});

// When client accesses this URL and params, "login"
app.post('/login', (req, res) => {
    if(req.session.sid != null){ 
        res.jsonp({ auth: true, action: "message", data: "Olet jo kirjautuneena sisään." });
    }else{
        // parameters provided by client
        let email = req.body.email;
        let pass = req.body.pass;
        // sql query template
        let sql = "SELECT * FROM User WHERE email=$email";
        // parameters for sql query template
        let params = {
            $email: email
        };
        //console.log("SQL Params: " + params.$email);
        // perform sql query on connected database and send response based on query result
        database.all(sql, params, (err, rows) => {
            if (err) console.log("[Database] Error: \t" + err);
            //if (rows) console.log(rows);

            if (rows.length > 0) {
                bcrypt.compare(pass, rows[0].password, function (hash_err, hash_resp) { /* Checking index 0 is enough, emails are unique */
                    if (hash_resp) {
                        req.session.sid = email;

                        if (!!rows[0].admin) { // Admin
                            req.session.isAdmin = true;
                            res.jsonp({
                                auth: true,
                                action: "redirect",
                                data: "/maintenance"
                            });
                        }
                        else { // Normal user
                            req.session.userID = rows[0].id;
                            res.jsonp({
                                auth: true,
                                action: "redirect",
                                data: "/events"
                            });
                        }

                        console.log("[Login] New login\t" + JSON.stringify(req.session));
                    }
                    else {
                        res.jsonp({
                            auth: false,
                            action: "message",
                            data: "Virheellinen salasana"
                        });
                        console.log("[Login] Login attempt failed, invalid password.");
                    }
                });
            }
            else {
                res.jsonp({
                    auth: false,
                    action: "message",
                    data: "Virheellinen käyttäjätunnus"
                });
                console.log("[Login] Login attempt failed, incorrect login details");
            }
        });
    }
});

// Log out from session
// Destroys session from session database
app.get('/logout', (req, res) => {
    if (req.session.sid != null) {
        req.session.destroy((err) => {
            if (err) {
                console.log("[Logout] Error:\t" + err);
                res.jsonp({
                    auth: true,
                    action: "error",
                    data: "Error: " + err.message
                });
            }
            else {
                res.jsonp({
                    auth: true,
                    action: "message",
                    data: "Kirjauduttiin ulos onnistuneesti"
                });
                console.log("[Logout] User logged out.");
            }
        });
    }
    else {
        //res.send("Et ole kirjautuneena sisään.");
        res.jsonp({
            auth: false,
            action: "message",
            data: "Et ole kirjautuneena sisään"
        });
    }

});


// Check authorization
// Requires GET variable "type"
// /checkAuth?type=user returns user auth state
// /checkAuth?type=admin returns admin auth state
// Other queries return error
app.get('/checkAuth', (req, res) => {
    res.jsonp({
        auth: (req.session.sid != null),
        adminAuth: (req.session.isAdmin),
        data: req.session.sid
    });
});

// listen on port defined by variable "port" (default 8080)
app.listen(port, '0.0.0.0', () => console.log(`[Startup] Ilmoittautumissovellus server is running on port ${port}! Use http://localhost:${port} to connect.`));