
import React from "react";

const AlertComponent = ({ message, variant = "info", onClose }) => {
  if (!message) return null; 

  return (
    <div
      className={`alert alert-${variant} alert dismissible fade show`}
      role="alert"
       style={{
       position: "fixed",
        top: "20px",
        right: "10px",
        zIndex: 9999,
        width: "250px",         
        padding: "5px 10px",      
        fontSize: "0.85rem",    
        borderRadius: "6px",      
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    }}
    >
      {message}
      <button
        type="button"
        className="btn-close"
        onClick={onClose}
        aria-label="Close"
      ></button>
    </div>
  );
};

export default AlertComponent;