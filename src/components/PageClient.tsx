'use client';
import React from 'react';
import parse from 'html-react-parser';
import Footer from '@/components/layout/footer';

interface PageClientProps {
  title: string;
  content: string | null;
}

const PageClient: React.FC<PageClientProps> = ({ title, content }) => {
  const formattedContent = React.useMemo(() => {
    if (!content) return null;

    // Parse HTML content and format it
    return parse(content, {
      replace: (domNode) => {
        if (domNode.type === 'tag' && domNode.name === 'p') {
          return (
            <p className="mb-4">
              {domNode.children.map((child, index) => (
                <React.Fragment key={index}>
                  {child.type === 'text' ? child.data : null}
                </React.Fragment>
              ))}
            </p>
          );
        }
        return domNode;
      },
    });
  }, [content]);

  return (
    <>
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">{title}</h1>
      <div className="prose max-w-full">
        {formattedContent}
      </div>
    </div>
          <Footer />
          </>

  );
};

export default PageClient;