// for page navigation & to sort on leftbar
export type EachRoute = {
    title: string;
    href: string;
    noLink?: true; // noLink will create a route segment (section) but cannot be navigated
    items?: EachRoute[];
    tag?: string;
};

export const ROUTES: EachRoute[] = [
    {
        title: "Getting Started",
        href: "/getting-started",
        noLink: true,
        items: [
            {
                title: "Introduction",
                href: "/introduction"
            },
            {
                title: "Installation",
                href: "/installation",
            }
        ],
    },
    {
        title: "Configure Server",
        href: "/configure-server",
        items: [
            {
                title: "Download Server",
                href: "/download-server"
            },
            {
                title: "Setup For MongoDB",
                href: "/mongodb-setup"
            }
        ]
    },
    {
        title: "Connecting To Server",
        href: "/connect-server",
        noLink: true,
        items: [
            {
                title: "Download Quantum Grid Software",
                href: "/download-qg-software"
            },
            {
                title: "Download Project Specific Software",
                href: "/download-project-specific-software"
            },
        ]
    },
    {
        title: "Contribute To Quantum Grid",
        href: "/contributing",
        noLink: true,
        items: [
            {
                title: "Rules",
                href: "/rules"
            },
            {
                title: "Development Process",
                href: "/development-process"
            },
        ]
    }
];

type Page = { title: string; href: string };

function getRecurrsiveAllLinks(node: EachRoute) {
    const ans: Page[] = [];
    if (!node.noLink) {
        ans.push({ title: node.title, href: node.href });
    }
    node.items?.forEach((subNode) => {
        const temp = { ...subNode, href: `${node.href}${subNode.href}` };
        ans.push(...getRecurrsiveAllLinks(temp));
    });
    return ans;
}

export const page_routes = ROUTES.map((it) => getRecurrsiveAllLinks(it)).flat();
