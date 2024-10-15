let media;
let isPaused = true;
let currentMusic = 0;
let intervalId;

document.addEventListener(
  "deviceready",
  function () {
    const btnPlay = document.getElementById("play");
    const percentCurrentTime = document.getElementById("percentCurrentTime");

    const totalDuration = document.getElementById("totalDuration");
    const timeMusic = document.getElementById("timeMusic");

    let songs = [];
    songs.push(new Music("Believer", "Imagine Dragons", "Believer.jpg"));
    songs.push(
      new Music(
        "Sweet Child O' Mine",
        "Guns N' Roses",
        "Sweet-Child-O-Mine.jpg"
      )
    );
    songs.push(new Music("Vou Deixar", "Skank", "Vou-Deixar.jpg"));

    function prepararAudio(name) {
      let filePath = cordova.file.applicationDirectory + "www/audio/" + name;
      if (media) {
        media.stop();
      }

      media = new Media(
        filePath,
        function () {
          pauseAudio();
          console.log("Sucesso ao reproduzir o áudio");
        },
        function (err) {
          console.log("Erro: " + err);
        }
      );
    }

    function pauseAudio() {
      clearInterval(intervalId);
      if (media) {
        isPaused = true;
        media.pause();
        btnPlay.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#020617" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play" > <polygon points="6 3 20 12 6 21 6 3" /> </svg>';
      }
    }

    function playAudio() {
      if (media) {
        isPaused = false;
        media.play();
        intervalId = setInterval(() => {
          getTimeMusic();
        }, 1);
        const totalDuration = document.getElementById("totalDuration");
        totalDuration.innerText = formatarTempo(media.getDuration());
        btnPlay.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#0f172a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause" > <rect x="14" y="4" width="4" height="16" rx="1" /> <rect x="6" y="4" width="4" height="16" rx="1" /> </svg>';
      }
    }

    function getTimeMusic() {
      if (media) {
        media.getCurrentPosition(function (position) {
          progressMusic = (position * 100) / media.getDuration();
          timeMusic.innerText = formatarTempo(position);

          console.log(position);
          percentCurrentTime.style.width = progressMusic + "%";
        });
      }
    }

    function formatarTempo(tempo) {
      tempo = (tempo / 60).toFixed(2);
      minutos = Math.floor(tempo);
      segundos = Math.ceil((tempo - minutos) * 60);

      if (minutos < 10) {
        minutos = "0" + minutos;
      }

      if (segundos < 10) {
        segundos = "0" + segundos;
      }

      return minutos + ":" + segundos;
    }

    function alterarMusica(music) {
      prepararAudio(music.name + ".mp3");
      isPaused = true;

      document.getElementById("band").innerText = music.band;
      document.getElementById("name").innerText = music.name;
      document.getElementById("image").style.backgroundImage =
        "url(./img/" + music.img + ")";
      btnPlay.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#020617" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play" > <polygon points="6 3 20 12 6 21 6 3" /> </svg>';

      percentCurrentTime.style.width = "0%";
      totalDuration.innerText = "00:00";
      timeMusic.innerText = "00:00";
    }

    btnPlay.onclick = function () {
      if (isPaused) {
        playAudio();
      } else {
        pauseAudio();
      }
    };

    const btnNextMedia = document.getElementById("nextMedia");
    btnNextMedia.onclick = function () {
      if (currentMusic >= songs.length - 1) {
        currentMusic = 0;
      } else {
        currentMusic++;
      }
      alterarMusica(songs[currentMusic]);
    };

    const btnPreviousMedia = document.getElementById("previousMedia");
    btnPreviousMedia.onclick = function () {
      if (currentMusic <= 0) {
        currentMusic = songs.length - 1;
      } else {
        currentMusic--;
      }
      alterarMusica(songs[currentMusic]);
    };

    function Music(name, band, img) {
      this.name = name;
      this.band = band;
      this.img = img;
    }

    alterarMusica(songs[currentMusic]);
  },
  false
);
