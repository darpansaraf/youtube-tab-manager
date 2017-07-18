var videoUrlMatchingRegex = 'www.youtube.com/watch?/*'
chrome.windows.getCurrent(function(win)	{
		chrome.tabs.getAllInWindow(win.id,function(tabs){
			console.log(tabs);
			console.log(document);
			for (var tabIndex = 0; tabIndex < tabs.length; tabIndex++) {

				if(tabs[tabIndex].url.search(videoUrlMatchingRegex) != -1){
					var currentYoutubeVideoUrl = tabs[tabIndex].url;

					var tabId = tabs[tabIndex].id;
					var audible = tabs[tabIndex].audible;
					var title = tabs[tabIndex].title;
					
					var linkToNextVideo = null;
					var ytTabComponent = null
					someFunction(tabId,currentYoutubeVideoUrl,audible,title,function (ytTabComponent){
										console.log('Async function has been executed');
										console.log(ytTabComponent);
										$('#listOfOpenYoutubeTabs').append(ytTabComponent);
						});
				};
			};
		});
	});

function someFunction (tabId,currentYoutubeVideoUrl,audible,title,callBack) {
	var ytTabComponent = null
	chrome.tabs.executeScript(tabId,{file:"core.js",allFrames: true},function (results) {
								linkToNextVideo = results[0];
								ytTabComponent = getYoutubeTabComponent(currentYoutubeVideoUrl,audible,linkToNextVideo,title);
								callBack(ytTabComponent);
							});
}


function getYoutubeTabComponent (previousVideoLink, isVideoPlaying, linkToNextVideo,videoTitle) {
	var ytElement = `<div class="popup">
					<div class="tab-controls">
						<a href="` + previousVideoLink + `">
										  <img src="icons/skip-previous.svg" alt="previous">
						</a>`;

						if(isVideoPlaying){
							ytElement += `<a>
							<img src="icons/pause.svg" alt="previous">
							</a>`;
						}else{
							ytElement += `<a>
							<img src="icons/play.svg" alt="previous">
								  
							</a>`;
						}
						ytElement += `<a href="`+ linkToNextVideo + `">
							<img src="icons/skip-next.svg" alt="previous">
								</a>
					</div>`;
					ytElement +=(`<div class="tab-title">
							<p id="videoTitle">` + videoTitle +`</p>
						</div>
				</div>`);

	return ytElement;
}