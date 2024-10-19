import React from "react";
import Image from "next/image";

export const BotMessage: React.FC<{ content: string }> = ({ content }) => {
  return (
    <div className="flex items-start space-x-2 animate-fadeIn">
      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-primary">
        <Image
          src="/image-pirate-avatar.jpg"
          alt="Bot Avatar"
          width={32}
          height={32}
          className="object-cover"
        />
      </div>
      <div
        className="bg-card p-3 rounded-lg shadow-sm text-card-foreground max-w-[80%] border border-border"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};
