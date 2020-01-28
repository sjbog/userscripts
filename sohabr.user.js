// ==UserScript==
// @name       SoHabr comments filter
// @version    1.0
// @match      https://sohabr.net/habr/post/*
// @match      https://sohabr.net/gt/post/*
// @noframes
// @run-at     document-end
// @grant      none
// @author     sjbog
// @license    Mozilla Public License Version 2.0
// ==/UserScript==

"use strict";

const hideClassV3 = "hidden"; // Bootstrap v3
const hideClassV4 = "d-none"; // Bootstrap v4
var sohabrCommentsScoreMin = 5;

var sohabrComments = document.body.querySelectorAll("#comments .comment_body");

for (let comment of sohabrComments) {
  var score = parseCommentScore(comment.querySelector(":scope .score"));
  if (score < sohabrCommentsScoreMin) {
    comment.classList.add(hideClassV3, hideClassV4);
  }
}

function parseCommentScore(elem) {
  if (!elem) return 0;
  var score = Number.parseInt(elem.innerText, 10);
  return Number.isFinite(score) ? score : 0;
}
