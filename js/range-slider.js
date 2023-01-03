const rangeSlider = document.getElementById('range-slider');

if (rangeSlider) {
	noUiSlider.create(rangeSlider, {
		start: [500, 9000],
		connect: true,
		step: 1,
		range: {
			'min': [500],
			'max': [9000]
		}
	});
	const input0 = document.getElementById('input-0');
	const input1 = document.getElementById('input-1');
	const inputs = [input0, input1];

	const sortedProductListByPrice = (values) => {
		const elements = document.querySelectorAll('.product')
		
		elements.forEach(el => {
			const price = +el.dataset.price

			if (price >= +values[0] && price <= +values[1]) {
				el.parentNode.classList.remove('hide')
			} else {
				el.parentNode.classList.add('hide')
			}
		})
	}

	rangeSlider.noUiSlider.on('update', function(values, handle){
		sortedProductListByPrice(values)
		
		inputs[handle].value = Math.round(values[handle]);
	});

	const setRangeSlider = (i, value) => {
		let arr = [500, 9000];
		arr[i] = value;

		sortedProductListByPrice([arr[0], arr[1]])

		rangeSlider.noUiSlider.set(arr);
	};

	inputs.forEach((el, index) => {
		el.addEventListener('change', (e) => {
			console.log(index);
			setRangeSlider(index, e.currentTarget.value);
		});
	});
}

