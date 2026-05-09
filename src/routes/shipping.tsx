import { createFileRoute } from "@tanstack/react-router";
import { MockPage } from "@/components/nimbus/MockPage";

export const Route = createFileRoute("/shipping")({
  head: () => ({ meta: [{ title: "Shipping — NimbusCart" }, { name: "description", content: "Standard shipping is free over \$100 and runs 2–5 business days. Express options are available at checkout for time-sensitive orders." }] }),
  component: () => <MockPage title="Shipping" kicker="On its way" paragraphs={["Standard shipping is free over \$100 and runs 2–5 business days. Express options are available at checkout for time-sensitive orders.", "International shipping rolls out region by region as we sign last-mile partners."]} />,
});
