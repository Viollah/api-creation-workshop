const express = require('express');
const { get } = require('express/lib/request');
const app = express();


app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const garments = require('./garments.json');


app.get('/api/garments', function (req, res) {
	const gender = req.query.gender;
	const season = req.query.season;

	const filteredGarments = garments.filter(garment => {
		
		if (gender != 'All' && season != 'All') {
			return garment.gender === gender
				&& garment.season === season;
		} else if (gender != 'All') { 
			return garment.gender === gender
		} else if (season != 'All') { 
			return garment.season === season
		}
		return true;
	});
	
	res.json({ garments: filteredGarments });
});
app.get('/api/garments/price/:price', function(req, res){
	const maxPrice = Number(req.params.price);
	const filteredGarments = garments.filter( garment => {
		
		if (maxPrice > 0) {
			return garment.price <= maxPrice;
		}
		return true;
	});

	res.json({ 
		garments : filteredGarments
	});
});
app.post('/api/garments', (req, res) => {

	
	const {
		description,
		img,
		gender,
		season,
		price
	} = req.body;


	if (!description || !img || !price) {
		res.json({
			status: 'error',
			message: 'Please fill in the empty fields',
		});
	} else {

		garments.push({
			description,
			img,
			gender,
			season,
			price
		});

		res.json({
			status: 'success',
			message: 'New garment added.',
		});
	}

});

const PORT = process.env.PORT || 4017;
app.listen(PORT, function () {
	console.log(`App started on port ${PORT}`)
});

