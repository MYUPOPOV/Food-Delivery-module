const menu = () => {
	const cardsMenu = document.querySelector(".cards-menu");
	// console.log(cardsMenu);

	const changeTitle = (restaurant) => {
		const restaurantTitle = document.querySelector(".restaurant-title");
		restaurantTitle.textContent = restaurant.name;

		const rating = document.querySelector(".rating");
		rating.textContent = restaurant.stars;

		const price = document.querySelector(".price");
		price.textContent = "От " + restaurant.price + " ₽";

		const category = document.querySelector(".category");
		category.textContent = restaurant.kitchen;

		// console.log(restaurantTitle);
	};

	console.log(cardsMenu);

	const addToCart = (cartItem) => {
		const cartArray = localStorage.getItem("cart")
			? JSON.parse(localStorage.getItem("cart"))
			: [];

		if (cartArray.some((item) => item.id === cartItem.id)) {
			cartArray.map((item) => {
				if (item.id === cartItem.id) {
					item.count++;
				}
				return item;
			});
		} else {
			cartArray.push(cartItem);
		}

		localStorage.setItem("cart", JSON.stringify(cartArray));
	};

	const renderItems = (data) => {
		data.forEach(({ description, id, image, name, price }) => {
			const card = document.createElement("div");
			// console.log(description);
			card.classList.add("card");

			card.innerHTML = `
      
        <img src="${image}" alt="${name}" class="card-image" />
        <div class="card-text">
          <div class="card-heading">
            <h3 class="card-title card-title-reg">${name}</h3>
          </div>

          <div class="card-info">
            <div class="ingredients">
            ${description}
            </div>
          </div>
          <div class="card-buttons">
            <button class="button button-primary button-add-cart">
              <span class="button-card-text">В корзину</span>
              <span class="button-cart-svg"></span>
            </button>
            <strong class="card-price-bold">${price} ₽</strong>
          </div>
        </div>
      </div>

      `;

			// card.querySelector(".button-card-text");
			card.querySelector(".button-card-text").addEventListener("click", () => {
				addToCart({ name, price, id, count: 1 });
			});

			cardsMenu.append(card);
		});
	};

	if (localStorage.getItem("restaurant")) {
		const restaurant = JSON.parse(localStorage.getItem("restaurant"));

		changeTitle(restaurant);

		fetch(`./db/${restaurant.products}`)
			.then((response) => response.json())
			.then((data) => {
				// console.log(data);
				renderItems(data);
			})
			.catch((error) => {
				console.log(error);
			});
	} else {
		window.location.href = "./index.html";
	}
};

export default menu;
