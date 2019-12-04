import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const RichEditor = props => {
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data="<p>Hello!</p>"
        onInit={editor => {
          //   console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => props.onChange(editor.getData())}
        onBlur={(event, editor) => {
          //console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          //   console.log("Focus.", editor);
        }}
      />
    </div>
  );
};

export default RichEditor;
