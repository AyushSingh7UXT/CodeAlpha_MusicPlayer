const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');
const playlistEl = document.getElementById('playlist');

let songs = [
  {
    title: "Audio One",
    artist: "Artist A",
    src: "songs/song1.mp3"
  },
  {
    title: "Audio Two",
    artist: "Artist B",
    src: "songs/song2.mp3"
  },
  {
    title: "Audio Three",
    artist: "Artist C",
    src: "songs/song3.mp3"
  }
];

let songIndex = 0;
let isPlaying = false;

// Load song
function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  highlightPlaylist(index);
}

function playSong() {
  audio.play();
  playBtn.textContent = '⏸️';
  isPlaying = true;
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = '▶️';
  isPlaying = false;
}

function togglePlay() {
  isPlaying ? pauseSong() : playSong();
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  playSong();
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  playSong();
}

function updateProgress() {
  const { currentTime, duration } = audio;
  progress.max = duration;
  progress.value = currentTime;

  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = isNaN(duration) ? '0:00' : formatTime(duration);
}

function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function setProgress() {
  audio.currentTime = progress.value;
}

function setVolume() {
  audio.volume = volumeSlider.value;
}

function populatePlaylist() {
  playlistEl.innerHTML = '';
  songs.forEach((song, index) => {
    const item = document.createElement('div');
    item.classList.add('playlist-item');
    item.textContent = `${song.title} - ${song.artist}`;
    item.addEventListener('click', () => {
      songIndex = index;
      loadSong(songIndex);
      playSong();
    });
    playlistEl.appendChild(item);
  });
}

function highlightPlaylist(index) {
  const items = document.querySelectorAll('.playlist-item');
  items.forEach((item, i) => {
    item.classList.toggle('active', i === index);
  });
}

// Event Listeners
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progress.addEventListener('input', setProgress);
volumeSlider.addEventListener('input', setVolume);
audio.addEventListener('ended', nextSong); // autoplay

// Init
loadSong(songIndex);
populatePlaylist();
