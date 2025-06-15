// Music Player Elements
const playPauseBtn = document.querySelector('#play-pause');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const title = document.querySelector('#title');
const artist = document.querySelector('#artist');
const cover = document.querySelector('#cover');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress-bar');
const currentTime = document.querySelector('.current');
const duration = document.querySelector('.duration');
const volumeSlider = document.querySelector('#volume');

// Sample playlist
const playlist = [
    {
        title: "Sample Song 1",
        artist: "Artist 1",
        cover: "https://via.placeholder.com/300",
        file: "path/to/song1.mp3"
    },
    {
        title: "Sample Song 2",
        artist: "Artist 2",
        cover: "https://via.placeholder.com/300",
        file: "path/to/song2.mp3"
    }
];

let currentSongIndex = 0;
let isPlaying = false;
let audio = new Audio();

// Initialize player
function initPlayer() {
    loadSong(currentSongIndex);
    updatePlaylist();
}

// Load song
function loadSong(index) {
    const song = playlist[index];
    title.textContent = song.title;
    artist.textContent = song.artist;
    cover.src = song.cover;
    audio.src = song.file;
}

// Play/Pause
function togglePlay() {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        audio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
}

// Previous song
function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = playlist.length - 1;
    }
    loadSong(currentSongIndex);
    if (isPlaying) audio.play();
}

// Next song
function nextSong() {
    currentSongIndex++;
    if (currentSongIndex > playlist.length - 1) {
        currentSongIndex = 0;
    }
    loadSong(currentSongIndex);
    if (isPlaying) audio.play();
}

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    
    // Update time
    const durationMinutes = Math.floor(duration / 60);
    const durationSeconds = Math.floor(duration % 60);
    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    
    duration.textContent = `${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
    currentTime.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')}`;
}

// Set progress
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Update volume
function setVolume() {
    audio.volume = volumeSlider.value / 100;
}

// Update playlist display
function updatePlaylist() {
    const playlistItems = document.querySelector('.playlist-items');
    playlistItems.innerHTML = '';
    
    playlist.forEach((song, index) => {
        const item = document.createElement('div');
        item.classList.add('playlist-item');
        item.innerHTML = `
            <img src="${song.cover}" alt="${song.title}" width="50" height="50">
            <div class="item-info">
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
            </div>
        `;
        item.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            if (isPlaying) audio.play();
        });
        playlistItems.appendChild(item);
    });
}

// Event Listeners
playPauseBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);
progressBar.addEventListener('click', setProgress);
volumeSlider.addEventListener('input', setVolume);

// Initialize player when page loads
window.addEventListener('load', initPlayer); 