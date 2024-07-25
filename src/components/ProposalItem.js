/** @format */

import React, { useState } from "react";
import "./ProposalItem.css"; // Import the CSS file for styling

const ProposalItem = ({ proposal, onApproval, onDisapproval }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li
      className={`proposal-item ${
        proposal.approved ? "approved" : "not-approved"
      }`}
    >
      <div className="proposal-header" onClick={toggleExpand}>
        <span>{`${proposal.name} - ${proposal.product}`}</span>
        <div>
          <button
            className="approve-button"
            onClick={(e) => {
              e.stopPropagation();
              onApproval(proposal);
            }}
          >
            Approve
          </button>
          <button
            className="disapprove-button"
            onClick={(e) => {
              e.stopPropagation();
              onDisapproval(proposal.id);
            }}
          >
            Disapprove
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="proposal-details">
          <p>Initial Price: {proposal.initialPrice}</p>
          <p>Discount: {proposal.discount}</p>
          <p>Price After Discount: {proposal.priceAfterDiscount}</p>
          <p>Quantity: {proposal.quantity}</p>
          <p>Days to Expiry: {proposal.daysToExpiry}</p>
        </div>
      )}
    </li>
  );
};

export default ProposalItem;
