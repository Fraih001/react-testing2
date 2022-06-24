const express = require('express');
const app = express();
const { syncAndSeed, User, Laptop } = require('./db');
const path = require('path');

app.use('/assets', express.static('assets'));
app.use('/dist', express.static('dist'));
app.use(express.json());

app.get('/', (req,res,next) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/users', async(req,res,next)=>{
    try{
    res.status(200).send( await User.findAll())
    } catch(er) {
        next(er);
    }
});

app.get('/api/laptops', async(req,res,next)=> {

    try{
        res.status(200).send( await Laptop.findAll())
        } catch(er) {
            next(er);
        }

    // try{

    //     const userLaptops = await Laptop.findAll( { include: User,
    //         where: { userId: req.params.userId }});
    //         res.status(200).send(userLaptops);

    // } catch(er) {
    //     next(er);
    // }
})

const port = process.env.PORT || 3400;

const init = () => {
    try{
    syncAndSeed();
    app.listen(port, ()=> {
        console.log(`listening on port ${port}`)
    });
    } catch(er){
        console.log(er)
    }
}

init();