function FieldManager (fields) {

	function getValues() {
		
		Object.keys(fields).forEach(domfield => {
			const fieldElem = document.querySelector(`.${domfield}`);
			const value = fieldElem.value;
			fields[domfield] = value;
		});
		return fields;
	}

	function clear() {
	
		Object.keys(fields).forEach(domfield => {
			const fieldElem = document.querySelector(`.${domfield}`);
			fieldElem.value = '';
		});
		
	}

	return {
		clear,
		getValues
	}
}