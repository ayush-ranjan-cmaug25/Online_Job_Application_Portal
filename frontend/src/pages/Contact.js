import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const submit = (e) => {
    e.preventDefault();
    console.log("Contact form", form);
    alert("Message sent (demo)");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="container-smash my-5">
      <div className="glass p-5 mx-auto" style={{ maxWidth: "700px" }}>
        <h2 className="fw-bold mb-3">Contact Us</h2>
        <p className="text-muted mb-4">Have questions? Send us a message.</p>
        <form onSubmit={submit}>
          <div className="mb-3">
            <input
              className="form-control form-control-lg form-glass"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control form-control-lg form-glass"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              className="form-control form-glass"
              rows="5"
              placeholder="Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
          </div>
          <button
            className="btn btn-primary w-100 btn-lg"
            type="submit"
            style={{
              background: "linear-gradient(135deg, #4078FF 0%, #3461E0 100%)",
              border: "none",
              borderRadius: "12px",
            }}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
