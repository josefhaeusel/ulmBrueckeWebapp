<template>
  <div class="audio-stream">
    <button @click="startStream">Start Stream</button>
    <button @click="setupAudio">Start Audio</button>

    <audio ref="audio" controls></audio>
    <div>
      <li v-for="(message, index) in messages" :key="index">{{ message }}</li>
    </div>
  </div>
</template>
<script>
import io from 'socket.io-client';
import * as Tone from "tone";

export default {
  name: 'AudioStream',
  data() {
    return {
      socket: null,
      mediaRecorder: null,
      messages: [],
      mimeType: 'audio/webm; codecs=opus',
      queue: [],
      nextStartTime: 0,
      audioContext: null,
      gainNode: null,

      firstInputArrived: false,
      latency: null,

      audioPlayer: null,
      audioBuffer: null
    };
  },
  async mounted() {

    await this.setupAudio()

    this.socket = io('http://localhost:3000', { gettransports: ['websocket'], upgrade: false });

    this.firstInputArrived = false;
    this.latency = 4000
    this.socket.on('audio-stream', async (audioData) => {

        if (audioData) {
            this.addAudioDataToQueue(audioData);
        }

        if (!this.firstInputArrived) {
            console.warn("First Input arrived");
            this.firstInputArrived = true;
            setTimeout(() => {
                // if (Tone.getContext().state === "running"){
                  this.startPlaybackLoop();
                  console.warn("Started playback after latency period");

                // }
            }, this.latency);
        }

      });


},

  methods: {
      async setupAudioContextAndNodes(){
              await Tone.start();
              await Tone.getContext().resume();
              this.audioPlayer = new Tone.Player({context: Tone.getContext()}).toDestination();
              this.audioPlayer.autostart = true
              console.log("Started Audio Context", Tone.getContext())
              console.log("Loaded Audioplayer", this.audioPlayer)

          },
      async setupAudio() {
          if (Tone.getContext().state == "running") {
              await this.setupAudioContextAndNodes();
          } else {
              const setupHandler = async () => {
                  await this.setupAudioContextAndNodes();
                  document.body.removeEventListener('click', setupHandler);
              };
              document.body.addEventListener('click', setupHandler);
          }
      },

    async startStream() {
      try {
        await this.setupAudio()
        navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then((stream) => {
          this.mediaRecorder = new MediaRecorder(stream);
          console.log("MediaRecorder bitrate:",this.mediaRecorder.audioBitrateMode)
          let audioChunks = [];

          this.mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
          };

          this.mediaRecorder.addEventListener("stop", () => {
            var audioBlob = new Blob(audioChunks);
            audioChunks = [];
            var fileReader = new FileReader();
            fileReader.readAsDataURL(audioBlob);
            fileReader.onloadend = () => {
              var base64String = fileReader.result;
              this.socket.emit("audio-stream", base64String);
            };

            this.mediaRecorder.start()
            setTimeout(() => {
                this.mediaRecorder.stop();
            }, 500);
          });

          this.mediaRecorder.start();  // Keep capturing every 100ms
          setTimeout(() => {
            this.mediaRecorder.stop();
          }, 500);
        });
      } catch (err) {
        console.error('Error accessing media devices.', err);
      }
    },
    async addAudioDataToQueue(audioData) {
        let newData = audioData.split(";");
        newData[0] = "data:audio/ogg;";
        newData = newData[0] + newData[1];
        this.queue.push(newData);
        console.log("Audio Data:",this.queue.length, this.queue);
    },
    startPlaybackLoop() {
        // Create a loop that checks for new audio chunks every 100ms
        const loop = new Tone.Loop(async () => {
            const audioData = this.queue.shift();
            if (audioData) {
                const buffer = await new Tone.ToneAudioBuffer(audioData)
                this.startAudioPlayer(buffer);
            }
        }, "0.5");  // Adjust the interval as needed

        loop.start(); // Start the loop
        Tone.getTransport().start();
    },

    startAudioPlayer(buffer){
        if (this.audioPlayer && buffer) {
            this.audioPlayer.buffer = buffer;
            // if (Tone.getContext().state === "running") {
            //     // this.audioPlayer.start(time);
            // } else {
            //     console.warn("Audio context is not running, cannot start player.");
            // }
        } else {
            console.error("Audio player or buffer is not initialized.");
        }
    }
  }
}
</script>