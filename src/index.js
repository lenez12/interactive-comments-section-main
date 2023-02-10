import "../css/reset.css";
import "../css/styles.css";

const {
	commentCardComponent,
	commentFormComponent,
	replyComentFormComponent,
} = require("./app/Components");
const {
	deleteComment,
	deleteReplyComment,
	updateReplyComment,
	saveComment,
} = require("./app/Controller");
const { getCommentData } = require("./app/Data");
const { generateRandomInteger } = require("./app/Utils");

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
		let commentCardData = { item, currentUser: data.currentUser };
		commentCard.innerHTML = commentCardComponent(commentCardData);
		mainContainer.insertBefore(commentCard, formCommentSection);

		let comment = mainContainer.querySelector(`#comment-${item.id}`);

		//create comment reply form
		let commentReplyForm = document.createElement("section");
		commentReplyForm.classList.add("reply_form");
		commentReplyForm.innerHTML = replyComentFormComponent(commentCardData);

		// Render Replies Comment form
		let repliesComment = comment.querySelector(`.comment_replies`);

		repliesComment.addEventListener("click", (e) => {
			handleReplyCommentForm(e, commentCardData);
		});

		// handle comment button and modal
		let commentBtn = commentCard.querySelector(".comment_btns");
		let modal = commentCard.querySelector(".modal_overlay");
		modal.addEventListener("click", (e) => {
			console.log(e.target);
			if (e.target.name == "modal_cancel") {
				modal.classList.toggle("hide");
			}
			if (e.target.name == "modal_delete") {
				modal.classList.toggle("hide");
				deleteComment(item);
			}
		});
		commentBtn.addEventListener("click", (e) => {
			handleCommentAction({ e, modal, comment, commentCardData });
		});

		item.replies.forEach((reply, index) => {
			let commendRepliesCard = document.createElement("section");
			commendRepliesCard.classList.add("comment");
			commendRepliesCard.id = `reply-comment-${reply.id}`;
			let repliesCommentData = { item: reply, currentUser: data.currentUser };
			commendRepliesCard.innerHTML = commentCardComponent(repliesCommentData);
			repliesComment.appendChild(commendRepliesCard);
			const replyData = { comment: item, reply, currentUser: data.currentUser };
			// handle reply comment button
			let commentReply = repliesComment.querySelector(
				`#reply-comment-${reply.id} `
			);
			handleCommentReplyAction(commentReply, replyData);
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

const handleCommentAction = ({ e, modal, comment, commentCardData }) => {
	if (e.target.name === "btnDelete") {
		modal.classList.toggle("hide");
	}
	if (e.target.name === "btnReply") {
		//create comment reply form
		let commentReplyForm = document.createElement("section");
		commentReplyForm.classList.add("reply_form");
		commentReplyForm.innerHTML = replyComentFormComponent(commentCardData);

		// Render Replies Comment form
		let repliesComment = comment.querySelector(`.comment_replies`);

		repliesComment.appendChild(commentReplyForm);
		e.target.classList.toggle("hide");
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
		} else if (e.target.name == "btnUpdate") {
			let formUpdate = parent.querySelector(".form_edit_comment");
			let btnUpdate = formUpdate.querySelector("button");
			let btnAdmin = parent.querySelector(".btn_admin");
			let allButton = btnAdmin.querySelectorAll(".btn");
			allButton.forEach((btn) => {
				btn.setAttribute("disabled", false);
			});
			let textarea = formUpdate.querySelector("textarea");
			let commentContent = parent.querySelector(".comment_content");
			let replyingToElement = commentContent.querySelector(".replyingTo");
			replyingToElement.remove();
			let content = commentContent;

			textarea.innerHTML = content.innerText;
			formUpdate.classList.toggle("hide");
			commentContent.classList.toggle("hide");

			btnUpdate.addEventListener("click", (e) => {
				let value = textarea.value;
				if (value == "") {
					alert("value cannot empty!");
					return;
				}
				updateReplyComment(replyData, value);
			});
		} else if (e.target.name == "btnReply") {
		}
	});
};

const handleReplyCommentForm = (e, data) => {
	if (e.target.name === "btnSendReply") {
		console.log(data);
		let textarea = e.target.previousElementSibling;
		let replyValue = textarea.value;
		if (replyValue == "") {
			alert("field cannot empty");
			return;
		}
		let commentID = data.item.id;
		let currentUser = data.currentUser;
		let id = generateRandomInteger(10000);

		let localData = localStorage.getItem("comments");
		let localDataJson = JSON.parse(localData);

		const newCommentData = localDataJson.comments.filter((comment) => {
			if (comment.id == commentID) {
				let commentData = {
					id: id,
					content: replyValue,
					createdAt: "2 days ago",
					score: 0,
					replyingTo: data.item.user.username,
					user: currentUser,
				};

				comment.replies.push(commentData);
				return comment;
			} else return comment;
		});
		localDataJson.comments = newCommentData;
		localStorage.removeItem("comments");
		localStorage.setItem("comments", JSON.stringify(localDataJson));
		location.reload();
	}
};

module.exports = {
	handleCommentForm,
	handleCommentAction,
	handleCommentReplyAction,
	handleReplyCommentForm,
};
