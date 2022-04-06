const message = document.querySelector('.message');
const addGarmetBtn = document.querySelector('.addGarmentBtn');
const hideAddGarmetBtn = document.querySelector('.hideAddGarmetBtn');
const addGarmetSection = document.querySelector('.add.garment');
const addGarmetButtonSection = document.querySelector('.add.button');

function showMessage(value) {
	message.innerHTML = value;
	message.classList.toggle('hidden');

	setTimeout(() => {
		message.innerHTML = '';
		message.classList.toggle('hidden');
	}, 4000);
}

function toggleAddGarmetScreen() {
	addGarmetSection.classList.toggle('hidden');
}

hideAddGarmetBtn.addEventListener('click', function (event) {
	toggleAddGarmetScreen()
});

const fieldManager = FieldManager({
	'description': '',
	'img': '',
	'season': '',
	'gender': '',
	'price': 0.00
});

addGarmetBtn.addEventListener('click', function (event) {
	
	
	const fields = fieldManager.getValues();

	axios
		.post('/api/garments', fields)
		.then(result => {
			if (result.data.status == 'error') {
				showMessage(result.data.message);
			} else {
				toggleAddGarmetScreen();
				
				showMessage(result.data.message);
				fieldManager.clear();
				
				filterData();
			}
		})
		.catch(err => {
			showMessage(err.stack)
		});
});

addGarmetButtonSection.addEventListener('click', function (event) {
	event.preventDefault();
	toggleAddGarmetScreen()
});
