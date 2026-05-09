import { createFileRoute } from "@tanstack/react-router";
import { MockPage } from "@/components/nimbus/MockPage";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms of Service — NimbusCart" }, { name: "description", content: "These terms describe how you may use NimbusCart, the limits on our liability, and how disputes are resolved." }] }),
  component: () => <MockPage title="Terms of Service" kicker="The fine print" paragraphs={["These terms describe how you may use NimbusCart, the limits on our liability, and how disputes are resolved.", "Detailed terms will appear here once the platform exits its assignment phase and goes live commercially."]} />,
});
