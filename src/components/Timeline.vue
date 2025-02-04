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
            <div class="w-100">
              <v-card-title :style="{ backgroundColor: getStyle(module.topic).color }"
                :class="['text-h4', `text-white`, 'w-100', 'text-wrap']" text-color="white">
                {{ module.title }}
              </v-card-title>


              <v-parallax :src="require(`../assets/${module.cover}`)" class="align-end card-parallax w-100" scale="0.95"
                :gradient="['rgba(0,0,0,0)', 'rgba(0,0,0,.2)', 'rgba(0,0,0,1)']"
                :height="isHovering ? '400px' : '340px'">
                <v-card-text class="text-white mt-4 w-100">
                  <span v-html="module.text"></span>
                </v-card-text>
              </v-parallax>


            </div>

            <v-list-item link @click="showExpansions(module)"
              :style="{ backgroundColor: getStyle(module.topic).hintergrundColor }" :class="['text-white']">
              <v-icon icon="mdi-chevron-right-circle" size="large" :color="getStyle(module.topic).color"></v-icon>
            </v-list-item>
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
        topic: 'Ermöglicher',
        title: 'Die Möglichmacher',
        showExpansion: false,
        cover: 'Moeglichmacher/0_Ortsschild Ulm ohne Copyright.png',
        expansionContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        expansionOnboarding: 0,
        minHeight: 800,
        expansionCards: [
          {
            title: 'Tim von Winning',
            subtitle: "Baubürgermeister, Ulm",
            class: 'architektur-1',
            content_blocks: [
              { type: 'text', data: 'Warum ist die Stadt Ulm Teil des Smart Circular Bridge Projekts?' },
              { type: 'video', data: 'Moeglichmacher/Tim von Winning_DE.mp4', parentstyle: "display: flex; justify-content:center", style: `width:100%; max-width: 800px` },
            ]
          },
          {
            title: 'Tragende Elemente', class: "d-flex flex-column", content_blocks: [
              { type: 'img', data: 'Moeglichmacher/2_Europkarte ohne Copyright.png', parentstyle: "display: flex; justify-content:center", style: `width:100%; max-width: 1100px` },
              { type: 'text', data: 'Für ambitionierte Projekte braucht es eine Menge engagierter Leute. Hinter der Smart Circular Bridge steht ein europaweites Team aus fünf Universitäten, sieben innovativen Unternehmen und drei Städten. Über Ländergrenzen hinweg fließen einzigartige Kompetenzen in der Brücke über die „Kleine Blau“ in Ulm zusammen.' },
            ]
          },
          {
            title: 'Ambitionierte Ziele',
            class: 'architektur-1',
            content_blocks: [{ type: 'text', data: 'Die erste Smart Circular Bridge in den Niederlanden war ein großer Erfolg.<br><br> In Ulm wollte man noch einen Schritt weitergehen: Die Brücke sollte noch leistungsfähiger werden und der Bio Anteil im Epoxidharz deutlich steigen, um den CO2 Fußabdruck weiter zu verkleinern.<br><br> Doch innovative Projekte bringen immer auch Herausforderungen mit sich.' },
            ]
          },
          {
            title: "Rückschläge und…",
            class: "d-flex align-center architektur-5", content_blocks: [
              { type: 'text', data: 'Beim Bau des Brückenkörpers kam es zu einem Problem. Aufgrund der neuen Materialmischung wurde das Harz beim Aushärten zu warm und die Naturfasern deshalb zu spröde.<br><br> Der Brückenkörper musste neu gebaut werden. Eine optimierte Materialzusammensetzung und eine neue Konstruktion führten zum entscheidenden…', parentstyle: "display: flex; justify-content:center", style: "max-width:700px" },
              { type: 'video', data: 'Moeglichmacher/Animation_Reuckschlaege.mp4', parentstyle: "display: flex; justify-content:center", style: "max-width:700px; width:80vw" },
            ]
          },
          {
            title: "… Erfolg! :)",
            class: "d-flex justify-center architektur-5", content_blocks: [
            { type: 'text', data: 'Jetzt ist sie die erste Brücke weltweit aus diesem Werkstoff, über die Kraftfahrzeuge fahren können. Die Brücke ist viel leichter und noch stabiler als ihre Vorgänger.', parentstyle: "display: flex; justify-content:center", style: "max-width:700px" },
            { type: 'video', data: 'Moeglichmacher/Animation_Auto.mp4', parentstyle: "display: flex; justify-content:center", style: `max-width: 800px; width: 100%` },
            ]
          }, 
          {
            title: 'Wegbereiter',
            class: 'architektur-1',
            content_blocks: [
              { type: 'text', data: 'Dank der Leichtbauweise wiegt die Brücke deutlich weniger als eine konventionelle Konstruktion. Sie wiegt nur 5 Tonnen, kann aber mehr als 24 Tonnen tragen und das geringe Gewicht und die nachwachsenden Rohstoffe reduzieren den CO2 Fußabdruck.<br><br> Mit der neuen Version der Smart Circular Bridge hat die Stadt Ulm den Weg bereitet für ganz neue Einsatzmöglichkeiten von Biokompositen. Aus dem Material können künftig auch Häuser gebaut werden oder andere anspruchsvolle Bauwerke.' },
            ]
          },
          {
            title: 'Auf die Kommunen kommt es an',
            class: 'architektur-1',
            content_blocks: [  { type: 'text', data: 'Auf das Konto der Bauwirtschaft geht weltweit rund ein Drittel aller CO2 Emissionen. Die Branche ist auch ein Spitzenreiter bei Ressourcenverbrauch und Abfallaufkommen.<br><br> Kommunen müssen täglich ganz konkrete Lösungen für Bauaufgaben finden. Durch innovative Projekte tragen sie dazu bei, die Herausforderungen der Gesellschaft zu meistern .' },
              { type: 'img', data: 'Moeglichmacher/Kommunen-WortBildMarke.png', style: `margin-bottom: -10px; width:100%; max-width: 1000px`, class: 'aart-portrait' },
            ]
          },
        ],
      },
      {
        topic: 'Flachspflanze',
        title: 'Die Flachspflanze',
        showExpansion: false,
        cover: 'flachs/Leinenbluete_free copyright artlist.jpg',
        expansionContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        expansionOnboarding: 0,
        minHeight: 800,
        expansionCards: [
          {
            title: 'Seit 5000 Jahren im Einsatz',
            class: 'architektur-1',
            content_blocks: [
              { type: 'img', data: 'flachs/Seile.jpg', parentstyle: "display: flex; justify-content:center", style: "", class: 'uni-bilder' },
              { type: 'text', style: "max-width:500px", data: 'Seit Jahrtausenden bauen Menschen in Mitteleuropa Flachs an. Bereits in der Steinzeit wurde Flachs zur Herstellung von Kleidung, Körben, Seilen und vielem mehr verwendet.<br><br> Der Anbau von Flachs begleitet die Menschen in Mitteleuropa seit Jahrtausenden. Bereits in der Steinzeit wurde Flachs zur Herstellung von Kleidung, Körben, Seilen und vielem mehr verwendet.' },
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
              { type: 'text', data: 'Heute erlebt die Nutzpflanze ihre „zweite Blüte“ als nachwachsender Roh- und Baustoff.<br><br> Flachs ist äußerst vielseitig und einfach zu verarbeiten. In der wortwörtlichen Zerreißprobe punktet Flachs gegenüber den meisten anderen Pflanzenfasern. Durch seine hohe Zugfestigkeit und Elastizität kann er sogar mit Glasfasern mithalten.' },
            ]
          },
          {
            class: "d-flex align-center architektur-3", content_blocks: [
              { type: 'img', data: 'flachs/Getrockneter Flachs.jpg', parentstyle: "display: flex; justify-content:center", style: "width:100%; max-width: 400px", class: 'gelaender-3' },
              { type: 'text', style: "max-width:500px", data: 'Flachs ist äußerst vielseitig und einfach zu verarbeiten. Als Baustoff ist Flachs weitaus umweltfreundlicher als Beton, da bei der Herstellung und Verarbeitung weniger CO2 freigesetzt wird.<br><br> Auch gegenüber Holz als Baumaterial hat Flachs einen klaren Vorteil: Die Pflanze wächst sehr schnell und kann jedes Jahr geerntet werden.' }]
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
        minHeight: 800,
        expansionCards: [
          {
            title: 'Clever kombiniert',
            class: 'architektur-1',
            content_blocks: [
              { type: 'text', data: 'Verbundwerkstoffe bestehen aus zwei oder mehr Materialien. Dabei hat jedes Material besondere Eigenschaften. Im Verbund werden diese Eigenschaften gezielt zusammengeführt.<br><br> Auch beim Bau der Ulmer Brücke kam ein Verbundwerkstoff zum Einsatz.' },
            ]
          },
          { title: 'Eins plus Eins',
            class: "d-flex align-center architektur-3", content_blocks: [
              { type: 'img', data: 'Biokomposit/Bild1.png', parentstyle: "display: flex; justify-content:center", style: "width:100%; max-width: 400px", class: 'gelaender-3' },
              { type: 'text', style: "max-width:500px", data: 'Aus Flachsfasern werden Matten gewoben.<br> Das ist der eine Bestandteil …' }]
          },
          {
            class: "d-flex align-center architektur-3", content_blocks: [
              { type: 'img', data: 'Biokomposit/Harz.jpg', parentstyle: "display: flex; justify-content:center", style: "width:100%; max-width: 400px", class: 'gelaender-3' },
              { type: 'text', style: "max-width:500px", data: '… dazu kommt ein bio-basiertes Epoxidharz.' }]
          },
          { title: 'Gemeinsam stark',
            class: "d-flex align-center architektur-3", content_blocks: [
              { type: 'img', data: 'Biokomposit/Still.jpg', parentstyle: "display: flex; justify-content:center", style: "width:100%; max-width: 400px", class: 'gelaender-3' },
              { type: 'text', style: "max-width:500px", data: 'In dieser Kombination entsteht ein hochstabiler Werkstoff – aus dem man sogar Brücken bauen kann.' }]
          },
          {
            title: 'Stabil in alle Richtungen',
            class: "d-flex align-center flex-column", content_blocks: [
            { type: 'text', style: "max-width:500px", data: 'Das Material zeigt hervorragende Eigenschaften: Die Flachsfasern halten hohe Zugbelastungen aus. Das Harz widersteht hohem Druck. Zusammen bilden sie eine unschlagbare Einheit.' },
              { type: 'video', data: 'Biokomposit/Biokomposit Animation_Stabil.mp4', parentstyle: "display: flex; justify-content:center", style: "max-width:700px; width:80vw" },
            ]
          },
          {
            title: 'Flachsfasern ganz groß',
            class: 'architektur-1',
            content_blocks: [  { type: 'text', data: 'Auf das Konto der Bauwirtschaft geht weltweit rund ein Drittel aller CO2 Emissionen. Die Branche ist auch ein Spitzenreiter bei Ressourcenverbrauch und Abfallaufkommen.<br><br> Kommunen müssen täglich ganz konkrete Lösungen für Bauaufgaben finden. Durch innovative Projekte tragen sie dazu bei, die Herausforderungen der Gesellschaft zu meistern .' },
              { type: 'img', data: 'Biokomposit/fasern.jpg', style: `margin-bottom: -10px; width:100%; max-width: 1000px`, class: 'aart-portrait' },
            ]
          },
          { title: 'Innovation mit Leichtigkeit',
            class: "d-flex align-center architektur-3", content_blocks: [
              { type: 'img', data: 'Biokomposit/GewichtGrafik.jpg', parentstyle: "display: flex; justify-content:center", style: "width:100%; max-width: 400px", class: 'gelaender-3' },
              { type: 'text', style: "max-width:500px", data: 'Dabei ist der Verbundwerkstoff enorm leicht: Die Brücke in Ulm wiegt nur ein Sechstel einer vergleichbaren Stahlbrücke.' }]
          },
          {
            class: "d-flex align-center architektur-3", content_blocks: [
              { type: 'img', data: 'Biokomposit/TreibhausGrafik.jpg', parentstyle: "display: flex; justify-content:center", style: "width:100%; max-width: 400px", class: 'gelaender-3' },
              { type: 'text', style: "max-width:500px", data: 'Durch die leichte Bauweise und den Einsatz von Flachs als nachwachsendem Rohstoff hat die Brücke in Ulm einen kleineren CO2-Fußabdruck als eine konventionelle Brücke. Leichtbau = Materialeinsparung = weniger CO2.' }]
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
        minHeight: 700,
        expansionCards: [
          {
            title: 'Prof. Aart Willem Van Vuure',
            subtitle: "Katholische Universität Leuven, Belgien",
            class: 'architektur-1',
            content_blocks: [
              { type: 'img', data: 'learningByDoing/2_Aart Portrait 1zu1.jpg', parentstyle: "display: flex; justify-content:center", style: `width:100%; max-width: 800px` },
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
            subtitle: "Technische Universität Eindhoven, Niederlande",
            class: 'architektur-1',
            content_blocks: [{ type: 'img', data: 'learningByDoing/Wouter Portrait_no copyright.jpg', style: `margin-bottom: -10px; width:100%; max-width: 500px`, },
            { type: 'text', data: 'Wouter, der Konstrukteur der Ulmer Brücke, ging mit seinem Team die nächsten Schritte.<br><br> Er macht die Tests an den großen Bauteilen der Brücke.' },
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
    ],






    topicStyles: {
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
        color: '#D67B2A',
        hintergrundColor: '#EABD94',
        icon: 'mdi-pencil-ruler'
      },
      Ursprung: {
        color: '#68272A',
        hintergrundColor: '#CC797D',
        icon: 'mdi-head-lightbulb-outline',
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
          const position = 500 + (x * 400)
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
