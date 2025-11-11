<script setup>
import ImageCarousel from '../components/ImageCarousel.vue';
</script>


<template>
  <b-container fluid class="py-5 mt-4">
    <b-row class="justify-content-center">
<b-col cols="12" style="max-width: 900px;">
    <ImageCarousel class="w-100"/>
      </b-col>
    </b-row>
<b-row class="justify-content-center mt-4">
      <b-col cols="12" style="max-width: 900px;">
        <p>Seit 1476 heißt unser Hotel Gäste aus aller Welt willkommen – unter der stetigen Obhut unseres unermüdlichen Gastgebers Vlad. Über die Jahrhunderte hinweg hat Vlad mit Hingabe und Leidenschaft dafür gesorgt, dass sich jeder Besucher bei uns wie zu Hause fühlt.
Vlad ist bekannt für seine unerschütterliche Energie und seine Liebe zur Gastfreundschaft – nur beim Wein macht er eine Ausnahme. Mit einem Glas in der Hand inspiziert er die historischen Hallen, begrüßt neue Gäste und teilt Geschichten, die die reiche Geschichte unseres Hauses lebendig werden lassen.
Unser Hotel verbindet historische Eleganz mit modernem Komfort. Die Räume atmen Geschichte, während sie gleichzeitig alles bieten, was der heutige Reisende benötigt: stilvolles Ambiente, erstklassigen Service und unvergessliche Erlebnisse.
Ob Sie auf der Durchreise sind oder einen längeren Aufenthalt planen – bei uns erleben Sie Gastfreundschaft, die über Jahrhunderte hinweg gewachsen ist. Willkommen in einem Haus, in dem Tradition und Herzlichkeit Hand in Hand gehen.</p>
<p>Das Hotel Vue bietet Ihnen zahlreiche Annehmlichkeiten, welche seine Gäste schon seit dem Spätmittelalter begeistern.</p> 
<p>Erfrischen Sie sich an unserer renommierten <b>Juice Bar</b>, stöbern Sie verloren geglaubte Schmöker in unserer <b>Bibliothek</b> auf, entdecken Sie feinste Jahrgänge in unserer gut sortierten <b>Vinothek</b> und entpannen Sie danach in unserer patentierten <b><i>garlic sauna</i></b>... </p> 
<p>Vlad und das <b>Hotel Vue</b> erwarten Sie!</p>
<div class="text-center mt-4">
          <router-link to="/rooms">
        <b-button variant="primary" class="btn flex-fill flex-md-grow-0">
          Zimmer buchen
        </b-button>
        </router-link>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>


<style>
.btn-primary{
    background-color: var(--color-primary);
    border: none;
      white-space: nowrap;
}

.btn-primary:hover{
    background-color: var(--color-primary1);
}

p {
  font-size: clamp(1rem, 1.2vw, 1.2rem); 
  line-height: 1.6;
}

.btn-text-fit {
  width: auto !important;
  flex: 0 0 auto !important;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  white-space: nowrap;
  font-size: 1rem;
}

@media (max-width:900px) {
  p {
    font-size: 0.95rem;

  }

  .btn-text-fit {
    font-size: 0.95rem;
    padding: 0.6rem 1.2rem;
  }
}
</style>

