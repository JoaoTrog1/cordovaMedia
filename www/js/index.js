
let media; // essa variavel salva o objeto media
let intervalId;

document.addEventListener("deviceready", async () => {
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
    }
  }

  intervalId = setInterval(() => {
    getAudioInfo();
    totalDuration.innerHTML = formatarTempo(media.getDuration());
  }, 10);
});
