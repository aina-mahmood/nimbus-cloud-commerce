import { createFileRoute } from "@tanstack/react-router";
import { MockPage } from "@/components/nimbus/MockPage";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — NimbusCart" }, { name: "description", content: "NimbusCart began as a Cloud Computing assignment and grew into a study of what a truly cloud-native storefront should feel like." }] }),
  component: () => <MockPage title="About" kicker="Our story" paragraphs={["NimbusCart began as a Cloud Computing assignment and grew into a study of what a truly cloud-native storefront should feel like.", "We believe commerce should be fast, calm, and dependable — engineered like infrastructure, presented like a product."]} />,
});
