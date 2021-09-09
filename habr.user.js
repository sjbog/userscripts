// ==UserScript==
// @name       Habr comments filter & enhancements
// @version    1.2.0
// @match      https://habr.com/*/post/*
// @match      https://habr.com/*/company/*/blog/*
// @match      https://habr.com/*/company/*/blog/*/comments
// @noframes
// @run-at     document-idle
// @grant      none
// @author     sjbog
// @license    Mozilla Public License Version 2.0
// @downloadURL https://github.com/sjbog/userscripts/raw/master/habr.user.js
// @homepageURL https://github.com/sjbog/userscripts/
// ==/UserScript==

"use strict";

const hideClassV3 = "hidden"; // Bootstrap v3
const hideClassV4 = "d-none"; // Bootstrap v4
const commentsScoreMin = 6;
const commentsElem = document.getElementsByClassName("tm-article-comments")[0];


const comments = commentsElem.querySelectorAll("article.tm-comment-thread__comment");

function removeCommentsNavigation(commentsElem) {
  commentsElem.querySelectorAll(".tm-comment__buttons, .tm-comment-thread__circle, .tm-comment__button, .tm-comment-footer__button, .tm-comment-thread__button")
    .forEach(elem => elem.remove());
}


function removeComments() {
  for (let comment of comments) {
    let score = parseCommentScore(comment.querySelector(":scope .tm-votes-meter__value"));
    if (score < commentsScoreMin) {
      // comment.classList.add(hideClassV3, hideClassV4);
      comment.remove();
    }
  }
  removeCommentsNavigation(commentsElem)
  removeEmptyCommentNodes(commentsElem, 23)
  replaceSpoilers()
}

setTimeout(removeComments, 1000);

function parseCommentScore(elem) {
  if (!elem) return 0;
  let score = Number.parseInt(elem.innerText, 10);
  return Number.isFinite(score) ? score : 0;
}

function removeEmptyCommentNodes(commentsElem, cycles) {
  for (let i=cycles; i >= 0; i--) {
    commentsElem.querySelectorAll(".tm-comment-thread:empty, .tm-comment-thread__children:empty")
      .forEach(elem => elem.remove());
    commentsElem.querySelectorAll(".tm-comment-thread, .tm-comment-thread__children")
      .forEach(elem => { if (elem.childElementCount == 0) elem.remove() });
  }
}

function replaceSpoilers() {
  // Replace spoilers with HTML5 details/summary
  for (let item of document.getElementsByClassName("spoiler")) {
    let summary = document.createElement("summary");
    summary.textContent = item.getElementsByClassName("spoiler_title")[0].textContent;

    let details = document.createElement("details");
    details.innerHTML = item.getElementsByClassName("spoiler_text")[0].innerHTML;
    details.prepend(summary);

    item.replaceWith(details);
  }
}
