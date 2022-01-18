import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import serveStatic from 'serve-static';
import passport from 'passport';
import logger from 'morgan';
import session from 'express-session';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Strategy as LocalStrategy } from 'passport-local';
import router from './routes';
import db from './database/db';
import { validatePassword } from './database/users';

const port = process.env.BLOOM_PORT;
export const app = express();

passport.use(new LocalStrategy({
    usernameField: 'user[username]',
    passwordField: 'user[password]',
}, (username, password, done) => {
    db.get("SELECT username, salt, hash FROM users WHERE username = ?", username, (error, result) => {
        if (error || !result) {
            return done(null, false, { message: 'username or password is invalid' });
        }
        if (validatePassword(result, password)) {
            done(null, result);
        } else {
            return done(null, false, { message: 'username or password is invalid' });
        }
    });
}));

app.use(logger('dev'));
app.get('/', (_req, res) => {
    res.redirect('/list/_today');
});
if (process.env.NODE_ENV === "development") {
    app.use(createProxyMiddleware(['/**', '!/api/**'], {
        target: 'http://localhost:3000',
        ws: true,
    }));
} else {
    app.use('/list/*', express.static(__dirname + '/../out/list/[listId].html'));
    app.use(serveStatic(__dirname + '/../out'));
}
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
if (process.env.NODE_ENV === "development") {
    console.log('Running in development mode. CORS is enabled.');
    app.use(cors());
} else {
    console.log('Running in production mode. CORS is disabled.');
}
app.use(session({ secret: process.env.BLOOM_SECRET || 'super_secret', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

app.listen(port, () => console.log(`Bloom server listening on port ${port}!`));