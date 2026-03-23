import axios from "axios";
import Head from "next/head";
import { FaInstagram, FaPhoneVolume, FaTwitter } from "react-icons/fa6";
import { GrLinkedin } from "react-icons/gr";
import { MdAttachEmail } from "react-icons/md";
import { useState } from "react";

export default function contact() {
  const [name, setname] = useState("");
  const [lname, setlname] = useState("");
  const [email, setemail] = useState("");
  const [company, setcompany] = useState("");
  const [phone, setphone] = useState("");
  const [country, setcountry] = useState("");
  const [price, setprice] = useState("");
  const [description, setdescription] = useState("");
  const [project, setproject] = useState("");

  const [messageOk, setmessageOk] = useState("");

  async function createProduct(ev) {
    ev.preventDefault();

    setmessageOk("Sending message please wait...");

    const data = {
      name,
      lname,
      email,
      company,
      phone,
      country,
      project,
      price,
      description,
    };

    try {
      await axios.post("/api/contacts", data);

      setmessageOk("Message sent successfully");
      setTimeout(() => {
        setmessageOk("");
      }, 3000);

      setname("");
      setlname("");
      setemail("");
      setcompany("");
      setphone("");
      setcountry("");
      setproject("");
      setprice("");
      setdescription("");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }

      setmessageOk("Error sending message");
    }
  }

  const handleProjectChange = (projectName) => {
    if (project.includes(projectName))
      setproject(project.filter((item) => item !== projectName));
    else setproject([...project, projectName]);
  };

  const handlePriceChange = (e) => {
    setprice(e.target.value);
  };

  return (
    <>
      <Head>
        <title>Contact us</title>
      </Head>

      <div className="contactpage">
        <div className="container">
          <div className="contactformp">
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

            <div className="rightcontp">
              <form action="" onSubmit={createProduct}>
                <div className="rightconttitle">
                  <h2>Your Contact Information</h2>
                </div>

                <div className="rightcontinputs">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    placeholder="First Name"
                    required
                  />
                  <input
                    type="text"
                    value={lname}
                    onChange={(e) => setlname(e.target.value)}
                    placeholder="Last Name"
                    required
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    placeholder="Email Address"
                    required
                  />
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setcompany(e.target.value)}
                    placeholder="Company Name"
                    required
                  />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                    placeholder="Phone Number"
                    required
                  />

                  <select
                    name="country"
                    value={country}
                    onChange={(e) => setcountry(e.target.value)}
                  >
                    <option value="">Select a country</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                </div>

                <div className="rightconttitle">
                  <h2>What services do you need for your project?</h2>
                </div>

                <div className="rightcontcheckbox">
                  {[
                    "Website Development",
                    "App Development",
                    "SEO Optimization",
                  ].map((projectOption) => (
                    <label key={projectOption}>
                      <input
                        type="checkbox"
                        value={projectOption}
                        checked={project.includes(projectOption)}
                        onChange={() => handleProjectChange(projectOption)}
                      />
                      {projectOption}
                    </label>
                  ))}
                </div>

                <div className="rightconttitle">
                  <h2>How much is budget for your next project?</h2>
                </div>

                <div className="rightcontredio">
                  {["Less than $200", "$200 - $400"].map((budgetOption) => (
                    <div key={budgetOption}>
                      <input
                        type="radio"
                        name="example-radio"
                        value={budgetOption}
                        checked={price === budgetOption}
                        onChange={handlePriceChange}
                      />
                      <label>{budgetOption}</label>
                    </div>
                  ))}
                </div>

                <div className="rightconttitle">
                  <h2>Tell me about your project</h2>
                </div>

                <textarea
                  value={description}
                  onChange={(ev) => setdescription(ev.target.value)}
                  rows={4}
                  placeholder="Project Description"
                />

                <button type="submit">Submit</button>
                <p>{messageOk}</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
