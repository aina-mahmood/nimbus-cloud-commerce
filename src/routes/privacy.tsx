import { createFileRoute } from "@tanstack/react-router";
import { MockPage } from "@/components/nimbus/MockPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy Policy — NimbusCart" }, { name: "description", content: "We collect only what we need to fulfill orders, and we never sell personal information to third parties." }] }),
  component: () => <MockPage title="Privacy Policy" kicker="Your data" paragraphs={["We collect only what we need to fulfill orders, and we never sell personal information to third parties.", "A full plain-language privacy policy will be published here before NimbusCart accepts real-world payments."]} />,
});
