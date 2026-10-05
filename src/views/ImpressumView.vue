<script setup lang="ts">
import LegalPage from '@/views/LegalPage.vue'
import { company } from '@/data/company'
</script>

<template>
  <LegalPage title="Impressum">
    <p>
      <strong class="text-graphite">{{ company.name }} gibt es nicht.</strong> Diese Website ist ein Beispiel für
      <a href="https://ikasu.io">Ikasu</a>; Unternehmen, Ort, Personen und Zahlen sind erfunden.
    </p>
    <p>
      {{ company.name }}<br />
      {{ company.street }}<br />
      {{ company.postcode }} {{ company.town }}<br />
      E-Mail: <a :href="`mailto:${company.email}`">{{ company.email }}</a>
    </p>
    <p>Geschäftsführerin: {{ company.managingDirector }}</p>

    <h2>Was ein echtes Impressum enthalten muss</h2>
    <p>Nach § 5 des Digitale-Dienste-Gesetzes (DDG) braucht eine GmbH unter anderem:</p>
    <ul>
      <li>Firma mit Rechtsform und die ladungsfähige Anschrift</li>
      <li>die vertretungsberechtigten Geschäftsführer</li>
      <li>eine E-Mail-Adresse und einen zweiten schnellen Kontaktweg, etwa ein Telefon</li>
      <li>Registergericht und Handelsregisternummer</li>
      <li>die Umsatzsteuer-Identifikationsnummer, falls vorhanden</li>
    </ul>
    <p>Lassen Sie Ihr Impressum im Zweifel von einer Fachperson prüfen.</p>
  </LegalPage>
</template>
