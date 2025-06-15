import React from "react";
import VisualizationPanel from "./VisualizationPanel";
import RealTimeDataPanel from "./RealTimeDataPanel";
import ChatbotPanel from "./ChatbotPanel";
import "./AppContainer.css";

// PUBLIC_INTERFACE
function AppContainer() {
  /**
   * This is the main container shell that arranges VisualizationPanel, RealTimeDataPanel, and ChatbotPanel.
   * It uses a modern flex/grid layout and is responsive to viewport size. 
   * The color palette is sourced from CSS variables as provided by the light theme in App.css.
   */
  return (
    <div className="app-main-container">
      <div className="top-row">
        <VisualizationPanel />
        <RealTimeDataPanel />
      </div>
      <div className="bottom-row">
        <ChatbotPanel />
      </div>
    </div>
  );
}

export default AppContainer;
