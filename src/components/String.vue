<template>
  <div class="string">
    <span class="name"> {{stringName}} </span>

    <Fret
      v-for="(fret, index) in fretsNames"
      :key="`${fret}-${index}`"
      :note="fret"
      :isLast="isLast"
      v-on:select-note="onSelectNote">
    </Fret>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Fret from './Fret.vue';
import { NoteEvent } from '../types/NoteEvent';

@Component({
  components: {
    Fret,
  },
})
export default class String extends Vue {
  @Prop() stringName!: string;
  @Prop() frets!: number[];
  @Prop() isLast!: boolean;

  private noteOrder = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B',
  ];

  get fretsNames(): string[] {
    return this.frets.map((fret, fretIndex) => {
      const stringPosition = this.noteOrder.indexOf(this.stringName); // 9

      const notePosition = stringPosition + fretIndex + 1;
      let note;

      if (notePosition > 11) {
        note = this.noteOrder[(stringPosition - 11) + fretIndex + 1];
      } else {
        note = this.noteOrder[notePosition];
      }

      return note;
    });
  }

  onSelectNote(event: NoteEvent): void {
    this.$emit('select-note', event);
  }
}
</script>

<style scoped>
.string {
  border-bottom: 2px solid black;
  border-top: 2px solid black;
  border-left: 1px solid red;
  border-right: 1px solid red;
  height: 40px;
  position: relative;
}

.string:first-of-type {
  border-bottom: 2px solid black;
  border-top: 1px solid red;
  border-left: 1px solid red;
  border-right: 1px solid red;
}


.string:last-of-type {
  border-top: 2px solid black;
  border-bottom: 1px solid red;
  border-left: 1px solid red;
  border-right: 1px solid red;
}

.name {
  position: absolute;
  bottom: -12px;
  left: -25px;
}
</style>
