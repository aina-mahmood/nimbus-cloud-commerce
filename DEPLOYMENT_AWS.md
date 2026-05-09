# Nimbus Cloud Commerce AWS Deployment

## App Type

- This project is an SSR full-stack TanStack Start app.
- It is not a static site, so plain static hosting will cause 404s.

## Recommended AWS Deployment

- PaaS: AWS Elastic Beanstalk (Node.js platform)
- Compute: EC2 instances managed by Elastic Beanstalk
- Auto scaling: Elastic Beanstalk environment auto scaling group
- Object storage: S3 bucket for product images
- CDN: CloudFront in front of S3 (and optional second distribution for app URL)
- Database: Amazon RDS PostgreSQL or MySQL
- IAM: least-privilege roles for app, CI/CD, and admins
- IaC: CloudFormation or Terraform
- CI/CD: GitHub Actions to Elastic Beanstalk

## Why Amplify Gave 404

- Amplify static hosting expects `index.html`-style static output.
- This app serves routes through a server runtime, so static rewrites are not enough for SSR.

## Changes Added in This Repo

- `Procfile`: tells Elastic Beanstalk how to start app process.
- `vite.config.ts`: uses dynamic `PORT` from environment.
- `.github/workflows/deploy-elastic-beanstalk.yml`: CI/CD template for deployment.

## Elastic Beanstalk Setup

1. Create an Elastic Beanstalk Node.js application.
2. Environment type: Web server environment.
3. Platform branch: Node.js 20 running on 64bit Amazon Linux 2023.
4. Application source: connect GitHub repo or upload source zip.
5. Health check path: `/`.
6. Instance profile: allow S3 read/write (limited bucket) and CloudWatch logs.

## Environment Variables (Example)

Set these in Elastic Beanstalk > Configuration > Software:

- `NODE_ENV=production`
- `DATABASE_URL=<rds-connection-string>`
- `S3_BUCKET_NAME=<product-images-bucket>`
- `AWS_REGION=ap-south-1`
- `SESSION_SECRET=<long-random-secret>`

## Assignment Service Mapping

- Compute + auto scaling: Elastic Beanstalk EC2 + ASG
- Storage: S3 bucket with restricted bucket policy
- Database: RDS (products, orders, customers schema)
- PaaS: Elastic Beanstalk
- CDN: CloudFront distribution
- IAM: service roles + policy boundaries
- CI/CD: GitHub Actions workflow
- IaC: CloudFormation stack to define all resources

