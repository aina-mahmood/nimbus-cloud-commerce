import { createFileRoute } from "@tanstack/react-router";
import { MockPage } from "@/components/nimbus/MockPage";

export const Route = createFileRoute("/press")({
  head: () => ({ meta: [{ title: "Press — NimbusCart" }, { name: "description", content: "Founders, journalists, and analysts can reach our press desk for interviews, embargoed previews, and high-resolution brand assets." }] }),
  component: () => <MockPage title="Press" kicker="In the news" paragraphs={["Founders, journalists, and analysts can reach our press desk for interviews, embargoed previews, and high-resolution brand assets.", "We try to respond to every inbound within one business day, even from a tiny corner of the cloud."]} />,
});
