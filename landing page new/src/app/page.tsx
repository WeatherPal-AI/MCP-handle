import { AssistantWidget } from "@/components/AssistantWidget";
import { ClientsSection } from "@/components/ClientsSection";
import { FinalCtaSection } from "@/components/FinalCtaSection";
import { HeroSection } from "@/components/HeroSection";
import { IntegrationsSection } from "@/components/IntegrationsSection";
import { PlatformPillarsSection } from "@/components/PlatformPillarsSection";
import { SiteFooter } from "@/components/SiteFooter";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import Link from "next/link";
import type { ReadonlyURLSearchParams } from "next/navigation";
import type {
  CtaLink,
  FeatureColumn,
  ClientChannel,
  Testimonial,
  TrustSignal,
  HeroCopy,
  SectionIntroCopy,
  IntegrationsCopy,
  FooterCopy,
  AssistantCopy,
} from "@/types/landing";

type Language = "en" | "zh";

type LandingContent = {
  hero: HeroCopy;
  platformIntro: SectionIntroCopy;
  integrations: IntegrationsCopy;
  clientsIntro: SectionIntroCopy;
  testimonialsIntro: SectionIntroCopy;
  finalCta: SectionIntroCopy;
  footer: FooterCopy;
  assistant: AssistantCopy;
  featureColumns: FeatureColumn[];
  trustSignals: TrustSignal[];
  clientChannels: ClientChannel[];
  ctaLinks: CtaLink[];
  testimonials: Testimonial[];
};

const content: Record<Language, LandingContent> = {
  en: {
    hero: {
      brandName: "MCP-handle",
      brandLogoSrc: "/logo.jpg",
      brandLogoAlt: "MCP-handle logo",
      eyebrowTag: "OS",
      eyebrowLabel: "Open Source MCP Infrastructure",
      title: "Orchestrate MCP agents without the sprawl",
      description:
        "MCP-handle bundles Strata routing, open-source servers, multi-channel clients, and the status service so teams ship stable agents fast.",
      whyHeading: "Why MCP-handle",
      whyDescription:
        "One repo that routes calls, tracks health, and ships every client surface.",
      whyFeatures: [
        {
          id: "01",
          title: "Progressive agent orchestration",
          description: "Strata keeps every hop predictable.",
        },
        {
          id: "02",
          title: "Run 60+ open-source servers",
          description: "Official repo integrates CRM, data, comms, and infra.",
        },
        {
          id: "03",
          title: "Built-in observability",
          description: "Embed the MCP Handle Status dashboard from the repo.",
        },
        {
          id: "04",
          title: "Ship clients anywhere",
          description:
            "Launch Discord, Slack, WhatsApp, CLI, and web without rebuilds.",
        },
      ],
    },
    platformIntro: {
      eyebrow: "Platform Pillars",
      title: "One repo. Four services that tame MCP complexity.",
      description:
        "Use the pieces you need or run the lot. Each module is production ready, documented, and proven with MCP agents at scale.",
    },
    integrations: {
      intro: {
        eyebrow: "Integrations & Observability",
        title:
          "60+ MCP servers with OAuth helpers, analytics, and deployment insights built in.",
        description:
          "Deploy via Docker or self host with the repo scripts. Handle Status keeps health, usage, and errors in plain view.",
      },
      stats: [
        {
          value: "60+",
          description:
            "First-party MCP servers committed to the WeatherPal-AI repository.",
        },
        {
          value: "Apache-2.0",
          description:
            "Open-source licensing across routers, servers, clients, and status tools.",
        },
      ],
      windowTitle: "MCP Handle Status - dashboard",
      imageAlt:
        "MCP Handle Status dashboard showing service health and analytics",
    },
    clientsIntro: {
      eyebrow: "Ship Everywhere",
      title: "Ship MCP clients wherever your users work.",
      description:
        "Every client ships with the MCP SDK, Strata-aware routing, and sane defaults so you can focus on the customer experience, not plumbing.",
    },
    testimonialsIntro: {
      eyebrow: "Loved By Builders",
      title: "Teams ship reliable agent experiences faster with MCP Handle.",
      description:
        "Startups and enterprises alike rely on our routing, server catalog, and analytics to keep conversational agents online.",
    },
    finalCta: {
      eyebrow: "Next Steps",
      title: "Ready to orchestrate your MCP stack?",
      description:
        "Clone the repo, run Strata, and wire up the catalog in minutes. Need scale? Link GitHub to Vercel and ship this landing page as your launchpad.",
    },
    footer: {
      description:
        "MCP Handle builds open-source MCP integrations for AI teams -- Strata routing, server catalog, multi-channel clients, analytics.",
      license: "Apache-2.0 licensed. JustSong theme assets under MIT.",
      resourcesHeading: "Resources",
      connectHeading: "Connect",
      resources: [
        {
          label: "Repository",
          href: "https://github.com/WeatherPal-AI/MCP-handle",
        },
        {
          label: "Docs Directory",
          href: "https://github.com/WeatherPal-AI/MCP-handle/tree/main/docs",
        },
        {
          label: "Project Wiki",
          href: "https://github.com/WeatherPal-AI/MCP-handle/wiki",
        },
      ],
      connect: [
        {
          label: "GitHub",
          href: "https://github.com/WeatherPal-AI/MCP-handle",
        },
      ],
      copyright: "WeatherPal AI - MCP Handle. All rights reserved.",
    },
    assistant: {
      name: "MCP Copilot",
      tagline: "Ask about routing, servers, or rollout playbooks.",
      initialMessage:
        "Hi! I can help you plan MCP deployments, pick servers, or troubleshoot routing. Ask me anything.",
      inputLabel: "Ask MCP Copilot",
      inputPlaceholder: "Ask about rollout, security, or tooling...",
      submitAria: "Send message",
      closeAria: "Close assistant",
      buttonLabel: "Chat with MCP Copilot",
      faqs: [
        {
          keywords: [
            "price",
            "pricing",
            "cost",
            "plan",
            "billing",
            "license",
            "licensing",
          ],
          reply:
            "MCP Handle is Apache-2.0 licensed. Clone the GitHub repo and use any module without added fees.",
        },
        {
          keywords: [
            "install",
            "setup",
            "deploy",
            "installing",
            "installation",
          ],
          reply:
            "Clone https://github.com/WeatherPal-AI/MCP-handle and follow the README quickstart to install Strata, run MCP servers, or boot the status dashboard.",
        },
        {
          keywords: ["integrate", "integration", "api", "sdk", "connect"],
          reply:
            "The TypeScript and Python SDKs share the same schema. Point them at the Strata router, register your MCP servers, and the SDK handles auth, rate limits, and tool contracts for you.",
        },
        {
          keywords: ["roadmap", "future", "feature", "features"],
          reply:
            "Check the GitHub issues and discussions for roadmap items. Contributions via pull request are welcome after opening an issue.",
        },
      ],
      fallbackReplies: [
        "Need something specific? Share your use case and I'll point you to the quickest playbook.",
        "Browse the docs directory in the repo for routing patterns, data governance, and client templates.",
        "Teams usually start with the bundled servers, then layer custom tools through the same MCP contract.",
        "We can sync MCP status across staging and prod so you always know which tools are healthy.",
      ],
      suggestions: [
        {
          label: "Server catalog",
          prompt: "Which first-party MCP servers can I deploy today?",
          reply:
            "Browse `mcp_servers/` in the GitHub repo for 60+ maintained integrations spanning SaaS, infra, comms, and data sources.",
        },
        {
          label: "Routing basics",
          prompt: "How does the Strata MCP router keep tools scoped?",
          reply:
            "Strata progressively reveals tools per task: policies filter availability, and embeddings keep context narrow so agents call only what they should.",
        },
        {
          label: "Security",
          prompt: "How is access managed across MCP handles?",
          reply:
            "Apply your own workspace policies by configuring Strata and the relevant MCP servers. See the docs directory for OAuth helpers and environment variables.",
        },
      ],
    },
    featureColumns: [
      {
        title: "Strata MCP Router",
        description:
          "Progressive orchestration so agents only see the right tools when they need them.",
        bullets: [
          "Smart discovery keeps context tight.",
          "Supports stdio, HTTP, SSE servers.",
          "Drop-in for Claude, Gemini, VS Code.",
        ],
      },
      {
        title: "First-Party MCP Servers",
        description:
          "Run 60+ production integrations spanning SaaS, data, comms, and infrastructure.",
        bullets: [
          "Docker images or self-hosted installs.",
          "OAuth helpers and presets in-repo.",
          "Consistent config across Python & TS SDKs.",
        ],
      },
      {
        title: "Multi-Channel Clients",
        description:
          "Ship Discord, Slack, WhatsApp, CLI, and web experiences powered by the MCP SDK.",
        bullets: [
          "Channel templates ready to ship.",
          "Strata-backed routing stays focused.",
          "Extendable for customers or internal.",
        ],
      },
      {
        title: "MCP Handle Status",
        description:
          "A console to install, monitor, and analyse every MCP deployment.",
        bullets: [
          "Real-time health across stdio, SSE, HTTP.",
          "Usage analytics, latency, failure diagnostics.",
          "Role-based access with OAuth and multi-DB.",
        ],
      },
    ],
    trustSignals: [
      {
        name: "Product Hunt",
        description: "Featured launch - Oct 2024",
        href: "https://www.producthunt.com/products/mcp-handle",
        badge: "PH",
      },
      {
        name: "WeatherPal AI",
        description: "Running 40+ MCP workflows in production",
        href: "https://www.weatherpal.ai/",
        badge: "WP",
      },
      {
        name: "Apache 2.0 + MIT",
        description: "Open-source stack with permissive licenses",
        badge: "OSS",
      },
    ],
      clientChannels: [
        {
          name: "Discord",
          description:
            "Production bot with Strata routing, commands, and OAuth handoffs.",
          ctaLabel: "Discord starter kit",
          ctaHref:
            "https://github.com/WeatherPal-AI/MCP-handle/blob/main/mcp-clients/README-Discord.md",
        },
        {
          name: "Slack",
          description:
            "Enterprise Slack app with workflows and MCP-managed creds.",
          ctaLabel: "Slack playbook",
          ctaHref:
            "https://github.com/WeatherPal-AI/MCP-handle/blob/main/mcp-clients/README-Slack.md",
        },
        {
          name: "Web & CLI",
          description:
            "Typed SDKs for web and terminal so teams ship tooling portals fast.",
          ctaLabel: "Web & CLI docs",
          ctaHref:
            "https://github.com/WeatherPal-AI/MCP-handle/blob/main/mcp-clients/README-Web.md",
        },
        {
          name: "WhatsApp",
          description:
            "Global reach through guided chats and secure MCP OAuth.",
          ctaLabel: "WhatsApp walkthrough",
          ctaHref:
            "https://github.com/WeatherPal-AI/MCP-handle/blob/main/mcp-clients/README-WhatsApp.md",
        },
      ],
      ctaLinks: [
        {
          label: "Visit GitHub Repo",
          href: "https://github.com/WeatherPal-AI/MCP-handle",
          primary: true,
        },
        {
          label: "Browse Docs Directory",
          href: "https://github.com/WeatherPal-AI/MCP-handle/tree/main/docs",
        primary: false,
      },
    ],
    testimonials: [
      {
        quote:
          "Strata routing made our support agents 25% faster without touching the LLM stack.",
        name: "Ivy Tran",
        role: "Head of Agent Ops @ WeatherPal",
      },
      {
        quote:
          "We shipped a Slack concierge in two weeks; auth, rate limits, logging were already handled.",
        name: "Jordan Blake",
        role: "Product Lead @ Lattice Labs",
      },
      {
        quote:
          "Compliance finally has visibility: the status console shows every MCP endpoint, uptime, and data flow in one place.",
        name: "Nina Patel",
        role: "Director of Platform Risk @ SentryOne",
      },
      {
        quote:
          "Discord, web, CLI each felt native. The SDKs and presets saved countless cycles for our success engineers.",
        name: "Samuel Ortiz",
        role: "Principal Engineer @ Relaywave",
      },
      {
        quote:
          "Progressive tool discovery keeps agents focused. Hallucinated tool calls vanished after migrating.",
        name: "Alicia Mendes",
        role: "VP Automation @ Northern Signal",
      },
    ],
  },
  zh: {
    hero: {
      brandName: "MCP-handle",
      brandLogoSrc: "/logo.jpg",
      brandLogoAlt: "MCP-handle 标识",
      eyebrowTag: "OS",
      eyebrowLabel: "开源 MCP 基础设施",
      title: "告别堆栈失控，轻松编排 MCP 智能体",
      description:
        "MCP-handle 将 Strata 路由、开源服务器、多渠道客户端与状态服务打包，帮助团队快速交付稳定体验。",
      whyHeading: "为什么选择 MCP-handle",
      whyDescription: "一个仓库搞定调用编排、健康监控与多端交付。",
      whyFeatures: [
        {
          id: "01",
          title: "渐进式智能体编排",
          description: "Strata 让每一步可用工具都在掌控之中。",
        },
        {
          id: "02",
          title: "运行 60+ 开源服务器",
          description: "官方仓库涵盖 CRM、数据、通信与基础设施集成。",
        },
        {
          id: "03",
          title: "内置可观测性",
          description: "直接整合仓库中的 MCP Handle 状态服务。",
        },
        {
          id: "04",
          title: "多触点快速上线",
          description: "Discord、Slack、WhatsApp、CLI 与 Web 一次配置即可复用。",
        },
      ],
    },
    platformIntro: {
      eyebrow: "平台基石",
      title: "一个仓库，四大服务掌控 MCP 复杂度。",
      description:
        "按需取用或整套运行，每个模块都经过生产验证与完善文档，可支撑大规模 MCP 智能体。",
    },
    integrations: {
      intro: {
        eyebrow: "集成与可观测",
        title: "60+ MCP 服务器内置 OAuth 辅助、分析与部署洞察。",
        description:
          "支持 Docker 部署或脚本自托管，Handle Status 将健康、用量与错误统一呈现。",
      },
      stats: [
        {
          value: "60+",
          description: "开源仓库维护的 CRM、数据、基础设施与通信服务器。",
        },
        {
          value: "Apache-2.0",
          description: "路由、服务器、客户端与状态工具全部以 Apache-2.0 开源。",
        },
      ],
      windowTitle: "MCP Handle Status - 控制台",
      imageAlt: "MCP Handle Status 仪表盘展示服务健康与分析",
    },
    clientsIntro: {
      eyebrow: "全触点上线",
      title: "用户在哪里，MCP 客户端就部署到哪里。",
      description:
        "每个客户端都内置 MCP SDK、Strata 路由策略与可靠默认值，帮助你专注体验而非底层 plumbing。",
    },
    testimonialsIntro: {
      eyebrow: "深受构建者喜爱",
      title: "团队借助 MCP Handle 更快交付稳定的智能体验。",
      description:
        "无论初创还是企业团队，都依赖我们的路由、服务器目录与分析保持对话式智能体在线。",
    },
    finalCta: {
      eyebrow: "下一步",
      title: "准备好编排你的 MCP 技术栈了吗？",
      description:
        "克隆仓库、启动 Strata、数分钟完成目录接入。需要扩展？直接用 GitHub 与 Vercel 部署此落地页。",
    },
    footer: {
      description:
        "MCP Handle 面向 AI 团队提供开源 MCP 集成：Strata 路由、服务器目录、多渠道客户端与分析一应俱全。",
      license: "遵循 Apache-2.0 许可，JustSong 主题素材使用 MIT 许可。",
      resourcesHeading: "资源",
      connectHeading: "联系",
      resources: [
        {
          label: "仓库",
          href: "https://github.com/WeatherPal-AI/MCP-handle",
        },
        {
          label: "文档目录",
          href: "https://github.com/WeatherPal-AI/MCP-handle/tree/main/docs",
        },
        {
          label: "项目 Wiki",
          href: "https://github.com/WeatherPal-AI/MCP-handle/wiki",
        },
      ],
      connect: [
        {
          label: "GitHub",
          href: "https://github.com/WeatherPal-AI/MCP-handle",
        },
      ],
      copyright: "WeatherPal AI - MCP Handle 版权所有。",
    },
    assistant: {
      name: "MCP Copilot",
      tagline: "欢迎咨询路由、服务器或上线方案。",
      initialMessage:
        "你好！我可以帮助你规划 MCP 部署、选择服务器或排查路由问题，尽管提问。",
      inputLabel: "向 MCP Copilot 提问",
      inputPlaceholder: "想了解上线、合规或工具链…",
      submitAria: "发送消息",
      closeAria: "关闭助手",
      buttonLabel: "与 MCP Copilot 对话",
      faqs: [
        {
          keywords: ["价格", "收费", "成本", "套餐", "计费", "授权", "许可"],
          reply:
            "MCP Handle 采用 Apache-2.0 许可，克隆 GitHub 仓库即可免费使用所有模块。",
        },
        {
          keywords: ["安装", "部署", "搭建", "部署流程"],
          reply:
            "克隆 https://github.com/WeatherPal-AI/MCP-handle ，按照 README 快速上手：安装 Strata、运行 MCP 服务器或启动状态面板。",
        },
        {
          keywords: ["集成", "接入", "API", "SDK", "连接"],
          reply:
            "TypeScript 与 Python SDK 共享同一契约，指向 Strata 路由并注册 MCP 服务器即可，SDK 会处理认证与限流。",
        },
        {
          keywords: ["路线图", "规划", "功能", "特性"],
          reply:
            "在 GitHub issues 与 discussions 中查看最新路线图，如需贡献请先提 issue 再提交 PR。",
        },
      ],
      fallbackReplies: [
        "有具体场景吗？告诉我需求，我会推荐最快的实施路径。",
        "浏览仓库的 docs 目录，了解路由模式、数据治理与客户端模板。",
        "团队通常先使用内置服务器，再通过同一 MCP 契约扩展自定义工具。",
        "可以借助状态服务同步多环境健康状况，随时掌握工具可用性。",
      ],
      suggestions: [
        {
          label: "服务器目录",
          prompt: "当前有哪些 MCP 服务器可以部署？",
          reply:
            "查看 GitHub 仓库的 `mcp_servers/` 目录，包含 60+ 覆盖 SaaS、基础设施、通信与数据来源的集成。",
        },
        {
          label: "路由核心",
          prompt: "Strata MCP 路由如何保证工具范围受控？",
          reply:
            "Strata 按任务阶段渐进式开放工具：策略过滤可用范围，向量召回保持上下文聚焦。",
        },
        {
          label: "安全与权限",
          prompt: "如何管理 MCP handle 的访问权限？",
          reply:
            "结合 Strata 配置与服务器 OAuth 帮助文件应用你的安全策略，具体示例见仓库 docs 目录。",
        },
      ],
    },
    featureColumns: [
      {
        title: "Strata MCP 路由器",
        description:
          "渐进式编排让智能体只看到需要的工具。",
        bullets: [
          "智能发现保持上下文紧凑。",
          "支持 stdio、HTTP、SSE 服务器。",
          "可直接接入 Claude、Gemini、VS Code。",
        ],
      },
      {
        title: "原生 MCP 服务器",
        description:
          "运行 60+ 覆盖 SaaS、数据、通信与基础设施的集成。",
        bullets: [
          "支持 Docker 或自托管安装。",
          "仓库内置 OAuth 辅助与预设。",
          "Python 与 TS SDK 配置一致。",
        ],
      },
      {
        title: "多渠道客户端",
        description:
          "基于 MCP SDK 的 Discord、Slack、WhatsApp、CLI 与 Web 体验。",
        bullets: [
          "模板开箱可用。",
          "Strata 路由保持聚焦。",
          "易于扩展给客户或内部门户。",
        ],
      },
      {
        title: "MCP Handle 状态中心",
        description:
          "一个控制台安装、监控并分析所有 MCP 部署。",
        bullets: [
          "实时监控 stdio、SSE、HTTP。",
          "可视化用量、延迟与失败诊断。",
          "OAuth 与多数据库的角色权限控制。",
        ],
      },
    ],
    trustSignals: [
      {
        name: "Product Hunt",
        description: "2024 年 10 月精选发布",
        href: "https://www.producthunt.com/products/mcp-handle",
        badge: "PH",
      },
      {
        name: "WeatherPal AI",
        description: "生产环境运行 40+ MCP 流程",
        href: "https://www.weatherpal.ai/",
        badge: "WP",
      },
      {
        name: "Apache 2.0 + MIT",
        description: "开源栈，双宽松许可",
        badge: "OSS",
      },
    ],
    clientChannels: [
      {
        name: "Discord",
        description:
          "基于 Strata 路由的生产级机器人，命令与 OAuth 流程齐备。",
        ctaLabel: "获取 Discord 入门包",
        ctaHref:
          "https://github.com/WeatherPal-AI/MCP-handle/blob/main/mcp-clients/README-Discord.md",
      },
      {
        name: "Slack",
        description: "企业级 Slack 应用，工作流与凭据由 MCP 统一管理。",
        ctaLabel: "查看 Slack 作战手册",
        ctaHref:
          "https://github.com/WeatherPal-AI/MCP-handle/blob/main/mcp-clients/README-Slack.md",
      },
      {
        name: "Web & CLI",
        description:
          "类型安全的 Web 与终端 SDK，帮助团队快速交付工具门户。",
        ctaLabel: "阅读 Web & CLI 文档",
        ctaHref:
          "https://github.com/WeatherPal-AI/MCP-handle/blob/main/mcp-clients/README-Web.md",
      },
      {
        name: "WhatsApp",
        description: "覆盖全球的引导式对话与安全 OAuth 流程。",
        ctaLabel: "WhatsApp 演练",
        ctaHref:
          "https://github.com/WeatherPal-AI/MCP-handle/blob/main/mcp-clients/README-WhatsApp.md",
      },
    ],
    ctaLinks: [
      {
        label: "访问 GitHub 仓库",
        href: "https://github.com/WeatherPal-AI/MCP-handle",
        primary: true,
      },
      {
        label: "浏览文档目录",
        href: "https://github.com/WeatherPal-AI/MCP-handle/tree/main/docs",
        primary: false,
      },
    ],
    testimonials: [
      {
        quote: "Strata 路由让客服团队效率提升 25%，无需改动 LLM 栈。",
        name: "Ivy Tran",
        role: "WeatherPal 智能体验负责人",
      },
      {
        quote: "我们两周内上线 Slack 礼宾服务：认证、限流、日志都已具备。",
        name: "Jordan Blake",
        role: "Lattice Labs 产品负责人",
      },
      {
        quote:
          "合规团队终于看得到全局：状态面板集中展示每个 MCP 终端、可用性与数据流。",
        name: "Nina Patel",
        role: "SentryOne 平台风险总监",
      },
      {
        quote:
          "Discord、Web、CLI 都像原生体验。SDK 与预设为支持团队节省了大量时间。",
        name: "Samuel Ortiz",
        role: "Relaywave 首席工程师",
      },
      {
        quote: "渐进式工具发现让智能体保持聚焦，迁移后幻觉调用消失。",
        name: "Alicia Mendes",
        role: "Northern Signal 自动化副总裁",
      },
    ],
  },
} as const;

const languageOptions: { code: Language; label: string }[] = [
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
];

type SearchParamsLike =
  | ReadonlyURLSearchParams
  | Record<string, string | string[] | undefined>;

const isReadonlyURLSearchParams = (
  params: SearchParamsLike
): params is ReadonlyURLSearchParams =>
  typeof (params as ReadonlyURLSearchParams).get === "function";

type PageProps = {
  searchParams?: Promise<SearchParamsLike> | SearchParamsLike;
};

export default async function Home({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams
    ? await searchParams
    : undefined;
  const requestedLangValue = resolvedSearchParams
    ? isReadonlyURLSearchParams(resolvedSearchParams)
      ? resolvedSearchParams.get("lang")
      : resolvedSearchParams["lang"]
    : undefined;
  let requestedLang: string | undefined;
  if (typeof requestedLangValue === "string") {
    requestedLang = requestedLangValue;
  } else if (Array.isArray(requestedLangValue)) {
    requestedLang = requestedLangValue[0];
  }
  const language: Language =
    typeof requestedLang === "string" && requestedLang.toLowerCase() === "zh"
      ? "zh"
      : "en";
  const pageContent = content[language];

  const buildLanguageHref = (target: Language) => {
    const params = new URLSearchParams();
    if (resolvedSearchParams) {
      const appendParam = (key: string, value: string) => {
        if (key === "lang") {
          return;
        }
        params.append(key, value);
      };
      if (isReadonlyURLSearchParams(resolvedSearchParams)) {
        for (const [key, value] of resolvedSearchParams.entries()) {
          appendParam(key, value);
        }
      } else {
        for (const [key, value] of Object.entries(resolvedSearchParams)) {
          if (value === undefined) {
            continue;
          }
          if (Array.isArray(value)) {
            for (const entry of value) {
              appendParam(key, entry);
            }
          } else {
            appendParam(key, value);
          }
        }
      }
    }
    if (target !== "en") {
      params.set("lang", target);
    }
    const queryString = params.toString();
    return queryString ? `/?${queryString}` : "/";
  };

  return (
    <div className="bg-white text-zinc-900">
      <div className="fixed right-6 top-6 z-50">
        <div className="flex items-center gap-1 rounded-full border border-zinc-200 bg-white/90 px-1 py-1 text-xs font-semibold shadow-lg backdrop-blur">
          {languageOptions.map((option) => {
            const isActive = option.code === language;
            return (
              <Link
                key={option.code}
                href={buildLanguageHref(option.code)}
                className={`rounded-full px-3 py-1 transition ${
                  isActive
                    ? "bg-zinc-900 text-white"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
                aria-pressed={isActive}
              >
                {option.label}
              </Link>
            );
          })}
        </div>
      </div>
      <main className="relative isolate overflow-hidden">
        <HeroSection
          ctaLinks={pageContent.ctaLinks}
          trustSignals={pageContent.trustSignals}
          copy={pageContent.hero}
        />
        <PlatformPillarsSection
          featureColumns={pageContent.featureColumns}
          copy={pageContent.platformIntro}
        />
        <IntegrationsSection copy={pageContent.integrations} />
        <ClientsSection
          clientChannels={pageContent.clientChannels}
          copy={pageContent.clientsIntro}
        />
        <TestimonialsSection
          testimonials={pageContent.testimonials}
          copy={pageContent.testimonialsIntro}
        />
        <FinalCtaSection
          ctaLinks={pageContent.ctaLinks}
          copy={pageContent.finalCta}
        />
      </main>
      <SiteFooter copy={pageContent.footer} />
      <AssistantWidget key={language} copy={pageContent.assistant} />
    </div>
  );
}
