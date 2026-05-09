import { createFileRoute } from "@tanstack/react-router";
import { MockPage } from "@/components/nimbus/MockPage";

export const Route = createFileRoute("/careers")({
  head: () => ({ meta: [{ title: "Careers — NimbusCart" }, { name: "description", content: "We are a small team that ships often, writes thoughtfully, and treats reliability as a feature." }] }),
  component: () => <MockPage title="Careers" kicker="Join us" paragraphs={["We are a small team that ships often, writes thoughtfully, and treats reliability as a feature.", "Open roles in platform engineering, design, and customer experience will be posted here as we hire."]} />,
});
