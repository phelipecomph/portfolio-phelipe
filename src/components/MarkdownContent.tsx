import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { cn } from "@/lib/utils";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

// Add proper typing for the code component props
interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      className={cn(
        "prose dark:prose-invert max-w-none",
        "prose-headings:font-bold prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl",
        "prose-p:my-4 prose-li:my-2",
        "prose-code:bg-muted prose-code:p-1 prose-code:rounded",
        "prose-pre:bg-muted prose-pre:p-4 prose-pre:rounded-lg",
        className
      )}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSanitize]}
      components={{
        code({ node, inline, className, children, ...props }: CodeProps) {
          return (
            <code className={cn("bg-muted px-1.5 py-0.5 rounded", className)} {...props}>
              {children}
            </code>
          );
        },
        pre({ node, children, ...props }) {
          return (
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto" {...props}>
              {children}
            </pre>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}