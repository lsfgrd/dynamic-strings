<template>
  <div class="main">
    <div class="form-group">
      <label>Strings</label>
      <input v-model="stringsNames"/>
      <button v-on:click="invert">Invert</button>
    </div>

    <div class="form-group">
      <label>Frets</label>
      <input v-model="fretNumber"/>
    </div>

    <button v-on:click="createGrid(stringsNames, fretNumber)">Generate grid</button>

    <Instrument :strings="strings" :frets="frets">
    </Instrument>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Instrument from './Instrument.vue';
import InstrumentString from '../types/InstrumentString';

@Component({
  components: {
    Instrument,
  },
})
export default class Main extends Vue {
  fretNumber = 0;
  stringsNames = 'GDAE';

  strings: InstrumentString[] = [];
  frets: number[] = [];

  createGrid(strings: string, frets: number): void {
    this.strings = [];
    this.frets = [];

    for (let i = 0; i <= strings.length; i += 1) {
      this.strings.push(new InstrumentString(strings[i], i));
    }

    for (let i = 1; i <= frets; i += 1) {
      this.frets.push(i);
    }

    this.frets = [...this.frets];
  }

  invert() {
    this.stringsNames = this.stringsNames.split('').reverse().join('');
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 10px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  display: block;
}
</style>
