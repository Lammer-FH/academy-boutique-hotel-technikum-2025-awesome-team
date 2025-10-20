<template>
  <b-container class="mt-5 pt-5">
    <b-row class="justify-content-center">
      <b-col cols="12" md="10" lg="8">
        <div class="about">
          <h1 class="mb-4">Impressum</h1>
          <p class="mb-2">
            Angaben gemäß § 5 ECG (E-Commerce-Gesetz) und § 14 UGB (Unternehmensgesetzbuch):
          </p>
          <p class="mb-1"><strong>Hotelname:</strong> Hotel Vue</p>
          <p class="mb-1"><strong>Inhaber:</strong> Vlad von Nacht</p>
          <p class="mb-1"><strong>Adresse:</strong> Burgstraße 7, 1010 Wien, Österreich</p>
          <p class="mb-1"><strong>Kontakt:</strong></p>
          <p class="mb-1">Telefon: +43 1 234 56 78</p>
          <p class="mb-1">E-Mail: <a href="mailto:info@hotel-vue.at">info@hotel-vue.at</a></p>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<style scoped>
.about h1 {
  font-weight: bold;
}

.about p {
  font-size: clamp(1rem, 1.2vw, 1.1rem);
  line-height: 1.6;
}
</style>
