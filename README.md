# Frontend Mentor - Interactive comments section

![Design preview for the Interactive comments section coding challenge](./design/desktop-preview.jpg)

## Welcome! 👋

Thanks for checking out this front-end coding challenge.

[Frontend Mentor](https://www.frontendmentor.io) challenges help you improve your coding skills by building realistic projects.

**To do this challenge, you need a strong understanding of HTML, CSS and JavaScript.**

## The challenge

Your challenge is to build out this interactive comments section and get it looking as close to the design as possible.

You can use any tools you like to help you complete the challenge. So if you've got something you'd like to practice, feel free to give it a go.

We provide the data in a local `data.json` file, so use that to populate the content on the first load. If you want to take it up a notch, feel free to build this as a full-stack CRUD application!

Your users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- **Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed.
- **Bonus**: Instead of using the `createdAt` strings from the `data.json` file, try using timestamps and dynamically track the time since the comment or reply was posted.

Want some support on the challenge? [Join our Slack community](https://www.frontendmentor.io/slack) and ask questions in the **#help** channel.

### Expected behaviour

- First-level comments should be ordered by their score, whereas nested replies are ordered by time added.
- Replying to a comment adds the new reply to the bottom of the nested replies within that comment.
- A confirmation modal should pop up before a comment or reply is deleted.
- Adding a new comment or reply uses the `currentUser` object from within the `data.json` file.
- You can only edit or delete your own comments and replies.

### Screenshot

<div style="display:flex; ">
    <img src="./screenshoot/desktop-preview.png"style="height:220px; width:400px; object-fit:cover" />
</div>
<div style="display:flex;">
    <img src="./screenshoot/mobile-preview.png" style="height:400px; width:200px; object-fit:contain" />
</div>

### Links

- Source Code URL: [Source Github](https://github.com/lenez12/loopstudios-landing-page-main.git)
- Live Site URL: [Demo Live](https://lenez-loopstudios.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- JQuery
- JQuery Masking Input

### What I learned

what I learned in making this challenge is:

1. using css grid to create template area
2. using css grid and media query to create responsive mobile
3. manipulate DOM using javascript using looping elemet
4. chage navigation position

### Continued development

1. In the future I will make a good css class naming name
2. add animation and transition when hover and activate

### Useful resources

- [W3Schools](https://www.w3schools.com/howto/howto_css_center-vertical.asp)
- [Reset CSS](https://piccalil.li/blog/a-modern-css-reset/)
- [Event in DOM](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event)
- [Pattern on input](https://www.aleksandrhovhannisyan.com/blog/html-input-validation-without-a-form/)
- [Validation Html DOM](https://dev.to/javascriptacademy/form-validation-using-javascript-34je)
- [Local Storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [querySelector 1](https://www.w3schools.com/jsref/met_document_queryselector.asp)
- [Looping querySelector](https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches/)
- [Modal](https://www.w3schools.com/howto/howto_css_modals.asp)
- [Disabled](https://developer.mozilla.org/en-US/docs/Web/CSS/:disabled)
- [Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

## Author

- Frontend Mentor - [@Lenez](https://www.frontendmentor.io/profile/yourusername)
- Twitter - [@prak_tech](https://www.twitter.com/prak_tech)
