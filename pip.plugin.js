/**
 * @name Picture-in-Picture
 * @description Brings Picture-in-Picture (Media Popout) support to Stremio.
 * @version 1.0.0
 * @author Fxy
 * @updateUrl https://raw.githubusercontent.com/fxy6969/Stremio-PIP/main/pip.plugin.js
 */

function addButton() {
  let videoPlayer = document.querySelector("video");
  let bottomControl = document.querySelector('[class*="control-bar-layer-"]');

  if (!videoPlayer || !bottomControl) {
    console.log("Required elements not found, waiting...");
    return;
  }
  //This is for metadata stuff, I think activating and unactivating controls does it
  if (videoPlayer.readyState != 4) {
	  console.log("Video meta-data not loaded yet");
	  videoPlayer.controls = true;
	  videoPlayer.controls = false;
	  bottomControl.hidden = true;
	  bottomControl.hidden = false;
  } 


  let buttonElement = document.querySelector("#pipButton");

  if (!buttonElement) {
	  console.log("No button created yet, create now");
      let pipButton = document.createElement("div");
	  pipButton.innerHTML = `<svg style="height: 2rem;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
		 <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
	   </svg>`;
	  pipButton.setAttribute("id", "pipButton");
	  pipButton.setAttribute(
		"style",
		`
		  background-color: white;
		  border-radius: 1px;
		  border: 0.2px solid rgba(0, 0, 0, 0.2);
		  box-shadow: var(--box-shadow);
		  display: inline-flex;
		  padding: 0.2rem 0.2rem;
		  justify-content: center;
		  position: fixed;
		  bottom: 0vh;
		  align-content: flex-start;
		  flex-wrap: nowrap;
		  flex-direction: row;
		  left: 50%;
		  cursor: pointer;
		  `,
	  );
	  pipButton.addEventListener("click", () => {
		if (document.pictureInPictureElement) {
		  document.exitPictureInPicture();
		} else if (videoPlayer) {
		  videoPlayer.requestPictureInPicture();
		}
	  });
	  bottomControl.appendChild(pipButton);
  }


}

function checkAndAddButton() {
  if (
    document.querySelector("video") && document.querySelector('[class*="control-bar-layer-"]')
  ) {
    setControls();
  } else {
	console.log("video: " + document.querySelector("video"))
	console.log("control bar: " + document.querySelector('[class*="control-bar-layer-"]'))
  }
}

//document.addEventListener('change', function() {
//	checkControls()
//});

setInterval(checkAndAddButton, 250);
