import React from "react";
import PropTypes from "prop-types";

/**
 * VisualizationPanelProps interface for future data/model integrations.
 * @typedef {Object} VisualizationPanelProps
 * @property {Object} [data] - Optional model/data object for visualization.
 * @property {boolean} [loading] - If true, show loading skeleton.
 * @property {Function} [onRefresh] - Callback to trigger refresh (future).
 */

// PUBLIC_INTERFACE
function VisualizationPanel({
  data = null,
  loading = false,
  onRefresh = () => {},
}) {
  /**
   * Visualization Panel displays experiment/model visualizations.
   * - In production, this will render an interactive chart/canvas area.
   * - Use `data` to provide visualization input.
   * - Use `onRefresh` to trigger re-fetch (not implemented yet).
   *
   * TODO: Replace mock canvas with actual visualization library (e.g., Chart.js, D3.js).
   * TODO: Call data API in parent and pass as `data` prop.
   */
  return (
    <section className="viz-panel panel">
      <h2>Visualization Panel</h2>
      <div
        style={{
          width: "100%",
          minHeight: 180,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, var(--base-light) 20%, var(--primary, #4A90E2) 90%)",
          color: "var(--base-dark)",
          borderRadius: 8,
          marginBottom: 16,
          fontWeight: 500,
          fontSize: "1.2rem",
          position: "relative",
        }}
      >
        {/* MOCK CANVAS/CHART: Replace with real chart component */}
        {loading ? (
          <span style={{ color: "#bbb" }}>[Loading visualization...]</span>
        ) : data ? (
          <div>
            {/* Example mock: render some data sketch */}
            <span style={{ fontSize: 22 }}>y = {data.equation || "mx + b"}</span>
            <div style={{
              marginTop: 16,
              fontSize: 14,
              color: "#385a66"
            }}>
              [Data points: {Array.isArray(data.points) ? data.points.length : "N/A"}]
            </div>
          </div>
        ) : (
          <span>
            {/* Show clear marker for integration */}
            [Placeholder interactive chart/canvas area]
            <br />
            <span style={{ fontWeight: 400, fontSize: 12, color: "#1A1A1A99" }}>
              {/* API/Model data will be rendered here */}
              {/* To integrate: fetch experiment/model data, pass as prop */}
            </span>
          </span>
        )}

        {/* Future: Toolbar button example */}
        <button
          className="btn"
          style={{
            position: "absolute",
            top: 9,
            right: 16,
            fontSize: 13,
            padding: "4px 12px",
          }}
          tabIndex={0}
          title="Refresh visualization"
          onClick={() => {
            // Hook for parent data refresh, to be connected
            onRefresh();
            // Example: show loading state, call API in parent, etc.
          }}
        >↻</button>
      </div>
      <div style={{ fontSize: "1rem", color: "var(--text-secondary)" }}>
        {/* List what goes here, for dev clarity */}
        Dynamic experiment diagrams, interaction overlays, or educational content.
      </div>
    </section>
  );
}

VisualizationPanel.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  onRefresh: PropTypes.func,
};

export default VisualizationPanel;
