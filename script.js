let play = document.getElementById('play');
let progressbar = document.getElementById('progressbar');
let audio = new Audio('Audio/1.mp3');

let currentSong = 1;

play.addEventListener('click', () => {
    if (audio.paused || audio.currentTime == 0) {
        audio.play();
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');
    }
    else {
        audio.pause();
        play.classList.remove('fa-circle-pause');
        play.classList.add('fa-circle-play');
    }
});

audio.addEventListener('timeupdate', () => {
    let progress = (audio.currentTime / audio.duration) * 100;
    progressbar.value = progress;
    progressbar.style.background = `linear-gradient(to right, #177200 ${progress}%, #333 ${progress}%)`;
})

progressbar.addEventListener('input', function () {
    let value = this.value;
    this.style.background = `linear-gradient(to right, #177200 ${value}%, #333 ${value}%)`;
    audio.currentTime = (progressbar.value * audio.duration) / 100;
});


let playMusic = Array.from(document.getElementsByClassName('playMusic'))

makeAllPlay = () => {
    playMusic.forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })

}

playMusic.forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlay();
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');

        index = parseInt(e.target.id);
        currentSong = index;
        audio.src = `Audio/${index}.mp3`;
        audio.currentTime = 0;
        audio.play();
        updateNowBar();
    })
})

let allMusic = Array.from(document.getElementsByClassName("music-card"));

songs = [
    { songName: 'Akatsuki', songDes: 'Seedhe Maut,Raga', songImage: 'Images/1.jpg', songPath: 'Audio/1.mp3' },
    { songName: "MF! Gabhru", songDes: "Karan Aujila,Ikky", songImage: 'images/2.jpg', songPath: 'Audio/2.mp3' },
    { songName: 'Saiyaara (from "saiyaara")', songDes: 'Tanishk Bagchi,Faheem Abdullah', songImage: 'Images/3.jpg', songPath: 'Audio/3.mp3' },
    { songName: 'Raatan Lambiyan', songDes: 'AP Dhillon,Shinda Kahlon', songImage: 'Images/4.jpg', songPath: 'Audio/4.mp3' },
    { songName: 'Knife Brows', songDes: 'Dhanda Nyoliwala', songImage: 'Images/5.jpg', songPath: 'Audio/5.mp3' },
    { songName: 'Raat Ki Rani', songDes: 'Seedhe Maut', songImage: 'images/6.jpg', songPath: 'Audio/6.mp3' },
    { songName: '101', songDes: 'Seedhe Maut', songImage: 'images/7.jpg', songPath: 'Audio/7.mp3' },
    { songName: 'Dhun (from "saiyaara")', songDes: 'Mithoon,Arijit Singh', songImage: 'images/8.jpg', songPath: 'Audio/8.mp3' },
    { songName: 'High On You', songDes: 'Jind Universe', songImage: 'images/9.jpg', songPath: 'Audio/9.mp3' },
    { songName: 'Pehle Bhi Main', songDes: 'Vishal Mishra,Raj Shekhar', songImage: 'images/10.jpg', songPath: 'Audio/10.mp3' },
    { songName: 'Dhurandhar-Title Track', songDes: 'Shaswat sachdev,Hanumankind', songImage: 'images/11.jpg', songPath: 'Audio/11.mp3' },
    { songName: 'Haseen', songDes: 'Talwiinder,NDS,Rippy Grewal', songImage: 'images/12.jpg', songPath: 'Audio/12.mp3' },
    { songName: 'Thodi Si Daru', songDes: 'AP Dhillon,Shreya Ghoshal', songImage: 'images/13.jpg', songPath: 'Audio/13.mp3' },
    { songName: 'Tu', songDes: 'Talwiinder,sanjoy', songImage: 'images/14.jpg', songPath: 'Audio/14.mp3' },
    { songName: 'Iktara', songDes: 'Amit Trivedi,Kavita Seth,Amitabh Bhattacharya', songImage: 'images/15.jpg', songPath: 'Audio/15.mp3' },
    { songName: 'Ilahi', songDes: 'Arijit Singh', songImage: 'images/16.jpg', songPath: 'Audio/16.mp3' },
    { songName: 'Dil Toh Bacha Hai', songDes: 'Rahat Fateh Ali Khan', songImage: 'images/17.jpg', songPath: 'Audio/17.mp3' },
    { songName: 'Tum ho', songDes: "Mohit Chauhan,Suzanne D'Mello", songImage: 'images/18.jpg', songPath: 'Audio/18.mp3' },
    { songName: 'Kabira', songDes: 'Pritam,Tochi Raina,Rekha Bharadwaj', songImage: 'images/19.jpg', songPath: 'Audio/19.mp3' },
    { songName: 'Subhanallah', songDes: 'Pritam,Sreerama Chandra,Shilpa Rao', songImage: 'images/20.jpg', songPath: 'Audio/20.mp3' },
    { songName: 'Ik Junoon(Paint it Red)', songDes: 'Vishal Dadlani', songImage: 'images/21.jpg', songPath: 'Audio/21.mp3' }

]

order = [...songs];

allMusic.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].songImage;
    element.getElementsByClassName('img-title')[0].innerText = songs[i].songName;
    element.getElementsByClassName('img-description')[0].innerText = songs[i].songDes;
});

let shuffle = document.getElementById('shuffle');
let repeat = document.getElementById('repeat');
let nowBar = document.querySelector('.now-bar');

let songOnRepeat = false;
let songOnShuffle = false;

function shuffleSongs(originalOrder) {
    order = [...originalOrder];
    for (i = order.length - 1; i > 0; i--) {
        let j = Math.floor((Math.random) * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
}

shuffle.addEventListener('click', () => {
    if(!songOnShuffle) {
        songOnShuffle = true;
        songOnRepeat = false;
        shuffle.classList.add('active');
        repeat.classList.remove('active');

        order = shuffleSongs(songs);
    } else {
        songOnShuffle = false;
        shuffle.classList.remove('active');

        order = songs;
    }
});

repeat.addEventListener('click', () => {
    if (!songOnRepeat) {
        songOnRepeat = true;
        songOnShuffle = false;
        repeat.classList.add('active');
        shuffle.classList.remove('active');
    } else {
        songOnRepeat = false;
        repeat.classList.remove('active');
    }
})

playNextSong = () => {
    if (!songOnRepeat) {
        let nextSong = (currentSong + 1) % playMusic.length;
        currentSong = nextSong == 0 ? playMusic.length : nextSong;

        audio.src = order[currentSong - 1].songPath;
        audio.currentTime = 0;
        audio.play();
        updateNowBar();
    } else {
        audio.src = order[currentSong - 1].songPath;
        audio.currentTime = 0;
        audio.play();
        updateNowBar();
    }
}

playPrevSong = () => {
  playPrevSong = () => {
    if (!songOnRepeat) {
        let prevSong = currentSong - 1;

        // wrap to last song if we go below 1
        currentSong = prevSong == 0 ? playMusic.length : prevSong;

        audio.src = order[currentSong - 1].songPath;
        audio.currentTime = 0;
        audio.play();
        updateNowBar();
    } else {
        // repeat the same song
        audio.src = order[currentSong - 1].songPath;
        audio.currentTime = 0;
        audio.play();
        updateNowBar();
    }
};

}

function updateNowBar() {
    nowBar.getElementsByTagName('img')[0].src = order[currentSong - 1].songImage;
    nowBar.getElementsByClassName('img-title-info')[0].innerText = order[currentSong - 1].songName;
    nowBar.getElementsByClassName('img-des-info')[0].innerText = order[currentSong - 1].songDes;
}


forward = document.getElementById("forward");
backward = document.getElementById("backward");

forward.addEventListener("click", () => {
    playNextSong();
})

audio.addEventListener("ended", () => {
    playNextSong();
})

backward.addEventListener("click", () => {
    playPrevSong();
})