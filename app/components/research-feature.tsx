import { sitePath } from "../../lib/site";

export function ResearchFeature({ detailed = false }: { detailed?: boolean }) {
  return (
    <article className="research-feature">
      <div className="research-context">
        <p className="eyebrow">MSc dissertation · 2026</p>
        <p>University of Bath</p>
        <p>Statistics and Data Science</p>
      </div>
      <div className="research-copy">
        <h3>CNN architectures for audio classification</h3>
        <p>
          My dissertation compared ResNet18 and ResNet50 on bird sounds and
          environmental audio. I built the audio preprocessing and training
          workflow, then evaluated predictive performance, statistical
          uncertainty and inference cost.
        </p>
        {detailed && (
          <div className="research-detail">
            <p>
              Recordings were standardised to five seconds of 32 kHz mono audio
              and converted to mel spectrograms. Both models used pretrained
              weights and the same five-epoch training schedule on BirdCLEF 2024
              subsets and ESC-50.
            </p>
            <p>
              Evaluation included accuracy, macro and weighted F1, bootstrap
              confidence intervals, paired McNemar tests and inference time.
              ResNet18 gave comparable or better validation results with lower
              inference cost under these conditions.
            </p>
            <p>
              The study used one split and seed. The ESC-50 experiment was
              exploratory, using a random split with some shared recording
              sources rather than the official evaluation folds.
            </p>
          </div>
        )}
        <p className="research-tools">PyTorch · Mel spectrograms · Statistical evaluation</p>
        <div className="research-links">
          <a href={sitePath("/dissertation.pdf")} target="_blank" rel="noreferrer">Read dissertation <span className="link-note">PDF, 46 pages</span></a>
          <a href="https://github.com/sarang997/dissertation" target="_blank" rel="noreferrer">Code and experiments</a>
        </div>
      </div>
    </article>
  );
}
