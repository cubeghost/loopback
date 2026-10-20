import { useState, type ChangeEvent } from "react";
import { useDropzone } from "react-dropzone";

import { useSoundEffects } from "../hooks/useSoundEffects";
import { useGlobalState } from "../state/global";
import { type SketchSource } from "../state/sketch";

import "./Source.css";

interface SourceProps {
  source: SketchSource;
  setSource: (source: Partial<SketchSource>) => void;
}

export function Source({ source, setSource }: SourceProps) {
  const [play] = useSoundEffects("click_subtle");
  const [file, setFile] = useState<File | null>(null);
  const videoSources = useGlobalState((state) => state.videoSources);

  const { getRootProps, getInputProps, isDragGlobal } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
  });

  function handleTypeChange(event: ChangeEvent<HTMLSelectElement>) {
    const type = event.target.value as SketchSource["type"];
    setSource({
      type,
    });
    play();
  }

  return (
    <div {...getRootProps({ className: "surface source" })}>
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
            <select
              value={source.cameraIndex}
              onChange={(event) => {
                setSource({
                  cameraIndex: event.target.value,
                });
                play();
              }}
            >
              {videoSources.map((videoSource, index) => (
                <option key={videoSource.deviceId} value={index}>
                  {videoSource.label ?? index}
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
                onChange={(event) => {
                  setSource({ videoUrl: event.target.value });
                  // play();
                }}
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
                  onChange={(event) => {
                    setSource({ noiseScale: event.target.value });
                    play();
                  }}
                />
              </label>
            </div>
          </>
        )}
        {file ? <span>file.name</span> : null}
        {/* <input {...getInputProps()} /> */}
      </fieldset>
      {isDragGlobal && <div className="source-drag-overlay">Drop to upload</div>}
    </div>
  );
}
