document.addEventListener("DOMContentLoaded", async () => {
	renderComponent();
});

const renderComponent = async () => {
	let data = await getCommentData();
	let mainContainer = document.querySelector(".main");
	let commentForm = document.createElement("section");
	commentForm.classList.add("form");
	commentForm.id = "form-comment-section";
	commentForm.innerHTML = commentFormComponent(data.currentUser);
	let formCommentSection = document.querySelector("#form-comment-section");
	//  Comment
	data.comments.forEach((item, index) => {
		let commentCard = document.createElement("section");
		commentCard.classList.add("comment");
		commentCard.id = `comment-${item.id}`;
		let dataComment = { item, currentUser: data.currentUser };
		commentCard.innerHTML = commentCardComponent(dataComment);
		mainContainer.insertBefore(commentCard, formCommentSection);
		let comment = mainContainer.querySelector(`#comment-${item.id}`);

		// Render Replies Comment
		let repliesComment = comment.querySelector(
			`#comment-${item.id} .comment_replies`
		);

		item.replies.forEach((reply, index) => {
			let commendRepliesCard = document.createElement("section");
			commendRepliesCard.classList.add("comment");
			commendRepliesCard.id = `reply-comment-${reply.id}`;
			let repliesCommentData = { item: reply, currentUser: data.currentUser };
			commendRepliesCard.innerHTML = commentCardComponent(repliesCommentData);
			repliesComment.appendChild(commendRepliesCard);
			const replyData = { comment: item, reply };
			// handle reply comment button
			let commentReply = repliesComment.querySelector(
				`#reply-comment-${reply.id} `
			);
			handleCommentReplyAction(commentReply, replyData);
		});

		// handle comment button
		let commentBtn = commentCard.querySelector(".comment_btns");
		let modal = commentCard.querySelector(".modal_overlay");
		modal.addEventListener("click", (e) => {
			if (e.target.name == "modal_cancel") {
				modal.classList.toggle("hide");
			}
			if (e.target.name == "modal_delete") {
				modal.classList.toggle("hide");
				deleteComment(item);
			}
		});
		commentBtn.addEventListener("click", (e) => {
			handleCommentAction({ e, modal });
		});
	});
	mainContainer.appendChild(commentForm);
	handleCommentForm(data.currentUser);
};

const handleCommentForm = (currentUser) => {
	let id = generateRandomInteger(10000);
	let commentData = {
		id,
		content: "",
		createdAt: "1 month ago",
		score: 0,
		user: currentUser,
		replies: [],
	};
	let commentForm = document.getElementById("comment_form");
	let button = commentForm.getElementsByClassName("btn_send")[0];
	let comment = document.getElementById("comment_field");
	button.addEventListener("click", (e) => {
		commentData.content = comment.value;
		if (comment.value == "") {
			alert("field cannot empy");
			return;
		} else {
			saveComment(commentData);
			commentForm.reset();
		}
	});
};

const handleCommentAction = ({ e, modal }) => {
	if (e.target.name === "btnDelete") {
		modal.classList.toggle("hide");
	}
	if (e.target.name === "btnReply") {
		alert("reply");
	}
};

const handleCommentReplyAction = (parent, replyData) => {
	let replyCommentBtn = parent.querySelector(".comment_btns");
	let replyModal = parent.querySelector(".modal_overlay");
	replyModal.addEventListener("click", (e) => {
		if (e.target.name == "modal_cancel") {
			replyModal.classList.toggle("hide");
		}
		if (e.target.name == "modal_delete") {
			replyModal.classList.toggle("hide");
			deleteReplyComment(replyData);
		}
	});
	replyCommentBtn.addEventListener("click", (e) => {
		if (e.target.name === "btnDelete") {
			replyModal.classList.toggle("hide");
		}
	});
};
