<template>

    <div class="main-container mt-5 mx-5 mb-10" id="interactive-container">

        <div class="button-container rounded-2 my-3" elevation="5">
            <v-btn v-for="(id, n) in buttons" :key="n" class="rounded-pill"
                @click=playInstrument(id) style="min-width: 0px; padding: 0" :width="id*10" :height="id*10">
            </v-btn>
        </div>

        <v-card>
            <v-tabs v-model="activePlayer.name" align-tabs="center" color="#97B28A">
                <v-tab :value="'experimentalPlayer'">Experimental</v-tab>
                <v-tab :value="'percussionPlayer'">Percussion</v-tab>
                <v-tab :value="'gamePlayer'">Game</v-tab>
            </v-tabs>
        </v-card>
    </div>

</template>
<script>
import * as Tone from "tone";

let instrumentPlayers = {
    experimentalPlayer: null,
    percussionPlayer: null,
    gamePlayer: null
}

export default {
    name: 'InteractiveComponent',
    data: () => ({
        hasBeenClicked: false,
        samplePaths: {
            instruments: ["experimental", "percussion", "game"],
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
        activePlayer: { name: "gamePlayer" },

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
                        document.body.removeEventListener('click', setupHandler);

                        document.getElementById("interactive-container").removeEventListener('click', setupHandler);
                    } catch (error) {
                        console.warn(error)
                    }
                }

                try {
                    document.body.addEventListener('click', setupHandler);
                    document.getElementById("interactive-container").removeEventListener('click', setupHandler);
                } catch (error) {
                    console.warn(error)
                }
            }
        },
        async setupAudioContextAndNodes() {
            await Tone.start();
            await Tone.getContext().resume();
            await this.loadInstrumentPlayers()
            // await this.loadSoundscapePlayers()
        },
        async loadInstrumentPlayers() {
            try {
                let i = 0
                for (const player in instrumentPlayers) {
                    let bufferObject = {}

                    for (let x = 0; x <= 8; x++) {
                        bufferObject[x] = require(`../assets/samples/instruments/${this.samplePaths.instruments[i]}/${x}.wav`)
                    }
                    console.log(bufferObject)

                    instrumentPlayers[player] = new Tone.Players(bufferObject)
                    instrumentPlayers[player].toDestination()
                    console.log(i)
                    i++
                }
                console.log("Instrument Players Loaded", instrumentPlayers)
            } catch (error) {
                console.error("Error loading Moment Buffers:", error)
            }
        },
        playInstrument(id) {

            console.log(this.activePlayer.name)
            const player = instrumentPlayers[this.activePlayer.name].player(`${id}`)
            console.log(player)
            player.start(0)

            // TODO Pitch Random
        }
    }
}
</script>
<style>
.button-container {
    display: flex;
    flex-direction: row;
    align-items: top;
    flex-wrap: wrap;
    gap: 5px
}
</style>