import { useState, type ChangeEvent } from "react";
import { useDropzone } from "react-dropzone";

import { type SketchSource } from "./state/sketch";

import "./Source.css";
import { useGlobalState } from "./state/global";
import { useShallow } from "zustand/shallow";

interface SourceProps {
  index: number;
  source: SketchSource;
  setSource: (source: SketchSource) => void;
}

export function Source({ source, setSource }: SourceProps) {
  const [file, setFile] = useState<File | null>(null);
  const webcams = useGlobalState(useShallow((state) => state.webcams));

  const { getRootProps, getInputProps, isDragGlobal } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  function handleWebcamChange(event: ChangeEvent<HTMLSelectElement>) {
    setSource({
      type: "webcam",
      webcamIndex: event.target.value,
    });
  }

  return (
    <div {...getRootProps({ className: "source" })}>
      <fieldset>
        <legend>Source</legend>
        <span>{source.type}</span>
        {source.type === "webcam" && (
          <div>
            <select value={source.webcamIndex} onChange={handleWebcamChange}>
              {webcams.map((webcam, index) => (
                <option key={webcam.deviceId} value={index}>
                  {webcam.label}
                </option>
              ))}
            </select>
          </div>
        )}
        {file ? <span>file.name</span> : null}
        {/* <input {...getInputProps()} /> */}
      </fieldset>
      {isDragGlobal && (
        <div className="source-drag-overlay">Drop to upload</div>
      )}
    </div>
  );
}
