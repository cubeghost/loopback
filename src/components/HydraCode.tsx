import { useSketch } from "../state/sketch";
import { generateHydraCode } from "../code";
import beautify from "js-beautify";

import "./HydraCode.css";

export function HydraCode() {
  const sketch = useSketch();
  const code = beautify(generateHydraCode(sketch), {
    indent_size: 2,
    break_chained_methods: true,
  });
  const hydraUrl = `https://hydra.ojack.xyz/?code=${btoa(encodeURIComponent(code))}`;

  return (
    <div className="hydra-code">
      <a href={hydraUrl} target="_blank">
        open in hydra
      </a>
      <details open>
        <summary>hydra source code</summary>
        <code>
          <pre>{code}</pre>
        </code>
      </details>
    </div>
  );
}
