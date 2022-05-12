import React from "react";

import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
const MyEditor = (props) => {
    const [editorState, setEditorState] = React.useState(
        EditorState.createEmpty()
    );

    const editor = React.useRef(null);

    function focusEditor() {
        editor.current.focus();
    }

    React.useEffect(() => {
        focusEditor();
    }, []);

    return (
        <div style={{ margin: "1rem" }}>
            <h5>header</h5>
            <input type="text" />
            <h5>text</h5>
            <div
                style={{
                    border: "1px solid black",
                    minHeight: "6em",
                    cursor: "text",
                }}
                onClick={focusEditor}
            >
                <Editor
                    ref={editor}
                    editorState={editorState}
                    onChange={(editorState) => setEditorState(editorState)}
                    placeholder="Write something!"
                />
            </div>
        </div>
    );
};

export default MyEditor;
