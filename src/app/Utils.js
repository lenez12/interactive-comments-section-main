const generateRandomInteger = (max) => {
	return Math.floor(Math.random() * max) + 1;
};

const resetData = () => {
	let data = localStorage.getItem("comments");
	localStorage.removeItem("comments");
	location.reload();
};

module.exports = {
	generateRandomInteger,
	resetData,
};
