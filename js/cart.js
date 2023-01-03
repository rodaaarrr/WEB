const productsBtn = document.querySelectorAll('.product__btn');
const cartProductsList = document.querySelector('.cart-content__list');
const cart = document.querySelector('.cart');
const cartQuantity = cart.querySelector('.cart__quantity');
const fullPrice = document.querySelector('.fullprice');
const orderModalOpenProd = document.querySelector('.order-modal__btn');
const orderModalList = document.querySelector('.order-modal__list');
const Full = document.querySelector('#fullprice');
let price = 0;
let productArray = [];

const randomId = () => {
	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const priceWithoutSpaces = (str) => {
	return str.replace(/\s/g, '');
};

const normalPrice = (str) => {
	return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const plusFullPrice = (currentPrice) => {
	return price += currentPrice;
};

const minusFullPrice = (currentPrice) => {
	return price -= currentPrice;
};

const printQuantity = () => {
	let productsListLength = cartProductsList.querySelector('.simplebar-content').children.length;
	cartQuantity.textContent = productsListLength;
	productsListLength > 0 ? cart.classList.add('active') : cart.classList.remove('active');
};

const printFullPrice = () => {
	fullPrice.textContent = `${normalPrice(price)} ₽`;
	Full.innerHTML = `${normalPrice(price)} ₽`;
};

const generateCartProduct = (img, title, price, id, elementCountProduct) => {
	return `
    <li class="cart-content__item">
        <article class="cart-content__product cart-product" data-id="${id}">
            <img src="${img}" alt="Стул" class="cart-product__img">
            <div class="cart-product__text">
                <h3 class="cart-product__title">${title}</h3>
                <span class="cart-product__price" data-price="11704">${normalPrice(price)} ₽</span>
				<span class="count__products"> ${elementCountProduct} шт</span>
            </div>
        	<button class="cart-product__delete" aria-label="Удалить товар"></button>
        </article>
    </li>
	`;
}; 


const deleteProducts = (productParent) => {
	let id = productParent.querySelector('.cart-product').dataset.id;
	document.querySelector(`.product[data-id="${id}"]`).querySelector('.product__btn').disabled = false;
	
	let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.cart-product__price').textContent));
	minusFullPrice(currentPrice);
	console.log(currentPrice);
	
	printFullPrice();
	console.log(printFullPrice())
	productParent.remove();

	printQuantity();
};

productsBtn.forEach(el => {
	el.closest('.product').setAttribute('data-id', randomId());

	el.addEventListener('click', (e) => {
		let self = e.currentTarget;
		let parent = self.closest('.product');
		
		let id = parent.dataset.id;
		let img = parent.querySelector('.image-switch__img img').getAttribute('src');
		let title = parent.querySelector('.product__title').textContent;
		let priceString = priceWithoutSpaces(parent.querySelector('.product-price__current').textContent);
		let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.product-price__current').textContent))

		var elementCountProduct = parent.querySelector('.items__current').textContent;
	
		plusFullPrice(elementCountProduct * priceNumber);

		printFullPrice();

		const priceWithCount = elementCountProduct * priceNumber;

		cartProductsList.querySelector('.simplebar-content').insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceWithCount, id, elementCountProduct));
		printQuantity();

		
		self.disabled = true;
	});
});

cartProductsList.addEventListener('click', (e) => {
	if (e.target.classList.contains('cart-product__delete')) {
		deleteProducts(e.target.closest('.cart-content__item'));
	}
});

let flag = 0;
orderModalOpenProd.addEventListener('click', (e) => {
	if (flag == 0) {
		orderModalOpenProd.classList.add('open');
		orderModalList.style.display = 'block';
		flag = 1;
	} else {
		orderModalOpenProd.classList.remove('open');
		orderModalList.style.display = 'none';
		flag = 0;
	}
});

const generateModalProduct = (img, title, price, id, elementCountProduct) => {
	return `
		<li class="order-modal__item">
			<article class="order-modal__product order-product" data-id="${id}">
				<img src="${img}" alt="" class="order-product__img">
				<div class="order-product__text">
					<h3 class="order-product__title">${title}</h3>
					<span class="order-product__price">${normalPrice(price)}</span>
					<span class ="count__products"> ${elementCountProduct} </span>

				</div>
				<button class="order-product__delete">Удалить</button>
			</article>
		</li>
	`;
};

const modal = new GraphModal({
	isOpen: (modal) => {
		console.log('opened');
		let array = cartProductsList.querySelector('.simplebar-content').children;
		let fullprice = fullPrice.textContent;
		let length = array.length;

		//document.querySelector('.order-modal__quantity span').textContent = `${length} шт`;
		document.querySelector('.order-modal__summ span').textContent = `${fullprice}`;
		for (item of array) {
			console.log(item)
			let img = item.querySelector('.cart-product__img').getAttribute('src');
			let title = item.querySelector('.cart-product__title').textContent;
			let priceString = priceWithoutSpaces(item.querySelector('.cart-product__price').textContent);
			let id = item.querySelector('.cart-product').dataset.id;
			let elementCountProduct = item.querySelector('.count__products').textContent;

			orderModalList.insertAdjacentHTML('afterbegin', generateModalProduct(img, title, priceString, id,elementCountProduct));

			let obj = {};
			obj.title = title;
			obj.price = priceString;
			productArray.push(obj);
		}

		console.log(productArray)
	},
	isClose: () => {
		orderModalList.innerHTML = '';
		console.log('closed');
	}
});

document.querySelector('.order').addEventListener('submit', (e) => {
	e.preventDefault();
	let self = e.currentTarget;

	let formData = new FormData(self);
	let name = self.querySelector('[name="Имя"]').value;
	let tel = self.querySelector('[name="Телефон"]').value;
	let mail = self.querySelector('[name="Email"]').value;
	formData.append('Товары', JSON.stringify(productArray));
	formData.append('Имя', name);
	formData.append('Телефон', tel);
	formData.append('Email', mail);
});

document.querySelector('.modal').addEventListener('click', (e) => {
	if (e.target.classList.contains('order-product__delete')) {
		let id = e.target.closest('.order-modal__product').dataset.id;
		let cartProduct = document.querySelector(`.cart-content__product[data-id="${id}"]`).closest('.cart-content__item');
		deleteProducts(cartProduct);
		e.target.closest('.order-modal__product').remove();
	}
	
});
