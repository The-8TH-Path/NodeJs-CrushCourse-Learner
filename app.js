const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const { render } = require('ejs');

// express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://node-netninja:nodenetninja@nodestudent01.l0bylza.mongodb.net/node-netninja?retryWrites=true&w=majority&appName=AtlasApp';
mongoose.connect(dbURI, { useNEWUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// regsiter view engines
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// mongoose and mongo sandbox route
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new Blog 2',
        snippet: 'About my new Blog',
        body: 'more about my new blog'
    });

    blog.save()
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err);
    });
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    })
});

app.get('/single-blog', (req, res) => {
    Blog.findById('650d548762396493b2a7ed9f')
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        console.log(err);
    })
});

app.use((req, res, next) => {
    console.log('new request made: ');
    console.log('host: ', req.hostname);
    console.log('path: ', req.path);
    console.log('method: ', req.method);
    next();
});

// route
app.get('/', (req, res) => {
    // res.send('<p>home page</p>');
    // res.sendFile('./views/index.html', {root: __dirname });
    // const blogs = [
    //     { title: 'Blog1', snippet: 'Blog1 Content'},
    //     { title: 'Blog1', snippet: 'Blog2 Content'},
    //     { title: 'Blog1', snippet: 'Blog3 Content'}
    // ];
    // res.render('index', { title: 'Home', blogs });
    res.redirect('/blogs');
});

app.use((req, res, next) => {
    console.log('in the next middleware: ');
    next();
});

app.get('/about', (req, res) => {
    // res.send('<p>about page</p>');
    // res.sendFile('./views/about.html', {root: __dirname });
    res.render('about', { title: 'About' });
});

// blog route
app.use('/blogs' ,blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});