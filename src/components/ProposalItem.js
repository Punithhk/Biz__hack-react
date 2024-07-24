/** @format */

import React from "react";
import "./ProposalItem.css"; // Import the CSS file for styling

const ProposalItem = ({ proposal, onApproval, onDisapproval }) => {
  return (
    <li
      className={`proposal-item ${
        proposal.approved ? "approved" : "not-approved"
      }`}
    >
      <span>{proposal.name}</span>
      {proposal.approved ? (
        <button
          className="disapprove-button"
          onClick={() => onDisapproval(proposal.id)}
        >
          Disapprove
        </button>
      ) : (
        <button
          className="approve-button"
          onClick={() => onApproval(proposal.id)}
        >
          Approve
        </button>
      )}
    </li>
  );
};

export default ProposalItem;
