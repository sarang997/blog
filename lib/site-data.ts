export type Project = {
  slug: string;
  kicker: string;
  title: string;
  year: string;
  shortDescription: string;
  problem: string;
  approach: string;
  lesson: string;
  technologies: string[];
  url: string;
};

export type Experience = {
  role: string;
  company: string;
  dates: string;
  summary: string;
};

export const projects: Project[] = [
  {
    slug: "raw-ml-with-c",
    kicker: "First-principles ML",
    title: "ML fundamentals, without the framework",
    year: "2026",
    shortDescription: "Implementing tensors and core ML operations in C to understand the memory and computation hidden beneath high-level libraries.",
    problem: "Modern ML libraries make experimentation fast, but they can hide the data layout, allocation and numerical operations that make a model run.",
    approach: "Build the fundamentals with pointers and flat arrays, deliberately writing the implementation by hand. The project is also becoming a place to explore CUDA as the low-level work develops.",
    lesson: "Removing abstractions turns familiar tensor expressions back into concrete choices about memory, indexing and control flow.",
    technologies: ["C", "Memory layout", "CUDA (learning)"],
    url: "https://github.com/sarang997/raw-ml-with-c",
  },
  {
    slug: "llm-implementation-jax",
    kicker: "Transformers",
    title: "A tiny transformer that learns addition",
    year: "2026",
    shortDescription: "A compact, hand-built transformer in JAX trained on digit addition, using a 13-token vocabulary and JIT-compiled training functions.",
    problem: "Understand attention and training dynamics through a task small enough that the architecture, data and failure modes can all be inspected.",
    approach: "Start with single-digit addition using one attention head, an embedding size of eight and 952 parameters, then debug the complete training loop directly in JAX.",
    lesson: "A deliberately tiny problem creates room to reason about every moving part rather than treating the training stack as a black box.",
    technologies: ["JAX", "Transformers", "JIT"],
    url: "https://github.com/sarang997/llm-implementation-jax",
  },
  {
    slug: "wiki-snowflake-pipeline",
    kicker: "Analytics engineering",
    title: "Wikipedia pageviews to tested marts",
    year: "2026",
    shortDescription: "A daily pipeline that ingests popular Wikipedia articles, loads Snowflake and produces tested analytics models with dbt.",
    problem: "Turn a public daily feed into repeatable, analytics-ready data without manual intervention.",
    approach: "Separate ingestion, transformation and load steps; orchestrate them through GitHub Actions or Airflow; provision Snowflake infrastructure with Terraform; and validate the resulting marts with dbt tests.",
    lesson: "A useful pipeline is more than movement: its scheduling, infrastructure, models and tests need to form one understandable system.",
    technologies: ["Snowflake", "dbt", "Airflow", "Terraform"],
    url: "https://github.com/sarang997/wiki-snowflake-pipeline",
  },
  {
    slug: "f1-telemetry-pipeline",
    kicker: "Streaming systems",
    title: "A telemetry pipeline built like a pit wall",
    year: "2025",
    shortDescription: "A distributed F1 simulation producing telemetry at 100 Hz for independent visualization, storage and streaming analytics consumers.",
    problem: "Model the shape of a real-time telemetry system in which live displays, historical storage and analytics evolve independently.",
    approach: "Use a physics simulator as the producer, Kafka as the event backbone, InfluxDB for history and Spark Structured Streaming for windowed lap analytics.",
    lesson: "Decoupled consumers let the real-time path stay focused while storage and aggregation can scale on their own terms.",
    technologies: ["Kafka", "Spark", "InfluxDB", "Python"],
    url: "https://github.com/sarang997/f1-telemetry-pipeline",
  },
];

export const experience: Experience[] = [
  {
    role: "Data Engineer",
    company: "Knimbus",
    dates: "2022 — present",
    summary: "Built automated reporting systems that reduced manual work by 85%, plus scraping and ETL pipelines spanning more than 20 sources and improving data accuracy by 40%.",
  },
  {
    role: "Data Engineer",
    company: "Fliplearn",
    dates: "2022",
    summary: "Developed data engines for platform-usage reporting and a serverless AWS architecture that reduced infrastructure costs by 40%.",
  },
  {
    role: "Engineering Intern",
    company: "BETIC, IIT Bombay",
    dates: "2018",
    summary: "Contributed to low-cost prosthetic-leg development and worked directly with patients on customisation.",
  },
];

export const socialLinks = [
  { label: "Email", href: "mailto:bhatnagar.sarang1@gmail.com", external: false },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sarang-bhatnagar-3253a5100/", external: true },
  { label: "GitHub", href: "https://github.com/sarang997", external: true },
];
