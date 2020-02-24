// ==UserScript==
// @name       Habr comments filter & enhancements
// @version    1.1.2
// @match      https://habr.com/*/post/*
// @match      https://habr.com/*/company/*/blog/*
// @noframes
// @run-at     document-end
// @grant      none
// @author     sjbog
// @license    Mozilla Public License Version 2.0
// @downloadURL https://github.com/sjbog/userscripts/raw/master/habr.user.js
// @homepageURL https://github.com/sjbog/userscripts/
// ==/UserScript==

"use strict";

const hideClassV3 = "hidden"; // Bootstrap v3
const hideClassV4 = "d-none"; // Bootstrap v4
const commentsScoreMin = 5;
const commentsElem = document.getElementById("comments");

commentsElem.querySelectorAll(".inline-list_comment-nav, .parent_id, .js-form_placeholder, .comment__collapse")
  .forEach(elem => elem.remove());

const comments = commentsElem.querySelectorAll(".comment");

for (let comment of comments) {
  let score = parseCommentScore(comment.querySelector(":scope .js-score"));
  if (score < commentsScoreMin) {
    // comment.classList.add(hideClassV3, hideClassV4);
    comment.remove();
  }
}

function parseCommentScore(elem) {
  if (!elem) return 0;
  let score = Number.parseInt(elem.innerText, 10);
  return Number.isFinite(score) ? score : 0;
}

// Remove empty nodes
for (let i=42; i >= 0; i--) {
  commentsElem.querySelectorAll(".content-list_nested-comments:empty, .content-list__item_comment:empty")
    .forEach(elem => elem.remove());
  commentsElem.querySelectorAll(".content-list_nested-comments, .content-list__item_comment")
    .forEach(elem => { if (elem.childElementCount == 0) elem.remove() });
}

// Replace spoilers with HTML5 details/summary
for (let item of document.getElementsByClassName("spoiler")) {
  let summary = document.createElement("summary");
  summary.textContent = item.getElementsByClassName("spoiler_title")[0].textContent;
  
  let details = document.createElement("details");
  details.innerHTML = item.getElementsByClassName("spoiler_text")[0].innerHTML;
  details.prepend(summary);
  
  item.replaceWith(details);
}
