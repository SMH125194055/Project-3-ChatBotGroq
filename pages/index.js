import { useEffect, useRef } from 'react';
import Head from 'next/head';
import Script from 'next/script';

export default function Home() {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>AI Chatbot</title>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" />
      </Head>
      <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
        <div className="header text-center mb-4">
          <h1 className="display-4">Chat Bot</h1>
          <p className="lead">Chat with our AI-powered assistant for answers and information on various topics.</p>
        </div>
        <div className="chat-container bg-white rounded shadow-lg w-100 p-4">
          <div className="chat-box mb-3 " id="chat-box" style={{ height: '300px', overflowY: 'auto' }}>
            {/* Messages will appear here */}
          </div>
          <div className="input-container d-flex">
            <input
              type="text"
              id="user-input"
              className="form-control mr-2"
              placeholder="Type your message..."
              autoFocus
              ref={inputRef}
            />
            <button id="send-button" className="btn btn-primary">Send</button>
          </div>
        </div>
      </div>
      <Script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" />
      <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js" />
      <Script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" />
      <Script src="/script.js" />
    </>
  );
}
