import React, { useEffect, useRef, useState } from "react";

import Editor from "@draft-js-plugins/editor";
import draftToMarkdown from "draftjs-to-markdown";
import { mdToDraftjs } from 'draftjs-md-converter';
import { convertToRaw, convertFromRaw, EditorState } from "draft-js";

import createToolbarPlugin, {
  Separator,
} from "@draft-js-plugins/static-toolbar";
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  UnorderedListButton,
  OrderedListButton
} from "@draft-js-plugins/buttons";
import editorStyles from "./editorStyles.css";
import "@draft-js-plugins/static-toolbar/lib/plugin.css";
import Scrollbars from "react-custom-scrollbars";

const TextEditor = (props) => {
  const text = props.value;
  const { header, ministryIndex, id, recordData, projIndex } = props;

  const [{ plugins, Toolbar }] = useState(() => {
    const toolbarPlugin = createToolbarPlugin();
    const { Toolbar } = toolbarPlugin;
    const plugins = [toolbarPlugin];
    return {
      plugins,
      Toolbar
    };
  });

  const [editorState, setEditorState] = useState(
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (text) {
      setEditorState(EditorState.createWithContent(convertFromRaw(mdToDraftjs(text))));
    } else {
      setEditorState(EditorState.createEmpty())
    }
    
  }, [ministryIndex, header, id, recordData])

  const onChange = (newState) => {
    setEditorState(newState);
    const currentContentState = editorState.getCurrentContent()
    const newContentState = newState.getCurrentContent()
 
    if (currentContentState !== newContentState) {
      const text = draftToMarkdown(convertToRaw(newState.getCurrentContent()))
      props._handleModalText({ id: id, text: text, header: header, ministryIndex: ministryIndex, projIndex: projIndex })
    }
  };
  //   componentDidMount() {
  //     // fixing issue with SSR https://github.com/facebook/draft-js/issues/2332#issuecomment-761573306
  //     // eslint-disable-next-line react/no-did-mount-set-state
  //     this.setState({
  //       editorState: createEditorStateWithText(text),
  //     });
  //   }

  var editor = useRef(null);
  const focus = () => {
    editor.current && editor.current.focus();
  };
  return (
    <div className={`${editorStyles.editor}`} onClick={focus}>
      {
        !props.readOnly &&
        <Toolbar>
          {
            // may be use React.Fragment instead of div to improve perfomance after React 16
            (externalProps) => (
              <div>
                <BoldButton {...externalProps} />
                <ItalicButton {...externalProps} />
                <UnderlineButton {...externalProps} />
                <Separator {...externalProps} />
                {/* <HeadlinesButton {...externalProps} /> */}
                <UnorderedListButton {...externalProps} />
                <OrderedListButton {...externalProps} />

              </div>
            )
          }
        </Toolbar>
      }
      <div className="border">
      <Scrollbars
        className={`scrollBar ${(draftToMarkdown(convertToRaw(editorState.getCurrentContent())).trim()).length > 0? 'list-style': 'empty-list-style'} `}
        autoHeight
        autoHeightMin={100}
        autoHeightMax={419}
        renderTrackHorizontal={(props) => (
          <div
            {...props}
            style={{ display: "none" }}
            className="track-horizontal"
          />
        )}
      >
        <Editor
          editorState={editorState}
          onChange={onChange}
          plugins={plugins}
          ref={(element) => (editor.current = element)}
          readOnly={props.readOnly}
        />
      </Scrollbars>
      </div>
      {/* <textarea
        disabled
        value={
          editorState &&
          draftToMarkdown(convertToRaw(editorState.getCurrentContent()))
        }
      /> */}
    </div>
  );
};
export default TextEditor;
