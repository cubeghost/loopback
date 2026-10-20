import "./Credits.css";

export function Credits() {
  return (
    <details className="credits">
      <summary>credits</summary>
      <p>
        built on top of{" "}
        <a href="https://hydra.ojack.xyz/" target="_blank" rel="noopener">
          hydra
        </a>
        by{" "}
        <a href="https://ojack.xyz/" target="_blank" rel="noopener">
          olivia jack
        </a>
      </p>

      <h4>sounds</h4>
      <p>
        <a
          href="https://freesound.org/people/CAT-FOX_ALEX/sounds/827133/"
          target="_blank"
          rel="noopener"
        >
          Click 2
        </a>{" "}
        by CAT-FOX_ALEX licensed under{" "}
        <a href="http://creativecommons.org/publicdomain/zero/1.0/" target="_blank" rel="noopener">
          CC0
        </a>
      </p>
      <p>
        <a href="https://kenney.nl/assets/interface-sounds" target="_blank" rel="noopener">
          "click_002" & "scroll_004"
        </a>{" "}
        by Kenney licensed under{" "}
        <a href="http://creativecommons.org/publicdomain/zero/1.0/" target="_blank" rel="noopener">
          CC0
        </a>
      </p>
    </details>
  );
}
