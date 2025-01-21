<template>
  <div class="main-container mt-5 mx-5 mb-10">

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


              <v-parallax :src="require(`../assets/${module.cover}`)" class="align-end card-parallax w-100" scale="0.9"
                :gradient="['rgba(0,0,0,0)', 'rgba(0,0,0,.2)', 'rgba(0,0,0,1)']"
                :height="isHovering ? '350px' : '300px'">
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


    <div class="w-100 mt-4" style="max-width:1000px !important">
      <v-btn v-for="(module, i) in content_modules" :key="i" v-show=module.showExpansion
        prepend-icon="mdi-chevron-left-circle" @click="hideExpansion(module)" size="large" rounded="xl" elevation=10
        class="my-3 ml-2" style="z-index:100; width: 280px" :color="getStyle(module.topic).color" variant="tonal">
        Zurück zur Timeline
      </v-btn>
    </div>


    <div style="max-width:1000px !important">

      <div v-for="(module, i) in content_modules" :key="i" v-show=module.showExpansion
        :style='`transform: translateX(${timeline.expansionPositionX}); display: ${timeline.expansionDisplay}; opacity: ${timeline.expansionOpacity}`'
        class="expansion">

        <div>
          <v-window v-model="module.expansionOnboarding">
            <v-window-item v-for="(expansionCard, n) in module.expansionCards" :key="`card-${n}`" :value="n">
              <v-card class="flex-column my-5 mx-5 expansion-card" elevation="4" style="max-width: 1000px">
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
                      :href="require(`../assets/${content_block.data}`)"
                      :style="`margin-bottom:-10px; ${content_block.style}`">
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





    <div class="w-100 mt-4" style="max-width:1000px !important">
      <v-card-actions class="justify-space-between w-100" v-for="(module, i) in content_modules" :key="i"
        v-show=module.showExpansion>
        <v-btn icon="mdi-chevron-left" variant="plain" @click="prevCard(module); scrollFunktion()"></v-btn>
        <v-item-group v-model="module.expansionOnboarding" class="text-center" mandatory  @click=scrollFunktion() >
          <v-item v-for="(card, n) in module.expansionCards" :key="`btn-${n}`" v-slot="{ isSelected, toggle }"
            :value="n">
            <v-btn :variant="isSelected ? 'outlined' : 'text'" icon="mdi-record" @click="toggle"></v-btn>
          </v-item>
        </v-item-group>
        <v-btn icon="mdi-chevron-right" variant="plain" @click="nextCard(module); scrollFunktion()"></v-btn>
      </v-card-actions>

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
        topic: 'Architektin',
        title: 'Die Architektin',
        text: '<em>"Diese Materialentwicklung ist der Anfang einer neuen Art zu bauen."</em> - Hanaa Dahy',
        showExpansion: false,
        cover: 'architekt/2_Platzhalter Portrait Hanaa.png',
        expansionContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        expansionOnboarding: 0,
        expansionCards: [
          {
            title: 'Acc. Prof. Dr. Hanaa Dahy',
            subtitle: "Universität Stuttgart & Universität Aalborg",
            class: 'architektur-1',
            content_blocks: [{ type: 'img', data: 'architekt/2_Platzhalter Portrait Hanaa.png', style: "max-width: 500px", class: 'hanna-portrait' },
            { type: 'text', data: 'Seit vielen Jahren entwickelt die Architektin Hanaa Dahy biobasierte Werkstoffe für das Bauen. Mit vielen Partnern aus Wissenschaft und Industrie erforscht die Architektin immer neue Anwendungen vom Möbelbau bis zur Fassade. Sie hat auch die Ulmer Brücke mitgeprägt.' },
            ]
          },
          {
            title: 'Von Hanaa stammt übrigens auch ...', class: "d-flex flex-column", content_blocks: [
              { type: 'img', data: 'architekt/3 BioMat.jpg', parentstyle: "display: flex; justify-content:center", style: "width:100%; max-width: 700px", class: '' },
              { type: 'text', style: "max-width:700px", data: '... die Idee, so ein besonderes Geländer in Ulm einzusetzen. Die Streben des Geländers bestehen auch aus Flachsfasern. Zum Schutz sind sie mit einem speziellen biobasierten Harz ummantelt. <br><br>Diese Idee wiederum stammt…' }]
          },
          {
            class: "d-flex align-center architektur-3", content_blocks: [
              { type: 'img', data: 'architekt/4_FibR.png', parentstyle: "display: flex; justify-content:center", style: "width:100%; max-width: 400px", class: 'gelaender-3' },
              { type: 'text', style: "max-width:500px", data: '... von Kollegen an der Uni in Stuttgart. Sie entwickelten ein neues Herstellungsverfahren für das Bauen mit Fasern. <br><br> Diese Idee wiederum fanden mehrere Leute spannend und gründeten ein Start-up: FibR. Das junge Unternehmen hat das Brückengeländer in Ulm hergestellt.' }]
          },
          {
            class: "d-flex align-center architektur-4", content_blocks: [
              { type: 'img', data: 'architekt/5-1_ICD.png', parentstyle: "display: flex; justify-content:center", style: "", class: 'uni-bilder' },
              { type: 'text', style: "max-width:500px", data: 'Mit diesem neuen Herstellungsverfahren lassen sich Gebäude mit einer ganz eigenen Ästhetik gestalten, wie hier in Wangen auf dem Gelände der Landesgartenschau 2024.' },
              { type: 'img', data: 'architekt/5-2_ICD.png', parentstyle: "display: flex; justify-content:center", style: "", class: 'uni-bilder' },]
          },
          {
            title: "Material und Formensprache",
            class: "d-flex align-center architektur-5", content_blocks: [
              { type: 'img', data: 'architekt/6_Hanaa Dahy.png', parentstyle: "display: flex; justify-content:center", style: "max-width: 500px; width: 100%" },
              { type: 'text', style: "max-width: 500px", data: 'Biobasierte Werkstoffe erlauben Designern und Architekten vielseitige Formen. <br><br> Alle Materialien, egal ob Beton, Stahl oder Holz, haben typische Eigenschaften. Diese Eigenschaften führen bei jeder Materialart zu ganz bestimmten Formen beim Bauen. So sehen Brücken aus Stahl anders aus als Brücken aus Beton. <br><br> Die Formensprache dieser Materialien wurde vor über hundert Jahren entwickelt.' },
            ]
          },
          {
            title: 'Jetzt gilt es, die Formensprache für Biokomposite zu entdecken.',
            class: "d-flex align-center architektur-6", content_blocks: [
              { type: 'img', data: 'architekt/7-1_BioMat.png', parentstyle: "display: flex; justify-content:center", style: "max-width: 350px; width: 100%" },
              { type: 'text', style: "max-width: 350px", data: 'Hier ein Beispiel von Hanaa: Was aussieht wie Metall, ist in Wirklichkeit ein Werkstoff aus Pflanzenfasern und synthetischem Harz: elegant, leicht und äußerst stabil!' },
              { type: 'img', data: 'architekt/7-2_BioMat.png', parentstyle: "display: flex; justify-content:center", style: "max-width: 350px;  width: 100%" },
            ]
          },
          {
            class: "d-flex align-center flex-column", content_blocks: [
              { type: 'video', data: 'architekt/Slideshow_Architektin.mp4', parentstyle: "display: flex; justify-content:center", style: "max-width:700px; width:80vw" },
              { type: 'text', data: 'Hanaas Projekte zeigen das große Potenzial biobasierter Materialien.', parentstyle: "display: flex; justify-content:center", style: "max-width:700px" },
            ]
          },
        ]
      },
      {
        topic: 'Learning',
        title: 'Learning by Doing',
        text: '',
        showExpansion: false,
        cover: 'learningByDoing/Test Test Ups.png',
        expansionContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        expansionOnboarding: 0,
        expansionCards: [
          {
            title: 'Prof. Aart Willem Van Vuure',
            subtitle: "Katholieke Universität Leuven, Belgien",
            class: 'architektur-1',
            content_blocks: [
              { type: 'img', data: 'learningByDoing/2_Aart Portrait 1zu1.jpg', parentstyle: "display: flex; justify-content:center", style: `width:100%; max-width: 800px` },
              { type: 'text', data: 'Aart ist einer der führenden Experten für neue basierte Materialien in Europa. <br><br> Seine Vision ist es, diese Werkstoffe weiterzuentwickeln, die leicht und hochleistungsfähig sind.' },
            ]
          },
          {
            title: 'Zerreißprobe!', class: "d-flex flex-column", content_blocks: [
              { type: 'img', data: 'learningByDoing/6_Platzhalter.png', parentstyle: "display: flex; justify-content:center", style: `width:100%; max-width: 700px"`, class: '' },
            ]
          },
          {
            title: 'Mit seinem Team hat Aart in den Laboren der Uni unzählige Versuche durchgeführt und die Vorarbeiten zur Ulmer Brücke begleitet.',
            class: 'architektur-1',
            //content_blocks: [{ type: 'text', data: 'Weiter klicken und Einblicke bekommen:' }]
          },
          {
            title: "Wind und Wetter trotzen",
            class: "d-flex align-center architektur-5", content_blocks: [
              { type: 'img', data: 'learningByDoing/6_Platzhalter.png', parentstyle: "display: flex; justify-content: center", style: `max-width: 500px; width: 100%` },
            ]
          },
          {
            title: "Materialproben werden auf den Millimeter genau untersucht",
            class: "d-flex justify-center", content_blocks: [
              { type: 'img', data: 'learningByDoing/6_Platzhalter.png', parentstyle: "display: flex; justify-content:center", style: `max-width: 500px; width: 100%` },
            ]
          },
          {
            title: 'Es braucht viele Ideen und Material-Untersuchungen, aber auch Ausdauer und Glück. Nur so lässt sich Aarts Vision von neuen, leistungsfähigen Werkstoffen verwirklichen.',
            class: 'architektur-1',
            content_blocks: [
            ]
          },
          {
            title: 'Wouter Claassen',
            subtitle: "Technische Universität Eindhoven, Niederlande",
            class: 'architektur-1',
            content_blocks: [{ type: 'img', data: 'learningByDoing/Platzhalter 1 zu 1.png', style: `margin-bottom: -10px; width:100%; max-width: 500px`, },
            { type: 'text', data: 'Wouter, der Konstrukteur der Ulmer Brücke, ging mit seinem Team die nächsten Schritte. <br><br> Er macht die Tests an den großen Bauteilen der Brücke.' },
            ]
          },
          {
            title: 'Bei den Tests geht es rau zu: Wie viel hält ein tragender Balken aus? Wann bricht er?',
            class: 'architektur-1 justify-center d-flex',
            content_blocks: [{ type: 'img', data: 'learningByDoing/9_Loadtest_einzelner Balken.png', style: `margin-bottom: -10px; width:100%; max-width: 500px`, class: 'aart-portrait' },
            ]
          },
          {
            title: 'Die Brücke als Wegbereiter',
            class: 'architektur-1',
            content_blocks: [
              { type: 'text', data: '„Durch all diese Tests lernen wir das Material immer besser kennen. <br><br> Wir können sein Verhalten vorhersagen und unsere mathematischen Modelle immer weiter entwickeln. Mit den Modellen können wir Ingenieure zum Beispiel das Tragverhalten der Brücke in Ulm berechnen. Damit leistet die Brücke einen Beitrag für die nächsten Bauprojekte, die den Klimaschutz und die Kreislaufwirtschaft noch weiter vorantreiben.” <br> <br> <br> Wouter Claassen, Universität Eindhoven ' },
            ]
          },
          {
            title: 'Das Ergebnis: Die Ulmer Brücke glänzt beim Belastungstest!',
            class: 'architektur-1',
            content_blocks: [{ type: 'img', data: 'learningByDoing/11_Belastungstest.jpg', style: `margin-bottom: -10px; width:100%; max-width: 900px`, class: 'aart-portrait' },
            { type: 'text', data: '24 Tonnen hält sie aus - und erfüllt damit die Anforderungen an Fahrrad- und Fußgänger-brücken in Europa. <br><br> Und noch mehr: Sie ist weltweit die erste Brücke dieser Art, die auch Fahrzeuge der Stadt-verwaltung überqueren können.' },
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
        expansionCards: [
          {
            title: 'Professor Rijk Blok',
            subtitle: "Technische Universität Eindhoven",
            class: 'architektur-1',
            content_blocks: [
              { type: 'text', data: 'Rijk stellte sich vor über zehn Jahren eine Frage: „Wie können wir den Klimaschutz mit Hilfe von nachwachsenden Rohstoffen voranbringen?“ <br><br> Aus dieser Frage entstand der erste Prototyp der Smart Circular Bridge.' },
            ]
          },
          {
            title: 'Umdenken!', class: "d-flex flex-column", content_blocks: [
              { type: 'text', data: 'Als Ingenieur wollte Rijk neue, leistungsfähige Materialien für die Baubranche entwickeln. <br><br> Dazu erforscht er die Potentiale traditioneller Baumaterialien. Denn auch altbewährte Rohstoffe bieten spannende Lösungen für die Zukunft.' },
            ]
          },
          {
            title: 'Flachs im Fokus',
            class: 'architektur-1',
            content_blocks: [{ type: 'img', data: 'Visionaer/6_Platzhalter.png', style: `margin-bottom: -10px; width:100%; max-width: 500px`, },
            { type: 'text', data: 'Rijk und sein Team kombinierten Flachsfasern mit einem speziellen Harz. So entsteht ein Material, das sowohl leicht als auch extrem stabil ist – und sich in Bauwerken locker mit Aluminium oder Stahl messen kann.' },
            ]
          },
          {
            title: 'Manchmal muss man einfach machen',
            class: 'architektur-1',
            content_blocks: [{ type: 'img', data: 'Visionaer/Test Uni einhoven-copyright Rijk Blok.png', style: `margin-bottom: -10px; width:100%; max-width: 900px`, },
            { type: 'text', data: 'Zusammen mit Studierenden und Partnern aus anderen Hochschulen und der Wirtschaft, setzte Rijk auf dem Gelände der Universität Eindhoven seine Vision in die Tat um: Die erste Brücke aus Flachsfasern und Harz entsteht.' },
            ]
          },
          {
            title: 'Manchmal muss man einfach machen',
            class: 'architektur-1',
            content_blocks: [{ type: 'img', data: 'Visionaer/FP license TUe biocomposiet brug TU Eindhoven.png', style: `margin-bottom: -10px; width:100%; max-width: 900px`, },
            { type: 'text', data: 'Zahlreiche Tests am Material und der Konstruktion zeigen: Der Sprung von der Vision zur Praxis funktioniert. Die Idee trägt – und wie!' },
            ]
          },
          {
            title: "Erfindergeist lohnt sich",
            class: "d-flex justify-center", content_blocks: [
              { type: 'text', data: 'Der erfolgreiche Prototyp inspirierte auch international: Rijk hat über Ländergrenzen hinweg die Projektpartner mit ihren unterschiedlichen Kompetenzen zusammengebracht. Er überzeugte die EU, dass es sich lohnt, das große Potential der Materialien zu erschließen. Das Ergebnis nach vier Jahren: viel gelernt, viel Neues entwickelt und Rijks Vision hat sich bewährt.' },
            ]
          },
          {
            title: '',
            class: 'architektur-1',
            content_blocks: [{ type: 'img', data: 'Visionaer/Rijk Blok Bridge - C TU Eindhoven.png', style: `margin-bottom: -10px; width:100%; max-width: 900px`, },
            { type: 'text', data: 'Rijk Blok war die treibende Kraft hinter den Smart Circular Bridges. Die Brücke in Ulm mit all ihren Innovationen hat er leider nicht mehr erlebt. Denn kurz nach der Eröffnung der ersten Brücke in Almere ist er überraschend verstorben.' },
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
        expansionCards: [
          {
            title: 'Tim von Winning',
            subtitle: "Baubürgermeister, Ulm",
            class: 'architektur-1',
            content_blocks: [
              { type: 'img', data: 'learningByDoing/6_Platzhalter.png', parentstyle: "display: flex; justify-content:center", style: `width:100%; max-width: 800px` },
              { type: 'text', data: 'Warum ist die Stadt Ulm Teil des Smart Circular Bridge Projekts?' },
            ]
          },
          {
            title: 'Tragende Elemente', class: "d-flex flex-column", content_blocks: [
              { type: 'img', data: 'Moeglichmacher/2_Europkarte ohne Copyright.png', parentstyle: "display: flex; justify-content:center", style: `width:100%; max-width: 1100px` },
              { type: 'text', data: 'Für ambitionierte Projekte braucht es kluge Köpfe und eine Menge engagierter Leute. Hinter der Smart Circular Bridge steht ein europaweites Team aus fünf Universitäten, sieben innovativen Unternehmen und drei Städten. Über Ländergrenzen hinweg fließen einzigartige Kompetenzen in der Brücke über die „Kleine Blau“ in Ulm zusammen.' },
            ]
          },
          {
            title: '',
            class: 'architektur-1',
            content_blocks: [{ type: 'text', data: 'Bei innovativen Projekten kommt es immer zu Herausforderungen. Die erste Smart Circular Bridge in den Niederlanden war ein Erfolg. <br><br> Jetzt wollte man in Ulm noch einen Schritt weitergehen: Die Brücke sollte noch leistungsfähiger werden – und der Anteil an recyceltem Harz deutlich steigen, um den CO2-Fußabdruck weiter zu verkleinern.' },
            ]
          },
          {
            title: "Rückschläge und…",
            class: "d-flex align-center architektur-5", content_blocks: [
              { type: 'video', data: 'Moeglichmacher/4_Animation_Rueckschlaege.mp4', parentstyle: "display: flex; justify-content:center", style: "max-width:700px; width:80vw" },
              { type: 'text', data: 'Doch dann kam es beim Bau des Brückenkörpers zu einem Problem. Aufgrund der neuen Materialmischung wurde das Harz beim Aushärten zu warm – und die Naturfasern deshalb zu spröde. <br><br> Der Brückenkörper musste neu gebaut werden. Das heißt: zeitliche Verzögerung und höherer Aufwand. <br><br> Aber zugleich gab es…', parentstyle: "display: flex; justify-content:center", style: "max-width:700px" },
            ]
          },
          {
            title: "…große Fortschritte!",
            class: "d-flex justify-center architektur-5", content_blocks: [
              { type: 'img', data: 'learningByDoing/6_Platzhalter.png', parentstyle: "display: flex; justify-content:center", style: `max-width: 800px; width: 100%` },
              { type: 'text', data: 'Es ist die erste Brücke weltweit aus diesem Werkstoff, über die Kraftfahrzeuge fahren können. Die Brücke ist viel leichter und noch stabiler als ihre Vorgänger.', parentstyle: "display: flex; justify-content:center", style: "max-width:700px" },
            ]
          },
          {
            title: '',
            class: 'architektur-1',
            content_blocks: [
              { type: 'text', data: 'Dank der Leichtbauweise wiegt die Brücke deutlich weniger als eine konventionelle Konstruktion. Sie wiegt nur 5 Tonnen, kann aber mehr als 24 Tonnen tragen – und das geringe Gewicht reduziert den CO2-Fußabdruck. <br><br> Die Brücke in Ulm zeigt die hohe Leistungsfähigkeit von Biokompositen – und deren Potenziale für den Klimaschutz! <br><br> Mit der neuen Version der Smart Circular Bridge hat die Stadt Ulm den Weg bereitet für ganz neue Einsatzmöglichkeiten von Biokompositen. Aus dem Material können künftig auch Häuser gebaut werden oder andere anspruchsvolle Bauwerke.' },
            ]
          },
          {
            title: 'Auf die Kommunen kommt es an',
            class: 'architektur-1',
            content_blocks: [{ type: 'img', data: 'Moeglichmacher/7_Weltkarte Connections.png', style: `margin-bottom: -10px; width:100%; max-width: 1000px`, class: 'aart-portrait' },
            { type: 'text', data: 'Die Bauwirtschaft steht vor der Herausforderung, dem Ressourcen- und Klimaschutz gerecht zu werden. Kommunen tragen durch innovative Projekte dazu bei, diese Herausforderungen zu lösen – und den Wandel weltweit voranzubringen.' },
            ]
          },

        ],
      },
      {
        topic: 'Brücke',
        title: 'Brückenbau',
        position: '1500',
        text: '...',
        showExpansion: false,
        cover: 'learningByDoing/Platzhalter 1 zu 1.png',
        expansionContent: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
        expansionOnboarding: 0,
        expansionCards: [
          {
            title: 'Wie wurde die Brücke gebaut?',
            class: 'architektur-1',
            content_blocks: [{ type: 'img', data: 'learningByDoing/Platzhalter 1 zu 1.png', style: `margin-bottom: -10px; width:100%; max-width: 500px` },
            { type: 'text', data: 'a + b +c ... + z = Brücke' },
            ]
          },
          {
            title: 'Schritt für Schritt und Bauteil für Bauteil', class: "d-flex flex-column", content_blocks: [
              { type: 'video', data: 'brueckenbau/2_Bridge Hanging.mp4', parentstyle: "display: flex; justify-content:center", style: "max-width:900px; width:80vw" },
            ]
          },
          {
            title: "Von der Produktionshalle geht's mit dem Schwertransport nach Ulm./ Der fertige Brückenkörper wird dann transportiert und platziert.",
            class: "d-flex align-center architektur-5 justify-center", content_blocks: [
              { type: 'video', data: 'brueckenbau/2_Bridge Hanging.mp4', parentstyle: "display: flex; justify-content:center", style: "max-width:900px; width:80vw" },
            ]
          },
          {
            title: "Jetzt noch das Geländer dran.",
            class: "d-flex align-center architektur-6", content_blocks: [
              { type: 'img', data: 'brueckenbau/3_Geleander_aussen.png', parentstyle: "display: flex; justify-content:center", style: "max-width: 550px; width: 100%" },
            ]
          },
          {
            class: 'architektur-1',
            content_blocks: [
              { type: 'img', data: 'brueckenbau/4_Geleander innen.png', parentstyle: "display: flex; justify-content:center", style: "max-width: 550px; width: 100%" },
            ]
          },
          {
            class: 'architektur-1',
            content_blocks: [
              { type: 'img', data: 'brueckenbau/5_Geleander innen closeup.png', parentstyle: "display: flex; justify-content:center", style: "max-width: 550px; width: 100%" },
            ]
          },
          {
            title: 'Und fertig!',
            class: 'architektur-1 justify-center',
            content_blocks: [{ type: 'img', data: 'brueckenbau/3_Geleander_aussen.png', parentstyle: "display: flex; justify-content:center", style: "max-width: 550px; width: 100%" },
            ]
          },

        ],
      },

    ],






    topicStyles: {
      Architektin: {
        color: '#D67B2A',
        hintergrundColor: '#EABD94',
        icon: 'mdi-pencil-ruler'
      },
      Learning: {
        color: '#208AA7',
        hintergrundColor: '#7CCFE5',
        icon: 'mdi-school'
      },
      Ursprung: {
        color: '#68272A',
        hintergrundColor: '#CC797D',
        icon: 'mdi-head-lightbulb-outline',
      },
      Ermöglicher: {
        color: '#97B28A',
        hintergrundColor: '#CBD8C4',
        icon: 'mdi-account-group-outline',
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
    transform 0.2s ease,
    opacity 0.1s ease;
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
  transform: scale(1.05)
}

.progressive img.reveal {
  animation: progressiveReveal 0.5s linear;
  left: 0;
  position: absolute;
  top: 0
}

@keyframes progressiveReveal {
  0% {
    opacity: 0;
    transform: scale(1.05)
  }

  to {
    opacity: 1;
    transform: scale(1)
  }
}
</style>
