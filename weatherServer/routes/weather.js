var express = require ('express')
let router = express.Router()
var mongoose = require ('mongoose')
var bodyParser = require ('body-parser')


let db = 'mongodb://localhost/weather'
mongoose.connect(db)

var weth = require ('../model/weatherSchema')


router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
	extended: true
}))



//Find All Employees
router.get('/find', (req, res) => {

  weth.find((err, emp) => {
    if(err)
      res.send("error has occured while finding")
    else
    {
  
      res.json(emp)
    }
  });
})

router.get('/findByDate/:date', (req, res) => {
  weth.findOne({date: req.params.date}, (err, we) => {
    if(err)
      res.send("error has occured while finding")
    else
    {
      res.json(we)
    }
  });
})

//Insert New Employees
router.post('/add', (req, res) => {
	let weather = new weth()
       
weather.name = req.body.name,
weather.country = req.body.country,
weather.date = req.body.date,
weather.max = req.body.max,
weather.min = req.body.min,
weather.condition = req.body.condition,
weather.img = req.body.img,

	weather.save((err, we) => {
		if(err)
			res.send('error saving weather')
		else
		{
			res.json(we)
		}
	})
})

//Find Employee By Id and Update
router.put('/update/:date', (req, res) => {
  weth.update({
  	date: req.params.date
  }, { $set: 
  	{min: req.body.min,
    max: req.body.max,
    condition: req.body.condition}}, 
  	{upsert: true},
  	(err, empp) => {
  		if(err)
  			throw err
  		else
  		{
  			res.json(empp)
  		}
  })
})


//Delete Employee By Id
router.delete('/delete/:date', (req, res) => {
  weth.remove({
  	date: req.params.date
  }, (err, empp) => {
  		if(err)
        throw err
  			//
  		else
  		{
  			res.json(empp)
  		}
  })
})

/*// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})*/

/*app.all('/secret', function (req, res, next) {
   console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from B!')
})*/

/*app.get('/users/:userId/books/:bookId', function (req, res) {
  res.send(req.params)
})*/

/*app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })*/

module.exports = router
