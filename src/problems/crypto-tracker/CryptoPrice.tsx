import React, { useEffect, useRef, useState } from "react";

const SOCKET_URL = "wss://stream.binance.com:9443/ws/btcusdt@trade";

interface TradeData {
  p: string; // price
}

const CryptoPrice: React.FC = () => {
  const [price, setPrice] = useState<string>("0");
  const [status, setStatus] = useState<string>("⛔ Not initialized")
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket(SOCKET_URL);
    updateSocketStatus()

    socketRef.current.onopen = () => {
        updateSocketStatus()
    }
    
    socketRef.current.onmessage = (event) => {
      const data: TradeData = JSON.parse(event.data);
      console.log(data);

      setPrice(parseFloat(data.p).toFixed(2));
    };

    socketRef.current.onerror = (error) => {
      console.error("Websocket error: ", error);
    };

    socketRef.current.onclose = () => {
        updateSocketStatus()
    }

    return () => {
      socketRef.current?.close();
    };
  }, []);

  const closeSocket = () => {
    socketRef.current?.close();
    updateSocketStatus()
  };

  const updateSocketStatus = () => {
    const status = socketRef.current?.readyState;
    console.log(status);
    
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

      <div>
        <button onClick={() => closeSocket()}>Stop</button>
      </div>
    </div>
  );
};

export default CryptoPrice;
