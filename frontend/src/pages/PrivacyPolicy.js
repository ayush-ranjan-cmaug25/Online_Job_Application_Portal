import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container-smash my-5">
      <div className="card-glass p-5">
        <h1 className="text-center mb-4">Privacy Policy</h1>
        
        <p className="text-muted">Last updated: {new Date().toLocaleDateString()}</p>
        
        <section className="mb-4">
          <h2 className="h4 mb-3">1. Introduction</h2>
          <p>
            Welcome to Online Job Portal. We respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you about how we handle your personal data when you visit our website 
            and tell you about your privacy rights.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="h4 mb-3">2. Information We Collect</h2>
          <p>We may collect, use, store and transfer different kinds of personal data about you:</p>
          <ul>
            <li><strong>Identity Data:</strong> First name, last name, username</li>
            <li><strong>Contact Data:</strong> Email address, telephone numbers</li>
            <li><strong>Technical Data:</strong> IP address, browser type, device information</li>
            <li><strong>Profile Data:</strong> Resume, work experience, education, skills</li>
            <li><strong>Usage Data:</strong> Information about how you use our website</li>
          </ul>
        </section>

        <section className="mb-4">
          <h2 className="h4 mb-3">3. How We Use Your Information</h2>
          <p>We use your personal data for the following purposes:</p>
          <ul>
            <li>To provide and maintain our service</li>
            <li>To facilitate job applications and employer-candidate matching</li>
            <li>To communicate with you about your account and applications</li>
            <li>To improve our website and services</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-4">
          <h2 className="h4 mb-3">4. Data Security</h2>
          <p>
            We have implemented appropriate security measures to prevent your personal data from being accidentally 
            lost, used, or accessed in an unauthorized way. We limit access to your personal data to those employees, 
            agents, contractors, and other third parties who have a business need to know.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="h4 mb-3">5. Data Retention</h2>
          <p>
            We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, 
            including for the purposes of satisfying any legal, accounting, or reporting requirements.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="h4 mb-3">6. Your Legal Rights</h2>
          <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data:</p>
          <ul>
            <li>Request access to your personal data</li>
            <li>Request correction of your personal data</li>
            <li>Request erasure of your personal data</li>
            <li>Object to processing of your personal data</li>
            <li>Request restriction of processing your personal data</li>
            <li>Request transfer of your personal data</li>
            <li>Right to withdraw consent</li>
          </ul>
        </section>

        <section className="mb-4">
          <h2 className="h4 mb-3">7. Third-Party Links</h2>
          <p>
            Our website may include links to third-party websites. Clicking on those links may allow third parties 
            to collect or share data about you. We do not control these third-party websites and are not responsible 
            for their privacy statements.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="h4 mb-3">8. Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to track activity on our service and store certain information. 
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="h4 mb-3">9. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
            Privacy Policy on this page and updating the "Last updated" date.
          </p>
        </section>

        <section className="mb-4">
          <h2 className="h4 mb-3">10. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul>
            <li>By email: privacy@jobportal.com</li>
            <li>By visiting our contact page</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
