'use strict';

const { ipcRenderer } = require('electron');
const STARTTAB="Project";

/// Helper functions
/// --------------------
function logText(msg) {
    ipcRenderer.send('log', msg);
}


/// Tab Management
/// --------------------
function selectTab(selectedTab) {
    const tabContents = document.getElementById('tab-contents');
    const tabBar = document.getElementById('tab-bar');

    // Clear
    tabContents.querySelectorAll('.tab-content').forEach( item => item.style.display="none" );
    tabBar.querySelectorAll('.tab-bar-item').forEach( item => {
        item.className=item.className.replace(" tab-bar-selected", "");
        return item;
    });

    // Set selected
    document.getElementById(`${selectedTab}`)
        .style.display = "block";
    document.getElementById(`tab-${selectedTab}`).className += " tab-bar-selected";
}

function selectTabEvent(event) {
    selectTab(event.target.id.split('-')[1]);
}

function addTabs() {
    const tabBar = document.getElementById('tab-bar');
    const tabs = Array.from(document.getElementsByClassName('tab-content'));
    
    const formattedTabs = tabs.reduce( (html, tab) => {
        const tname = tab.id;
        html += '<button class="tab-bar-item" id="tab-' + tname + '">';
        html += tname;
        html += '</button>\n';
        return html;
    }, '');

    tabBar.innerHTML = formattedTabs;
    tabBar.querySelectorAll('.tab-bar-item')
        .forEach( item => item.addEventListener('click', selectTabEvent));    
}

// insert the Forms
function insertForms() {
    const tabs = Array.from(document.getElementsByClassName('tab-content'));
    tabs.forEach( form => {
        form.innerHTML = window.forms[form.id];
    });
}


/// END
/// --------------------
function doneLoading() {
    addTabs();
    selectTab(STARTTAB);
    insertForms();
    
    logText('MainWindow loaded.');
}

doneLoading();
