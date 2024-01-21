import { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

/**
 * @see https://quilljs.com/docs/modules/toolbar/
 */

interface Props{
    text?:string;
    setText?:(i:string) =>void;
    saveItems?:()=>void;
}

function MainTextEditor({text, setText , saveItems}:Props) {
    
  
  const colors = [
        // Green combinations
        '#4CAF50', '#8BC34A', '#CDDC39', '#00BCD4', '#009688',
        // Yellow combinations
        '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#FFD600',
        // Red combinations
        '#FF5733', '#FF3336', '#FF3364', '#FF6F33', '#FF333A',
        // White combinations
        '#FFFFFF', '#F8F9FA', '#E9ECEF', '#DEE2E6', '#CED4DA',
        // Gray combinations
        '#495057', '#6C757D', '#ADB5BD', '#868E96', '#343A40',
        // Blue combinations
        '#2196F3', '#03A9F4', '#00BCD4', '#3F51B5', '#5677FC',
        // Mixed combinations
        '#2E7D32', '#FFEA00', '#D32F2F', '#FFFFFF', '#607D8B',
        '#FFA000', '#BDBDBD', '#1976D2', '#FF4081', '#8BC34A',
        '#FFC107', '#263238', '#FF6F00', '#607D8B', '#2196F3'
      ];
    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'color', 'background'
      ]
    const modules = {
        toolbar: [
          [{ 'header': '1'}, {'header': '2'},{'header': '3'},{'header': '4'}, { 'font': [] }],
          [{size: []}],
          ['link','bold', 'italic', 'underline', 'strike', 'blockquote'],
          // [{ 'script': 'sub'}, { 'script': 'super' }],  
          [{'list': 'ordered'}, {'list': 'bullet'}, 
           {'indent': '-1'}, {'indent': '+1'}],
           [{ 'direction': 'rtl' }], 
           [{color:colors},{background:colors}],
           [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['clean']
        ],
        clipboard: {
          // toggle to add extra line breaks when pasting HTML:
          matchVisual: false,
        }
      }

    return (
        <ReactQuill  theme="snow" value={text} onChange={setText} formats={formats}   modules={modules} onBlur={saveItems} onFocus={saveItems}  />
    );
}

export default MainTextEditor;