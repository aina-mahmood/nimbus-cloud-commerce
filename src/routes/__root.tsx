import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext, useRouter, HeadContent, Scripts, Link } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/nimbus/Header";
import { Footer } from "@/components/nimbus/Footer";
import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold brand-gradient-text">404</h1>
        <p className="mt-4 text-muted-foreground">That page drifted into a different cloud.</p>
        <Link to="/" className="mt-6 inline-flex rounded-md brand-gradient px-4 py-2 text-sm font-medium text-white">Back to NimbusCart</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  console.error(error);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button onClick={() => { router.invalidate(); reset(); }} className="mt-6 rounded-md brand-gradient px-4 py-2 text-sm font-medium text-white">Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "NimbusCart — Commerce in the cloud" },
      { name: "description", content: "NimbusCart: a polished AWS-powered storefront for the modern internet." },
      { property: "og:title", content: "NimbusCart — Commerce in the cloud" },
      { name: "twitter:title", content: "NimbusCart — Commerce in the cloud" },
      { property: "og:description", content: "NimbusCart: a polished AWS-powered storefront for the modern internet." },
      { name: "twitter:description", content: "NimbusCart: a polished AWS-powered storefront for the modern internet." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f7c26fa6-1db6-4917-b984-7242a494da6c/id-preview-e5c6fe9d--14008482-8e78-4ca5-bf70-299ff431484a.lovable.app-1778261011885.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f7c26fa6-1db6-4917-b984-7242a494da6c/id-preview-e5c6fe9d--14008482-8e78-4ca5-bf70-299ff431484a.lovable.app-1778261011885.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1"><Outlet /></main>
        <Footer />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}
