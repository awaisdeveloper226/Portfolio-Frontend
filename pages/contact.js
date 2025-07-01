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

  //Complete after  coming back  from createProduct function
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
                      Phone :{" "}
                      <a href="tel:+923336408376" target="_blank">
                        +92-333-640-8376
                      </a>
                    </span>
                  </li>
                  <li>
                    <MdAttachEmail />{" "}
                    <span>
                      Email :{" "}
                      <a href="mailto:awais4414083@gmail.com" target="_blank">
                        awais4414083@gmail.com
                      </a>
                    </span>
                  </li>
                  <li>
                    <GrLinkedin />{" "}
                    <span>
                      LinkedIn :{" "}
                      <a
                        href="www.linkedin.com/in/muhammad-awais-773493230"
                        target="_blank"
                      >
                        https://tinyurl.com/linkedin-awais
                      </a>
                    </span>
                  </li>
                  <li>
                    <FaInstagram />{" "}
                    <span>
                      Instagram :{" "}
                      <a href="https://www.instagram.com" target="_blank">
                        www.instagram.com
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
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Brazil">Brazil</option>
                    <option value="Brunei">Brunei</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Canada">Canada</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="China">China</option>
                    <option value="Croatia">Croatia</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Egypt">Egypt</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Fiji">Fiji</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Germany">Germany</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Greece">Greece</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Iceland">Iceland</option>
                    <option value="India">India</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Italy">Italy</option>
                    <option value="Japan">Japan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Laos">Laos</option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Madagascar">Madagascar</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Mongolia">Mongolia</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Myanmar">Myanmar</option>
                    <option value="Nepal">Nepal</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Norway">Norway</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Papua New Guinea">Papua New Guinea</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Romania">Romania</option>
                    <option value="Russia">Russia</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Serbia">Serbia</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Slovakia">Slovakia</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Korea">South Korea</option>
                    <option value="Spain">Spain</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Tajikistan">Tajikistan</option>
                    <option value="Tanzania">Tanzania</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Turkmenistan">Turkmenistan</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Arab Emirates">
                      United Arab Emirates
                    </option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Vietnam">Vietnam</option>
                    <option value="Zimbabwe">Zimbabwe</option>
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
                    "Wordpress Website",
                    "E-commerce Site",
                    "Performance Evaluation",
                  ].map((projectOption) => (
                    <label
                      key={projectOption}
                      className="cyberpunk-checkbox-label"
                    >
                      <input
                        type="checkbox"
                        value={projectOption}
                        className="cyberpunk-checkbox"
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
                  {[
                    "Less than $200",
                    "$200 - $400",
                    "$400 - $700",
                    "More than $700",
                  ].map((budgetOption) => (
                    <div className="radio-button" key={budgetOption}>
                      <input
                        type="radio"
                        name="example-radio"
                        value={budgetOption}
                        id={budgetOption}
                        checked={price === budgetOption}
                        onChange={handlePriceChange}
                      />
                      <span className="radio"></span>
                      <label htmlFor={budgetOption}>{budgetOption}</label>
                    </div>
                  ))}
                </div>

                <div className="rightconttitle">
                  <h2>Tell me about your project</h2>
                </div>
                <div className="rightcontpera">
                  <textarea
                    value={description}
                    onChange={(ev) => setdescription(ev.target.value)}
                    name="description"
                    rows={4}
                    placeholder="Project Description"
                  ></textarea>
                  <hr />
                  <div className="righhcontsbtn flex-right gap-3">
                    <button type="submit">Submit</button>
                    <p>{messageOk}</p>
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
