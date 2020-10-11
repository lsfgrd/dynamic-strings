<template>
  <div class="fret">
    <span v-if="!mute" class="fret-hitbox" v-on:click="onClick()">
      <div v-if="selected" class="note">
        {{note.name}}
      </div>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Note from '../types/Note';

@Component
export default class Fret extends Vue {
  @Prop() note!: Note;
  @Prop() mute!: boolean;

  get selected(): boolean {
    return this.note.selected;
  }

  onClick(): void {
    this.note.selected = !this.note.selected;
    this.$emit(
      'select-note',
      this.note,
    );
  }
}
</script>

<style scoped>
.fret {
  border-left: 1px solid blue;
  border-right: 1px solid blue;
  display: inline-block;
  height: 100%;
  width: 120px;
}

.fret-hitbox {
  bottom: -22px;
  position: relative;
  display: inline-block;
  height: 100%;
  width: 120px;
  z-index: 2;
}

.fret-hitbox:hover {
  cursor: pointer;
}

.note {
  height: 35px;
  width: 35px;
  border-radius: 50%;
  background-color: black;
  color: white;
  text-align: center;
  top: 12%;
  position: absolute;
  left: 35%;
  line-height: 35px;
}
</style>
