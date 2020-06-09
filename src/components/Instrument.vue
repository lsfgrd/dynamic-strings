<template>
  <div class="instrument">

    <div class="instrument-container">
      <String
        v-for="(stringName, index) in strings"
        :key="`${stringName}-${index}`"
        :stringName="stringName"
        :isLast="index === (strings.length - 1)"
        :frets="frets"
        v-on:select-note="getSelectedNotes">
      </String>
    </div>

    Notes: {{ selectedNotes }}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { NoteEvent } from '../types/NoteEvent';
import String from './String.vue';

@Component({
  components: {
    String,
  },
})
export default class Instrument extends Vue {
  @Prop() strings!: string[];
  @Prop() frets!: number[];

  private selectedNotes: string[] = [];

  getSelectedNotes(event: NoteEvent): void {
    if (event.selected) {
      this.selectedNotes.push(event.note);
    } else {
      this.selectedNotes.splice(this.selectedNotes.lastIndexOf(event.note), 1);
    }
  }
}
</script>

<style scoped>
.instrument-container {
  display: grid;
  padding: 50px;
  margin-top: 10px;
}
</style>
