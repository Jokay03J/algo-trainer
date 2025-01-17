import { useRef } from "react";
import { Editor as EditorBase } from "@monaco-editor/react";

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const Editor = ({ value, onChange }: EditorProps) => {
  return (
    <EditorBase
      value={value}
      onChange={(c) => onChange(c ?? "")}
      className="h-40"
    />
  );
};

export default Editor;
