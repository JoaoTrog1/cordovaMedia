
let media; // essa variavel salva o objeto media
let intervalId;
let isPaused = false;

document.addEventListener('deviceready', function () {
    // Caminho do áudio
    const audioFolder = cordova.file.applicationDirectory + 'www/audio/';
    

    function listAudioFiles() {
        const audioFiles = [
            'audio.mp3',
            'audio3.mp3'
        ];

        audioFiles.forEach(fileName => {
            const button = document.createElement('button');
            button.innerText = fileName;
            button.onclick = function () {
                playAudio(audioFolder + fileName);
            };
            document.getElementById('audioList').appendChild(button);
        });
    }

    
    function playAudio(filePath) {
        
        if (media) {
            media.stop(); 
        }

        media = new Media(filePath,
            function () { console.log("Sucesso ao reproduzir o áudio"); },
            function (err) { console.log("Erro: " + err); }
        );
        media.play();

        
            


        intervalId = setInterval(() => {
            getAudioInfo();
            sta2 = document.getElementById('status2');
            tempoTotal = formatarTempo(media.getDuration())
            sta2.innerText = "Duração total: " + tempoTotal + " segundos";
        }, 10);
        
        
        media.onStatusUpdate = function(status) {
            if (status === Media.MEDIA_STOPPED) {
                playAudio(filePath); 
            }
        };
    }

   
    function pauseAudio() {
        if (media) {
            isPaused = true;
            media.pause();
        }
    }

    const pauseButton = document.createElement('button');
    pauseButton.innerText = "Pausar Áudio";
    pauseButton.onclick = pauseAudio;
    document.body.appendChild(pauseButton);



    function getAudioInfo() {
        if (media) {
            sta = document.getElementById('status');
            
            media.getCurrentPosition(
                function (position) {
                    if (position >= 0) {
                       
                        //tempo do audio em %
                        tamanho = Math.round((position*100)/media.getDuration())
                        //tempo formatado
                        tempo = formatarTempo(position)
                        


                        sta.innerText = "Tempo atual: " + tamanho + "%  " + tempo;
                    }
                },
                
            );

            
        }
    }

     const resumeButton = document.createElement('button');
     resumeButton.innerText = "Retomar Áudio";
     resumeButton.onclick = function() {
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
        tempo = (tempo/60).toFixed(2)
        minutos = Math.floor(tempo)
        segundos = Math.round((tempo - minutos) * 60)
        return minutos + ":" + segundos
    }
    
    
    

    
    listAudioFiles();
}, false);
