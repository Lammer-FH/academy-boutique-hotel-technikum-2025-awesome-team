<template>
  <b-form>
    <b-form-group label="Vorname:">
      <b-form-input
        :value="firstName"
        @input="$emit('update:firstName', $event)"
        required
      />
    </b-form-group>

    <b-form-group label="Nachname:">
      <b-form-input
        :value="lastName"
        @input="$emit('update:lastName', $event)"
        required
      />
    </b-form-group>

    <b-form-group label="E-Mail:">
      <b-form-input
        type="email"
        :value="email"
        @input="$emit('update:email', $event)"
        required
      />
    </b-form-group>

    <b-form-group label="Geburtsdatum:">
      <b-form-input
        type="date"
        :value="dob"
        @input="$emit('update:dob', $event)"
        required
      />
    </b-form-group>
    <b-form-group>
      <b-form-checkbox
        :checked="fruehstueck"
        @change="$emit('update:fruehstueck', $event)"
      >
        Frühstück hinzufügen{{ fruehstueck ? ' (Ja)' : ' (Nein)' }}
      </b-form-checkbox>
      </b-form-group>
  </b-form>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  firstName: String,
  lastName: String,
  email: String,
  dob: String,
  fruehstueck: Boolean
})

const emit = defineEmits([
  "update:firstName",
  "update:lastName",
  "update:email",
  "update:dob",
  "update:fruehstueck",
])
</script>
