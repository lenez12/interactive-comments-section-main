const saveComment = (comment) => {
	let localData = localStorage.getItem("comments");
	let localDataJson = JSON.parse(localData);
	localDataJson.comments.push(comment);
	console.log(localDataJson);
	localStorage.removeItem("comments");
	localStorage.setItem("comments", JSON.stringify(localDataJson));
	location.reload();
};

const deleteComment = (comment) => {
	let commentID = comment.id;
	let localData = localStorage.getItem("comments");
	let localDataJson = JSON.parse(localData);
	let newCommentData = localDataJson.comments.filter(
		(item) => item.id !== commentID
	);
	localDataJson.comments = newCommentData;
	localStorage.setItem("comments", JSON.stringify(localDataJson));
	location.reload();
};

const deleteReplyComment = (data) => {
	let commentID = data.comment.id;
	let repledID = data.reply.id;

	let localData = localStorage.getItem("comments");
	let localDataJson = JSON.parse(localData);
	let newCommentData = localDataJson.comments.map((item) => {
		if (item.id == commentID) {
			let newreply = item.replies.filter((rep) => rep.id != repledID);
			item.replies = newreply;
			return item;
		} else return item;
	});

	console.log(newCommentData);
	localDataJson.comments = newCommentData;
	localStorage.removeItem("comments");
	localStorage.setItem("comments", JSON.stringify(localDataJson));
	location.reload();
};

const updateReplyComment = (data, value) => {
	let commentID = data.comment.id;
	let repledID = data.reply.id;

	let localData = localStorage.getItem("comments");
	let localDataJson = JSON.parse(localData);
	let newCommentData = localDataJson.comments.map((item) => {
		if (item.id == commentID) {
			let newreply = item.replies.filter((rep) => {
				if (rep.id == repledID) {
					console.log(rep);
					rep.content = value;
					return rep;
				} else return rep;
			});
			item.replies = newreply;
			return item;
		} else return item;
	});

	console.log(newCommentData);
	localDataJson.comments = newCommentData;
	localStorage.removeItem("comments");
	localStorage.setItem("comments", JSON.stringify(localDataJson));
	location.reload();
};
