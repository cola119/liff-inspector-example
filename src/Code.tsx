import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNightEighties } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const Code = ({
  language,
  children,
}: {
  language?: string;
  children: string;
}) => {
  return (
    <SyntaxHighlighter
      customStyle={{ lineHeight: "1.2", fontSize: "1.2em" }}
      language={language || "typescript"}
      style={tomorrowNightEighties}
    >
      {children}
    </SyntaxHighlighter>
  );
};
