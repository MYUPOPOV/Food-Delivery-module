import Swiper, { Autoplay, Navigation, Pagination } from "swiper";
Swiper.use([Autoplay]);
Swiper.use([Navigation]);
Swiper.use([Pagination]);

//

const slider = () => {
	// console.log("slider");
	const swiper = new Swiper(".swiper", {
		loop: true,
		autoplay: {
			delay: 10000,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
	});
};

export default slider;
