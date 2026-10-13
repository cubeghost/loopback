import { useState, type ChangeEvent } from "react";
import { useDropzone } from "react-dropzone";

import { type SketchSource } from "./state/sketch";

import "./Source.css";
import { useGlobalState } from "./state/global";
import { useShallow } from "zustand/shallow";

interface SourceProps {
  index: number;
  source: SketchSource;
  setSource: (source: Partial<SketchSource>) => void;
}
export function Source({ source, setSource }: SourceProps) {
  const [file, setFile] = useState<File | null>(null);
  const videoSources = useGlobalState((state) => state.videoSources);

  const { getRootProps, getInputProps, isDragGlobal } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  function handleCameraChange(event: ChangeEvent<HTMLSelectElement>) {
    setSource({
      cameraIndex: event.target.value,
    });
  }

  function handleVideoUrlChange(event: ChangeEvent<HTMLInputElement>) {
    setSource({
      videoUrl: event.target.value,
    });
  }

  function handleTypeChange(event: ChangeEvent<HTMLSelectElement>) {
    const type = event.target.value as SketchSource["type"];
    setSource({
      type,
    });
  }

  return (
    <div {...getRootProps({ className: "source" })}>
      <fieldset>
        <legend>Source</legend>
        <select value={source.type} onChange={handleTypeChange}>
          <option>camera</option>
          <option>video</option>
          <option>screen</option>
          <option>noise</option>
        </select>
        {source.type === "camera" && (
          <div>
            <select value={source.cameraIndex} onChange={handleCameraChange}>
              {videoSources.map((videoSource, index) => (
                <option key={videoSource.deviceId} value={index}>
                  {videoSource.label}
                </option>
              ))}
            </select>
          </div>
        )}
        {source.type === "video" && (
          <div>
            <label>
              <span>URL</span>
              <input
                type="text"
                name="videoUrl"
                value={source.videoUrl}
                onChange={(event) =>
                  setSource({ videoUrl: event.target.value })
                }
              />
            </label>
          </div>
        )}
        {source.type === "noise" && (
          <>
            <div>
              <label>
                <span>Scale</span>
                <input
                  type="number"
                  name="noiseScale"
                  value={source.noiseScale}
                  onChange={(event) =>
                    setSource({ noiseScale: parseInt(event.target.value) })
                  }
                />
              </label>
            </div>
          </>
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
