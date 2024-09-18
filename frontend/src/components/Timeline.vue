<template>
  <div class="d-flex justify-center">
    <div class="scrolling-line" :style="backgroundStyle"></div>

    <v-timeline class="timeline mx-5 my-6" side="end" line-inset="20">


      <v-timeline-item
        v-for="(module, i) in content_modules"
        :key="i"
        :dot-color="getStyle(module.topic).color"
        fill-dot
        :icon="getStyle(module.topic).icon"
        icon-color="white"
      >        <v-card class="my-8">
          <v-card-title :class="['text-h4', `bg-${getStyle(module.topic).color}`, 'text-white']" text-color="white">
            {{ module.title }}
          </v-card-title>
          <!-- <v-card-subtitle :class="[`bg-${getStyle(module.topic).color}`, 'text-white']" text-color="white">
            {{ module.topic }}
          </v-card-subtitle> -->
          <v-card-text class="bg-white text--primary mt-4 ">
            <p>{{ module.text }}</p>
          </v-card-text>

          <v-divider></v-divider>

          <v-list-item
            append-icon="mdi-chevron-right"
            subtitle="Mehr lernen"
            link
            @click="module.overlay=true"
          ></v-list-item>

        </v-card>
        <v-dialog
          v-model=module.overlay
        >
          <v-card>
            <v-card-title :class="['text-h4', `bg-${getStyle(module.topic).color}`, 'text-white', 'px-6']" text-color="white">
              {{ module.title }}
            </v-card-title>
            <v-card-icon>
    
            </v-card-icon>
            <!-- <v-card-subtitle :class="[`bg-${getStyle(module.topic).color}`, 'text-white']" text-color="white">
              {{ module.topic }}
            </v-card-subtitle> -->
            <v-card-text class="bg-white text--primary my-5 px-6">
              <p>{{ module.overlayContent }}</p>
            </v-card-text>

            <v-divider></v-divider>

            <v-list-item
              prepend-icon="mdi-chevron-left"
              lines="two"
              subtitle="Zurück"
              link
              @click="module.overlay=false"
            ></v-list-item>

          </v-card>
        </v-dialog>
      </v-timeline-item>
    </v-timeline>

  </div>
</template>
  <script>

    export default {
      name: "TimelineComponent",
      data: () => ({
        content_modules: [
            {
                topic: 'Natur',
                title: 'Flachs',
                text: 'Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.',
                overlay: false,
                overlayContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
            },
            {
                topic: 'Technologie',
                title: 'Sensoren',
                text: 'Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.',
                overlay: false,
                overlayContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
            },
            {
                topic: 'Mensch',
                title: 'Soziale Interaktion',
                text: 'Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.',
                overlay: false,
                overlayContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
            },
            {
                topic: 'Natur',
                title: 'Nachhaltigkeit',
                text: 'Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.',
                overlay: false,
                overlayContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet."
            },
        ],
        topicStyles: {
            Natur: {
                color: 'green',
                icon: 'mdi-leaf',
            },
            Technologie: {
                color: 'cyan',
                icon: 'mdi-chip'
            },
            Mensch: {
                color: 'amber',
                icon: 'mdi-human-greeting-variant',
            }
        }
      }),
      computed: {
        backgroundStyle() {
          return {
            backgroundImage: `url(${require('../assets/rope2.jpg')})`
          };
        }
      },
      methods: {
        getStyle (topic) {
            return this.topicStyles[topic]
        },
      }
    }
  </script>

  <style>

    .timeline {
      max-width: 1000px;
      transform: translateX(-15px);
    }
    .scrolling-line {
      /* position: absolute */
      transform: translateX(40vw);
      background-repeat: repeat-Y;
      background-size: contain;
      width: 100%;
      max-width: 40px;
    }
  </style>