document.addEventListener("DOMContentLoaded", async () => {
	renderComponent();
});

const renderComponent = async () => {
	let data = await getCommentData();
	let mainContainer = document.querySelector(".main");
	let formCommentSection = document.querySelector("#form-comment-section");

	// Replies Comment
	data.comments.forEach((item, index) => {
		let commentCard = document.createElement("section");
		commentCard.classList.add("comment");
		commentCard.id = `comment-${item.id}`;
		let dataComment = { item, currentUser: data.currentUser };
		commentCard.innerHTML = commentCardComponent(dataComment);
		mainContainer.insertBefore(commentCard, formCommentSection);
		let comment = mainContainer.querySelector(`#comment-${item.id}`);
		let repliesComment = comment.querySelector(".comment_replies");

		// Render Replies Comment
		item.replies.forEach((item, index) => {
			let commendRepliesCard = document.createElement("section");
			commendRepliesCard.classList.add("comment");
			commendRepliesCard.id = `comment-${item.id}`;
			let repliesCommentData = { item, currentUser: data.currentUser };
			commendRepliesCard.innerHTML = commentCardComponent(repliesCommentData);
			repliesComment.appendChild(commendRepliesCard);
		});
	});
};

const commentCardComponent = ({ item, currentUser }) => {
	let isCurrentUser =
		item.user.username == currentUser.username
			? '<span class="header_identity mr-0">you</span>'
			: "";

	return `
				<article class="comment_card card grid">
					<header class="comment_header flex">
						<img
							src="${item.user.image.webp}"
							alt=""
							class="avatar"
						/>
						<div class="header_text flex">
							<h1 class="header_title mr-0">${item.user.username}</h1>
							${isCurrentUser}
							<h2 class="header_subtitle">${item.createdAt}</h2>
						</div>
					</header>
					<main class="card_main flex">
						<p class="comment_content">
						${item.content}
						</p>
						<form name="form_edit_comment " class="card_main flex hide">
							<textarea
								name="form_edit_field"
								id=""
								rows="4"
								placeholder="Add Comment . . ."
							></textarea>
							<button class="btn btn_contained btn_send" type="submit">
								Update
							</button>
						</form>
					</main>
					<div class="vote_counter">
						<div class="counter flex">
							<button class="btn info" type="button" name="plusBtn">+</button>
							<span class="counter_text">${item.score}</span>
							<button class="btn info" type="button" name="minBtn">-</button>
						</div>
					</div>
					<div class="comment_btns">
						<button class="btn info p-0" type="button" name="btnReply">
							<i class="fa-solid fa-reply btn_icon"></i>Reply
						</button>
						<div class="btn_admin hide">
							<button class="btn danger p-0" type="button" name="btnDelete">
								<i class="fa-solid fa-trash btn_icon"></i>Delete
							</button>
							<button class="btn info p-0" type="button" name="btnUpdate">
								<i class="fa-solid fa-pencil btn_icon"></i>Update
							</button>
						</div>
					</div>
				</article>
				<div class="comment_replies"></div>
    `;
};

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
