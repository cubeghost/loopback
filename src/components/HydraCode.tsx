import { useSketch } from "../state/sketch";
import { generateHydraCode } from "../code";

import "./HydraCode.css";

export function HydraCode() {
  const sketch = useSketch();
  const code = generateHydraCode(sketch);
  const hydraUrl = `https://hydra.ojack.xyz/?code=${btoa(encodeURIComponent(code))}`;

  return (
    <div className="hydra-code">
      <a href={hydraUrl} target="_blank">
        open in hydra
      </a>
      <details>
        <summary>hydra source code</summary>
        <code>
          <pre>{code}</pre>
        </code>
      </details>
    </div>
  );
}
