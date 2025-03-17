export interface ArticleSection {
    title?: string;
    body: string;
}

export interface ArticleData {
    id: string;
    title: string;
    imageUrl: string;
    description: string;
    publishDate: Date;
    category: string;
    slug: string;
    author: string;
    keywords: string[];  
    content: ArticleSection[];
}

export const articles: ArticleData[] = [
    {
        id: "article-1",
        title: "The Future of Web Development",
        category: "Tech",
        description: "Explore the latest trends and innovations shaping the future of web development.",
        imageUrl: "https://picsum.photos/seed/tech/400/300",
        publishDate: new Date("2023-01-01"),
        slug: "the-future-of-web-development",
        author: "John Doe",
        keywords: [ "PWA", "Edge Computing", "Serverless"],
        content: [
            {
                title: "Introduction",
                body: "Web development is evolving rapidly with new technologies and methodologies emerging constantly. As we move forward into an increasingly digital age, the way we build and interact with web applications continues to transform. Modern developers must stay ahead of these changes to create more efficient, scalable, and user-friendly applications that meet the growing demands of users worldwide.",
            },
            {
                title: "The Role of JavaScript",
                body: "JavaScript continues to dominate the web development landscape, with frameworks like React and Vue shaping modern web apps. These frameworks have revolutionized how we build interactive user interfaces, making it possible to create more dynamic and responsive applications. The ecosystem surrounding JavaScript has grown exponentially, with tools like TypeScript adding strong typing capabilities and Node.js enabling server-side JavaScript development.",
            },
            {
                title: "Looking Ahead",
                body: "The future of web development includes advancements in AI integration, enhanced user experiences, and more scalable architectures. We're seeing the emergence of new paradigms like edge computing, serverless architectures, and progressive web apps (PWAs). These technologies are pushing the boundaries of what's possible on the web, enabling developers to create faster, more reliable, and more engaging web applications that blur the line between native and web-based experiences.",
            },
        ],
    },
    {
        id: "article-2",
        title: "Design Systems in Modern Applications",
        category: "Design",
        description: "Learn how design systems are revolutionizing the way we build and maintain modern applications.",
        imageUrl: "https://picsum.photos/seed/design/400/300",
        publishDate: new Date("2023-02-15"),
        slug: "design-systems-in-modern-applications",
        author: "Jane Smith",
        keywords: ["Design Systems", "Style Guide", "Design Tokens", "Accessibility"],
        content: [
            {
                title: "Legal Tech driven by the profession",
                body: "Web development is evolving rapidly with new technologies and methodologies emerging constantly. As we move forward into an increasingly digital age, the way we build and interact with web applications continues to transform. Modern developers must stay ahead of these changes to create more efficient, scalable, and user-friendly applications that meet the growing demands of users worldwide.",
            },
            {
                title: "The Role of JavaScript",
                body: "JavaScript continues to dominate the web development landscape, with frameworks like React and Vue shaping modern web apps. These frameworks have revolutionized how we build interactive user interfaces, making it possible to create more dynamic and responsive applications. The ecosystem surrounding JavaScript has grown exponentially, with tools like TypeScript adding strong typing capabilities and Node.js enabling server-side JavaScript development.",
            },
            {
                title: "Looking Ahead",
                body: "The future of web development includes advancements in AI integration, enhanced user experiences, and more scalable architectures. We're seeing the emergence of new paradigms like edge computing, serverless architectures, and progressive web apps (PWAs). These technologies are pushing the boundaries of what's possible on the web, enabling developers to create faster, more reliable, and more engaging web applications that blur the line between native and web-based experiences.",
            },
        ],
    },
    {
        id: "article-3",
        title: "AI in Software Engineering",
        category: "Tech",
        description: "Exploring the impact of artificial intelligence on software development practices.",
        imageUrl: "https://picsum.photos/seed/ai/400/300",
        publishDate: new Date("2023-03-10"),
        slug: "ai-in-software-engineering",
        author: "Alice Johnson",
        keywords: ["AI", "Machine Learning", "Automated Testing", "Code Generation", "DevOps", "Neural Networks"],
        content: [
            {
                title: "Introduction to AI in Software",
                body: "Artificial intelligence is revolutionizing how we build, test, and deploy software applications.",
            },
            {
                title: "Benefits of AI",
                body: "AI accelerates development cycles by automating testing, debugging, and even code generation.",
            },
            {
                title: "Challenges Ahead",
                body: "While AI offers many benefits, ethical concerns and job displacement are significant challenges.",
            },
        ],
    },
    {
        id: "article-4",
        title: "UX Design Principles",
        category: "Design",
        description: "Fundamental principles of user experience design that create intuitive interfaces.",
        imageUrl: "https://picsum.photos/seed/ux/400/300",
        publishDate: new Date("2023-04-05"),
        slug: "ux-design-principles",
        author: "Michael Brown",
        keywords: ["UX", "User Experience", "Interaction Design", "Usability", "Information Architecture", "Wireframing"],
        content: [
            {
                title: "Legal Tech driven by the profession",
                body: "Web development is evolving rapidly with new technologies and methodologies emerging constantly. As we move forward into an increasingly digital age, the way we build and interact with web applications continues to transform. Modern developers must stay ahead of these changes to create more efficient, scalable, and user-friendly applications that meet the growing demands of users worldwide.",
            },
            {
                title: "The Role of JavaScript",
                body: "JavaScript continues to dominate the web development landscape, with frameworks like React and Vue shaping modern web apps. These frameworks have revolutionized how we build interactive user interfaces, making it possible to create more dynamic and responsive applications. The ecosystem surrounding JavaScript has grown exponentially, with tools like TypeScript adding strong typing capabilities and Node.js enabling server-side JavaScript development.",
            },
            {
                title: "Looking Ahead",
                body: "The future of web development includes advancements in AI integration, enhanced user experiences, and more scalable architectures. We're seeing the emergence of new paradigms like edge computing, serverless architectures, and progressive web apps (PWAs). These technologies are pushing the boundaries of what's possible on the web, enabling developers to create faster, more reliable, and more engaging web applications that blur the line between native and web-based experiences.",
            },
        ]
    },
];