import React from "react";

export default function About() {
  return (
    <div className="container-smash my-5">
      <div className="glass p-5 fade-in show">
        <div className="text-center">
          <h2 className="fw-bold mb-4">About Us</h2>
          <p
            className="text-muted mb-5"
            style={{ maxWidth: "800px", margin: "0 auto" }}
          >
            Welcome to <strong>Online Job Portal</strong> — We aim to make job
            searching intuitive and visually elegant.
          </p>
        </div>

        <div className="row mt-4 justify-content-center">
          <div className="col-md-4 col-sm-6 mb-3">
            <div className="glass p-4 text-center h-100">
              <h5 className="fw-bold mb-2">Ayush Ranjan</h5>
              <p className="text-muted mb-0">PRN: 250840320040</p>
            </div>
          </div>
          <div className="col-md-4 col-sm-6 mb-3">
            <div className="glass p-4 text-center h-100">
              <h5 className="fw-bold mb-2">Vibhav Chavan</h5>
              <p className="text-muted mb-0">PRN: 250840320232</p>
            </div>
          </div>
          <div className="col-md-4 col-sm-6 mb-3">
            <div className="glass p-4 text-center h-100">
              <h5 className="fw-bold mb-2">Deepra Banerjee</h5>
              <p className="text-muted mb-0">PRN: 250840320052</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-5">
          <p
            className="text-muted"
            style={{ maxWidth: "1000px", margin: "0 auto" }}
          >
            Guided by our passion for design, we combined technology and
            creativity to build this responsive full-stack web portal.
          </p>
        </div>
      </div>
    </div>
  );
}
