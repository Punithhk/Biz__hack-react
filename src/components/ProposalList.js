/** @format */

import React, { useState } from "react";
import ProposalItem from "./ProposalItem";
import axios from "axios";

const ProposalList = () => {
  const [proposals, setProposals] = useState([
    { id: 1, name: "Proposal 1", approved: false },
    { id: 2, name: "Proposal 2", approved: false },
    { id: 3, name: "Proposal 3", approved: false },
  ]);

  const handleApproval = async (id) => {
    try {
      console.log(`Approving proposal ${id}...`);

      // Send approval request
      await axios.post("http://localhost:3001/approve-proposal", {
        id: id,
        status: "approved",
      });

      // Update state to mark the proposal as approved
      setProposals((prevProposals) =>
        prevProposals.map((proposal) =>
          proposal.id === id ? { ...proposal, approved: true } : proposal
        )
      );
    } catch (error) {
      console.error("Error sending approval:", error);
    }
  };

  const handleDisapproval = async (id) => {
    try {
      console.log(`Disapproving proposal ${id}...`);

      // Send disapproval request
      await axios.post("http://localhost:3001/disapprove-proposal", {
        id: id,
        status: "disapproved",
      });

      // Update state to mark the proposal as disapproved
      setProposals((prevProposals) =>
        prevProposals.map((proposal) =>
          proposal.id === id ? { ...proposal, approved: false } : proposal
        )
      );
    } catch (error) {
      console.error("Error sending disapproval:", error);
    }
  };

  return (
    <div>
      <h1>Proposals</h1>
      <ul>
        {proposals.map((proposal) => (
          <ProposalItem
            key={proposal.id}
            proposal={proposal}
            onApproval={handleApproval}
            onDisapproval={handleDisapproval}
          />
        ))}
      </ul>
    </div>
  );
};

export default ProposalList;
