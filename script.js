function el_by_id(id) {
	return document.getElementById(id);
}
function query_sel(selector) {
	return document.querySelector(selector);
}
const video = document.querySelector('.video');
const progressRange = query_sel('.progress-range');
const progressBar = query_sel('.progress-bar');

const playBtn = el_by_id('play-btn');
const volumeIcon = el_by_id('volume-icon');

const volumeRange = query_sel('.volume-range');
const volumeBar = query_sel('.volume-bar');
const currentTime = query_sel('.time-elapsed');
const duration = query_sel('.time-duration');
const fullscreenBtn = query_sel('.fullscreen');

// Play & Pause ----------------------------------- //
function showPlayIcon() {
	playBtn.classList.replace('fa-pause', 'fa-play');
	playBtn.setAttribute('title', 'Play');
}

function togglePlay() {
	if (video.paused) {
		video.play();
		playBtn.classList.replace('fa-play', 'fa-pause');
		playBtn.setAttribute('title', 'Pause');

	} else {
		video.pause();
		showPlayIcon();
	}

}
// On video end, show play btn
video.addEventListener('ended', showPlayIcon);

// Progress Bar ---------------------------------- //
// Calculate display time format
function displayTime(time) {
	const minutes = Math.floor(time / 60);
	let seconds = Math.floor(time % 60);
	seconds = seconds > 9 ? seconds : `0${seconds}`;
	return `${minutes} : ${seconds}`;

}

// update progress bar as video plays
function updateProgress() {
	//console.log('currentTime: ', video.currentTime, 'duration', video.duration);
	progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
	currentTime.textContent = `${displayTime(video.currentTime)} /`;
	duration.textContent = `${displayTime(video.duration)}`;
}

// Click to seek on progress bar
function setProgress(e) {
	const newTime = e.offsetX / progressRange.offsetWidth;
	progressBar.style.width = `${newTime * 100}%`;
	video.currentTime = newTime * video.duration;

}

// Volume Controls --------------------------- //



// Change Playback Speed -------------------- //



// Fullscreen ------------------------------- //


// Event Listeners ------------------------------- //
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);