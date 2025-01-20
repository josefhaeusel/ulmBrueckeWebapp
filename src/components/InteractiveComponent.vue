<template>

    <div class="main-container my-5 mb-10 d-flex align-center justify-center" style="position: relative"
        id="interactive-container">
        <div v-if="!hasBeenClicked" class="overlay" id="overlay" @click="hasBeenClicked = true">
        </div>

        <div v-if="!hasBeenClicked" @click="hasBeenClicked = true"  id="overlay-icons"
            class="d-flex align-center justify-center position-absolute flex-column cursor-pointer">
            <p style="z-index:10; color: white; margin-bottom: 15px;">Press to play</p>
            <v-icon size="100" color="white" style="z-index:11" icon="mdi-music-clef-treble">
            </v-icon>
        </div>



        <div class="d-flex flex-column justify-center elevation-10 rounded-xl component-content px-5"
            style="margin-inline:24px">
            <div class="soundscape-slider pt-3">
                <v-icon color="blue" class="slider-icon" icon="mdi-snowflake"></v-icon>
                <v-slider @update:model-value="(event) => updateVolume(event, 'temperature')"></v-slider>
                <v-icon color="orange" class="slider-icon" icon="mdi-white-balance-sunny"></v-icon>
            </div>
            <div class="soundscape-slider">
                <v-icon color class="slider-icon" icon="mdi-feather"></v-icon>
                <v-slider @update:model-value="(event) => updateVolume(event, 'weight')"></v-slider>
                <v-icon class="slider-icon" icon="mdi-weight"></v-icon>
            </div>
            <!-- <v-slider></v-slider> -->

            <div class="button-container rounded-2 mb-5 mt-3 " elevation="5">
                <v-btn v-for="(id, n) in buttons" :key="n" class="rounded-pill" @click=playInstrument(id)
                    style="min-width: 0px; padding: 0" :width="id * 10" :height="id * 10"
                    :color="buttonColor[activePlayer.name].color">
                </v-btn>
            </div>

            <v-tabs v-model="activePlayer.name" fixed-tabs :color="buttonColor[activePlayer.name].color">
                <v-tab :value="'experimentalPlayer'">Experimental</v-tab>
                <v-tab :value="'percussionPlayer'">Percussion</v-tab>
                <v-tab :value="'gamePlayer'">Game</v-tab>
            </v-tabs>
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
                await this.setupAudioContextAndNodes();
            } else {

                const setupHandler = async () => {
                    try {
                        await this.setupAudioContextAndNodes();
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
            await this.loadSoundscapePlayers()

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

                    instrumentPlayers[player] = new Tone.Players(bufferObject)
                    instrumentPlayers[player].connect(delay)
                    i++
                }
                console.log("Instrument Players Loaded", instrumentPlayers)
            } catch (error) {
                console.error("Error loading Moment Buffers:", error)
            }
        },

        async loadSoundscapePlayers() {
            try {
                let i = 0
                // eslint-disable-next-line
                let letterMap = ["a", "b"]

                for (const player in soundscapePlayers) {

                    crossFades[this.samplePaths.soundscapes[i]] = new Tone.CrossFade().toDestination()

                    for (let x = 0; x < 2; x++) {
                        
                        let buffer = require(`../assets/samples/${this.samplePaths.soundscapes[i]}/${x}.wav`)
                        soundscapePlayers[player][x] = await new Tone.Player({url: buffer, loop: true, autostart: true, volume: -10})

                        soundscapePlayers[player][x].connect(
                            x === 0
                                ? crossFades[this.samplePaths.soundscapes[i]].a
                                : crossFades[this.samplePaths.soundscapes[i]].b
                        );
                        
                    }
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
            console.log(fade, name, crossFade)
            crossFade.fade.value = fade

            
        },
        playInstrument(id) {

            console.log(this.activePlayer.name)
            const player = instrumentPlayers[this.activePlayer.name].player(`${id}`)
            console.log(player)
            player.start(0)

            // TODO Pitch Random
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    width: 100%;
    margin: 20px 0
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
    max-width: 427px;
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

/* Disabled state for the component content */

.component-content.disabled {
    pointer-events: none;
    opacity: 0.5;
}

.v-slider {
    margin-bottom: -22px
}
</style>