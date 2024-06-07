import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./contact.css";

export const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_a7v4z5p", "template_523xas9", form.current, {
        publicKey: "J0bwVl1WkOOQnjN6r",
      })
      .then(
        () => {
          toast.success("Message sent successfully!", {
            position: "top-right",
          });
          e.target.reset(); // Reset the form
          console.log("SUCCESS!");
        },
        (error) => {
          toast.error("Failed to send message. Please try again.", {
            position: "top-right",
          });
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <>
      <form className="ContactForm" ref={form} onSubmit={sendEmail}>
        <div className="contact-img">
          <img src="/contactImage.png" alt="" />
        </div>

        <div className="contact-form-section">
          {" "}
          <h2 className="form-text-heading">Get in Touch</h2>
          <label>Name</label>
          <input type="text" name="to_name" required />
          <label>Email</label>
          <input type="email" name="from_name" required />
          <label>Message</label>
          <textarea rows="2" name="message" required />
          <input type="submit" value="Send" />
        </div>
      </form>
      <ToastContainer />
    </>
  );
};
