<template>
  <div class="instrument">

    <div class="instrument-container">
      <String
        v-for="(stringName, index) in strings"
        :key="`${stringName}-${index}`"
        :string="stringName"
        :frets="frets"
        v-on:select-note="getSelectedNotes">
      </String>

      <String v-if="frets.length > 0" :frets="frets" :mute="true">
      </String>
    </div>

    Notes: {{ selectedNotes.map(x => x.name) }}
  </div>
</template>

<script lang="ts">
import {
  Component, Vue, Prop, Watch,
} from 'vue-property-decorator';
import Note from '../types/Note';
import String from './String.vue';
import InstrumentString from '../types/InstrumentString';

@Component({
  components: {
    String,
  },
})
export default class Instrument extends Vue {
  @Prop() strings!: InstrumentString[];
  @Prop() frets!: Note[];

  private selectedNotes: Note[] = [];

  created() {
    this.setOpenStringsAsSelected();
  }

  private setOpenStringsAsSelected(): void {
    this.strings.forEach((string) => {
      this.selectedNotes.push(new Note(string.name, true, string));
    });
  }

  @Watch('selectedNotes')
  private onSelectedNotesChange() {
    this.strings.forEach((string, index) => {
      if (!this.selectedNotes
        .filter((selectedNote) => selectedNote.fromString.index === index)[0]) {
        this.selectedNotes.push(new Note(string.name, true, string));
      }
    });
  }

  @Watch('frets')
  private onFretConfigChange() {
    this.selectedNotes = [];
  }

  private getSelectedNotes(note: Note): void {
    if (note.selected) {
      this.removeExistingSelectedNote(note);
      this.selectedNotes.push(note);
    } else {
      this.selectedNotes.splice(this.selectedNotes.lastIndexOf(note), 1);
    }
  }

  private removeExistingSelectedNote(note: Note): void {
    const selectedNoteFromString = this.selectedNotes
      .filter((selectedNote) => selectedNote.fromString.index === note.fromString.index)[0];

    if (selectedNoteFromString) {
      selectedNoteFromString.selected = false;
      this.selectedNotes.splice(this.selectedNotes.lastIndexOf(selectedNoteFromString), 1);
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
