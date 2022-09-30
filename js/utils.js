function generateRandomInteger(max) {
	return Math.floor(Math.random() * max) + 1;
}

const resetData = () => {
	localStorage.removeItem("comments");
	location.reload();
};
