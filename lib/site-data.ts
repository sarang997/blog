export type Project = {
  slug: string;
  title: string;
  year: string;
  shortDescription: string;
  technologies: string[];
  url: string;
};

export type EngineeringWork = {
  slug: string;
  title: string;
  summary: string;
  detail: string;
  technologies: string[];
};

export const engineeringWork: EngineeringWork[] = [
  {
    slug: "distributed-logging",
    title: "Logging across distributed servers",
    summary: "Built an ELK logging and alerting platform for hundreds of servers, supporting ingestion of up to 140 MB/s with 30-day retention.",
    detail: "I worked on Elasticsearch indexing and shard layout, reducing the shard count by about 60% and improving cluster stability. The platform also gave us a way to monitor the health of our scraper services in Kibana.",
    technologies: ["Elasticsearch", "Logstash", "Kibana"],
  },
  {
    slug: "data-acquisition",
    title: "A service for collecting research data",
    summary: "Built APIs and distributed scraper services to collect academic research data from more than 900 sources, with shared parsing, authentication and ingestion layers.",
    detail: "New scrapers could be added through JSON configuration. I connected the service to our logging platform for monitoring, containerised it, and deployed it on Google Cloud with CI/CD.",
    technologies: ["APIs", "Web scraping", "Docker", "Google Cloud"],
  },
  {
    slug: "metadata-pipelines",
    title: "Metadata ingestion and reporting",
    summary: "Designed a pipeline to ingest 1.6 TB of JSON metadata into BigQuery and keep it updated, supporting search queries with response times below 200 ms.",
    detail: "I also built pipelines from SQL, MongoDB, Redis and external APIs into Elasticsearch. Automating report delivery brought turnaround down from 7–10 days to one day.",
    technologies: ["BigQuery", "SQL", "MongoDB", "Elasticsearch"],
  },
];

export const projects: Project[] = [
  {
    slug: "f1-telemetry-pipeline",
    title: "F1 telemetry and streaming analytics",
    year: "2025",
    shortDescription: "A personal project with separate services for telemetry simulation, live visualisation, storage and lap analytics. Kafka carries the events, InfluxDB stores them, and Spark produces lap summaries.",
    technologies: ["Python", "Kafka", "Spark", "InfluxDB"],
    url: "https://github.com/sarang997/f1-telemetry-pipeline",
  },
  {
    slug: "raw-ml-with-c",
    title: "ML operations in C",
    year: "2026",
    shortDescription: "Implementing matrix multiplication, gradients, layer normalisation and softmax in C to understand the calculations and memory management underneath an ML framework.",
    technologies: ["C", "Linear algebra", "Memory management"],
    url: "https://github.com/sarang997/raw-ml-with-c",
  },
  {
    slug: "llm-implementation-jax",
    title: "A small transformer in JAX",
    year: "2026",
    shortDescription: "A transformer for digit addition, including causal attention, training and inference. Its 952 parameters make the full implementation small enough to inspect and debug.",
    technologies: ["JAX", "Attention", "Automatic differentiation"],
    url: "https://github.com/sarang997/llm-implementation-jax",
  },
  {
    slug: "wiki-snowflake-pipeline",
    title: "Wikipedia pageviews in Snowflake",
    year: "2026",
    shortDescription: "A daily Python pipeline with dbt models and data checks, Terraform infrastructure and GitHub Actions. A separate version uses Airflow for ingestion.",
    technologies: ["Snowflake", "dbt", "Terraform", "Airflow"],
    url: "https://github.com/sarang997/wiki-snowflake-pipeline",
  },
];

export const earlierWork = [
  {
    company: "Fliplearn",
    role: "Data Engineer",
    dates: "February to December 2022",
    summary: "Built an event-driven reporting pipeline with AWS SQS, Lambda and S3, combining data from databases and APIs for daily, weekly and monthly reports.",
  },
  {
    company: "BETIC, IIT Bombay",
    role: "Research Intern",
    dates: "January to June 2018",
    summary: "Analysed time-series data from body-mounted motion sensors to study gait asymmetry in polio patients.",
  },
];

export const socialLinks = [
  { label: "Email", href: "mailto:bhatnagar.sarang1@gmail.com", external: false },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/sarang-bhatnagar-3253a5100/", external: true },
  { label: "GitHub", href: "https://github.com/sarang997", external: true },
];
