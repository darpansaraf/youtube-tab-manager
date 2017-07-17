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
					//chrome.tabs.update(tabId,{url:"https://www.youtube.com/watch?v=B_LQkd-ERMI&list=RDB_LQkd-ERMI"});

					var linkToNextVideo = null;
					chrome.tabs.executeScript(tabId,{file:"core.js",allFrames: true},function (results) {
						// body...
					linkToNextVideo = results[0];
					var ytTabComponent = getYoutubeTabComponent(currentYoutubeVideoUrl,audible,linkToNextVideo,title);
					$('#listOfOpenYoutubeTabs').append(ytTabComponent);
					});
				}
			};
		});
	});

function getYoutubeTabComponent (previousVideoLink, isVideoPlaying, linkToNextVideo,videoTitle) {
	var ytElement = `<div class="popup">
					<div>
						<a style="background:none;border:none;box-shadow:none;float:left;" href="` + previousVideoLink + `">
										  <span class="glyphicon glyphicon-step-backward" aria-hidden="true"></span>
						</a>`;

						if(isVideoPlaying){
							ytElement += `<a style="background:none;border:none;box-shadow:none;float:left;">
								  <span class="glyphicon glyphicon-pause" aria-hidden="true"></span>
							</a>`;
						}else{
							ytElement += `<a style="background:none;border:none;box-shadow:none;float:left;">
								  <span class="glyphicon glyphicon-play" aria-hidden="true"></span>
							</a>`;
						}
						ytElement += `<a style="background:none;border:none;box-shadow:none;float:left;" href="`+ linkToNextVideo + `">
									  <span class="glyphicon glyphicon-step-forward" aria-hidden="true"></span>
								</a>
					</div>`;
					ytElement +=(`<div style="width:100%;height:10px">
							<p id="videoTitle">` + videoTitle +`</p>
						</div>
				</div>`);

	console.log(ytElement);
	return ytElement;
}