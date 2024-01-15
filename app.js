// import express and hbs
const express = require('express');
const hbs = require('hbs');
const session = require('express-session');
hbs.registerPartials(__dirname+'/views/partials');

// import errorHandler, appMiddleware middlewares
const errorHandler = require('./middlewares/errorHandler');
const appMiddleware = require('./middlewares/appmiddleware');
const routes = require('./routes/index');
const { urlencoded } = require('express');

// import express
const app = express();

// set view hbs
app.set('view engine', 'hbs');
app.set('views', __dirname+'/views');

// register static
app.use(express.static(__dirname+'/static'));

// use this middle ware for save cookies information.
app.use(session ({
    secret: 'my secret',
    saveUninitialized: false,
    resave: false,
    cookie: {maxAge: 1000000}
}));

// use this middleware for getting data from singin form
app.use(express.json());
app.use(express. urlencoded({extended:false}));

app.use(appMiddleware.logger); // use middleware for logger
app.use(appMiddleware.authenticated) // any request comes if that is user is loggein it will make sure user object is available in your page. if not loggied in don't do anything.
// app.use(appMiddleware.authenticate); // if you use here it means you can registerd your middlewher at application label.

// routes 
app.get('/', routes.index);

app.get('/projects', routes.projectList);
app.get('/blogs', routes.blogList);
app.get('/login', routes.getLogin);
app.post('/login', routes.doLogin);
app.get('/signup', routes.getSignup);
app.post('/signup', routes.doSignup);
app.get('/contact', routes.contact);
app.post('/contact', routes.doContact);
app.get('/logout', routes.logout);

app.get('/admin/dashboard', appMiddleware.authenticate, routes.admin);
app.get('/admin/projects', appMiddleware.authenticate, routes.adminProjects);
app.get('/admin/projects/:alias', appMiddleware.authenticate, routes.adminProjectDetail);
app.get('/admin/newProject', appMiddleware.authenticate, routes.newProject)


app.get('/projects/:alias', routes.projectDetail)


// use middleware 
app.use(errorHandler.notFound);
app.use(errorHandler.handleError);


app.listen(3000, () => console.log('Server started on port 3000'));