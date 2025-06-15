import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

/**
 * RealTimeDataPanelProps for future data feed integration.
 * @typedef {Object} RealTimeDataPanelProps
 * @property {Array<Object>} [data] - Array of real-time measurement/event objects.
 * @property {boolean} [loading] - Indicates if data is loading or polling.
 * @property {Function} [onRefresh] - Callback to trigger full data reload.
 */

// PUBLIC_INTERFACE
function RealTimeDataPanel({
  data: externalData = null,
  loading = false,
  onRefresh = () => {},
}) {
  /**
   * Real-time Data Panel shows simulated or API-driven data stream.
   * Uses timer to demonstrate mock polling effect for now.
   * - In production, set up live WebSocket or polling for updates.
   *
   * Integration points marked in comments.
   */

  // Local state just for simulation.
  const [mockData, setMockData] = useState([
    { id: 1, label: "Temperature", value: "21.3°C", timestamp: Date.now() },
    { id: 2, label: "Pressure", value: "100.4 kPa", timestamp: Date.now() },
    { id: 3, label: "Voltage", value: "3.7 V", timestamp: Date.now() },
  ]);
  const [mockLoading, setMockLoading] = useState(false);

  useEffect(() => {
    /**
     * MOCK: Simulate data update every 2s.
     * Replace with fetch/WebSocket logic for real-time updates.
     * Example API endpoint: /api/data/stream
     */
    setMockLoading(true);
    const interval = setInterval(() => {
      setMockData((prev) =>
        prev.map((item) => ({
          ...item,
          // Randomly tweak the value for demonstration
          value:
            item.label === "Temperature"
              ? `${(20 + Math.random() * 2).toFixed(1)}°C`
              : item.label === "Pressure"
              ? `${(99 + Math.random() * 1.8).toFixed(1)} kPa`
              : `${(3.3 + Math.random() * 0.8).toFixed(2)} V`,
          timestamp: Date.now(),
        }))
      );
      setMockLoading(false);
    }, 2000);
    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []);

  // Determine data source: prefer prop (parent controlled), else local simulation.
  const displayData = externalData || mockData;
  const isLoading = loading || mockLoading;

  return (
    <section className="realtime-panel panel">
      <h2>Real-Time Data Panel</h2>
      <div
        style={{
          background: "var(--secondary, #50E3C2)",
          color: "var(--base-dark)",
          borderRadius: 8,
          padding: "14px 0 20px 0",
          textAlign: "left",
          marginBottom: 16,
          fontWeight: 500,
          fontSize: "1.08rem",
          minHeight: 60,
        }}
      >
        {/* CARD/LIST UI: Replace mock with real-time stream or data table */}
        {isLoading ? (
          <div style={{ padding: "10px 0", textAlign: "center" }}>
            [Fetching live data...]
          </div>
        ) : (
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {displayData.map((item) => (
              <li
                key={item.id}
                style={{
                  display: "flex",
                  gap: 24,
                  alignItems: "center",
                  padding: "6px 20px",
                  borderBottom: "1px solid #1a1a1a14",
                  fontSize: 16,
                }}
              >
                <span style={{ minWidth: 60, fontWeight: 600 }}>
                  {item.label}:
                </span>
                <span style={{ fontFamily: "monospace", color: "#232c41" }}>
                  {item.value}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    marginLeft: "auto",
                    color: "#1A1A1A99",
                  }}
                  title={new Date(item.timestamp).toLocaleTimeString()}
                >
                  {new Date(item.timestamp).toLocaleTimeString()}
                </span>
              </li>
            ))}
          </ul>
        )}
        {/* Place for error, empty, or notification state */}
      </div>
      <div style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>
        <span>
          Data stream updates below. <span style={{ color: "#F5A623" }}>API integration goes here.</span>
        </span>
        <button
          className="btn"
          style={{ marginLeft: 18, fontSize: 13, padding: "5px 16px" }}
          tabIndex={0}
          title="Force data refresh"
          onClick={() => {
            // Hook for force-refresh, for real API
            setMockLoading(true);
            // TODO: integrate API call/parent callback:
            onRefresh();
            setTimeout(() => setMockLoading(false), 600);
          }}
        >
          Refresh
        </button>
      </div>
      {/* Integration note for dev clarity */}
      {/* 
          To integrate real API:
          1. Remove simulation/effect logic above.
          2. Fetch from your real data endpoint, or connect WebSocket.
          3. Pass incoming data via the `data` prop.
      */}
    </section>
  );
}

RealTimeDataPanel.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  onRefresh: PropTypes.func,
};

export default RealTimeDataPanel;
