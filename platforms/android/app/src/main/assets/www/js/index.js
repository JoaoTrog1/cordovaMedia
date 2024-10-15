let media; // essa variavel salva o objeto media
let intervalId;

<<<<<<< HEAD
document.addEventListener("deviceready", () => {
  const audioFolder = cordova.file.applicationDirectory + "www/audio/";
  const filePath = audioFolder + "believer.mp3";

  const play = document.getElementById("play");
  const pause = document.getElementById("pause");

  const totalDuration = document.getElementById("totalDuration");
  const currentTime = document.getElementById("currentTime");
  const percentCurrentTime = document.getElementById("percentCurrentTime");

  if (!media) {
    media = new Media(
      filePath,
      function () {
        console.log("Sucesso ao reproduzir o áudio");
      },
      function (err) {
        console.log("Erro: " + err);
      }
    );
  }

  play.addEventListener("click", () => {
    media.play();

    play.classList.add("hidden");
    pause.classList.remove("hidden");
  });

  pause.addEventListener("click", () => {
    if (media) {
      media.pause();

      play.classList.remove("hidden");
      pause.classList.add("hidden");
    }
  });

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

  function getAudioInfo() {
    if (media) {
      media.getCurrentPosition(function (position) {
        if (position >= 0) {
          //tempo do audio em %
          tamanho = Math.round((position * 100) / media.getDuration());
          //tempo formatado
          tempo = formatarTempo(position);

          currentTime.innerText = tempo;
          percentCurrentTime.classList.remove("w-[0%]");
          percentCurrentTime.classList.add("w-[" + tamanho + "%]");
        }
      });
=======
document.addEventListener(
  "deviceready",
  function () {
    // Caminho do áudio
    const audioFolder = cordova.file.applicationDirectory + "www/audio/";

    function playAudio(filePath) {
      if (media) {
        media.stop();
      }

      media = new Media(
        filePath,
        function () {
          console.log("Sucesso ao reproduzir o áudio");
        },
        function (err) {
          console.log("Erro: " + err);
        }
      );
      media.play();

      intervalId = setInterval(() => {
        getAudioInfo();
        sta2 = document.getElementById("status2");
        tempoTotal = formatarTempo(media.getDuration());
        sta2.innerText = "Duração total: " + tempoTotal + " segundos";
      }, 10);

      media.onStatusUpdate = function (status) {
        if (status === Media.MEDIA_STOPPED) {
          playAudio(filePath);
        }
      };
>>>>>>> feature02
    }
  }

<<<<<<< HEAD
  intervalId = setInterval(() => {
    getAudioInfo();
    if (media.getDuration() != -1) {
      totalDuration.innerHTML = formatarTempo(media.getDuration());
    }
  }, 10);
});
=======
    function pauseAudio() {
      if (media) {
        isPaused = true;
        media.pause();
      }
    }

    const pauseButton = document.createElement("button");
    pauseButton.innerText = "Pausar Áudio";
    pauseButton.onclick = pauseAudio;
    document.body.appendChild(pauseButton);

    function getAudioInfo() {
      if (media) {
        sta = document.getElementById("status");

        media.getCurrentPosition(function (position) {
          if (position >= 0) {
            //tempo do audio em %
            tamanho = Math.round((position * 100) / media.getDuration());
            //tempo formatado
            tempo = formatarTempo(position);

            sta.innerText = "Tempo atual: " + tamanho + "%  " + tempo;
          }
        });
      }
    }

    const resumeButton = document.createElement("button");
    resumeButton.innerText = "Retomar Áudio";
    resumeButton.onclick = function () {
      if (media && isPaused) {
        media.play();
        isPaused = false;

        intervalId = setInterval(() => {
          getAudioInfo();
        }, 1000);
      }
    };
    document.body.appendChild(resumeButton);

    function formatarTempo(tempo) {
      tempo = (tempo / 60).toFixed(2);
      minutos = Math.floor(tempo);
      segundos = Math.ceil((tempo - minutos) * 60);
      return minutos + ":" + segundos;
    }


    

    listAudioFiles();
  },
  false
);
>>>>>>> feature02
