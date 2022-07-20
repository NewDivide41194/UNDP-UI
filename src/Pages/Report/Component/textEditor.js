import React, { useEffect, useRef, useState } from "react";
import Editor from "@draft-js-plugins/editor";
import {  convertFromRaw, EditorState } from "draft-js";
import { mdToDraftjs } from 'draftjs-md-converter';
import "@draft-js-plugins/static-toolbar/lib/plugin.css";
import './editorStyles.css'

const TextEditor = (props) => {
  const text = props.value;
  //console.log('text => ', text)
  const [editorState, setEditorState] = useState(         
    EditorState.createEmpty()
  );

  const onChange = (editorState) => {
    setEditorState(editorState);
  };
  useEffect(() => {
    if(text){
      setEditorState(EditorState.createWithContent(convertFromRaw(mdToDraftjs(text))));
    }
    else{
      setEditorState(EditorState.createEmpty())
    }
  }, [text]);
  var editor = useRef(null);
  const focus = () => {
    editor.focus();
  };

  return (
    <div className="view" onClick={focus}>             
        <Editor      
          editorState={editorState}
          onChange={onChange}                 
          ref={(element) => {
            editor = element;
          }
        }
        readOnly
        />      
    </div>
  );
};
export default TextEditor;
