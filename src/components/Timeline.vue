<template>
  <div class="main-container mt-5 mx-1 mb-10">

    <v-timeline class="timeline mx-1 my-6 w-100" side="end"
      :style='`transform: translateX(${timeline.timelinePositionX}); display: ${timeline.timelineDisplay}; opacity: ${timeline.timelineOpacity}`'>
      <v-timeline-item v-for="(module, i) in content_modules" :key="i" :dot-color="getStyle(module.topic).color"
        fill-dot :icon="getStyle(module.topic).icon" icon-color="white" class="w-100">
        <v-hover v-slot="{ isHovering, props }">
          <v-card class="my-8 cursor-pointer d-flex w-100" style="width: 70vw !important; max-width: 850px"
            @click="showExpansions(module)" :elevation="isHovering ? 16 : 2" v-bind="props">
            <!-- -->
            <div class="w-100 responsive-card">

              <div class="w-100">
                <v-card-title :style="{ backgroundColor: getStyle(module.topic).color }"
                  :class="['text-h4', `text-white`, 'w-100', 'text-wrap']" text-color="white">
                  {{ module.title }}
                </v-card-title>


                <v-parallax :src="require(`../assets/${module.cover}`)" class="align-end card-parallax w-100"
                  scale="0.95" :gradient="['rgba(0,0,0,0)', 'rgba(0,0,0,.2)', 'rgba(0,0,0,1)']"
                  :height="isHovering ? '400px' : '340px'">
                  <v-card-text class="text-white mt-4 w-100">
                    <span v-html="module.text"></span>
                  </v-card-text>
                </v-parallax>
              </div>

              <v-list-item link @click="showExpansions(module)"
                :style="`backgroundColor: ${getStyle(module.topic).hintergrundColor}; min-width: 60px`"
                :class="['text-white', 'd-flex', 'justify-center']">
                <v-icon icon="mdi-chevron-right-circle" size="large" :color="getStyle(module.topic).color"></v-icon>
              </v-list-item>

            </div>


          </v-card>
        </v-hover>
      </v-timeline-item>
    </v-timeline>

    <!-- Return -->
    <div class="w-100 mt-4" style="max-width:1000px !important">
      <v-btn v-for="(module, i) in content_modules" :key="i" v-show=module.showExpansion
        prepend-icon="mdi-chevron-left-circle" @click="hideExpansion(module)" size="large" rounded="xl" elevation=10
        class="my-3 ml-2" style="z-index:100; width: 280px" :color="getStyle(module.topic).color" variant="tonal">
        Zurück zur Timeline
      </v-btn>
    </div>

    <!-- Dots -->
    <div class="w-100 mt-4" style="max-width:1000px">
      <v-card-actions class="justify-space-between w-100" v-for="(module, i) in content_modules" :key="i"
        v-show=module.showExpansion>
        <v-btn icon="mdi-chevron-left" variant="plain" @click="prevCard(module); scrollFunktion()"></v-btn>
        <v-item-group v-model="module.expansionOnboarding" class="text-center" mandatory @click=scrollFunktion()>
          <v-item v-for="(card, n) in module.expansionCards" :key="`btn-${n}`" v-slot="{ isSelected, toggle }"
            :value="n">
            <v-btn :color="getStyle(module.topic).color" :variant="isSelected ? 'text' : 'plain'" icon="mdi-record"
              @click="toggle" size="2" class="dot-button"></v-btn>
          </v-item>
        </v-item-group>
        <v-btn icon="mdi-chevron-right" variant="plain" @click="nextCard(module); scrollFunktion()"></v-btn>
      </v-card-actions>
    </div>

    <!-- Cards -->
    <div style="max-width:1000px !important; display: flex; align-content: flex-end; flex-wrap: wrap !important;">

      <div v-for="(module, i) in content_modules" :key="i" v-show=module.showExpansion
        :style='`transform: translateX(${timeline.expansionPositionX}); display: ${timeline.expansionDisplay}; opacity: ${timeline.expansionOpacity}; min-height: ${module.minHeight}px`'
        class="expansion">

        <div>
          <v-window v-model="module.expansionOnboarding">
            <v-window-item v-for="(expansionCard, n) in module.expansionCards" :key="`card-${n}`" :value="n"
              style="padding: 0 20px">
              <v-card class="flex-column my-5 mx-1 expansion-card" elevation="4" style="max-width: 1000px"
                :data-module-index="n">
                <v-card-title v-if="expansionCard.title" :style="{ backgroundColor: getStyle(module.topic).color }"
                  :class="['text-h4', 'text-white', 'text-wrap']" text-color="white">
                  {{ expansionCard.title }}
                </v-card-title>

                <v-card-subtitle v-if="expansionCard.subtitle"
                  :style="{ backgroundColor: getStyle(module.topic).color }" :class="['text-white']" text-color="white">
                  {{ expansionCard.subtitle }}
                </v-card-subtitle>

                <div class="bg-white" :style="expansionCard.style" :class="expansionCard.class">

                  <div v-for="(content_block, id) in expansionCard.content_blocks" :key="id"
                    :style="content_block.parentstyle">
                    <!-- Adaptive Content -->

                    <v-card-text v-if="content_block.type === 'text'" :style="content_block.style"
                      :class="content_block.class" :elevation="content_block.elevation">
                      <p v-html="content_block.data"></p>
                    </v-card-text>


                    <a v-if="content_block.type === 'img'" :class="`${content_block.class} progressive replace`"
                      :href="require(`../assets/${content_block.data}`)" :style="`${content_block.style}`">
                      <img :src="require(`../assets/comp/${content_block.data}`)" class="preview" alt="image" />
                    </a>



                    <video v-if="content_block.type === 'video'" :src="require(`../assets/${content_block.data}`)"
                      controls :style="content_block.style" :class="content_block.class">
                    </video>

                  </div>
                </div>

              </v-card>
            </v-window-item>
          </v-window>


        </div>

      </div>
    </div>






  </div>
</template>
<script>


export default {
  name: "TimelineComponent",
  data: () => ({
    timeline: {
      showTimeline: true,
      timelinePositionX: '-15px',
      timelineDisplay: '',
      timelineOpacity: '1',

      expansionPositionX: '100%',
      expansionDisplay: '',
      expansionOpacity: '0',

      showSoundInformation: false,
    },
    content_modules: [
    {
        topic: 'intro',
        title: 'Editorial',
        showExpansion: false,
        cover: 'intro/Thumbnail_Editorial.jpg',
        expansionContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        expansionOnboarding: 0,
        minHeight: 700,
        expansionCards: [
          {
            class: 'architektur-1',
            content_blocks: [
              { type: 'video', data: 'intro/Intro Video.mp4', parentstyle: "display: flex; justify-content:center", style: `width:100%; max-width: 800px` },
            ]
          },
        ],
      },
      {
        topic: 'Brücke',
        title: 'Der Brückenbau',
        showExpansion: false,
        cover: 'brueckenbau/0_abzBruecke.png',
        expansionContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        expansionOnboarding: 0,
        minHeight: 750,
        expansionCards: [
          {
            title: 'Schritt für Schritt + Bauteil für Bauteil',
            class: 'architektur-1',
            content_blocks: [
              { type: 'video', data: 'brueckenbau/Brueckenproduktion.mp4', parentstyle: "display: flex; justify-content:center", style: "max-width:900px; width:80vw" },

            ]
          },
          {
            title: 'Die Brücke wird eingehängt ', class: "d-flex flex-column", content_blocks: [
              { type: 'video', data: 'brueckenbau/2_Bridge Hanging.mp4', parentstyle: "display: flex; justify-content:center", style: "max-width:900px; width:80vw" },
            ]
          },

          {
            title: "Jetzt braucht's noch ein Geländer",
            class: "d-flex align-center architektur-6 justify-center", content_blocks: [
              { type: 'img', data: 'brueckenbau/3_Gelaender_aussen.jpg', parentstyle: "display: flex; justify-content:center", style: "max-width: 500px; width: 100%" },
            ]
          },
          {
            class: 'architektur-1',
            content_blocks: [
              { type: 'img', data: 'brueckenbau/4_Gelaender innen.jpg', parentstyle: "display: flex; justify-content:center", style: "max-width: 550px; width: 100%" },
            ]
          },
          {
            class: 'architektur-1',
            content_blocks: [
              { type: 'img', data: 'brueckenbau/5_Gelaender innen closeup.jpg', parentstyle: "display: flex; justify-content:center", style: "max-width: 550px; width: 100%" },
            ]
          },
          {
            title: 'Fertig!',
            class: 'architektur-1 justify-center',
            content_blocks: [{ type: 'img', data: 'brueckenbau/2107-1024.jpg', parentstyle: "display: flex; justify-content:center", style: "max-width: 550px; width: 100%" },
            ]
          },

        ],
      },
      {
        topic: 'Flachspflanze',
        title: 'Flowerpower',
        showExpansion: false,
        cover: 'flachs/Leinenbluete_free copyright artlist.jpg',
        expansionContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        expansionOnboarding: 0,
        minHeight: 600,
        expansionCards: [
          {
            title: 'Seit 5000 Jahren im Einsatz',
            class: 'architektur-1',
            content_blocks: [
              { type: 'img', data: 'flachs/Seile.jpg', parentstyle: "display: flex; justify-content:center", style: "", class: 'uni-bilder' },
              { type: 'text', style: "max-width:500px", data: 'Flachs wird in Mitteleuropa seit Jahrtausenden angebaut. Bereits in der Steinzeit wurden Kleidung, Körbe, Seile und vieles mehr daraus hergestellt.' },
              { type: 'img', data: 'flachs/Netz_steinzeitlich.jpg', parentstyle: "display: flex; justify-content:center", style: "", class: 'uni-bilder' },]
          },
          {
            title: 'Handarbeit: Von der Faser zum Seil',
            class: "d-flex align-center flex-column", content_blocks: [
              { type: 'video', data: 'flachs/Flachs_DE_Neu.mp4', parentstyle: "display: flex; justify-content:center", style: "max-width:700px; width:80vw" },
            ]
          },
          {
            title: 'Mit Fasern bauen',
            class: 'architektur-1',
            content_blocks: [
              { type: 'text', data: 'Heute erlebt die Nutzpflanze ihre „zweite Blüte“ als nachwachsender Roh- und Baustoff.<br><br> Flachs ist äußerst vielseitig und einfach zu verarbeiten. In der wortwörtlichen Zerreißprobe punktet Flachs gegenüber den meisten anderen Pflanzenfasern: Die Fasern haben eine sehr hohe Zugfestigkeit und sind zugleich elastisch.' },
            ]
          },
          { title: 'Jedes Jahr aufs Neue',
            class: "d-flex align-center architektur-3", content_blocks: [
              { type: 'img', data: 'flachs/Getrockneter Flachs.jpg', parentstyle: "display: flex; justify-content:center", style: "width:100%; max-width: 400px", class: 'gelaender-3' },
              { type: 'text', style: "max-width:500px", data: 'Bei nachwachsenden Baumaterialien denken die wenigsten Menschen an Fasern, sondern meist an Holz.<br><br> Gegenüber Holz hat Flachs aber einen großen Vorteil: Die Pflanze kann jedes Jahr geerntet werden. Auch deshalb haben Fasern ein großes Potenzial für das künftige Bauen.' }]
          },
          {
            title: 'Zurück in die Zukunft',
            class: 'architektur-1',
            content_blocks: [
              { type: 'text', data: 'Jetzt gilt es, die Vorteile der altbewährten Fasern zu sehen und sie mit Hightech zu kombinieren.' },
            ]
          },
          {
            title: 'Roboterfertigung: Vom Seil zum Geländer',
            class: "d-flex align-center flex-column", content_blocks: [
              { type: 'video', data: 'flachs/Roboter_Neu.mp4', parentstyle: "display: flex; justify-content:center", style: "max-width:700px; width:80vw" },
            ]
          },
        ]
      },
      {
        topic: 'zweiWelten',
        title: 'Das Beste aus zwei Welten',
        showExpansion: false,
        cover: 'Biokomposit/0_Biokomposit.jpg',
        expansionContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        expansionOnboarding: 0,
        minHeight: 700,
        expansionCards: [
          {
            title: 'Clever kombiniert',
            class: 'architektur-1',
            content_blocks: [
              { type: 'text', data: 'Verbundwerkstoffe bestehen aus zwei oder mehr Materialien. Dabei hat jedes Material besondere Eigenschaften. Im Verbund werden diese Eigenschaften gezielt zusammengeführt.<br><br> Auch beim Bau der Ulmer Brücke kam ein Verbundwerkstoff zum Einsatz.' },
            ]
          },
          {
            title: 'Eins plus Eins',
            class: "d-flex align-center architektur-3", content_blocks: [
              { type: 'img', data: 'Biokomposit/Bild1.png', parentstyle: "display: flex; justify-content:center", style: "width:100%; max-width: 400px", class: 'gelaender-3' },
              { type: 'text', style: "max-width:500px", data: 'Aus Flachsfasern werden Matten gewoben.<br> Das ist der eine Bestandteil …' }]
          },
          {
            class: "d-flex align-center architektur-3", content_blocks: [
              { type: 'img', data: 'Biokomposit/Harz.jpg', parentstyle: "display: flex; justify-content:center", style: "width:100%; max-width: 400px", class: 'gelaender-3' },
              { type: 'text', style: "max-width:500px", data: '… dazu kommt ein bio-basiertes Epoxidharz.' }]
          },
          {
            title: 'Gemeinsam stark',
            class: "d-flex align-center architektur-3", content_blocks: [
              { type: 'img', data: 'Biokomposit/Still.jpg', parentstyle: "display: flex; justify-content:center", style: "width:100%; max-width: 400px", class: 'gelaender-3' },
              { type: 'text', style: "max-width:500px", data: 'In dieser Kombination entsteht ein hochstabiler Werkstoff – aus dem man sogar Brücken bauen kann.' }]
          },
          {
            title: 'Stabil in alle Richtungen',
            class: "d-flex align-center flex-column", content_blocks: [
              { type: 'video', data: 'Biokomposit/Biokomposit Animation_Stabil.mp4', parentstyle: "display: flex; justify-content:center", style: "max-width:700px; width:80vw" },
              { type: 'text', style: "max-width:500px", data: 'Das Material zeigt hervorragende Eigenschaften: Die Flachsfasern halten hohe Zugbelastungen aus. Das Harz widersteht hohem Druck. Zusammen bilden sie eine unschlagbare Einheit.' },
            ]
          },
          {
            title: 'Flachsfasern ganz groß',
            class: 'architektur-1',
            content_blocks: [
            { type: 'img', data: 'Biokomposit/fasern.jpg', style: `margin-bottom: -10px; width:100%; max-width: 550px;`, class: 'aart-portrait' },
            ]
          },
          {
            title: 'Innovation mit Leichtigkeit',
            class: "d-flex align-center architektur-3", content_blocks: [
              { type: 'img', data: 'Biokomposit/GewichtGrafik.jpg', parentstyle: "display: flex; justify-content:center", style: "width:100%; max-width: 400px", class: 'gelaender-3' },
              { type: 'text', style: "max-width:500px", data: 'Dabei ist der Verbundwerkstoff enorm leicht: Die Brücke in Ulm wiegt nur ein Sechstel einer vergleichbaren Stahlbrücke.' }]
          },
          {
            class: "d-flex align-center architektur-3", content_blocks: [
              { type: 'img', data: 'Biokomposit/TreibhausGrafik.jpg', parentstyle: "display: flex; justify-content:center", style: "width:100%; max-width: 500px", class: 'gelaender-3' },
              { type: 'text', style: "max-width:500px", data: 'Durch die leichte Bauweise und den Einsatz von Flachs als nachwachsendem Rohstoff hat die Brücke in Ulm einen kleineren CO2-Fußabdruck als eine konventionelle Brücke.<br><br> Leichtbau = Materialeinsparung = weniger CO2.' }]
          },
        ]
      },
      {
        topic: 'Learning',
        title: 'Learning by Doing',
        text: '',
        showExpansion: false,
        cover: 'learningByDoing/Idee Test Test.png',
        expansionContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        expansionOnboarding: 0,
        minHeight: 600,
        expansionCards: [
          {
            title: 'Prof. Aart Willem Van Vuure',
            subtitle: "Katholische Universität Leuven, Belgien",
            class: 'architektur-1',
            content_blocks: [
              { type: 'img', data: 'learningByDoing/2_Aart Portrait 1zu1.jpg', parentstyle: "display: flex; justify-content:center", style: `width:100%; max-width: 350px` },
              { type: 'text', data: 'Aart ist einer der führenden Experten für neue bio-basierte Materialien in Europa.<br><br> Mit seinem Team arbeitet er daran, diese Werkstoffe noch leistungsfähiger zu machen.' },
            ]
          },
          {
            title: 'Zerreißprobe!',
            class: "d-flex align-center flex-column", content_blocks: [
              { type: 'video', data: 'learningByDoing/Spannung_FINAL_Deutsch.mp4', parentstyle: "display: flex; justify-content:center", style: "max-width:700px; width:80vw" },
            ]
          },
          {
            title: 'Mit unzähligen Material-Versuchen an der Uni in Leuven hat Aart die Vorarbeiten zur Ulmer Brücke begleitet.',
            class: 'architektur-1',
            //content_blocks: [{ type: 'text', data: 'Weiter klicken und Einblicke bekommen:' }]
          },
          {
            title: 'Wind und Wetter trotzen',
            class: "d-flex align-center flex-column", content_blocks: [
              { type: 'video', data: 'learningByDoing/Nebel_FINAL_Deutsch.mp4', parentstyle: "display: flex; justify-content:center", style: "max-width:700px; width:80vw" },
            ]
          },
          {
            title: 'Material-Proben werden auf den Mikrometer genau untersucht',
            class: "d-flex align-center flex-column", content_blocks: [
              { type: 'video', data: 'learningByDoing/Struktur_FINAL_Deutsch.mp4', parentstyle: "display: flex; justify-content:center", style: "max-width:700px; width:80vw" },
            ]
          },
          {
            class: 'architektur-1',
            content_blocks: [
              { type: 'text', data: 'Es braucht viele Ideen und Ausdauer, aber manchmal auch ein bisschen Glück, um Werkstoffe so zu entwickeln, damit sie in einem anspruchsvollen Bauwerk wie einer Brücke eingesetzt werden können.<br><br> Außerdem braucht es den intensiven Austausch zwischen Entwicklern und Konstrukteuren.' },
            ]
          },
          {
            title: 'Wouter Claassen',
            subtitle: "Technical University Eindhoven / Witteveen+Bos, Netherlands",
            class: 'architektur-1',
            content_blocks: [{ type: 'img', data: 'learningByDoing/Wouter Portrait_no copyright.jpg', style: `width:100%; max-width: 350px`, },
            { type: 'text', data: 'Wouter, der Senior Design Lead der Ulmer Brücke, ging mit seinem Team die nächsten Schritte.<br><br> Er macht die Tests an den großen Bauteilen der Brücke.' },
            ]
          },
          {
            title: 'Was hält der Träger aus?',
            class: 'architektur-1',
            content_blocks: [
              { type: 'img', data: 'learningByDoing/Belastung orange.png', parentstyle: "display: flex; justify-content:center", style: `width:100%; max-width: 800px` },
              { type: 'text', data: 'Bei den Untersuchungen geht es rau zu: Mit extrem hohem Druck werden die Brückenträger getestet. Welche Belastung hält der Werkstoff aus?' },
            ]
          },
          {
            title: 'Die Brücke als Wegbereiter',
            class: 'architektur-1',
            content_blocks: [
              { type: 'text', data: '„Durch all diese Tests lernen wir das Material immer besser kennen.<br><br> Wir können sein Verhalten vorhersagen und unsere mathematischen Modelle immer weiter entwickeln. Mit den Modellen können wir Ingenieure zum Beispiel das Tragverhalten der Brücke berechnen.<br><br> Damit leistet die Brücke in Ulm einen Beitrag für die nächsten Bauprojekte, die den Klimaschutz und die Kreislaufwirtschaft noch weiter vorantreiben.” <br> <br> <br> Wouter Claassen, Universität Eindhoven ' },
            ]
          },
          {
            title: 'Belastungstest bestanden!',
            class: 'architektur-1',
            content_blocks: [{ type: 'img', data: 'learningByDoing/11_Belastungstest.jpg', style: `margin-bottom: -10px; width:100%; max-width: 900px`, class: 'aart-portrait' },
            { type: 'text', data: '24 Tonnen hält die Ulmer Brücke aus – und erfüllt damit die Anforderungen an Fahrrad- und Fußgängerbrücken in Europa.<br><br> Und noch mehr: Sie ist weltweit die erste Brücke dieser Art, die auch Fahrzeuge der Stadtverwaltung überqueren können.' },
            ]
          },
        ],
      },
      {
        topic: 'Ermöglicher',
        title: 'Die Möglichmacher',
        showExpansion: false,
        cover: 'Moeglichmacher/0_Ortsschild Ulm ohne Copyright.png',
        expansionContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        expansionOnboarding: 0,
        minHeight: 700,
        expansionCards: [
          {
            title: 'Tim von Winning',
            subtitle: "Baubürgermeister, Ulm",
            class: 'architektur-1',
            content_blocks: [
              { type: 'video', data: 'Moeglichmacher/Tim von Winning_DE.mp4', parentstyle: "display: flex; justify-content:center", style: `width:100%; max-width: 800px` },
              { type: 'text', data: 'Warum ist die Stadt Ulm Teil des Smart Circular Bridge Projekts?' },
            ]
          },
          {
            title: 'Tragende Elemente', class: "d-flex flex-column", style: "max-width: 550px", content_blocks: [
              { type: 'img', data: 'Moeglichmacher/2_Europkarte ohne Copyright.png', parentstyle: "display: flex; justify-content:center;", style: `width:100%; max-width: 1100px` },
              { type: 'text', data: 'Für ambitionierte Projekte braucht es eine Menge engagierter Leute. Hinter der Smart Circular Bridge steht ein europaweites Team aus fünf Universitäten, sieben innovativen Unternehmen und drei Städten. Über Ländergrenzen hinweg fließen einzigartige Kompetenzen in der Brücke über die „Kleine Blau“ in Ulm zusammen.' },
            ]
          },
          {
            title: 'Ambitionierte Ziele',
            class: 'architektur-1',
            content_blocks: [{ type: 'text', data: 'Die erste Smart Circular Bridge in den Niederlanden war ein großer Erfolg.<br><br> In Ulm wollte man noch einen Schritt weitergehen: Die Brücke sollte noch leistungsfähiger werden – und der Bio-Anteil im Epoxidharz deutlich steigen, um den CO2-Fußabdruck weiter zu verkleinern.”<br><br> Doch innovative Projekte bringen immer auch Herausforderungen mit sich.' },
            ]
          },
          {
            title: ":( Rückschlag und …",
            class: "d-flex flex-column architektur-5", content_blocks: [
              { type: 'video', data: 'Moeglichmacher/Animation_Reuckschlaege.mp4', parentstyle: "display: flex; justify-content:center", style: "max-width:700px; width:80vw" },
              { type: 'text', data: 'Beim Bau des Brückenkörpers kam es zu einem Problem. Aufgrund der neuen Materialmischung wurde das Harz beim Aushärten zu warm – und die Naturfasern” deshalb zu spröde.<br><br> Der Brückenkörper musste neu gebaut werden. Eine optimierte Materialzusammensetzung und eine neue Konstruktion führten zum entscheidenden…', parentstyle: "display: flex; justify-content:center", style: "max-width:700px" },
            ]
          },
          {
            title: "… Erfolg! :)",
            class: "d-flex flex-column architektur-5", content_blocks: [
              { type: 'video', data: 'Moeglichmacher/Animation_Auto.mp4', parentstyle: "display: flex; justify-content:center", style: `max-width: 700px; width: 100%` },
              { type: 'text', data: 'Jetzt ist sie die erste Brücke weltweit aus diesem Werkstoff, über die Kraftfahrzeuge fahren können. Die Brücke ist viel leichter und noch stabiler als ihre Vorgänger.', parentstyle: "max-width:700px; display: flex; justify-content:center" },
            ]
          },
          {
            title: 'Wegbereiter',
            class: 'architektur-1',
            content_blocks: [
              { type: 'text', data: 'Dank der Leichtbauweise wiegt die Brücke deutlich weniger als eine konventionelle Konstruktion. Sie wiegt nur 5 Tonnen, kann aber mehr als 24 Tonnen tragen – und das geringe Gewicht und die nachwachsenden Rohstoffe reduzieren den CO2- Fußabdruck.<br><br> Mit der neuen Version der Smart Circular Bridge hat die Stadt Ulm den Weg bereitet für ganz neue Einsatzmöglichkeiten von Biokompositen. Aus dem Material können künftig auch Häuser gebaut werden oder andere anspruchsvolle Bauwerke.' },
            ]
          },
          {
            title: 'Auf die Kommunen kommt es an',
            class: 'architektur-1',
            content_blocks: [
              { type: 'img', data: 'Moeglichmacher/Kommunen-WortBildMarke.png', style: `margin-bottom: -10px; width:100%; max-width: 1000px`, class: 'aart-portrait' },
              { type: 'text', data: 'Auf das Konto der Bauwirtschaft geht weltweit rund ein Drittel aller CO2-Emissionen. Die Branche ist auch ein Spitzenreiter bei Ressourcenverbrauch und Abfallaufkommen.<br><br> Kommunen müssen täglich ganz konkrete Lösungen für Bauaufgaben finden. Durch innovative Projekte tragen sie dazu bei, die Herausforderungen der Gesellschaft zu meistern.' },
            ]
          },
        ],
      },
      {
        topic: 'Architektin',
        title: 'Der Konstrukteur',
        text: '<em>„Noch leichter, noch leistungsfähiger!“</em> - Wouter Claasen',
        showExpansion: false,
        cover: 'konstrukteur/Wouter Portrait_no copyright.jpg',
        expansionContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        expansionOnboarding: 0,
        minHeight: 700,
        expansionCards: [
          {
            title: 'Wouter Claasen',
            subtitle: "Technical University Eindhoven / Witteveen+Bos, Netherlands",
            class: 'architektur-1',
            content_blocks: [{ type: 'img', data: 'konstrukteur/Wouter Portrait_no copyright.jpg', style: "min-width: 350px; max-width: 500px", class: 'hanna-portrait' },
            { type: 'text', data: 'Wouter ist der Senior Design Lead der Brücke. Sein Ziel war es, die Ulmer Brücke noch leichter und leistungsfähiger zu machen als ihre Vorgängerin in Almere, Niederlande.' },
            ]
          },
          {
            title: 'Innere Werte', class: "d-flex flex-column", content_blocks: [
              { type: 'img', data: 'konstrukteur/innere_werte.png', parentstyle: "display: flex; justify-content:center", style: "width:100%; max-width: 700px", class: '' },
              { type: 'text', style: "max-width:700px", data: 'Wouter hat eine klare Konstruktion gewählt: Die Brücke besteht aus einer Bodenplatte, acht Hauptträgern, drei Querspanten und einer Deckplatte – und alle Teile sind aus Flachsfasern und bio-basiertem Epoxidharz hergestellt.' }]
          },
          {
            title: 'Tragende Rolle', class: "d-flex flex-column", content_blocks: [
              { type: 'video', data: 'konstrukteur/CAD Modell.mp4', parentstyle: "display: flex; justify-content:center", style: "width:100%; max-width: 700px", class: '' },
              { type: 'text', style: "max-width:700px", data: 'Wouter hat die Belastbarkeit der Brücke genau berechnet und durch Simulationen überprüft: Wie stark muss sie an welcher Stelle sein?' }]
          },
          {
            title: 'Die Brücke hält viel aus', class: "d-flex flex-column", content_blocks: [
              { type: 'video', data: 'konstrukteur/Loadtest Timelapse.mp4', parentstyle: "display: flex; justify-content:center", style: "width:100%; max-width: 700px", class: '' }
            ]
          },
          {
            title: "Daten für die nächsten Brücken", class: "d-flex align-center architektur-4", content_blocks: [
              { type: 'img', data: 'konstrukteur/kabel.jpg', parentstyle: "display: flex; justify-content:center", style: "",  },
              { type: 'text', style: "max-width:500px", data: 'Die Smart Circular Bridge enthält 42 Sensoren, die mit KI ausgewertet werden. Mit den Sensoren wird die Brücke im Alltag kontinuierlich untersucht.<br><br> Die Daten helfen Wouter und anderen Konstrukteuren, künftige Bauwerke aus dem neuen Werkstoff weiter zu optimieren.' },
            ]
          },
          {
            title: "Sehen, was gerade passiert",
            class: "d-flex flex-column", content_blocks: [
              { type: 'img', data: 'konstrukteur/Dashbord Screenshot Ulm.png', parentstyle: "display: flex; justify-content:center", style: "max-width: 750px; width: 100%" },
              { type: 'text', style: "max-width: 500px", data: 'Die Sensor-Daten kann übrigens jeder <a href=https://dashboard.smartcircularbridge.eu/d/ulm> auf einem Dashboard </a>anschauen – und das nahezu in Echtzeit! <br><br> Die Daten kann man übrigens auch …' },
            ]
          },

          {
            title: "… hören.", class: "d-flex align-center flex-column", content_blocks: [
              { type: 'video', data: 'konstrukteur/Rohdaten.mp4', parentstyle: "display: flex; justify-content:center", style: "max-width:700px; width:80vw" },
              // { type: 'text', data: 'Hanaas Projekte zeigen das große Potenzial biobasierter Materialien.', parentstyle: "display: flex; justify-content:center", style: "max-width:700px" },
            ]
          },
        ]
      },
      {
        topic: 'Architektin',
        title: 'Die Architektin',
        text: '<em>"Diese Materialentwicklung ist der Anfang einer neuen Art zu bauen."</em> - Hanaa Dahy',
        showExpansion: false,
        cover: 'architekt/Portrait-Dahy_Variation 01.jpg',
        expansionContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        expansionOnboarding: 0,
        minHeight: 765,
        expansionCards: [
          {
            title: 'Prof. Dr. Hanaa Dahy',
            subtitle: "Universität Stuttgart & Universität Aalborg",
            class: 'architektur-1',
            content_blocks: [{ type: 'img', data: 'architekt/Portrait-Dahy.jpg', style: "min-width: 350px; max-width: 500px", class: 'hanna-portrait' },
            { type: 'text', data: 'Seit vielen Jahren entwickelt Hanaa Dahy bio-basierte Werkstoffe für das Bauen. Mit vielen Partnern aus Wissenschaft und Industrie erforscht die Architektin immer neue Anwendungen vom Möbelbau bis zur Fassade. Sie hat auch die Ulmer Brücke mitgeprägt.' },
            ]
          },
          {
            title: 'Von Hanaa stammt übrigens auch ...', class: "d-flex flex-column", content_blocks: [
              { type: 'img', data: 'architekt/3 BioMat.jpg', parentstyle: "display: flex; justify-content:center", style: "width:100%; max-width: 700px", class: '' },
              { type: 'text', style: "max-width:700px", data: '... die Idee, so ein besonderes Geländer in Ulm einzusetzen. Die Streben des Geländers bestehen auch aus Flachsfasern. Zum Schutz sind sie mit einem bio-basierten Epoxidharz ummantelt. <br><br> Diese Idee wiederum stammt…' }]
          },
          {
            class: "d-flex align-center architektur-3", content_blocks: [
              { type: 'img', data: 'architekt/4_FibR.png', parentstyle: "display: flex; justify-content:center", style: "width:100%; max-width: 400px", class: 'gelaender-3' },
              { type: 'text', style: "max-width:500px", data: '... von Kollegen an der Uni in Stuttgart. Sie entwickelten ein neues Herstellungsverfahren für das Bauen mit Fasern. <br><br> Diese Idee wiederum fanden mehrere Leute spannend und gründeten ein Start-up: FibR. Das junge Unternehmen hat das Brückengeländer in Ulm hergestellt.' }]
          },
          {
            class: "d-flex align-center architektur-4", content_blocks: [
              { type: 'img', data: 'architekt/5-1_ICD.png', parentstyle: "display: flex; justify-content:center", style: "margin-bottom: -10px", class: 'uni-bilder' },
              { type: 'text', style: "max-width:500px", data: 'Mit diesem neuen Herstellungsverfahren lassen sich Gebäude mit einer ganz eigenen Ästhetik gestalten, wie hier in Wangen auf dem Gelände der Landesgartenschau 2024.' },
              { type: 'img', data: 'architekt/5-2_ICD.png', parentstyle: "display: flex; justify-content:center", style: "margin-bottom: -10px", class: 'uni-bilder' },]
          },
          {
            title: "Material und Formensprache",
            class: "d-flex align-center architektur-5", content_blocks: [
              { type: 'img', data: 'architekt/6_Flexible Forms.jpg', parentstyle: "display: flex; justify-content:center", style: "max-width: 500px; width: 100%" },
              { type: 'text', style: "max-width: 500px", data: 'Bio-basierte Werkstoffe erlauben Designern und Architekten vielfältige Formen. <br><br> Alle Materialien, egal ob Beton, Stahl oder Holz, haben typische Eigenschaften. Diese Eigenschaften führen bei jeder Materialart zu ganz bestimmten Formen beim Bauen. So sehen Brücken aus Stahl anders aus als Brücken aus Beton. <br><br> Die Formensprache dieser Materialien wurde vor über hundert Jahren entwickelt. ' },
            ]
          },
          {
            title: 'Jetzt gilt es, die Formensprache für Bio-Verbundwerkstoffe zu entdecken.',
            class: "d-flex align-center architektur-6", content_blocks: [
              { type: 'img', data: 'architekt/7_1 BioMat Universität Stuttgart.jpg', parentstyle: "display: flex; justify-content:center", style: "max-width: 390px; width: 100%" },
              { type: 'text', style: "max-width: 350px", data: 'Hier ein Beispiel von Hanaa: Was aussieht wie Metall, ist in Wirklichkeit ein Werkstoff aus Pflanzenfasern und bio-basiertem Epoxidharz: elegant, leicht und äußerst stabil!' },
              { type: 'img', data: 'architekt/7_2 BioMat Universität Stuttgart.jpg', parentstyle: "display: flex; justify-content:center", style: "max-width: 390px;  width: 100%" },
            ]
          },
          {
            class: "d-flex align-center flex-column", content_blocks: [
              { type: 'video', data: 'architekt/Slideshow_Architektin.mp4', parentstyle: "display: flex; justify-content:center", style: "max-width:700px; width:80vw" },
              { type: 'text', data: 'Hanaas Projekte zeigen das große Potenzial bio-basierter Materialien.', parentstyle: "display: flex; justify-content:center", style: "max-width:700px" },
            ]
          },
        ]
      },
      {
        topic: 'Circular',
        title: 'Die Brücke als Verwandlungskünstler',
        text: 'Gestern PET-Flasche, heute Brücke, morgen Rohstoff für neue Ideen.',
        showExpansion: false,
        cover: 'circularEconomy/plastikflasche.jpg',
        expansionContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        expansionOnboarding: 0,
        minHeight: 750,
        expansionCards: [
          {
            title: 'Der Ursprung der Brücke',
            class: 'architektur-1',
            content_blocks: [
              { type: 'text', data: 'Die Brücke besteht zum einen aus einem nachwachsenden Rohstoff, den Flachsfasern. Und zum anderen aus rezyklierten PET-Flaschen und einem Epoxidharz, das zu 25 Prozent bio-basiert ist. <br><br> Als Handlauf kommt Bongossi-Holz zum Einsatz, das aus dem Rückbau eines anderen Bauwerks in Ulm stammt. <br><br> Die Brücke aus nachwachsenden und rezyklierten Rohstoffen wird viele Jahrzehnte lang Menschen über die „Kleine Blau“ tragen. Und dann?' },
            ]
          },
          {
            title: 'Vom Ende her denken',
            class: 'architektur-1',
            content_blocks: [{ type: 'text', data: 'Was geschieht mit dem wertvollen Material nach dem Lebensende der Brücke? <br><br> Für eine echte Kreislaufwirtschaft müssen Produkte vom Ende her gedacht werden: Wie lassen sich die eingesetzten Rohstoffe später wieder nutzen oder sogar ganze Bauteile weiterverwenden?' },
            { type: 'img', data: 'circularEconomy/KreislaufwirtschaftGrafik.png', style: `width:100%; max-width: 500px` },
            ]
          },
          {
            title: 'Das nächste Leben',
            class: 'architektur-1',
            content_blocks: [{ type: 'text', data: 'Ein wichtiger Teil des Forschungsprojekts war deshalb, die Recyclingfähigkeit der Brücke zu untersuchen. <br><br> Was könnte man am Ende mit ihr machen?' },
            ]
          },
          {
            title: 'Mechanisches Recycling',
            class: 'architektur-1',
            content_blocks: [
              { type: 'img', data: 'circularEconomy/Mechanisches Recycling.jpg', style: `width:100%; max-width: 500px` },
              { type: 'text', data: 'Man kann die Brückenteile zermahlen und das Granulat als Füllstoff in anderen Verbund-Werkstoffen einsetzen.' },
            ]
          },
          {
            title: 'Chemisches Recycling',
            class: "d-flex flex-column",
            content_blocks: [
              { type: 'video', data: 'circularEconomy/Chemisches Recycling.mp4', parentstyle: "display: flex; justify-content:center", style: "width:100%; max-width: 700px", class: '' },
              { type: 'text', data: 'Die Bestandteile der Brücke können chemisch in ihre Moleküle zerlegt werden. Aus diesen Molekülen lassen sich neue Produkte herstellen.', style: "max-width:700px", },
            ]
          },
          {
            title: 'Chemisches Recycling',
            class: 'architektur-1',
            content_blocks: [
              { type: 'img', data: 'circularEconomy/biochar.jpg', style: `width:100%; max-width: 900px` },
              { type: 'text', data: 'Die Brückenteile können bei definierten Temperaturen in Kohlenstoff verwandelt werden – als Ausgangspunkt für zahlreiche neue Produkte.' },
            ]
          },
          {
            title: 'Biologisches Recycling',
            class: 'architektur-1',
            content_blocks: [
              { type: 'img', data: 'circularEconomy/mycelium.jpg', style: `width:100%; max-width: 900px` },
              { type: 'text', data: 'Ein ganz neuer Weg ist, die Brücke zu zermahlen und als Nahrungsgrundlage für Pilze zu nutzen. Diese übernehmen die biologische Umwandlung des Materials in neue Rohstoffe. Damit dies gelingt, ist allerdings noch viel Forschung nötig.' },
            ]
          },
          {
            title: 'Fortschritt im Kreis',
            class: 'architektur-1',
            content_blocks: [
              { type: 'text', data: 'Bio-basierte Rohstoffe und Rezyklate verbessern die CO2-Bilanzen von Produkten und Bauwerken. Außerdem schonen sie primäre Ressourcen. Es lohnt sich, im Kreis zu denken!' },
              { type: 'img', data: 'circularEconomy/Fortschritt im Kreis_schwarz.png', style: `width:100%; max-width: 500px`, },
            ]
          },
        ],
      },
      {
        topic: 'Ursprung',
        title: 'Rijk Blok: der Vater der Idee',
        text: 'Jede gute Geschichte beginnt mit einer Vision. So auch die Geschichte der Smart Circular Bridge.',
        showExpansion: false,
        cover: 'Visionaer/Portrait Rijk Blok Copyright Smart Circular Bridge.jpg',
        expansionContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        expansionOnboarding: 0,
        minHeight: 600,
        expansionCards: [
          {
            title: 'Professor Rijk Blok',
            subtitle: "Technische Universität Eindhoven",
            class: 'architektur-1',
            content_blocks: [
              { type: 'text', data: 'Vor über zehn Jahren stellte Rijk sich die Frage: „Wie können wir den Klimaschutz beim Bauen mit nachwachsenden Rohstoffen voranbringen?“ <br><br> Gemeinsam mit seinem Kollegen Prof. Dr. Patrick Teuffel untersuchte er traditionelle Werkstoffe. Denn auch Altbewährtes kann spannende Lösungen für die Zukunft bieten.' },
            ]
          },
          {
            title: 'Flachs im Fokus', class: "d-flex flex-column", content_blocks: [
              { type: 'text', data: 'Rijk und sein Team kombinierten Flachsfasern mit einem bio-basierten Epoxidharz. Dabei entsteht ein Verbundwerkstoff, das sowohl leicht als auch extrem stabil ist – und sich in Bauwerken locker mit Aluminium oder Stahl messen kann.' },
            ]
          },
          // {
          //   title: 'Flachs im Fokus',
          //   class: 'architektur-1',
          //   content_blocks: [{ type: 'img', data: 'Visionaer/6_Platzhalter.png', style: `margin-bottom: -10px; width:100%; max-width: 500px`, },
          //   { type: 'text', data: 'Rijk und sein Team kombinierten Flachsfasern mit einem speziellen Harz. So entsteht ein Material, das sowohl leicht als auch extrem stabil ist – und sich in Bauwerken locker mit Aluminium oder Stahl messen kann.' },
          //   ]
          // },
          {
            title: 'Manchmal muss man einfach machen',
            class: 'architektur-1',
            content_blocks: [{ type: 'img', data: 'Visionaer/FP license TUe biocomposiet brug TU.png', style: `width:100%; max-width: 900px`, },
            { type: 'text', data: 'Zusammen mit Patrick, mit Studierenden und mit Partnern aus Hochschulen und Wirtschaft setzte Rijk seine Vision in die Tat um: Die erste Brücke aus Flachsfasern und Harz entsteht 2016 auf dem Gelände der Universität Eindhoven.' },
            ]
          },
          {
            title: 'Manchmal muss man einfach machen',
            class: 'architektur-1',
            content_blocks: [{ type: 'img', data: 'Visionaer/Test Uni einhoven-copyright Rijk Blok.png', style: `margin-bottom: -10px; width:100%; max-width: 900px`, },
            { type: 'text', data: 'Zahlreiche Tests am Material und der Konstruktion zeigen: Der Sprung von der Vision zur Praxis funktioniert. Die Idee trägt – und wie!' },
            ]
          },
          {
            title: "Erfindergeist lohnt sich",
            class: "d-flex justify-center", content_blocks: [
              { type: 'text', data: 'Der erfolgreiche Prototyp inspirierte auch international: Über Ländergrenzen hinweg brachte Rijk die Projektpartner von Ulm mit ihren unterschiedlichen Kompetenzen zusammen. Er überzeugte auch die EU, dass es sich lohnt, die Innovation finanziell zu fördern. <br><br> Das Ergebnis nach vier Jahren: Ein neuer Werkstoff mit großem Potenzial für den Klima- und Ressourcenschutz. Rijks Vision hat sich erfüllt.' },
            ]
          },
          {
            title: '',
            class: 'architektur-1',
            content_blocks: [{ type: 'img', data: 'Visionaer/Rijk Blok Bridge - C TU.png', style: `width:100%; max-width: 900px`, },
            { type: 'text', data: 'Rijk Blok war die treibende Kraft hinter den Smart Circular Bridges. Die Brücke in Ulm hat er leider nicht mehr erlebt. Denn kurz nach der Eröffnung der ersten Brücke in Almere ist er überraschend verstorben.' },
            ]
          },
        ],
      },
    ],






    topicStyles: {
      intro: {
        color: '#208AA7',
        hintergrundColor: '#7CCFE5',
        icon: 'mdi mdi-camera',
      },
      Ermöglicher: {
        color: '#68272A',
        hintergrundColor: '#CC797D',
        icon: 'mdi-account-group-outline',
      },
      Flachspflanze: {
        color: '#97B28A',
        hintergrundColor: '#CBD8C4',
        icon: 'mdi mdi-sprout',
      },
      Learning: {
        color: '#D67B2A',
        hintergrundColor: '#EABD94',
        icon: 'mdi-school'
      },
      zweiWelten: {
        color: '#208AA7',
        hintergrundColor: '#7CCFE5',
        icon: 'mdi mdi-palette-swatch'
      },
      Architektin: {
        color: '#208AA7',
        hintergrundColor: '#7CCFE5',
        icon: 'mdi-pencil-ruler'
      },
      Ursprung: {
        color: '#68272A',
        hintergrundColor: '#CC797D',
        icon: 'mdi-head-lightbulb-outline',
      },
      Circular: {
        color: '#D67B2A',
        hintergrundColor: '#EABD94',
        icon: 'mdi-cached',
      },

      Brücke: {
        color: '#D67B2A',
        hintergrundColor: '#EABD94',
        icon: 'mdi-bridge'
      },

    }
  }),
  computed: {
    backgroundStyle() {
      return {
        backgroundImage: `url(${require('../assets/rope2_wood.jpg')})`
      };
    }
  },

  methods: {
    getStyle(topic) {
      return this.topicStyles[topic]
    },
    slideEffect() {

    },
    getCompPath(filePath) {

      const parsedPath = filePath.split('/');
      const fileName = parsedPath.pop();
      const parentDir = parsedPath.pop();
      const newPath = [...parsedPath, parentDir, 'comp', fileName].join('/');
      console.log(newPath)

      return newPath;
    },
    async showExpansions(module) {



      this.timeline.timelinePositionX = '-120%'
      this.timeline.timelineOpacity = '0'

      await new Promise(resolve => setTimeout(resolve, 200));

      module.showExpansion = true
      this.timeline.expansionDisplay = ''

      this.timeline.timelineDisplay = 'none'
      this.timeline.showTimeline = false
      this.timeline.expansionOpacity = '1'

      await new Promise(resolve => setTimeout(resolve, 50));
      this.timeline.expansionPositionX = '0%'

      window.scrollTo({
        top: 500,
        left: 0,
        behavior: "smooth",
      });

    },
    async hideExpansion(module) {


      this.timeline.expansionPositionX = '120%'
      this.timeline.expansionOpacity = '0'

      await new Promise(resolve => setTimeout(resolve, 200));
      module.showExpansion = false
      this.timeline.timelineDisplay = ''
      this.timeline.showTimeline = true
      this.timeline.timelineOpacity = '1'

      await new Promise(resolve => setTimeout(resolve, 50));
      this.timeline.timelinePositionX = '-15px'

      const position = this.getPosition(module)
      window.scrollTo({
        top: position || 0,
        left: 0,
        behavior: "smooth",
      });



    },
    getPosition(module) {
      for (let x = 0; x <= this.content_modules.length; x++) {
        const isModule = module == this.content_modules[x]
        if (isModule) {
          const position = 500 + (x * 500)
          return position
        }
      }
    },
    nextCard(module) {
      module.expansionOnboarding = module.expansionOnboarding + 1 > module.expansionCards.length - 1
        ? 0
        : module.expansionOnboarding + 1
    },
    prevCard(module) {
      module.expansionOnboarding = module.expansionOnboarding - 1 < 0
        ? module.expansionCards.length - 1
        : module.expansionOnboarding - 1
    },
    async scrollFunktion() {

      // await new Promise(resolve => setTimeout(resolve, 100));


      // window.scrollTo({
      //   top: 10000,
      //   left: 0,
      // })

    },

  },
}


window.onload = function () {
  var placeholders = document.querySelectorAll('.placeholder');
  for (var i = 0; i < placeholders.length; i++) {
    loadImage(placeholders[i]);
  }

  function loadImage(placeholder) {
    var small = placeholder.children[0];

    // 1: load small image and show it
    var img = new Image();
    img.src = small.src;
    img.onload = function () {
      small.classList.add('loaded');
    };

    // 2: load large image
    var imgLarge = new Image();
    imgLarge.src = placeholder.dataset.large;
    imgLarge.onload = function () {
      imgLarge.classList.add('loaded');
    };
    placeholder.appendChild(imgLarge);
  }
}
</script>

<style>
.timeline {
  max-width: 1000px;
  width: 100%;
  transition:
    transform 0.2s ease,
    opacity 0.1s ease;
  padding-inline: 0 !important
}


.expansion {
  transition:
    transform 0.5s ease,
    opacity 0.1s ease;
  display: flex;
  align-items: flex-start;
}

.dot-button {
  margin-top: -23px
}

.timeline-item {
  display: flex;
  flex-direction: column;
  /* Ensure content stacks vertically */
  width: 100%;
  /* Force full width */
}

.scrolling-line {
  transform: translateX(30dvw);
  background-repeat: repeat-Y;
  background-size: contain;
  width: 100%;
  max-width: 50px;
  z-index: 0
}

.card-parallax {
  width: 100%;
  transition:
    height 0.5s ease
}

.timeline-card {
  /* margin: 0px; */
  transition:
    transform 1s ease;
}

.expansion-card .v-card-text {
  padding: 1.5rem 2rem !important;
}

.expansion-card .v-card-title {
  padding: 1rem 2rem !important;
}

.expansion-card .v-card-subtitle {
  padding: 0.25rem 2rem !important;
}

.responsive-card {
  display: flex;
  flex-direction: row;
}

.timeline-card:hover {
  transform: translateY(-10px)
}

.architektur-1 {
  display: flex;
  align-items: center;
}

.learning-1 {
  max-width: 500px !important
}

.uni-bilder {
  width: 100%;
  min-height: 250px;
  min-width: 200px;

  max-width: 500px
}


@media (max-width: 700px) {
  .v-card .v-card-title {
    font-size: 30px !important;
  }
}

@media (max-width: 500px) {
  .v-card .v-card-title {
    font-size: 26px !important;
  }
}

@media (max-width: 600px) {
  .architektur-1 {
    flex-direction: column !important
  }

  .architektur-3 {
    flex-direction: column !important;
  }
}

@media (max-width: 865px) {
  .architektur-5 {
    flex-direction: column !important
  }

  .architektur-6 {
    flex-direction: column !important
  }
}

@media (max-width: 1000px) {

  .architektur-4 {
    flex-direction: column !important;

  }

  @media (max-width: 750px) {

    .responsive-card {
      display: flex;
      flex-direction: column;
    }
  }
}




/* Lazy Load */
.progressive {
  display: block;
  outline: none;
  overflow: hidden;
  position: relative
}

.progressive img {
  border: 0;
  display: block;
  height: auto;
  max-width: none;
  width: 100%
}

.progressive img.preview {
  filter: blur(2vw);
  transform: scale(1)
}

.progressive img.reveal {
  animation: progressiveReveal 0.25s ease-out;
  left: 0;
  position: absolute;
  top: 0
}

.v-card-subtitle .text-white {
  white-space: wrap !important;
}

.v-card-subtitle  {
  white-space: wrap !important;
}

@keyframes progressiveReveal {
  0% {
    opacity: 0;
    transform: scale(1)
  }

  to {
    opacity: 1;
    transform: scale(1)
  }
}
</style>
