import { createFileRoute } from "@tanstack/react-router";
import { MockPage } from "@/components/nimbus/MockPage";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — NimbusCart" }, { name: "description", content: "Send us a note about an order, a partnership, or just a kind word. The contact form lands directly in a small shared inbox." }] }),
  component: () => <MockPage title="Contact" kicker="Say hello" paragraphs={["Send us a note about an order, a partnership, or just a kind word. The contact form lands directly in a small shared inbox.", "Email is best for anything formal: hello@nimbus.example. We answer in the order it arrives."]} />,
});
