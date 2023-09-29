import { Editor } from "@tinymce/tinymce-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import "./Editor.css";
type Props = {
  text: string;
  onSelect: (value: string) => void;
  onChange: (content: any, editor: any) => void;
};

const EditorNoSSR = ({ text, onSelect, onChange }: Props) => {
  const editorRef = useRef(null);
  const key = process.env.NEXT_PUBLIC_EDITOR_API_KEY;
  const log = () => {
    if (editorRef.current) {
      //@ts-ignore
      console.log(editorRef.current.getContent());
    }
  };
  const handleSelection = () => {
    if (editorRef.current) {
      // @ts-ignore
      const text = editorRef.current.selection.getContent({ format: "text" });
      onSelect(text);
    }
  };
  return (
    <Box h="100%" className="editor-container" p={4}>
      <>
        {/* <Text whiteSpace="pre-wrap">{text}</Text> */}
        <Editor
          apiKey={key}
          //@ts-ignore
          onInit={(evt, editor) => (editorRef.current = editor)}
          onEditorChange={onChange}
          onSelectionChange={handleSelection}
          initialValue={text}
          init={{
            forced_root_block: "p",
            newline_behavior: "linebreak",
            content_css: "./Editor.css",
            skin: "snow",
            icons: "thin",
            resize: false,
            height: "100%",
            menubar: false,
            init_instance_callback: function (editor) {
              var freeTiny = document.querySelector(
                ".tox .tox-notification--in"
              );
              if (freeTiny) {
                //@ts-ignore
                freeTiny.style.display = "none";
              }
            },
            plugins: [
              "export",
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "imagetools",
              "wordcount",
            ],
            file_picker_types: "image",
            file_picker_callback: function (cb, value, meta) {
              var input = document.createElement("input");
              input.setAttribute("type", "file");
              input.setAttribute("accept", "image/*");

              /*
                Note: In modern browsers input[type="file"] is functional without
                even adding it to the DOM, but that might not be the case in some older
                or quirky browsers like IE, so you might want to add it to the DOM
                just in case, and visually hide it. And do not forget do remove it
                once you do not need it anymore.
              */

              input.onchange = function () {
                //@ts-ignore
                var file = this.files[0];

                var reader = new FileReader();
                reader.onload = function () {
                  /*
                    Note: Now we need to register the blob in TinyMCEs image blob
                    registry. In the next release this part hopefully won't be
                    necessary, as we are looking to handle it internally.
                  */
                  var id = "blobid" + new Date().getTime();
                  //@ts-ignore
                  var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                  //@ts-ignore
                  var base64 = reader.result.split(",")[1];
                  var blobInfo = blobCache.create(id, file, base64);
                  blobCache.add(blobInfo);

                  /* call the callback and populate the Title field with the file name */
                  cb(blobInfo.blobUri(), { title: file.name });
                };
                reader.readAsDataURL(file);
              };

              input.click();
            },
            branding: false,
            toolbar:
              "blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright | bullist numlist | save print export | link image | outdent indent | undo redo ",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </>
    </Box>
  );
};

export default EditorNoSSR;
