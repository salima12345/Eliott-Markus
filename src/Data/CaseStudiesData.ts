interface ContentBlock {
  type: 'image' | 'video' | 'text';
  content: string;
  description?: string;
  layout?: 'full' | 'left' | 'right';
}

interface BlogPost {
  title: string;
  author: string;
  summary: string;
  content: ContentBlock[];
}

interface CaseStudy {
  imageUrl: string;
  title: string;
  description: string;
  expertise: { name: string }[];
  slug: string;
  categories: string[];
  blogs?: BlogPost[];
}

export const ITEMS_PER_PAGE = 6;

export const CASE_STUDIES: CaseStudy[] = [
  {
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    title: "E-Commerce Platform",
    description: "On the eve of its 17th anniversary, the challenge is to illustrate the leadership, uniqueness, and richness of the Oasys heritage while highlighting the group's relevance—as well as its boldness—and aligning the distinctive values of the satellite brands with the expectations of the subsidiary brands",
    expertise: [
      { name: "Web Development" },
      { name: "UI/UX Design" },
      { name: "SEO" }
    ],
    categories: ['tech', 'design'],
    slug: "e-commerce-platform",
    blogs: [
      {
        title: "Building a Scalable E-commerce Platform",
        author: "Sarah Johnson",
        summary: "A deep dive into the technical challenges and solutions",
        content: [
          {
            type: "text",
            content: "On the eve of its 17th anniversary, the challenge is to illustrate the leadership, uniqueness, and richness of the Oasys heritage while highlighting the group's relevance—as well as its boldness—and aligning the distinctive values of the satellite brands with the expectations of the subsidiary brands",
          },
          {
            type: "image",
            content: "https://images.pexels.com/photos/326514/pexels-photo-326514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            description: "High-level architecture diagram of the platform",
            layout: "full"
          },
          {
            type: "text",
            content: "Our solution leveraged microservices architecture with event-driven communication between components. This allowed us to scale individual services independently based on load.",
          },
          {
            type: "video",
            content: "https://player.vimeo.com/video/76979871?h=8272103f6e",
            description: "Platform features demonstration"
          }
        ]
      },
      {
        title: "Optimizing User Experience",
        author: "David Lee",
        summary: "How we achieved a 95+ Performance Score",
        content: [
          {
            type: "text",
            content: "Performance was critical for our e-commerce platform's success. We implemented advanced caching strategies and optimized our build process to ensure lightning-fast page loads.",
          },
          {
            type: "image",
            content: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            description: "Performance improvements over time",
            layout: "right"
          },
          {
            type: "text",
            content: "Through careful optimization and monitoring, we achieved consistent sub-second page loads across all major markets."
          }
        ]
      }
    ]
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2340&auto=format&fit=crop",
    title: "Corporate Website",
    description: "Enterprise-level website with focus on performance and accessibility",
    expertise: [
      { name: "Web Design" },
      { name: "Content Strategy" }
    ],
    categories: ['design', 'content'],
    slug: "corporate-website-redesign",
    blogs: [
      {
        title: "Accessibility First Design",
        author: "Michael Chen",
        summary: "How we achieved WCAG AAA compliance",
        content: [
          {
            type: "text",
            content: "Accessibility was a core requirement from day one. Our team worked closely with accessibility experts and users with different abilities to ensure the website was truly inclusive.",
          },
          {
            type: "image",
            content: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            description: "Accessibility audit results",
            layout: "right"
          },
          {
            type: "text",
            content: "The implementation included advanced ARIA labels, keyboard navigation, and screen reader optimizations."
          }
        ]
      },
      {
        title: "Content Strategy Evolution",
        author: "Emma Wilson",
        summary: "Developing a content-first approach",
        content: [
          {
            type: "text",
            content: "Our content strategy focused on creating clear, engaging content that effectively communicated the company's mission and values.",
          },
          {
            type: "image",
            content: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            description: "Content strategy framework",
            layout: "full"
          }
        ]
      }
    ]
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2340&auto=format&fit=crop",
    title: "Social Media Campaign",
    description: "Comprehensive social media strategy with measurable results",
    expertise: [],
    categories: ['social', 'media'],
    slug: "viral-social-campaign",
    blogs: [
      {
        title: "Viral Campaign Analysis",
        author: "Alex Rivera",
        summary: "Breaking down our most successful campaign",
        content: [
          {
            type: "text",
            content: "The campaign's success was built on three key pillars: authentic storytelling, community engagement, and data-driven optimization.",
          },
          {
            type: "image",
            content: "https://images.pexels.com/photos/3183157/pexels-photo-3183157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            description: "Campaign performance dashboard",
            layout: "full"
          },
          {
            type: "video",
            content: "https://player.vimeo.com/video/76979871?h=8272103f6e",
            description: "Campaign highlight reel"
          }
        ]
      }
    ]
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2340&auto=format&fit=crop",
    title: "Digital Marketing Suite",
    description: "Integrated marketing solution for growing businesses",
    expertise: [
      { name: "Digital Marketing" },
      { name: "Social Media" },
      { name: "Content Creation" }
    ],
    categories: ['strategy', 'social'],
    slug: "digital-marketing-suite",
    blogs: [
      {
        title: "Integrated Marketing Approach",
        author: "David Park",
        summary: "Creating a cohesive digital marketing ecosystem",
        content: [
          {
            type: "text",
            content: "Our integrated approach combined multiple channels into a single, coherent strategy that delivered measurable results.",
          },
          {
            type: "image",
            content: "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            description: "Marketing funnel visualization",
            layout: "right"
          },
          {
            type: "text",
            content: "By aligning all marketing channels, we achieved a 300% increase in qualified leads."
          }
        ]
      }
    ]
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2340&auto=format&fit=crop",
    title: "Tech Startup Platform",
    description: "Innovative platform for connecting startups with investors",
    expertise: [
      { name: "Web Development" },
      { name: "UI/UX Design" }
    ],
    categories: ['tech', 'strategy'],
    slug: "startup-platform",
    blogs: [
      {
        title: "Building the Startup Ecosystem",
        author: "Lisa Chen",
        summary: "Creating a platform that connects founders with investors",
        content: [
          {
            type: "text",
            content: "The platform needed to serve both startups and investors while maintaining a balance of interests and ensuring data privacy.",
          },
          {
            type: "image",
            content: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            description: "Investor dashboard overview",
            layout: "full"
          },
          {
            type: "text",
            content: "We implemented secure data rooms and granular permission controls to protect sensitive information."
          }
        ]
      }
    ]
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2340&auto=format&fit=crop",
    title: "Healthcare Analytics",
    description: "Advanced analytics dashboard for healthcare providers",
    expertise: [
      { name: "Data Visualization" },
      { name: "Web Development" }
    ],
    categories: ['tech'],
    slug: "healthcare-analytics",
    blogs: [
      {
        title: "Data-Driven Healthcare Decisions",
        author: "Dr. James Wilson",
        summary: "How analytics is transforming healthcare delivery",
        content: [
          {
            type: "text",
            content: "By combining multiple data sources and applying advanced analytics, we helped healthcare providers make better decisions.",
          },
          {
            type: "video",
            content: "https://player.vimeo.com/video/76979871?h=8272103f6e",
            description: "Dashboard walkthrough"
          },
          {
            type: "image",
            content: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            description: "Impact metrics",
            layout: "left"
          }
        ]
      }
    ]
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2340&auto=format&fit=crop",
    title: "Create a common base for daughter brands and satellite brands to belong to the Oasys & Cie group",
    description: "Online learning platform with interactive features",
    expertise: [],
    categories: ['tech', 'content'],
    slug: "educational-platform",
    blogs: [
      {
        title: "Reimagining Online Education",
        author: "Maria Rodriguez",
        summary: "Creating an engaging virtual learning environment",
        content: [
          {
            type: "text",
            content: "The challenge was to create an online learning experience that was as engaging as traditional classroom learning.",
          },
          {
            type: "image",
            content: "https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            description: "Student learning dashboard",
            layout: "full"
          },
          {
            type: "video",
            content: "https://player.vimeo.com/video/76979871?h=8272103f6e",
            description: "Interactive features showcase"
          }
        ]
      },
      {
        title: "Analytics in Education",
        author: "John Smith",
        summary: "Using data to improve learning outcomes",
        content: [
          {
            type: "text",
            content: "We implemented learning analytics to track student progress and identify areas for improvement.",
          },
          {
            type: "image",
            content: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            description: "Learning analytics dashboard",
            layout: "right"
          }
        ]
      }
    ]
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2340&auto=format&fit=crop",
    title: "Branding and development strategy for pan-African law firm ADNA",
    description: "Property management and listing application",
    expertise: [
      { name: "Mobile Development" },
      { name: "UI/UX Design" }
    ],
    categories: ['tech', 'design'],
    slug: "real-estate-app",
    blogs: [
      {
        title: "Revolutionizing Property Management",
        author: "Tom Anderson",
        summary: "How we simplified property management through technology",
        content: [
          {
            type: "text",
            content: "Our app streamlined property management by automating routine tasks and providing real-time insights.",
          },
          {
            type: "image",
            content: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            description: "Key app screens",
            layout: "right"
          },
          {
            type: "video",
            content: "https://player.vimeo.com/video/76979871?h=8272103f6e",
            description: "Feature demonstration"
          }
        ]
      },
      {
        title: "UX Research Findings",
        author: "Rachel Kim",
        summary: "Key insights from our user research",
        content: [
          {
            type: "text",
            content: "Extensive user research helped us identify and address the main pain points in property management.",
          },
          {
            type: "image",
            content: "https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            description: "User research findings",
            layout: "full"
          }
        ]
      }
    ]
  }
];

export type { CaseStudy, BlogPost, ContentBlock };