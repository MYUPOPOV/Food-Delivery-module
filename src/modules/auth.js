const auth = () => {
	/* инкапсляция auth.js */

	const buttonAuth = document.querySelector(".button-auth"); // Кнопка войти
	const modalAuth = document.querySelector(".modal-auth"); // Модальное окно: авторизация
	const buttonOut = document.querySelector(".button-out"); // Кнопка выйти
	const userName = document.querySelector(".user-name"); // Отображение имени юзера
	const closeAuth = document.querySelector(".close-auth"); // Крестик выхода из окна авторизации
	const logInForm = document.getElementById("logInForm"); // Форма авторизации логин/пароль <form id="logInForm">
	const inputLogin = document.getElementById("login"); // input login
	const inputPassword = document.getElementById("password"); // input password
	const buttonCart = document.querySelector(".button-cart"); // Кнопка корзина

	/* Функция: залогиниться */
	const login = (user) => {
		buttonAuth.style.display = "none"; // Убрать кнопку Войти
		buttonOut.style.display = "flex"; // Показать кнопку Выйти
		userName.style.display = "flex"; // Показать имя пользователя
		userName.textContent = user.login;
		modalAuth.style.display = "none"; // Убрать модальное окно авторизации
		buttonCart.style.display = "flex"; // Показать кнопку Корзины
	};

	/* Функция: разлогиниться */
	const logout = () => {
		buttonAuth.style.display = "flex"; // Показать кнопку Войти
		buttonOut.style.display = "none"; // Убрать кнопку Выйти
		userName.style.display = "none"; // Убрать имя пользователя
		userName.textContent = ""; // Очистить имя пользователя
		localStorage.removeItem("user"); // Очистить localStorage  User
		buttonCart.style.display = "none"; // Убрать кнопку Корзина
	};

	/* Обработчик события: при клике на кнопу Войти: */
	buttonAuth.addEventListener("click", () => {
		modalAuth.style.display = "flex"; // появляется модальное окно  (display = "flex")
	});

	/* Обработчик события: при клике на кнопу Выйти:  */
	buttonOut.addEventListener("click", () => {
		logout(); // Функция: разлогиниться
		window.location.href = "./index.html"; // Перебрасывает на главную страницу
	});

	/* Обработчик события: при клике на крестик модального окна авторизации:  */
	closeAuth.addEventListener("click", () => {
		modalAuth.style.display = "none"; // исчезнет модальное окно  (display = "flex")
	});

	/* Обработчик события: при Событии: submit (кнопка type="submit" или Enter):  */
	logInForm.addEventListener("submit", (event) => {
		event.preventDefault(); // Отмена действия браузера по умолчанию
		const user = {
			// Собираем объект логин/пароль
			login: inputLogin.value,
			password: inputPassword.value,
		};
		localStorage.setItem("user", JSON.stringify(user)); // Записываем в localStorage под ключом user
		login(user); // Функци: залогиниться
	});

	/* Если в localStorage уже есть запись под ключом user, то логинимся автоматически при входе под этим пользователем */
	if (localStorage.getItem("user")) {
		login(JSON.parse(localStorage.getItem("user")));
	}
};

export default auth;
