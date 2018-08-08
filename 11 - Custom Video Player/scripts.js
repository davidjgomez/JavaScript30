const player = document.querySelector('.player');

//Toggle play/pause
const video = player.querySelector('.viewer');
const toggle = player.querySelector('.toggle');

function togglePlay() {
  video[video.paused ? 'play' : 'pause']();
}

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

function updateButton() {
  toggle.textContent = this.paused ? '►' : '❚ ❚';
}

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

//Skip backward/forward
const skipButtons = player.querySelectorAll('[data-skip]');

function skip() {
 video.currentTime += parseFloat(this.dataset.skip);
}

skipButtons.forEach(button => button.addEventListener('click', skip));

//Handle volume/speed ranges
const ranges = player.querySelectorAll('.player__slider');

function handleRangeUpdate() {
  video[this.name] = this.value;
}

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

//Update progress bar
const progressBar = player.querySelector('.progress__filled');

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

video.addEventListener('timeupdate', handleProgress);

//Scrub progress bar
const progress = player.querySelector('.progress');

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

//Fullscreen
const fullScreen = player.querySelector('.fullScreen');
const isBrowser = (name) => navigator.userAgent.indexOf(name) > -1;

function toFullscreen() {
  video[isBrowser('Firefox') ? 'mozRequestFullScreen' : 
  		isBrowser('Chrome') || isBrowser('Edge') ? 'webkitRequestFullscreen' : 
  		'requestFullscreen']();
}

fullScreen.addEventListener('click', toFullscreen);