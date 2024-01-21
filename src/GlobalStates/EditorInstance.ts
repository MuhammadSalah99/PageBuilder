import { Editor } from "grapesjs";
import { action, makeObservable, observable } from "mobx";

class EditorInstanceStore {
  editor: Editor | null = null;

  constructor() {
    makeObservable(this, {
      editor: observable,
      setEditor: action,
    });
  }

  setEditor = (editorInstance: Editor) => {
    this.editor = editorInstance;
  };
}

const editorStore = new EditorInstanceStore();

export default editorStore;
