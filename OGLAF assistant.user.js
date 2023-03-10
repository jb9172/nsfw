// ==UserScript==
// @name         OGLAF assistant
// @namespace    https://www.oglaf.com/
// @version      0.6
// @description  Navigate the OGLAF comic with arrow keys, show title and alt text, highlight epilogue button.
// @author       Anon
// @match        https://www.oglaf.com/*
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    function extra() {
        let patreon_link = document.querySelector('a.patreon');
        let extra_link = patreon_link.nextSibling;
        if (extra_link.tagName === "A" && extra_link.href &&
            extra_link.href !== document.location.href &&
            extra_link.href.startsWith("https://www.oglaf.com/") &&
            !extra_link.href.match(/\/None$/)) {
            return extra_link;
        }
        return null;
    }

    function keydown(e) {
        if (e.keyCode == 37) {
            document.querySelector("a.button.previous").click();
        } else if (e.keyCode == 39) {
            let extra_link = extra();
            if (extra_link) {
                extra_link.click();
            } else {
                document.querySelector("a.button.next").click();
            }
        }
    }

    document.addEventListener("keydown", keydown);

    function append(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }

    let strip = document.getElementById("strip");
    if (!strip) {
        return;
    }

    let title = strip.getAttribute("title");
    let alt = strip.getAttribute("alt");
    let ad_btm = document.getElementById("ad_btm");

    if (ad_btm.innerHTML !== "") {
        ad_btm.append(document.createElement('br'));
        ad_btm.append(document.createElement('br'));
    }

    if (title) {
        ad_btm.append(document.createTextNode(title));
    }

    if (alt) {
        ad_btm.append(document.createElement('br'));
        ad_btm.append(document.createElement('br'));
        ad_btm.append(document.createTextNode(alt));
    }

    ad_btm.style.backgroundColor = '#ccc';
    ad_btm.style.borderRadius = '12px';
    ad_btm.style.padding = '12px';

    let extra_link = extra();
    if (extra_link) {
        let extra_img = extra_link.querySelector('img');
        extra_link.style = '';
        extra_img.style = 'border: 8px solid yellow; border-radius: 8px;';
    }
})();
