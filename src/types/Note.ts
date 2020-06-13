import InstrumentString from './InstrumentString';

export default class Note {
  name: string;
  selected: boolean;
  fromString: InstrumentString;

  constructor(name: string, selected: boolean, string: InstrumentString) {
    this.name = name;
    this.selected = selected;
    this.fromString = string;
  }
}
