/** @format */

import React, { useState, useEffect } from "react";
import ProposalItem from "./ProposalItem";
import axios from "axios";

const ProposalList = () => {
  const [proposals, setProposals] = useState([
    {
      id: 1,
      name: "Proposal 1",
      product: "Spinach",
      approved: false,
      initialPrice: "",
      discount: "",
      priceAfterDiscount: "",
      quantity: "",
      daysToExpiry: "",
    },
    {
      id: 2,
      name: "Proposal 2",
      product: "Apple",
      approved: false,
      initialPrice: "$1.00",
      discount: "5%",
      priceAfterDiscount: "$0.95",
      quantity: "20",
      daysToExpiry: "10",
    },
    {
      id: 3,
      name: "Proposal 3",
      product: "Carrot",
      approved: false,
      initialPrice: "$2.00",
      discount: "15%",
      priceAfterDiscount: "$1.70",
      quantity: "30",
      daysToExpiry: "7",
    },
  ]);

  useEffect(() => {
    const fetchProposalData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/proposal-data");
        const spinachData = response.data;

        setProposals((prevProposals) =>
          prevProposals.map((proposal) =>
            proposal.id === 1
              ? { ...proposal, ...spinachData }
              : proposal
          )
        );
      } catch (error) {
        console.error("Error fetching proposal data:", error);
      }
    };

    fetchProposalData();
  }, []);

  const handleApproval = async (proposal) => {
    try {
      const { id, product, quantity, discount } = proposal;

      console.log(`Approving proposal ${id}...`);

      // Send approval request with proposal details
      await axios.post("http://localhost:3001/approve-proposal", {
        id: id,
        status: "approved",
        product,
        quantity,
        discount,
        manufactureDate: "2024-07-15",
        expiryDate: "2024-07-25",
      });

      // Update state to mark the proposal as approved
      setProposals((prevProposals) =>
        prevProposals.map((p) =>
          p.id === id ? { ...p, approved: true } : p
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

      // Update state to remove the disapproved proposal
      setProposals((prevProposals) =>
        prevProposals.filter((proposal) => proposal.id !== id)
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
