const getCommentData = async () => {
	let data = localStorage.getItem("comments");
	let comments = await getDataFromJson("../data.json");
	if (data) {
		return JSON.parse(data);
	} else {
		localStorage.setItem("comments", JSON.stringify(comments));
		return comments;
	}
};

const getDataFromJson = async (path) => {
	try {
		let response = await fetch(path);
		return response.json();
	} catch (error) {
		throw new Error("Error when fetch data . . .");
	}
};

module.exports = {
	getCommentData,
	getDataFromJson,
};
