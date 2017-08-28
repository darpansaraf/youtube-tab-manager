var videoUrlMatchingRegex = 'www.youtube.com/watch?/*';

chrome.windows.getCurrent(function(win) {
    chrome.tabs.getAllInWindow(win.id, function(tabs) {
        for (var tabIndex = 0; tabIndex < tabs.length; tabIndex++) {

            if (tabs[tabIndex].url.search(videoUrlMatchingRegex) != -1) {
                var currentYoutubeVideoUrl = tabs[tabIndex].url;
                var tabId = tabs[tabIndex].id;
                var audible = tabs[tabIndex].audible;
                var title = tabs[tabIndex].title;

                var linkToNextVideo = null;
                var ytTabComponent = null
                getYTTabDetailsAndAppendToDOM(tabId, currentYoutubeVideoUrl, audible, title, function(ytTabComponent) {
                    $('#listOfOpenYoutubeTabs').append(ytTabComponent);
                });
            };
        };
    });
});

function getYTTabDetailsAndAppendToDOM(tabId, currentYoutubeVideoUrl, audible, title, appendYTTabToDOM) {
    var ytTabComponent = null
    ytTabComponent = getYoutubeTabComponent(tabId, audible, title);
    appendYTTabToDOM(ytTabComponent);
}


function getYoutubeTabComponent(tabId, isVideoPlaying, videoTitle) {
    var ytElement = `<div class="popup">
          <div class="tab-controls">
            <a href="#" name="` + tabId + `" class="previous">
                      <img src="icons/skip-previous.svg" alt="previous">
            </a>`;
    if (isVideoPlaying) {
        ytElement += `<a href="#" name="` + tabId + `" class="pause">
              <img src="icons/pause.svg" alt="pause" >
              </a>`;
    } else {
        ytElement += `<a href="#" name="` + tabId + `" class="play">
              <img src="icons/play.svg" alt="play">
              </a>`;
    }
    ytElement += `<a href="#" name="` + tabId + `" class="next">
              <img src="icons/skip-next.svg" alt="previous">
          </a>
          </div>`;
    ytElement += (`<div class="tab-title">
              <p id="videoTitle">` + videoTitle + `</p>
            </div>
        </div>`);

    return ytElement;
};


$(document).on('click', '.previous', function() {
    console.log('hello previous');
    var tabId = parseInt($(this).attr('name'));
    console.log('The tabId is:'+tabId);
    chrome.tabs.executeScript(tabId,{file:'jquery-3.2.1.min.js'},function() {
        chrome.tabs.executeScript(tabId, {code:'document.getElementsByClassName("ytp-play-button")[0].click();'});
      });
});

$(document).on('click', '.play', function() {
    console.log('hello play');
    var img = $(this).find('img')[0];
    img.src = 'icons/pause.svg';
    var tabId = parseInt($(this).attr('name'));

    console.log('The tabId is:'+tabId);
    chrome.tabs.executeScript(tabId,{file:'jquery-3.2.1.min.js'},function() {
        chrome.tabs.executeScript(tabId, {code:'document.getElementsByClassName("ytp-play-button")[0].click();'});
    });
});

$(document).on('click', '.pause', function() {
    console.log('hello pause');
    var img = $(this).find('img')[0];
    img.src = 'icons/play.svg';
    var tabId = parseInt($(this).attr('name'));
    console.log('The tabId is:'+tabId);
    chrome.tabs.executeScript(tabId,{file:'jquery-3.2.1.min.js'},function() {
        chrome.tabs.executeScript(tabId, {code:'document.getElementsByClassName("ytp-play-button")[0].click();'});
    });
});

$(document).on('click', '.next', function() {
    console.log('hello next');
    var tabId = parseInt($(this).attr('name'));
    console.log('The tabId is:'+tabId);
    chrome.tabs.executeScript(tabId,{file:'jquery-3.2.1.min.js'},function() {
        chrome.tabs.executeScript(tabId, {code:'document.getElementsByClassName("ytp-next-button")[0].click();'});
    });
});
