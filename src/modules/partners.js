const partners = () => {
	const cardsRestourants = document.querySelector(".cards-restaurants"); // Поле с ресторанами

	/* Функция: Рендерим карточки с ресторанами */
	const renderItems = (data) => {
		// Запускаем функцию с JSON файлом из БД (метод fetch)
		data.forEach((item) => {
			// Перебираем JSON (массив объектов)
			const { name, image, price, kitchen, products, stars, time_of_delivery } =
				item; // получаем объект на каждом переборе

			const a = document.createElement("a"); // Создаём в document ссылку - страницу на ресторан
			a.setAttribute("href", "/restaurant.html"); // В атрибут прописываем путь к restaurant.html
			a.classList.add("card"); // добавляем классы
			a.classList.add("card-restaurant");
			a.dataset.products = products; // Получаем в атрибутах data-products="pizza-plus.json"
			// Прописываем html содержимое каждой карточки ресторана с применением интерполяции (в данном коде не применяется)
			a.innerHTML = `
      <img src=${image} alt=${name} />
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">${name}</h3>
          <span class="card-tag tag">${time_of_delivery} мин</span>
        </div>
        <div class="card-info">
          <div class="rating">
          ${stars}
          </div>
          <div class="price">${price}</div>
          <div class="category">${kitchen}</div>
        </div>
      </div>

    `;

			/* Обработчик события: при клике на страницу ресторана:  */
			a.addEventListener("click", (e) => {
				e.preventDefault(); // Отмена действия браузера по умолчанию
				if (localStorage.getItem("user")) {
					// Если пользователь авторизован
					localStorage.setItem("restaurant", JSON.stringify(item)); //то прописываем в localStorage объект item (из массива объектов data c БД)
					window.location.href = "./restaurant.html"; // И сразу переходим на restaurant.html
				} else {
					modalAuth.style.display = "flex"; // Иначе заставляем авторизовываться
				}
			});

			cardsRestourants.append(a); // вставляем полученную ссылку (окно ресторана) в конец cardsRestourants как дочерний элемент
		});
	};

	/* Подгружаем БД с firebase (по умолчанию GET запрос) */
	fetch("https://test1-8606d-default-rtdb.firebaseio.com/db/partners.json")
		.then((response) => response.json()) // Ответ от сервера, получаем объект JSON
		.then((data) => {
			renderItems(data); // Запускаем функцию renderItems с data, которую мы возвращаем из response.json
		})
		.catch((error) => {
			console.log(error); // Если во время запроса появится ошибка, то она улетит в catch
		});
};

export default partners; // Экпоритруем в точку входа
