function generateRandomInteger(max) {
	return Math.floor(Math.random() * max) + 1;
}

const resetData = () => {
	let data = localStorage.getItem("comments");
	console.log(JSON.parse(data));

	localStorage.removeItem("comments");
	location.reload();
};
