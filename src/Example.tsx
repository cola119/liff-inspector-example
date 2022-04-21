import liff from "@line/liff/dist/lib";
import { useCallback, useState } from "react";
import styled from "styled-components";
import { Code } from "./Code";

export const Example = () => {
  const [consoleText, setConsoleText] = useState("hello console");

  const fetchCommits = useCallback(async () => {
    const response = await fetch(
      "https://api.github.com/repos/line/liff-playground/commits"
    );
    const commits = await response.json();
    console.log(commits);
  }, []);

  const sendMessage = useCallback(async () => {
    await liff.sendMessages([{ type: "text", text: "Hello, World!" }]);
    console.log("liff.sendMessages was success");
  }, []);

  const dispatchConsoleAPI = (type: "log" | "error" | "warn") => () => {
    console[type](consoleText);
  };

  return (
    <Container>
      <Title>Elements Tab</Title>
      <ElementsSection>
        <p>p tag</p>
        <div>
          <div>
            <div>
              <div>
                <div>Nested divs</div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div style={{ height: "40px", border: "1px solid red" }}>flexbox</div>
          <div>a</div>
        </div>
      </ElementsSection>
      <Title>Console Tab</Title>
      <ConsoleSection>
        <input
          type="text"
          value={consoleText}
          onChange={(e) => setConsoleText(e.target.value)}
          placeholder="type something..."
        />
        <Button onClick={dispatchConsoleAPI("log")}>console.log</Button>
        <Button onClick={dispatchConsoleAPI("warn")}>console.warn</Button>
        <Button onClick={dispatchConsoleAPI("error")}>console.error</Button>
      </ConsoleSection>
      <Title>Network Tab</Title>
      <NetworkSection>
        <Code>{`// Network tab shows the network logs
const response = await fetch("https://api.github.com/repos/line/liff-playground/commits");
const commits = await response.json();
// Console tab display commit logs
console.log(commits);`}</Code>
        <Button onClick={fetchCommits}>Fetch commits</Button>
        <Code>{`await liff.sendMessages([{ type: "text", text: "Hello, World!" }]);
console.log("liff.sendMessages was success");`}</Code>
        <Button onClick={sendMessage}>liff.sendMessages</Button>
      </NetworkSection>
    </Container>
  );
};

const Container = styled.div``;

const ConsoleSection = styled.section`
  margin: 10px 0 20px 0;
  display: flex;
  flex-wrap: wrap;
  & > input {
    margin: 0 10px 0 0;
  }
  & > button {
    margin: 0 5px 0 0;
    font-size: 18px;
  }
`;

const NetworkSection = styled.section`
  margin: 10px 0 20px 0;
  & > button {
    margin: 5px 0 10px 0;
    font-size: 18px;
  }
`;

const ElementsSection = styled.section`
  margin: 10px 0 20px 0;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: bold;
`;

const Button = styled.button`
  background-color: transparent;
  color: palevioletred;
  border-radius: 3px;
  border: 2px solid palevioletred;
  padding: 0.25em 1em;
  cursor: pointer;
`;
