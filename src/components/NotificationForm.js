/** @format */

import React, { useState } from "react";
import axios from "axios";

const NotificationForm = () => {
  const [email, setEmail] = useState("");
  const [sms, setSms] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  const sendEmail = async () => {
    try {
      const response = await axios.post("http://localhost:3001/send-email", {
        to: email,
        subject: subject,
        text: message,
      });
      alert("Email sent: " + response.data);
    } catch (error) {
      alert("Error sending email: " + error);
    }
  };

  const sendSms = async () => {
    try {
      const response = await axios.post("http://localhost:3001/send-sms", {
        to: sms,
        message: message,
      });
      alert("SMS sent: " + response.data);
    } catch (error) {
      alert("Error sending SMS: " + error);
    }
  };

  return (
    <div>
      <h2>Send Notification</h2>
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendEmail}>Send Email</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Phone Number"
          value={sms}
          onChange={(e) => setSms(e.target.value)}
        />
        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendSms}>Send SMS</button>
      </div>
    </div>
  );
};

export default NotificationForm;
