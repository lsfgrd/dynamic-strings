<template>
  <div class="string">
    <span class="name"> {{string.name}} </span>

    <Fret
      v-for="(fret, index) in notes"
      :key="`${fret}-${index}`"
      :note="fret"
      :isLast="isLast"
      v-on:select-note="onSelectNote">
    </Fret>
  </div>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import Fret from './Fret.vue';
import Note from '../types/Note';
import InstrumentString from '../types/InstrumentString';

@Component({
  components: {
    Fret,
  },
})
export default class String extends Vue {
  @Prop() string!: InstrumentString;
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

  created() {
    this.notes = this.getNotes();
  }

  private notes: Note[] = [];

  @Watch('frets')
  whenFretsUpdate() {
    this.notes = this.getNotes();
  }

  getNotes(): Note[] {
    return this.frets.map((fret, fretIndex) => {
      const stringPosition = this.noteOrder.indexOf(this.string.name); // 9

      const notePosition = stringPosition + fretIndex + 1;

      const string = new InstrumentString(this.string.name, this.string.index);
      let note;

      if (notePosition > 11) {
        note = new Note(
          this.noteOrder[(stringPosition - 11) + fretIndex + 1],
          false,
          string,
        );
      } else {
        note = new Note(
          this.noteOrder[notePosition],
          false,
          string,
        );
      }

      return note;
    });
  }

  onSelectNote(event: Note): void {
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
