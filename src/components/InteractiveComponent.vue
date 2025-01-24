<template>

    <div class="main-container my-5 mb-10 d-flex align-center justify-center" style="position: relative"
        id="interactive-container">


        <!-- <div v-if="!hasBeenClicked" class="overlay" id="overlay" @click="hasBeenClicked = true">
        </div>



        <div v-if="!hasBeenClicked" @click="hasBeenClicked = true" id="overlay-icons"
            class="d-flex align-center justify-center position-absolute flex-column cursor-pointer">
            <p style="z-index:10; color: white; margin-bottom: 15px;">Press to play</p>
            <v-icon size="100" color="white" style="z-index:11" icon="mdi-music-clef-treble">
            </v-icon>
        </div> -->

        <div class="d-flex flex-column justify-center elevation-10 rounded-xl component-content">

            <h1>Welchen Klang entfaltet die Brücke im Sonnenlicht?</h1>
            <strong>Drücke Sie auf Play und bewegen Sie den Regler zur Sonne - Hätten Sie das erwartet?</strong>

            <div class="soundscape-slider border-thin">


                <v-icon v-if="!temperature.isPlaying" @click="startPlayback('temperature')"
                    :icon="temperature.playIconActive" style="font-size: 3rem"
                    @mouseover="temperature.playIconActive = 'mdi-motion-play'"
                    @mouseleave="temperature.playIconActive = 'mdi-motion-play-outline'"></v-icon>
                <v-icon v-if="temperature.isPlaying" @click="stopPlayback('temperature')"
                    :icon="temperature.playIconActive" style="font-size: 3rem"
                    @mouseover="temperature.playIconActive = 'mdi-motion-pause'"
                    @mouseleave="temperature.playIconActive = 'mdi-motion-pause-outline'"></v-icon>
                <v-icon color="blue" class="slider-icon" icon="mdi-snowflake"></v-icon>
                <v-slider @update:model-value="(event) => updateVolume(event, 'temperature')"></v-slider>
                <v-icon color="orange" class="slider-icon" icon="mdi-white-balance-sunny"></v-icon>

            </div>

            <p>Höhere Temperaturen führen zu einer erhöhten Spannung in der Brücke, die von Strain-Sensoren präzise
                erfasst und in Klang übersetzt wird. Stellen Sie sich ein Seil vor, das bei Wind zwischen lockerem und
                gespanntem Zustand wechselt – im lockeren Zustand bewegt es sich chaotisch und unregelmäßig, nicht wahr?
                Genau so verhält sich die Soundscape der Brücke: Sie wird dynamischer und intensiver, je nachdem, wie
                stark die Brücke beansprucht wird.</p>

            <br>
            <h1>Was passiert bei einer hohen Gewichtsbelastung der Brücke?</h1>
            <strong> Drücke Sie auf Play und bewegen Sie den Regler zum Gewicht - So klingt Gemeinschaft!</strong>


            <div class="soundscape-slider border-thin">
                <v-icon v-if="!weight.isPlaying" @click="startPlayback('weight')" :icon="weight.playIconActive"
                    style="font-size: 3rem" @mouseover="weight.playIconActive = 'mdi-motion-play'"
                    @mouseleave="weight.playIconActive = 'mdi-motion-play-outline'"></v-icon>
                <v-icon v-if="weight.isPlaying" @click="stopPlayback('weight')" :icon="weight.playIconActive"
                    style="font-size: 3rem" @mouseover="weight.playIconActive = 'mdi-motion-pause'"
                    @mouseleave="weight.playIconActive = 'mdi-motion-pause-outline'"></v-icon>
                <v-icon color class="slider-icon" icon="mdi-feather"></v-icon>
                <v-slider @update:model-value="(event) => updateVolume(event, 'weight')"></v-slider>
                <v-icon class="slider-icon" icon="mdi-weight"></v-icon>
            </div>

            <p>Was verbinden wir mit einer Gruppe? Meist denken wir an Zusammenhalt und emotionale Verbindungen –
                gemeinsam sind wir stärker als allein! Auch die klangliche Atmosphäre der Brücke spiegelt dieses Gefühl
                wider: Mit steigender Belastung oder einer wachsenden Anzahl an Lebewesen wird der Klang voller und
                emotionaler. Eine harmonische Komposition verstärkt diese starke, verbindende Note.</p>

            <br>

            <h1>Wie hören sich eigentlich Schritte an?</h1>
            <p>Klicken Sie sich durch die folgenden Buttons durch. Je größer der Button, desto stärker die Sprungkraft!
                <br> Zudem können Sie zwischen den 3 Klangmodi wechseln.</p>

            <!-- <v-slider></v-slider> -->

            <div class="border-thin instrument-component">
                <div class="button-container rounded-2 mb-5 mt-3 " elevation="5">
                    <v-btn v-for="(id, n) in buttons" :key="n" class="rounded-pill" @click=playInstrument(id)
                        style="min-width: 0px; padding: 0" :width="id * 10" :height="id * 10"
                        :color="buttonColor[activePlayer.name].color">
                    </v-btn>
                </div>

                <v-tabs v-model="activePlayer.name" fixed-tabs :color="buttonColor[activePlayer.name].color">
                    <v-tab :value="'experimentalPlayer'">Nature</v-tab>
                    <v-tab :value="'percussionPlayer'">Percussion</v-tab>
                    <v-tab :value="'gamePlayer'">Game</v-tab>
                </v-tabs>
            </div>

            <p>Die in die Brücke integrierten Accelerometer-Sensoren ermöglichen es, Schritte mittels mathematischer
                Berechnungen präzise auszuwerten – sogar die Stärke der Schritte kann dabei unterschieden werden. Um das
                kreative Potenzial der Klangbrücke in Ulm voll auszuschöpfen und den vielfältigen Wünschen unserer
                Gesellschaft gerecht zu werden, verfügt sie über drei unterschiedliche klangliche Modi - Nature, Gaming
                & Percussion</p>

            <br>

            <h1>Erschaffen Sie sich nun ihre eigene Klangkomposition!!!</h1>
            <p>Mischen Sie die Regler für Temperatur und Gewicht bzw. die Anzahl der Lebewesen auf der Brücke, und
                experimentieren Sie mit den Schritt-Buttons. Im Handumdrehen entsteht so Ihr ganz persönliches
                Musikstück!</p>
            <!-- <p>Großer Playbutton, um alle Soundscapes nochmal zu triggern?</p> -->

        </div>
    </div>

</template>
<script>
import * as Tone from "tone";

let instrumentPlayers = {
    experimentalPlayer: null,
    percussionPlayer: null,
    gamePlayer: null
}

let soundscapePlayers = {
    temperaturePlayers: [],
    weightPlayers: [],
}

let crossFades = {
    temperature: null,
    weight: null
}


export default {
    name: 'InteractiveComponent',
    data: () => ({
        hasBeenClicked: false,
        samplePaths: {
            instruments: ["experimental", "percussion", "game"],
            soundscapes: ["temperature", "weight"]
            // soundscapes: {
            //     temperature: [
            //         "temperature0",
            //         "temperature1",
            //         "temperature2",
            //         "temperature3",
            //     ],
            //     weight: [
            //         "weight0",
            //         "weight1",
            //         "weight2",
            //         "weight3",
            //     ]
            // }
        },
        temperature: {
            isPlaying: false,
            playIconActive: 'mdi-motion-play-outline',
            isLoaded: false,
            time: 0,
        },
        weight: {
            isPlaying: false,
            isLoaded: false,
            playIconActive: 'mdi-motion-play-outline',
            time: 0,
        },
        soundscapesLoaded: false,
        audioStarted: false,
        keyCentMap: {
            'C': 0,
            'C#': 100,
            'D': 200,
            'D#': 300,
            'E': 400,
            'F': 500,
            'F#': 600,
            'G': 700,
            'G#': -400,
            'A': -300,
            'A#': -200,
            'B': -100
        },
        notes: [
            'C',
            // 'C#',
            'D',
            // 'D#',
            'E',
            'F',
            // 'F#',
            'G',
            // 'G#',
            'A',
            'A#',
            // 'B',
        ],
        buttons: [0, 1, 2, 3, 4, 5, 6, 7, 8],
        activePlayer: { name: "experimentalPlayer" },
        buttonColor: {
            gamePlayer: {
                color: '#68272A',
            },
            percussionPlayer: {
                color: '#D67B2A',
            },
            experimentalPlayer: {
                color: '#97B28A',
            },
        },
    }),
    async mounted() {
        await this.setup();
    },
    methods: {
        async setup() {
            if (Tone.getContext().state == "running") {
                // await this.setupAudioContextAndNodes();
            } else {

                const setupHandler = async () => {
                    try {
                        // await this.setupAudioContextAndNodes();
                        document.getElementById("overlay").removeEventListener('click', setupHandler);
                        document.getElementById("overlay-icons").removeEventListener('click', setupHandler);
                    } catch (error) {
                        console.warn(error)
                    }
                }

                try {
                    document.getElementById("overlay").addEventListener('click', setupHandler);
                    document.getElementById("overlay-icons").addEventListener('click', setupHandler);


                } catch (error) {
                    console.warn(error)
                }
            }
        },
        async setupAudioContextAndNodes() {
            await Tone.start();
            await Tone.getContext().resume();
            await this.loadInstrumentPlayers()
            this.audioStarted = true
            console.log("LOADED")

        },
        async stopPlayback(type) {
            if (type == 'temperature') {
                soundscapePlayers.temperaturePlayers[0].stop()
                soundscapePlayers.temperaturePlayers[1].stop()
                this.temperature.isPlaying = false
                // this.temperature.time = soundscapePlayers.temperaturePlayers.

            }
            else if (type == 'weight') {
                soundscapePlayers.weightPlayers[0].stop()
                soundscapePlayers.weightPlayers[1].stop()
                this.weight.isPlaying = false

            }

            console.log('stop', type)

        },
        async startPlayback(type) {

            console.log('start', type)

            if (!this.audioStarted) {
                await this.setupAudioContextAndNodes()
            }

            if (this.soundscapesLoaded == false) {
                await this.loadSoundscapePlayers(type)
                this.soundscapesLoaded = true
                if (type == 'temperature') {
                    this.temperature.isPlaying = true
                } else if (type == 'weight') {
                    this.weight.isPlaying = true
                }
            } else {

                if (type == 'temperature') {
                    soundscapePlayers.temperaturePlayers[0].start(this.temperature.time)
                    soundscapePlayers.temperaturePlayers[1].start(this.temperature.time)
                    this.temperature.isPlaying = true

                }
                else if (type == 'weight') {
                    soundscapePlayers.weightPlayers[0].start(this.weight.time)
                    soundscapePlayers.weightPlayers[1].start(this.weight.time)
                    this.weight.isPlaying = true

                }
            }

        },
        async loadInstrumentPlayers() {
            try {

                const delay = new Tone.PingPongDelay(0.2, 0.15).toDestination()
                delay.wet.value = 0.2

                let i = 0
                for (const player in instrumentPlayers) {
                    let bufferObject = {}

                    for (let x = 0; x <= 8; x++) {
                        bufferObject[x] = require(`../assets/samples/instruments/${this.samplePaths.instruments[i]}/${x}.wav`)
                    }

                    instrumentPlayers[player] = {};

                    for (const [velocity, buffer] of Object.entries(bufferObject)) {
                        instrumentPlayers[player][velocity] = new Tone.GrainPlayer({
                            url: buffer,
                            // loop: false,
                            playbackRate: 1,
                            volume: 0,
                            // grainSize: 0.2,
                            // overlap: 0.1
                        }).connect(delay);
                    }
                    i++
                }
                console.log("Instrument Players Loaded", instrumentPlayers)
            } catch (error) {
                console.error("Error loading Moment Buffers:", error)
            }
        },

        async loadSoundscapePlayers(type) {
            try {
                let i = 0
                // eslint-disable-next-line
                let letterMap = ["a", "b"]

                for (const player in soundscapePlayers) {

                    crossFades[this.samplePaths.soundscapes[i]] = new Tone.CrossFade().toDestination()

                    for (let x = 0; x < 2; x++) {

                        let buffer = require(`../assets/samples/${this.samplePaths.soundscapes[i]}/${x}.mp3`)
                        let autostart = false

                        if (type == this.samplePaths.soundscapes[i] && type == 'temperature') {
                            autostart = true
                        } else if (type == this.samplePaths.soundscapes[i] && type == 'weight') {
                            autostart = true
                        }
                        soundscapePlayers[player][x] = await new Tone.Player({ url: buffer, loop: true, autostart: autostart, volume: -12 })

                        soundscapePlayers[player][x].connect(
                            x === 0
                                ? crossFades[this.samplePaths.soundscapes[i]].a
                                : crossFades[this.samplePaths.soundscapes[i]].b
                        );

                    }
                    crossFades[this.samplePaths.soundscapes[i]].fade.value = 0
                    i++
                }
                console.log("Soundscape Players Loaded", soundscapePlayers)
            } catch (error) {
                console.error("Error loading Moment Buffers:", error)
            }
        },
        updateVolume(value, name) {
            const fade = value / 100
            const crossFade = crossFades[name]
            if (crossFade) {
                crossFade.fade.value = fade
                console.log(fade, name, crossFade)
            }
        },
        async playInstrument(id) {

            if (!this.audioStarted) {
                await this.setupAudioContextAndNodes()
                return
            }

            const player = instrumentPlayers[this.activePlayer.name][id];
            let cents
            this.activePlayer.name == 'percussionPlayer'
                ? cents = (Math.random() * 200) - 100
                : cents = this.randomNote()

            console.log(cents)
            if (player) {
                player.detune = cents;
                player.start();
            } else {
                console.error(`No player found for id ${id}`);
            }
        },
        randomNote() {
            const id = parseInt(Math.random() * (this.notes.length - 1))
            const note = this.notes[id]
            const cents = this.keyCentMap[note]
            return cents
        },
        getStyle(topic) {
            return this.topicStyles[topic]
        },
    }
}
</script>
<style scoped>
.button-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 3px
}

.soundscape-slider {
    max-width: 400px;
    align-self: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    width: 100%;
    padding: 15px;

    margin: 15px 0;
    border-radius: 20px
}

.instrument-component {
    /* max-width: 800px; */
    padding: 15px 15px 0 15px;
    margin: 15px 0;
    border-radius: 20px;
    align-self: center;
}

h1 {
    padding-bottom: 1rem
}

.slider-icon {
    padding: 0 20px
}

.soundscape-slider .v-slider .v-input__details {
    display: none !important
}

.overlay {
    position: absolute;
    /* top: 0;x
    left: 0; */
    width: 100%;
    /* max-width: 427px; */
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* background: linear-gradient(0.25turn, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 5% 95%, rgba(0, 0, 0, 0) 100%); */

    /* Semi-transparent grey */
    z-index: 10;
    /* Above content */
    border-radius: 24px;
    cursor: pointer;
    /* border-radius: inherit; */
}


.component-content {
    padding: 2rem !important
}

.v-slider {
    margin-bottom: -22px
}
</style>