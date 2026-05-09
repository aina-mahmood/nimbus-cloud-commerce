import { createFileRoute } from "@tanstack/react-router";
import { MockPage } from "@/components/nimbus/MockPage";

export const Route = createFileRoute("/help")({
  head: () => ({ meta: [{ title: "Help Center — NimbusCart" }, { name: "description", content: "Most questions about orders, returns, and account access can be answered in a few clicks once the help center is live." }] }),
  component: () => <MockPage title="Help Center" kicker="We're here" paragraphs={["Most questions about orders, returns, and account access can be answered in a few clicks once the help center is live.", "Until then, our team replies personally to every message — usually within an hour during business days."]} />,
});
