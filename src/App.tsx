import { useCallback, useEffect, useState } from "react";
import liff from "@line/liff";
import LIFFInspectorPlugin from "@line/liff-inspector";
import styled from "styled-components";
import { Example } from "./Example";
import { Code } from "./Code";

const originStoreKey = "originStoreKey";

const liffId = "1657059781-neLkO0oE";

const ngrokUrlCommand = `node -e "const res=$(curl -s -sS http://127.0.0.1:4040/api/tunnels); const url=new URL(res.tunnels[0].public_url); console.log('wss://'+url.host);"`;

export const App = () => {
  const [debuggerEnabled, setDebuggerEnabled] = useState(false);
  const [liOrigin, setLiOrigin] = useState<string>("");
  const [error, setError] = useState<unknown | null>(null);

  const init = useCallback(async () => {
    liff.use(new LIFFInspectorPlugin({ origin: liOrigin }));
    window.localStorage.setItem(originStoreKey, liOrigin);
    try {
      await liff.init({ liffId });
      setDebuggerEnabled(true);
      console.log("liff.init done");
    } catch (e) {
      console.error("liff.init failed", e);
      setError(e);
    }
  }, [liOrigin]);

  useEffect(() => {
    const originFromUrl = new URLSearchParams(window.location.search).get(
      "li.origin"
    );
    const originFromStorage = window.localStorage.getItem(originStoreKey);
    const origin = originFromStorage ?? originFromUrl;
    if (origin) {
      setLiOrigin(origin);
    }
  }, []);

  return (
    <Container>
      <Title>LIFF Inspector Example App</Title>
      <RepositorySection>
        <a
          href="https://github.com/line/liff-inspector"
          target="_blank"
          rel="noopener noreferrer"
        >
          LIFF Inspector repository
        </a>
        <a
          href="https://github.com/cola119/liff-inspector-example"
          target="_blank"
          rel="noopener noreferrer"
        >
          Example app repository
        </a>
      </RepositorySection>
      <CodeContainer>
        <p>Start the inspector server</p>
        <Code language="shell">{`$ npx @line/liff-inspector`}</Code>
        <p>Run ngrok to serve https</p>
        <Code language="shell">{`$ ngrok http 9222
$ ${ngrokUrlCommand}
wss://xxxx-xxx-xxx.ngrok   # Copy this url`}</Code>
      </CodeContainer>
      {!debuggerEnabled ? (
        <InitContainer>
          {!!error && (
            <ErrorText>
              Something error happened 😥
              {(error as any).message}
            </ErrorText>
          )}
          <p>
            LIFF Inspector Plugin is installed but is not enabled yet.
            <br />
            liff.init will do it 👇.
          </p>
          <FormContainer>
            <input
              type="text"
              name="origin"
              id="origin"
              placeholder="Paste wss://xxx-xxx-xxx.ngrok here"
              value={liOrigin}
              onChange={(e) => setLiOrigin(e.target.value)}
            />
            <Button type="button" onClick={init} disabled={!liOrigin}>
              liff.init
            </Button>
          </FormContainer>
        </InitContainer>
      ) : (
        <MainContainer>
          <p>LIFF Inspector Plugin is enabled.</p>
          {liOrigin && (
            <>
              <p>ChromeDevTools 👇 (Copy and Paste!)</p>
              <p>devtools://devtools/bundled/inspector.html?{liOrigin.replace("://", "=")}/?hi_id={liffId}</p>
            </>
          )}
        </MainContainer>
      )}
      <Divider />
      <Example />
      <p>This site's QR code</p>
      <img
        src="https://user-images.githubusercontent.com/22386678/164393749-7bac97af-1d1b-4a8d-ba38-043ef260b18f.png"
        alt="QR code of this site"
      />
    </Container>
  );
};

const Container = styled.main`
  margin: 20px 50px;
  @media (max-width: 600px) {
    margin: 0;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  text-align: center;
  margin: 30px 0;
`;

const RepositorySection = styled.section`
  display: flex;
  justify-content: center;
  font-size: 13px;
  & > a:first-child {
    text-decoration: none;
    background: palevioletred;
    color: white;
    border-radius: 3px;
    border: 2px solid palevioletred;
    padding: 0.25em 1em;
    cursor: pointer;
    margin-right: 10px;
  }
  & > a:nth-child(2) {
    text-decoration: none;
    background-color: transparent;
    color: palevioletred;
    border-radius: 3px;
    border: 2px solid palevioletred;
    padding: 0.25em 1em;
    cursor: pointer;
  }
`;

const FormContainer = styled.div`
  margin: 5px 0 0 0;
  display: flex;
  justify-content: center;
  & > input {
    width: 230px;
  }
  & > button {
    font-size: 18px;
    margin: 0 0 0 5px;
  }
`;

const ErrorText = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: palevioletred;
`;

const InitContainer = styled.div`
  font-size: 18px;
  margin-top: 20px;
  text-align: center;
  & > button {
    margin-top: 20px;
    font-size: 18px;
  }
`;

const CodeContainer = styled.div`
  margin-top: 20px;
  & > p {
    font-size: 18px;
    font-weight: bold;
    margin: 10px 0;
    @media (max-width: 600px) {
      margin: 10px;
    }
  }
`;

const MainContainer = styled.div`
  font-size: 18px;
  margin-top: 40px;
  text-align: center;
  & > p {
    margin: 10px 0;
  }
`;

const Button = styled.button`
  background: palevioletred;
  color: white;
  border-radius: 3px;
  border: 2px solid palevioletred;
  &:disabled {
    background: lightgray;
    border: 2px solid lightgray;
  }
  padding: 0.25em 1em;
  cursor: pointer;
`;

const Divider = styled.hr`
  margin: 20px 0;
`;
