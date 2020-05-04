const hbs = require('hbs');
const express = require('express');
const path = require('path');
const forcast = require('./utils/forcast');

const app = express();

//Define paths for express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handle bars engine and views location
// Changing the view engine
app.set('view engine', 'hbs');  

// To change the views directory (From default root to - inside templates)
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDir));

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Home',
        name: 'Chintan'
    });
});

app.get('/about', (req,res)=>{
    res.render('about', {
        name: 'Chintan',
        title: 'About'
    });
})

app.get('/help', (req, res)=> {
    res.render('help',{
        title: "Help",
        name: 'Chintan',
        help: "This is the help page."
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "Did not give the address"
        });
    }

    forcast.forecastFinal(req.query.address,(e,r)=>{
        if(e){
            return res.send({
                error: "Error in the given address",
                errorData: e
            })
        }
        res.send({
            forecast: r,
            address: req.query.address
        })
    });
})

app.get('/products', (req,res) => {
    if (!req.query.search) {
        return res.send({ //When this is returned. The function app.get stops execution
            error: "You must provide a search term"
        })
    }
    //Response cannot be sent more than once, hence we return the response above
    res.send({
        products: []
    })
})

//app.com
//app.com/help
//app.com/about

app.get('/help/*', (req, res)=>{
    res.render('404error', {
        title: '404 error',
        errorMessage: 'help article not found',
        name: 'Chintan'
    })
})

app.get('*', (req, res)=>{
    res.render('404error', {
        title: '404 Error',
        errorMessage: 'Page not found',
        name: 'Chintan'
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000");
});