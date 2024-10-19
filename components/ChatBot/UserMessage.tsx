import React from "react";

export const UserMessage: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div className="flex items-start justify-end space-x-2 animate-fadeIn">
      <div className="bg-primary p-3 rounded-lg shadow-sm text-primary-foreground max-w-[80%]">
        {content}
      </div>
      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground text-sm flex-shrink-0 border border-border">
        You
      </div>
    </div>
  );
};
