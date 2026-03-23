import axios from "axios";
import Head from "next/head";
import { FaInstagram, FaPhoneVolume, FaTwitter } from "react-icons/fa6";
import { GrLinkedin } from "react-icons/gr";
import { MdAttachEmail } from "react-icons/md";
import { useState } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const PROJECT_OPTIONS = [
  "Website Development",
  "App Development",
  "SEO Optimization",
  "Wordpress Website",
  "E-commerce Site",
  "Performance Evaluation",
];

const BUDGET_OPTIONS = [
  "Less than $200",
  "$200 - $400",
  "$400 - $700",
  "More than $700",
];

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina",
  "Armenia", "Australia", "Austria", "Azerbaijan", "Bahrain", "Bangladesh",
  "Belgium", "Belarus", "Brazil", "Brunei", "Bulgaria", "Canada", "Cambodia",
  "China", "Croatia", "Czech Republic", "Denmark", "Egypt", "Estonia",
  "Ethiopia", "Fiji", "Finland", "France", "Georgia", "Germany", "Ghana",
  "Greece", "Hungary", "Iceland", "India", "Indonesia", "Ireland", "Italy",
  "Japan", "Kazakhstan", "Kenya", "Kyrgyzstan", "Laos", "Latvia", "Lithuania",
  "Madagascar", "Malaysia", "Mexico", "Mongolia", "Morocco", "Myanmar",
  "Nepal", "New Zealand", "Nigeria", "Norway", "Pakistan", "Papua New Guinea",
  "Philippines", "Poland", "Portugal", "Romania", "Russia", "Saudi Arabia",
  "Serbia", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea",
  "Spain", "Sri Lanka", "Sweden", "Switzerland", "Tajikistan", "Tanzania",
  "Thailand", "Turkey", "Turkmenistan", "Uganda", "Ukraine",
  "United Arab Emirates", "United Kingdom", "United States", "Uzbekistan",
  "Vietnam", "Zimbabwe",
];

const INITIAL_FORM_STATE = {
  name: "",
  lname: "",
  email: "",
  company: "",
  phone: "",
  country: "",
  project: [],
  price: "",
  description: "",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionTitle({ children }) {
  return (
    <div className="rightconttitle">
      <h2>{children}</h2>
    </div>
  );
}

function ContactLink({ href, icon, label, isExternal = false }) {
  return (
    <li>
      <a
        href={href}
        className="contact-link"
        {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {icon}
        <span>{label}</span>
      </a>
    </li>
  );
}

function ProjectCheckbox({ option, checked, onChange }) {
  return (
    <label key={option} className="cyberpunk-checkbox-label">
      <input
        type="checkbox"
        value={option}
        className="cyberpunk-checkbox"
        checked={checked}
        onChange={() => onChange(option)}
      />
      {option}
    </label>
  );
}

function BudgetRadio({ option, checked, onChange }) {
  return (
    <div className="radio-button" key={option}>
      <input
        type="radio"
        name="example-radio"
        value={option}
        id={option}
        checked={checked}
        onChange={onChange}
      />
      <span className="radio"></span>
      <label htmlFor={option}>{option}</label>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [messageOk, setMessageOk] = useState("");

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleProjectChange = (projectName) => {
    setForm((prev) => ({
      ...prev,
      project: prev.project.includes(projectName)
        ? prev.project.filter((item) => item !== projectName)
        : [...prev.project, projectName],
    }));
  };

  const resetForm = () => setForm(INITIAL_FORM_STATE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessageOk("Sending message please wait...");

    try {
      await axios.post("/api/contacts", form);
      setMessageOk("Message sent successfully");
      setTimeout(() => setMessageOk(""), 3000);
      resetForm();
    } catch (error) {
      if (error.response) {
        console.error("Response error:", error.response.data);
      } else if (error.request) {
        console.error("Request error:", error.request);
      } else {
        console.error("Error:", error.message);
      }
      setMessageOk("Error sending message");
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      <Head>
        <title>Contact us</title>
      </Head>

      <div className="contactpage">
        <div className="container">
          <div className="contactformp">

            {/* ── Left Panel ── */}
            <div className="leftcontp">
              <h2>Get in Touch</h2>
              <h2>Lets Talk about your Project</h2>
              <p>
                Thinking about a project, a problem to solve, or just want to
                connect? Lets do it
              </p>
              <p>Use the form on this page to get in touch</p>
              <p>I love questions and feedback</p>

              <div className="leftsociinfo">
                <ul>
                  <li>
                    <FaPhoneVolume />{" "}
                    <span>
                      
                      <a href="tel:+923336408376" target="_blank">
                        Contact Us
                      </a>
                    </span>
                  </li>

                  <li>
                    <MdAttachEmail />{" "}
                    <span>
                      
                      <a
                        href="mailto:awais.web.developer124@gmail.com"
                        target="_blank"
                      >
                        Send an Email
                      </a>
                    </span>
                  </li>

                  <li>
                    <GrLinkedin />{" "}
                    <span>
                      
                      <a
                        href="https://www.linkedin.com/in/muhammad-awais-773493230"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View LinkedIn Profile
                      </a>
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* ── Right Panel (Form) ── */}
            <div className="rightcontp">
              <form onSubmit={handleSubmit}>

                {/* Contact Information */}
                <SectionTitle>Your Contact Information</SectionTitle>
                <div className="rightcontinputs">
                  <input
                    type="text"
                    value={form.name}
                    onChange={handleChange("name")}
                    placeholder="First Name"
                    required
                  />
                  <input
                    type="text"
                    value={form.lname}
                    onChange={handleChange("lname")}
                    placeholder="Last Name"
                    required
                  />
                  <input
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    placeholder="Email Address"
                    required
                  />
                  <input
                    type="text"
                    value={form.company}
                    onChange={handleChange("company")}
                    placeholder="Company Name"
                    required
                  />
                  <input
                    type="text"
                    value={form.phone}
                    onChange={handleChange("phone")}
                    placeholder="Phone Number"
                    required
                  />
                  <select
                    name="country"
                    value={form.country}
                    onChange={handleChange("country")}
                  >
                    <option value="">Select a country</option>
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Services */}
                <SectionTitle>
                  What services do you need for your project?
                </SectionTitle>
                <div className="rightcontcheckbox">
                  {PROJECT_OPTIONS.map((option) => (
                    <ProjectCheckbox
                      key={option}
                      option={option}
                      checked={form.project.includes(option)}
                      onChange={handleProjectChange}
                    />
                  ))}
                </div>

                {/* Budget */}
                <SectionTitle>
                  How much is budget for your next project?
                </SectionTitle>
                <div className="rightcontredio">
                  {BUDGET_OPTIONS.map((option) => (
                    <BudgetRadio
                      key={option}
                      option={option}
                      checked={form.price === option}
                      onChange={handleChange("price")}
                    />
                  ))}
                </div>

                {/* Description */}
                <SectionTitle>Tell me about your project</SectionTitle>
                <div className="rightcontpera">
                  <textarea
                    value={form.description}
                    onChange={handleChange("description")}
                    name="description"
                    rows={4}
                    placeholder="Project Description"
                  />
                  <hr />
                  <div className="righhcontsbtn flex-right gap-3">
                    <button type="submit">Submit</button>
                    {messageOk && <p>{messageOk}</p>}
                  </div>
                </div>

              </form>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
