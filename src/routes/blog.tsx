import { createFileRoute } from "@tanstack/react-router";
import { MockPage } from "@/components/nimbus/MockPage";

export const Route = createFileRoute("/blog")({
  head: () => ({ meta: [{ title: "Blog — NimbusCart" }, { name: "description", content: "The NimbusCart blog covers how we architect, ship, and operate the storefront — from CloudFront cache tuning to small details of the checkout flow." }] }),
  component: () => <MockPage title="Blog" kicker="Field notes" paragraphs={["The NimbusCart blog covers how we architect, ship, and operate the storefront — from CloudFront cache tuning to small details of the checkout flow.", "Subscribe for occasional, well-edited posts. No clickbait, no churn-and-burn newsletters."]} />,
});
