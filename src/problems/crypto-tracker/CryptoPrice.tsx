import React, { useEffect, useRef, useState } from "react";
import "./CryptoPrice.css";

const SOCKET_URL = "wss://stream.binance.com:9443/ws/btcusdt@trade";

interface TradeData {
  p: string; // price
}

const CryptoPrice: React.FC = () => {
  const [price, setPrice] = useState<string>("0");
  const [status, setStatus] = useState<string>("⛔ Not initialized");
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    connectSocket();

    return () => {
      socketRef.current?.close();
    };
  }, []);

  const closeSocket = () => {
    socketRef.current?.close();
    updateSocketStatus();
  };

  const connectSocket = () => {
    if (
      socketRef.current &&
      (socketRef.current.readyState === WebSocket.OPEN ||
        socketRef.current.readyState === WebSocket.CONNECTING ||
        socketRef.current.readyState === WebSocket.CLOSING)
    ) {
      return;
    }

    socketRef.current = new WebSocket(SOCKET_URL);
    updateSocketStatus();

    socketRef.current.onopen = () => {
      updateSocketStatus();
    };

    socketRef.current.onmessage = (event) => {
      const data: TradeData = JSON.parse(event.data);
      setPrice(parseFloat(data.p).toFixed(2));
    };

    socketRef.current.onerror = (error) => {
      console.error("Websocket error: ", error);
    };

    socketRef.current.onclose = () => {
      updateSocketStatus();
    };
  };

  const updateSocketStatus = () => {
    const status = socketRef.current?.readyState;

    switch (status) {
      case WebSocket.CONNECTING:
        setStatus("🔄 Connecting...");
        break;
      case WebSocket.OPEN:
        setStatus("✅ Connected");
        break;
      case WebSocket.CLOSING:
        setStatus("⚠️ Closing...");
        break;
      case WebSocket.CLOSED:
        setStatus("❌ Disconnected");
        break;
      default:
        setStatus("⛔ Not initialized");
    }
  };

  return (
    <div style={{ fontSize: "2rem", textAlign: "center", marginTop: "2rem" }}>
      <h2>Live BTC/USDT Price</h2>
      <p>${price}</p>
      <p>Status: {status}</p>

      <div className="actions">
        <button className="connect" onClick={() => connectSocket()}>
          Connect
        </button>
        <button className="disconnect" onClick={() => closeSocket()}>
          Disconnect
        </button>
      </div>
    </div>
  );
};

export default CryptoPrice;
