import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

// TODO: replace with your project URL once a project name or custom domain is set.
const BASE_URL = "";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [{"path": "/", "changefreq": "monthly", "priority": "1.0"}, {"path": "/services", "changefreq": "monthly", "priority": "0.7"}, {"path": "/solutions", "changefreq": "monthly", "priority": "0.7"}, {"path": "/pricing", "changefreq": "monthly", "priority": "0.7"}, {"path": "/case-studies", "changefreq": "monthly", "priority": "0.7"}, {"path": "/about", "changefreq": "monthly", "priority": "0.7"}, {"path": "/resources", "changefreq": "monthly", "priority": "0.7"}, {"path": "/contact", "changefreq": "monthly", "priority": "0.7"}, {"path": "/legal/privacy", "changefreq": "monthly", "priority": "0.7"}, {"path": "/legal/terms", "changefreq": "monthly", "priority": "0.7"}, {"path": "/legal/accessibility", "changefreq": "monthly", "priority": "0.7"}, {"path": "/services/ai-sales-agents", "changefreq": "monthly", "priority": "0.6"}, {"path": "/services/ai-calling-agents", "changefreq": "monthly", "priority": "0.6"}, {"path": "/services/ai-appointment-setting", "changefreq": "monthly", "priority": "0.6"}, {"path": "/services/crm-automation", "changefreq": "monthly", "priority": "0.6"}, {"path": "/services/workflow-automation", "changefreq": "monthly", "priority": "0.6"}, {"path": "/services/marketing-automation", "changefreq": "monthly", "priority": "0.6"}, {"path": "/services/ai-chatbots", "changefreq": "monthly", "priority": "0.6"}, {"path": "/services/saas-development", "changefreq": "monthly", "priority": "0.6"}, {"path": "/services/custom-ai-systems", "changefreq": "monthly", "priority": "0.6"}, {"path": "/services/lead-qualification-ai", "changefreq": "monthly", "priority": "0.6"}, {"path": "/services/ai-voice-agents", "changefreq": "monthly", "priority": "0.6"}, {"path": "/services/ai-consulting", "changefreq": "monthly", "priority": "0.6"}];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
