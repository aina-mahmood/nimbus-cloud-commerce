import { createFileRoute } from "@tanstack/react-router";
import { MockPage } from "@/components/nimbus/MockPage";

export const Route = createFileRoute("/returns")({
  head: () => ({ meta: [{ title: "Returns — NimbusCart" }, { name: "description", content: "Every order is covered by a 30-day, no-questions-asked return window with prepaid shipping inside the contiguous US." }] }),
  component: () => <MockPage title="Returns" kicker="Easy returns" paragraphs={["Every order is covered by a 30-day, no-questions-asked return window with prepaid shipping inside the contiguous US.", "Just keep the original packaging where you can — it helps us refurbish and re-home items responsibly."]} />,
});
