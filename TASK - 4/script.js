const songs = [
  {
    title: "Song One",
    artist: "Artist A",
    file: "songs/song1.mp3"
  },
  {
    title: "Song Two",
    artist: "Artist B",
    file: "songs/song2.mp3"
  },
  {
    title: "Song Three",
    artist: "Artist C",
    file: "songs/song3.mp3"
  }
];

let currentSong = 0;
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-container");
const durationText = document.getElementById("duration");

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.file;
}
loadSong(currentSong);

function playPause() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸️";
  } else {
    audio.pause();
    playBtn.textContent = "▶️";
  }
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  audio.play();
  playBtn.textContent = "⏸️";
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  audio.play();
  playBtn.textContent = "⏸️";
}

function updateProgress() {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + "%";

  const format = (time) => Math.floor(time / 60) + ":" + String(Math.floor(time % 60)).padStart(2, '0');
  durationText.textContent = `${format(audio.currentTime)} / ${format(audio.duration)}`;
}

function setProgress(e) {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  audio.currentTime = (clickX / width) * audio.duration;
}

function setVolume(value) {
  audio.volume = value;
}

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextSong); // autoplay
