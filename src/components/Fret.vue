<template>
  <div class="fret">
    <span v-if="!isLast" class="fret-hitbox" v-on:click="onClick()">
      <div v-if="clicked" class="note">
        {{note}}
      </div>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { NoteEvent } from 'src/types/NoteEvent';

@Component
export default class Fret extends Vue {
  @Prop() note!: string;
  @Prop() isLast!: boolean;

  private clicked = false;

  onClick(): void {
    this.clicked = !this.clicked;
    this.$emit(
      'select-note',
      { note: this.note, selected: this.clicked } as NoteEvent,
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
