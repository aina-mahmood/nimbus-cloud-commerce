import { createFileRoute } from "@tanstack/react-router";
import { MockPage } from "@/components/nimbus/MockPage";

export const Route = createFileRoute("/cookies")({
  head: () => ({ meta: [{ title: "Cookie Policy — NimbusCart" }, { name: "description", content: "NimbusCart uses a small number of strictly necessary cookies for sessions and a few analytics cookies you can opt out of." }] }),
  component: () => <MockPage title="Cookie Policy" kicker="About cookies" paragraphs={["NimbusCart uses a small number of strictly necessary cookies for sessions and a few analytics cookies you can opt out of.", "A full cookie inventory and a granular consent banner will land alongside the public launch."]} />,
});
