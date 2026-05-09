import { createFileRoute } from "@tanstack/react-router";
import { MockPage } from "@/components/nimbus/MockPage";

export const Route = createFileRoute("/accessibility")({
  head: () => ({ meta: [{ title: "Accessibility — NimbusCart" }, { name: "description", content: "We design for keyboard navigation, screen readers, sensible color contrast, and reduced-motion preferences from day one." }] }),
  component: () => <MockPage title="Accessibility" kicker="For everyone" paragraphs={["We design for keyboard navigation, screen readers, sensible color contrast, and reduced-motion preferences from day one.", "If you find an accessibility gap, the contact form is the fastest way to reach the team that can fix it."]} />,
});
