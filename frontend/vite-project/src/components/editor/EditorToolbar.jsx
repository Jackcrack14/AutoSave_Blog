import React from "react";
import {
  Bold,
  Italic,
  List,
  Code,
  Link,
  Image,
  Quote,
  Heading1,
  Heading2,
  ListOrdered,
} from "lucide-react";
import { ToolbarButton } from "./ToolbarButton";

export function EditorToolbar({ onFormatText, onAddLink, onAddImage }) {
  return (
    <div className="flex items-center space-x-1 mb-6 pb-4 border-b border-gray-700 overflow-x-auto">
      <div className="flex space-x-1 p-1 bg-gray-800/50 rounded-lg">
        <ToolbarButton
          icon={Bold}
          onClick={() => onFormatText("bold")}
          tooltip="Bold (⌘+B)"
        />
        <ToolbarButton
          icon={Italic}
          onClick={() => onFormatText("italic")}
          tooltip="Italic (⌘+I)"
        />
      </div>

      <div className="flex space-x-1 p-1 bg-gray-800/50 rounded-lg">
        <ToolbarButton
          icon={Heading1}
          onClick={() => onFormatText("h1")}
          tooltip="Heading 1"
        />
        <ToolbarButton
          icon={Heading2}
          onClick={() => onFormatText("h2")}
          tooltip="Heading 2"
        />
      </div>

      <div className="flex space-x-1 p-1 bg-gray-800/50 rounded-lg">
        <ToolbarButton
          icon={List}
          onClick={() => onFormatText("bullet")}
          tooltip="Bullet List"
        />
        <ToolbarButton
          icon={ListOrdered}
          onClick={() => onFormatText("number")}
          tooltip="Numbered List"
        />
      </div>

      <div className="flex space-x-1 p-1 bg-gray-800/50 rounded-lg">
        <ToolbarButton
          icon={Quote}
          onClick={() => onFormatText("quote")}
          tooltip="Quote"
        />
        <ToolbarButton
          icon={Code}
          onClick={() => onFormatText("code")}
          tooltip="Code"
        />
      </div>

      <div className="flex space-x-1 p-1 bg-gray-800/50 rounded-lg">
        <ToolbarButton
          icon={Link}
          onClick={onAddLink}
          tooltip="Add Link (⌘+K)"
        />
        <ToolbarButton icon={Image} onClick={onAddImage} tooltip="Add Image" />
      </div>
    </div>
  );
}
