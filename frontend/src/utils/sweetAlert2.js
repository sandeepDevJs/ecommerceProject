import Swal from "sweetalert2";

export const Toast = Swal.mixin({
	toast: true,
	position: "center",
	timer: 3000,
	timerProgressBar: true,
	width: "100%",
});
