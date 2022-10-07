const commentCardComponent = ({ item, currentUser }) => {
	let isCurrentUser =
		item.user.username == currentUser.username
			? '<span class="header_identity mr-0">you</span>'
			: "";

	let isReplyingTo = item.replyingTo
		? `<span class="replyingTo">${item.replyingTo}</span>`
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
							<h2 class="header_title mr-0">${item.user.username}</h2>
							${isCurrentUser}
							<h3 class="header_subtitle">${item.createdAt}</h3>
						</div>
					</header>
					<div class="card_main flex">
						<p class="comment_content">
						${isReplyingTo}${item.content}
						</p>
						<form name="form_edit_comment " class="form_edit_comment card_main flex hide">
							<textarea
								name="form_edit_field"
								rows="4"
								placeholder="Add Comment . . ."
							></textarea>
							<button class="btn btn_contained btn_send" type="button">
								Update
							</button>
						</form>
					</div>
					<div class="vote_counter">
						<div class="counter flex">
							<button class="btn info" type="button" name="plusBtn">+</button>
							<span class="counter_text">${item.score}</span>
							<button class="btn info" type="button" name="minBtn">-</button>
						</div>
					</div>
					<div class="comment_btns">${
						!isCurrentUser
							? `
                         <button class="btn info p-0" type="button" name="btnReply">
							<i class="fa-solid fa-reply btn_icon"></i>Reply
						</button>`
							: `
						
						<div class="btn_admin ">
							<button class="btn danger p-0 btnDelete" type="button" name="btnDelete">
								<i class="fa-solid fa-trash btn_icon"></i>Delete
							</button>
							<button class="btn info p-0" type="button" name="btnUpdate">
								<i class="fa-solid fa-pencil btn_icon"></i>Update
							</button>
						</div>
                        `
					}</div>
				</article>
				<div class="comment_replies">
                
                </div>
                <section class="modal_overlay hide">
					<article class="modal grid">
						<h2 class="modal_title">Delete comment</h2>
						<p class="modal_description">
							Are you sure you want to delete this comment ? This wil remove the
							comment and cant't be undone.
						</p>
						<footer class="modal_action flex">
							<button
								class="btn btn_contained btn_default bg-gray"
								type="button"
								name="modal_cancel"
							>
								NO, CANCEL
							</button>
							<button
								type="button"
								name="modal_delete"
								class="btn btn_contained bg-red btn_default"
							>
								YES, DELETE
							</button>
						</footer>
					</article>
			</section>
    `;
};

const commentFormComponent = (currentUser) => {
	return `
				<form class="comment_form card grid" id="comment_form">
					<img
						src="${currentUser.image.webp}"
						alt=""
						class="avatar"
					/>
					<label for="comment_field" class="hide">Comment</label>
					<textarea
						id="comment_field"
						name="comment_field"
						rows="4"
						placeholder="Add a comment..."
					></textarea>

					<button
						type="button"
						name="btnSend"
						class="btn btn_contained btn_send"
					>
						Send
					</button>
				</form>`;
};

const replyComentFormComponent = ({ item, currentUser }) => {
	return `
                     <!-- FORM REPLY COMMENT -->
						<form
							class="reply_comment_form comment_form card grid"
							name="reply_comment_form"
						>
							<img
						    	src="${currentUser.image.webp}"
								alt=""
								class="avatar"
							/>
							<label for="comment_field" class="hide">Comment</label>
							<textarea
								name="comment_field"
								rows="3"
								placeholder="Add a comment..."
							></textarea>

							<button
								type="button"
								name="btnSendReply"
								class="btn btn_contained btn_send"
							>
								Reply
							</button>
						</form>
					
    `;
};
