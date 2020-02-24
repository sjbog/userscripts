// ==UserScript==
// @name       Rutor
// @version    1.0.2
// @match      http://rutor.info/*
// @match      https://rutor.info/*
// @match      http://*.rutor.info/*
// @match      https://*.rutor.info/*
// @noframes
// @run-at     document-end
// @grant      none
// @author     sjbog
// @license    Mozilla Public License Version 2.0
// @downloadURL https://github.com/sjbog/userscripts/raw/master/rutor.user.js
// @homepageURL https://github.com/sjbog/userscripts/
// ==/UserScript==

"use strict";

for (let item of document.getElementsByClassName("hidewrap")) {
  let summary = document.createElement("summary");
  summary.classList.add("hidehead");
  summary.textContent = item.getElementsByClassName("hidehead")[0].textContent;
  
  let details = document.createElement("details");
  details.classList.add("hidewrap");
  details.innerHTML = item.getElementsByClassName("hidearea")[0].textContent;
  details.prepend(summary);
  
  item.replaceWith(details);
}
