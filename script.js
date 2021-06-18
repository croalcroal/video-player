function el_by_id(id) {
	return document.getElementById(id);
}
function query_sel(selector) {
	return document.querySelector(selector);
}
const player = query_sel('.player');
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
const speed = query_sel('.player-speed');

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
let lastVolume = 1;

// Volume bar
function changeVolume(e) {
	let volume = e.offsetX / volumeRange.offsetWidth;
	// rounding Volume
	if (volume < 0.1) {
		volume = 0;
	}
	if (volume > 0.9) {
		volume = 1;
	}
	volumeBar.style.width = `${volume * 100}%`;
	video.volume = volume;
	// change icon depending on Volume
	volumeIcon.className = '';
	if (volume > 0.7) {
		volumeIcon.classList.add('fas', 'fa-volume-up');
	} else if (volume < 0.7 && volume > 0) {
		volumeIcon.classList.add('fas', 'fa-volume-down');
	} else if (volume === 0) {
		volumeIcon.classList.add('fas', 'fa-volume-off');
	}
	lastVolume = volume;
}

// Mute/unmute
function toggleMute() {
	volumeIcon.className = '';
	if (video.volume) {
		lastVolume = video.volume;
		video.volume = 0;
		volumeBar.style.width = 0;
		volumeIcon.classList.add('fas', 'fa-volume-mute');
		volumeIcon.setAttribute('title', 'Unmute');
	} else {
		video.volume = lastVolume;
		volumeBar.style.width = `${lastVolume * 100}%`;
		volumeIcon.classList.add('fas', 'fa-volume-up');
		volumeIcon.setAttribute('title', 'Mute');
	}
}


// Change Playback Speed -------------------- //
function changeSpeed() {
	video.playbackRate = speed.value;
}


// Fullscreen ------------------------------- //

/* View in fullscreen */

function openFullscreen(elem) {
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	} else if (elem.webkitRequestFullscreen) { /* Safari */
		elem.webkitRequestFullscreen();
	} else if (elem.msRequestFullscreen) { /* IE11 */
		elem.msRequestFullscreen();
	}
	video.classList.add('video.fullscreen');
}

/* Close fullscreen */
function closeFullscreen(elem) {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	} else if (document.webkitExitFullscreen) { /* Safari */
		document.webkitExitFullscreen();
	} else if (document.msExitFullscreen) { /* IE11 */
		document.msExitFullscreen();
	}
	video.classList.remove('video.fullscreen');
}

let fullscreen = false;
// toggle Fullscreen
function toggleFullscreen() {
	if (!fullscreen) {
		openFullscreen(player);
	} else {
		closeFullscreen();
	}
	fullscreen = !fullscreen;
}

// Event Listeners ------------------------------- //
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);