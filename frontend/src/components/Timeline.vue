<template>
    <v-timeline align="start" class="mx-10 my-6">
      <v-timeline-item
        v-for="(module, i) in content_modules"
        :key="i"
        :dot-color="getStyle(module.topic).color"
        size="small"
      >
        <template v-slot:opposite>
          <div
            :class="`pt-1 headline font-weight-bold text-${getStyle(module.topic).color}`"
            v-text="module.topic"
          ></div>
        </template>
        <div>
          <h2 :class="`mt-n1 headline font-weight-light mb-4 text-${getStyle(module.topic).color}`">
            {{ module.title }}
          </h2>
          <div>
            {{ module.text }}
          </div>
        </div>
      </v-timeline-item>
    </v-timeline>
  </template>
  <script>
    export default {
      name: "TimelineComponent",
      data: () => ({
        years: [
          {
            color: 'cyan',
            year: '1960',
          },
          {
            color: 'green',
            year: '1970',
          },
          {
            color: 'amber',
            year: '1980',
          },
          {
            color: 'cyan',
            year: '1990',
          },
          {
            color: 'green',
            year: '2000',
          },
        ],
        content_modules: [
            {
                topic: 'Natur',
                title: 'Flachs',
                text: 'Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.'
            },
            {
                topic: 'Technologie',
                title: 'Sensoren',
                text: 'Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.'
            },
            {
                topic: 'Mensch',
                title: 'Soziale Interaktion',
                text: 'Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.'
            },
            {
                topic: 'Natur',
                title: 'Nachhaltigkeit',
                text: 'Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.'
            },
        ],
        topicStyles: {
            Natur: {
                color: 'green'
            },
            Technologie: {
                color: 'cyan'
            },
            Mensch: {
                color: 'amber'
            }
        }
      }),
      methods: {
        getStyle (topic) {
            return this.topicStyles[topic]
        }
      }
    }
  </script>