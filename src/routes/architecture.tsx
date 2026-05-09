import { createFileRoute } from "@tanstack/react-router";
import { Server, HardDrive, Database, Layers, Globe, BarChart3, GitBranch, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/architecture")({
  head: () => ({ meta: [{ title: "Architecture — NimbusCart on AWS" }] }),
  component: Architecture,
});

const services = [
  { icon: Server, name: "Amazon EC2 + Auto Scaling", area: "Compute", desc: "A t3.medium fleet inside an Auto Scaling Group fronts every request behind an Application Load Balancer. Capacity scales out and in automatically as traffic moves.", bullets: ["t3.medium fleet, 2 → 10 instances", "Target-tracking on CPU > 70%", "Behind an Application Load Balancer"] },
  { icon: HardDrive, name: "Amazon S3", area: "Storage", desc: "Two buckets store public media and private assets with versioning and KMS encryption enabled. Public access is blocked at the bucket level.", bullets: ["nimbuscart-media + nimbuscart-private buckets", "Versioning + KMS encryption + Block Public Access", "OAI-only read for media via CloudFront"] },
  { icon: Database, name: "Amazon RDS for PostgreSQL 16", area: "Database", desc: "A db.t3.medium Multi-AZ instance holds an 8-table schema with point-in-time recovery. Connections are TLS-only and encrypted at rest with KMS.", bullets: ["db.t3.medium Multi-AZ deployment", "7-day PITR, force_ssl enabled", "KMS encryption at rest, 8-table schema"] },
  { icon: Layers, name: "AWS Elastic Beanstalk", area: "Application", desc: "Beanstalk is the PaaS layer that orchestrates EC2, ALB, and ASG together. Deployments are rolling-with-additional-batch with environment variables sourced from SSM Parameter Store.", bullets: ["Orchestrates EC2 + ALB + ASG", "Rolling-with-additional-batch deploys", "Env vars from SSM Parameter Store"] },
  { icon: Globe, name: "Amazon CloudFront", area: "Content Delivery", desc: "CloudFront serves traffic from 450+ edge POPs with per-path cache behaviours. AWS WAF v2 and an ACM TLS cert are attached at the distribution.", bullets: ["450+ edge POPs, per-path cache behaviours", "AWS WAF v2 attached", "ACM-issued TLS certificate"] },
  { icon: BarChart3, name: "Amazon Athena + Glue + QuickSight", area: "Analytics", desc: "Parquet exports land in S3 and Athena runs serverless SQL on top, catalogued by AWS Glue. QuickSight powers an executive dashboard on the same data.", bullets: ["Serverless SQL on S3 Parquet exports", "AWS Glue Data Catalog", "QuickSight executive dashboard"] },
  { icon: GitBranch, name: "AWS CloudFormation + CodePipeline + CodeBuild + CodeDeploy", area: "IaC + CI/CD", desc: "A single CloudFormation template provisions the entire stack. CodePipeline runs Build → Stage → Manual approval → Prod with rolling deploy and CloudFront invalidation.", bullets: ["One CloudFormation template provisions everything", "Build → Stage → Manual approval → Prod", "Rolling deploy + CloudFront invalidation"] },
  { icon: ShieldCheck, name: "AWS IAM + Cognito", area: "Identity", desc: "IAM gives least-privilege roles to compute, build, deploy, and analytics workloads. Cognito handles end-user auth with email + password, optional Google federation, and JWTs.", bullets: ["Least-privilege roles per workload", "Cognito user pool: email + password + optional Google + MFA", "JWT — 1h access, 30d refresh"] },
];

function Architecture() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <header className="max-w-3xl">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">AWS architecture</p>
        <h1 className="mt-1 text-4xl font-semibold tracking-tight sm:text-5xl">Eight services. One resilient platform.</h1>
        <p className="mt-4 text-muted-foreground">NimbusCart runs on a small set of well-understood AWS primitives, provisioned by CloudFormation and shipped through CodePipeline. Below is the runtime topology and the role each service plays.</p>
      </header>

      <section className="mt-12 grid gap-5 md:grid-cols-2">
        {services.map(({ icon: Icon, name, area, desc, bullets }) => (
          <article key={name} className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-aws/15 text-aws"><Icon className="h-5 w-5" /></span>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{area}</p>
                <h2 className="font-semibold">{name}</h2>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">{desc}</p>
            <ul className="mt-4 grid gap-1.5 text-sm">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-aws" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold tracking-tight">Runtime topology</h2>
        <p className="mt-1 text-sm text-muted-foreground">Request path top-to-bottom; supporting lanes below.</p>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-card p-6">
          <Diagram />
        </div>
      </section>
    </div>
  );
}

function Diagram() {
  // Boxes laid out manually for a clean, readable diagram.
  const Box = ({ x, y, w = 130, h = 44, label, sub, accent = false }: { x: number; y: number; w?: number; h?: number; label: string; sub?: string; accent?: boolean }) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} className={accent ? "fill-[oklch(0.72_0.18_55_/_0.18)]" : "fill-[oklch(0.51_0.22_280_/_0.10)]"} stroke="currentColor" strokeOpacity={0.25} />
      <text x={x + w / 2} y={y + (sub ? 18 : h / 2 + 4)} textAnchor="middle" fontSize="11" fontWeight={600} fill="currentColor">{label}</text>
      {sub && <text x={x + w / 2} y={y + 32} textAnchor="middle" fontSize="9" fill="currentColor" opacity={0.65}>{sub}</text>}
    </g>
  );

  const Arrow = ({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeOpacity={0.45} strokeWidth={1.5} markerEnd="url(#arr)" />
  );

  return (
    <svg viewBox="0 0 1080 520" className="w-full text-foreground" role="img" aria-label="NimbusCart AWS architecture diagram">
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="currentColor" opacity="0.55" />
        </marker>
      </defs>

      {/* Top request path row */}
      <Box x={20}  y={40} label="Users" />
      <Box x={180} y={40} label="Route 53" sub="DNS" />
      <Box x={340} y={40} label="CloudFront" sub="450+ POPs" />
      <Box x={500} y={40} label="AWS WAF v2" />
      <Box x={660} y={40} label="ALB" sub="Application LB" />
      <Box x={820} y={40} label="ACM TLS" />

      <Arrow x1={150} y1={62} x2={180} y2={62} />
      <Arrow x1={310} y1={62} x2={340} y2={62} />
      <Arrow x1={470} y1={62} x2={500} y2={62} />
      <Arrow x1={630} y1={62} x2={660} y2={62} />
      <Arrow x1={790} y1={62} x2={820} y2={62} />

      {/* Beanstalk envelope */}
      <rect x={460} y={130} width={400} height={120} rx={14} fill="oklch(0.55 0.25 305 / 0.07)" stroke="currentColor" strokeOpacity={0.2} strokeDasharray="4 4" />
      <text x={660} y={150} textAnchor="middle" fontSize="11" fontWeight={700} fill="currentColor" opacity={0.7}>AWS Elastic Beanstalk</text>
      <Box x={490} y={170} w={150} label="Auto Scaling Group" sub="2 → 10 instances" />
      <Box x={680} y={170} w={150} label="EC2 t3.medium" sub="App fleet" />
      <Arrow x1={640} y1={192} x2={680} y2={192} />
      <Arrow x1={725} y1={84} x2={725} y2={170} />

      {/* Data layer */}
      <Box x={120} y={320} w={170} label="RDS PostgreSQL 16" sub="Multi-AZ · KMS · PITR" />
      <Box x={330} y={320} w={170} label="ElastiCache Redis" sub="Sessions + cache" />
      <Box x={540} y={320} w={170} label="Amazon S3" sub="media + private buckets" accent />
      <Arrow x1={580} y1={214} x2={205} y2={320} />
      <Arrow x1={620} y1={214} x2={415} y2={320} />
      <Arrow x1={680} y1={214} x2={625} y2={320} />

      {/* Supporting lanes */}
      <Lane y={420} title="CI / CD" items={["CloudFormation", "CodePipeline", "CodeBuild", "CodeDeploy"]} xStart={20} />
      <Lane y={420} title="Analytics" items={["Athena", "Glue", "QuickSight"]} xStart={300} />
      <Lane y={420} title="Observability" items={["CloudWatch", "CloudTrail"]} xStart={580} />
      <Lane y={420} title="Identity" items={["IAM", "Cognito"]} xStart={820} />
    </svg>
  );
}

function Lane({ y, title, items, xStart }: { y: number; title: string; items: string[]; xStart: number }) {
  return (
    <g>
      <text x={xStart} y={y - 10} fontSize="10" fontWeight={700} fill="currentColor" opacity={0.7}>{title.toUpperCase()}</text>
      {items.map((it, i) => (
        <g key={it}>
          <rect x={xStart + i * 64} y={y} width={60} height={32} rx={8} fill="oklch(0.55 0.25 305 / 0.10)" stroke="currentColor" strokeOpacity={0.22} />
          <text x={xStart + i * 64 + 30} y={y + 20} textAnchor="middle" fontSize="9" fontWeight={600} fill="currentColor">{it}</text>
        </g>
      ))}
    </g>
  );
}
