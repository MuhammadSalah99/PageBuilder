import { BubbleMenu, EditorContent, HTMLContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Code from "@tiptap/extension-code";
import Underline from "@tiptap/extension-underline";
import { useCallback, useEffect} from "react";
import CodeIcon from "./icons/CodeIcon";
import BoldIcon from "./icons/BoldIcon";
import ItalicIcon from "./icons/ItalicIcon";
import UnderlineIcone from "./icons/UnderlineIcone";
import StrikeThroughIcon from "./icons/StrikeThroughIcon";
import LinkIcon from "./icons/LinkIcon";
import { myStyles } from "./Config/constants";
import { TextEditorPRops } from "./Interface";
import previewManagerStore from "../../GlobalStates/PreviewManagerStore";

function TextEditorTipTap({text, setText}:TextEditorPRops) {
  const {isPreview} = previewManagerStore;

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Link,
      Code,
      Underline,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],

    content:`${text || ''}` as HTMLContent,
    onUpdate(){
      // console.log("hi", editor?.getText())
      // setText(editor?.getText() as string)
      // editor?.setEditable(!editor.isEditable)
    },
    onBlur({editor}){
      // clearSelection()
      // editor?.createNodeViews()
      setText(editor.getHTML() as string)
      
      // editor?.setEditable(false)
      // editor?.setEditable(!editor.isEditable)
    },
    
    
  },[text]);
  

  useEffect(()=>{
    if(!editor) return ;
    editor.setEditable(isPreview ? false : true);
  },[isPreview,editor])
  

  const setUnsetLink = useCallback(() => {
    if (editor?.isActive("link")) {
      editor.chain().focus().unsetLink().run();
      return;
    }
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    // update link
    editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);


  return (
    <>
      <style>{myStyles}</style>
      {editor && (
        <BubbleMenu className="bubble-menu" tippyOptions={{ duration: 100 }} editor={editor}>
          {/* set code */}

          <button
            title="set code"
            className="tool-bar-button"
            onClick={() => editor.chain().focus().setCode().run()}
            disabled={editor.isActive("code")}
          >
            <CodeIcon />
          </button>
          <button
            title="bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`tool-bar-button ${editor.isActive("bold") ? "is-active" : ""}`}
          >
            <BoldIcon />
          </button>

          <button
            title="italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`tool-bar-button ${editor.isActive("italic") ? "is-active" : ""}`}
          >
            <ItalicIcon />
          </button>

          <button
            title="underline"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`tool-bar-button ${editor.isActive("underline") ? "is-active" : ""}`}
          >
            <UnderlineIcone />
          </button>

          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`tool-bar-button ${editor.isActive("strike") ? "is-active" : ""}`}
          >
            <StrikeThroughIcon />
          </button>

          <select
            title="text align"
            onChange={(e) => editor.chain().focus().setTextAlign(e.target.value).run()}
            className="justify-select-toolbar"
          >
            <option value="left" selected className="opt" title="align left">
              left
            </option>
            <option value="right" className="opt" title="align right">
              right
            </option>
            <option value="center" className="opt" title="align center">
              center
            </option>
            <option value="justify" className="opt" title="align justify">
              justify
            </option>
          </select>

          <input
            type="color"
            title="text color"
            className="color-toolbar"
            onClick={(e) => e.stopPropagation()}
            onInput={(event) =>
              editor
                .chain()
                .focus()
                .setColor((event.target as HTMLInputElement).value)
                .run()
            }
            value={editor.getAttributes("textStyle").color}
            data-testid="setColor"
          />
          <input
            type="color"
            title="highlight color"
            onClick={(e) => e.stopPropagation()}
            className="color-toolbar"
            onInput={(e) =>
              editor
                .chain()
                .focus()
                .toggleHighlight({ color: (e.target as HTMLInputElement).value })
                .run()
            }
            value={editor.getAttributes("textStyle").color}
            data-testid="setColor"
          />

          <button aria-label="Add Link" onClick={setUnsetLink} className="tool-bar-button">
            <LinkIcon />
          </button>
        </BubbleMenu>
      )}
        
      <EditorContent editor={editor} />
    </>
  );
}

export default TextEditorTipTap;
