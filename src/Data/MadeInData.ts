
export interface Service {
    title: string;
  }
export interface PageContent {
    subtitle: string;
    title: string;
    imageSrc: string;
    imageAlt: string;
    description: string[];
    services: Service[];
    buttonAlt?: string;
  }
 export  const PAGE_CONTENT: Record<string, PageContent> = {
    creation: {
      subtitle: "Creation and Launch",
      title: "Take the leap!",
      imageSrc: "https://www.eliott-markus.com/wp-content/uploads/2023/05/jump.png",
      imageAlt: "Take the Leap",
      description: [
        "We understand the unique challenges that emerging entities face as they enter the market.",
        "That is why we have developed a specialized package tailored to address your unique needs and enhance your communication strategy.",
        "Through Jump, we embrace the power of innovative ideas and are dedicated to supporting young entrepreneurs on their creative journey."
      ],
      services: [
        { title: 'Marketing' },
        { title: 'Branding and Identity' },
        { title: 'Website' },
        { title: 'Content Strategy' },
        { title: 'Media Relations' },
        { title: 'Social Media Management' },
        { title: 'Web maintenance and outsourcing' },
      ],
    },
    management: {
      subtitle: "Transition management",
      title: "Focus on your core business",
      imageSrc: "https://www.eliott-markus.com//uploads/2023/05/Shift.png",
      imageAlt: "Chart Your Course",
      description: [
        "We offer communication outsourcing and strategic project management, coordinated by an experienced interim manager.\n\n Our team, which specializes in transitional and exceptional situations, or in replacing existing communications teams, takes full responsibility for managing your communications, from planning to implementation.\n\n A transition manager ensures effective coordination and execution of all communication initiatives. Our aim is to ensure a smooth transition and continued performance during these critical periods, by ensuring the continuity and effectiveness of your strategic communications.\n\n With Shift, you benefit from our experience with professional structures and our operational task force of 45 in-house experts."
      ],
      services: [
        { title: 'Diagnosis and Planning' },
        { title: 'Communication Strategy' },
        { title: 'Communication Management' },
        { title: 'Media Relations Management' },
        { title: 'Social Media Management' },
        { title: 'Creation/Updating of communication supports' },
        { title: 'Guides and Rankings' },
        { title: 'Executive Personal Branding' },
      ],
    },
    business: {
      subtitle: "Business Development",
      title: "Harness your growth potential and broaden your horizons",
      imageSrc: "https://www.eliott-markus.com/wp-content/uploads/2023/05/Boost.png",
      imageAlt: "Chart Your Course",
      description: [
        "Business development is crucial for ensuring the sustainability and success of your company.\n\n Our Business Development offer is designed to assist your company drive growth, identify new opportunities, and develop  strategic relationships. \n\n With Boost, we support you in the development of a strategy aligned with your organization, from the analysis stage through to the resulting operational actions, to ensure the sustainability of your business."
      ],
      services: [
        { title: 'Analysis and Planning' },
        { title: 'Marketing and Offering Marketecture' },
        { title: 'Inbound Marketing and Customer Acquisition' },
        { title: 'Marketing and Communication Strategies' },
        { title: 'Strategic Partnerships' },
        { title: 'Public Relations' },
       
      ],
    },
    esg: {
      subtitle: "CSR, Ethics and Soft law",
      title: "Create and develop your impact",
      imageSrc: "https://www.eliott-markus.com/wp-content/uploads/2023/05/Reform.png",
      imageAlt: "Chart Your Course",
      description: [
        "In response to changes in legislation, regulations and standards, your company must demonstrate exemplary conduct and proactivity. This involves adopting the principles of sustainable governance through a clear, measurable, and integrated CSR strategy. \n\n With Reform, we work with you to formulate a transparent and responsible policy tailored to your business, based on a soft-law strategy, to highlight your commitments.We work with you to develop customized communication tools to serve your performance and image."
      ],
      services: [
        { title: 'CSR Strategy' },
        { title: 'ESG Report' },
        { title: 'Code of Conduct' },
        { title: 'Ethics Charter' },
        { title: 'Diversity Book' },
        { title: 'Culture Book' },
       
      ],
    },
    association: {
      subtitle: "Associations and Organizations",
      title: "Strengthen your voice and engage your community",
      imageSrc: "https://www.eliott-markus.com/wp-content/uploads/2023/06/Engage@2x-min.png",
      imageAlt: "Chart Your Course",
      description: [
        "Our team of communications experts has in-depth knowledge of the specific needs of associations and organizations. We understand the importance of communication for associations and organizations, whether it’s to boost their visibility, communicate effectively with their members, promote their events or influence public policies. That’s why we’ve developed Engage, an offer tailored to the unique needs of associations and organizations."
      ],
      services: [
        { title: 'Communication strategy' },
        { title: 'Rebranding' },
        { title: 'Offering marketing and fundraising' },
        { title: 'Internal communications' },
        { title: 'Website and search engine optimization' },
        { title: 'Media relations' },
        { title: 'Public relations' },
        { title: ' Lobbying' },
  
  
       
      ],
    },
    coporate: {
      subtitle: "Start Up & Corporate Tech",
      title: "Increase your appeal to all your stakeholders",
      imageSrc: "https://www.eliott-markus.com/wp-content/uploads/2023/05/Growth.png",
      imageAlt: "Chart Your Course",
      description: [
        "With the multiplication of communication channels, it’s becoming more and more difficult for startups to promote their value proposition, to speak out effectively, to be listened to and to gain recognition. With Value, we help them express their brand identity and design a bespoke influencer strategy."
      ],
      services: [
        { title: 'Strategy' },
        { title: 'Branding' },
        { title: 'Influence' },
        { title: 'Executive personal branding' },
        { title: 'Public relations' },
        { title: ' Media relations' },
        { title: 'Social media' },
        { title: 'Fundraising package' },
  
  
       
      ],
    },
    finance: {
      subtitle: "Finance and investment professions",
      title: "Increase your influence and visibility",
      imageSrc: "https://www.eliott-markus.com/wp-content/uploads/2023/10/Value.png",
      imageAlt: "Chart Your Course",
      description: [
        "Eliott & Markus has teamed up with COM’Value to support finance and investment professionals. This strategic alliance combines the strengths of two leading agencies to deliver unique solutions in branding, influence, 360° and multi-channel communication strategies. Together, Eliott & Markus and COM’Value are committed to offering in-depth, industry-specific expertise that responds directly to the needs of finance and investment professionals."
      ],
      services: [
        { title: ' Influence strategy' },
        { title: ' Media Relations' },
        { title: 'Public Relation' },
        { title: 'Brand image' },
        { title: ' E-Reputation and websites' },
       
  
  
       
      ],
    },
    crisis: {
      subtitle: "Crisis Management",
      title: "Preventing and managing crisis situations",
      imageSrc: "https://www.eliott-markus.com/wp-content/uploads/2023/05/Welawcare.png",
      imageAlt: "Chart Your Course",
      description: [
        "In the era of omnichannel communication, where crises are governed by a total interdependence between a company’s stakeholders, reputation, and legal responsibilities, crisis management must open up its spectrum of interventions in order to respond to increasingly complex situations. effectively protect a company’s image in the face of these new threats, We Law Care combines expertise in strategic crisis management, legal communication, reputation and influence, with a fine understanding of legal and judicial matters. Within one global offering, We Law Care brings together crisis managers, communicators, lawyers, cybersecurity experts, and e-reputation specialists."
      ],
      services: [
        { title: 'Litigation PR' },
        { title: ' Reputation, brand and image' },
        { title: ' Internal crisis management' },
        { title: 'Crisis plan structuring' },
        { title: 'Management of high-stakes legal and social crises' },
        { title: ' Training in crisis management' },
  
       
  
  
       
      ],
    },
    branding: {
      subtitle: "Personal Branding",
      title: "Build and maintain your personal brand",
      imageSrc: "https://www.eliott-markus.com/wp-content/uploads/2023/05/Spotlight.png",
      imageAlt: "Chart Your Course",
      description: [
        "Your personal success has a positive impact on your company’s image and achievement.Our Personal Branding for Executives is designed to assist you in building a strong personal brand that enhances your leadership, credibility, and influence.With Spotlight, we define the expression of your personal brand and its operational application, turning it into an accelerator for your business development."
      ],
      services: [
        { title: 'Assessment and Strategy' },
        { title: ' Personal Brand Identity' },
        { title: ' Online Reputation' },
        { title: 'Referencing your Expertise' },
        { title: ' Public Relations' },
        { title: ' Communication and Leadership Coaching' },
        { title: ' Content Management' },
  
  
       
  
  
       
      ],
    },
  };
  