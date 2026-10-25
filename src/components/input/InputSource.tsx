import { useState, type ChangeEvent } from "react";
// import { useDropzone } from "react-dropzone";

import { useSoundEffects } from "../../hooks/useSoundEffects";
import { useVideoDevices } from "../../hooks/useVideoDevices";
import { type SketchSource } from "../../state/sketch";

import "./InputSource.css";

interface SourceProps {
  source: SketchSource;
  setSource: (source: Partial<SketchSource>) => void;
}

export function InputSource({ source, setSource }: SourceProps) {
  const [play] = useSoundEffects("click_subtle");
  // const [file, setFile] = useState<File | null>(null);
  const devices = useVideoDevices();

  // const { getRootProps, getInputProps, isDragGlobal } = useDropzone({
  //   onDrop: (acceptedFiles) => {
  //     setFile(acceptedFiles[0]);
  //   },
  // });

  function handleTypeChange(event: ChangeEvent<HTMLSelectElement>) {
    const type = event.target.value as SketchSource["type"];
    setSource({
      type,
    });
    play();
  }

  return (
    <div className="surface source">
      <fieldset>
        <legend>source</legend>
        <select value={source.type} onChange={handleTypeChange}>
          <option>camera</option>
          <option>video</option>
          <option>screen</option>
          <option>noise</option>
        </select>
        {source.type === "camera" && (
          <div>
            <select
              value={source.cameraIndex ?? ""}
              onChange={(event) => {
                setSource({
                  cameraIndex: event.target.value,
                });
                play();
              }}
            >
              {devices.map((device, index) => (
                <option key={device.deviceId} value={index}>
                  {device.label ?? index}
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
        {/* {file ? <span>file.name</span> : null} */}
        {/* <input {...getInputProps()} /> */}
      </fieldset>
      {/* {isDragGlobal && <div className="source-drag-overlay">Drop to upload</div>} */}
    </div>
  );
}
