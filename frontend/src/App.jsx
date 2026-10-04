import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState({
    days: 12,
    hours: 8,
    minutes: 42,
    seconds: 18,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    year: "",
    teamName: "",
    track: "Web/App",
  });

  const [message, setMessage] = useState("");

  // COUNTDOWN
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        if (
          prev.days === 0 &&
          prev.hours === 0 &&
          prev.minutes === 0 &&
          prev.seconds === 0
        ) {
          return prev;
        }

        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;

          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;

            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              days--;
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // FORM INPUT CHANGE
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // REGISTER
  const handleRegister = async (event) => {
    event.preventDefault();

    setMessage("Registering...");

    try {
      const response = await fetchfetch("https://the-last-commit-ng63.onrender.com/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration successful! 🚀");

        setFormData({
          name: "",
          email: "",
          phone: "",
          college: "",
          year: "",
          teamName: "",
          track: "Web/App",
        });
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error(error);
      setMessage(
        "Cannot connect to backend. Make sure the backend is running on port 5000."
      );
    }
  };

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">&lt;LAST_COMMIT /&gt;</div>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#challenges">Challenges</a>
          <a href="#timeline">Timeline</a>
          <a href="#prizes">Prizes</a>
          <a href="#register" className="nav-register">
            Register
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">

        <div className="hero-content">

          <p className="system-text">
            &gt; SYSTEM_INITIALIZED_
          </p>

          <p className="presented">
            CHERRY NETWORK PRESENTS
          </p>

          <h1>
            THE LAST
            <br />
            <span>COMMIT?</span>
          </h1>

          <p className="hero-description">
            Your final line of code could be the beginning
            <br />
            of something much bigger.
          </p>

          <div className="hero-buttons">
            <a href="#register" className="primary-button">
              REGISTER NOW →
            </a>

            <a href="#about" className="secondary-button">
              EXPLORE
            </a>
          </div>

          {/* COUNTDOWN */}
          <div className="countdown">

            <div className="countdown-box">
              <strong>{String(time.days).padStart(2, "0")}</strong>
              <span>DAYS</span>
            </div>

            <div className="countdown-box">
              <strong>{String(time.hours).padStart(2, "0")}</strong>
              <span>HOURS</span>
            </div>

            <div className="countdown-box">
              <strong>{String(time.minutes).padStart(2, "0")}</strong>
              <span>MINUTES</span>
            </div>

            <div className="countdown-box">
              <strong>{String(time.seconds).padStart(2, "0")}</strong>
              <span>SECONDS</span>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">

        <div className="section-title">
          <span>01.</span>
          <h2>ABOUT THE EVENT</h2>
        </div>

        <div className="about-grid">

          <div>
            <p className="big-text">
              Every idea starts with a line of code.
              Every journey ends with one final commit.
            </p>

            <p>
              The Last Commit is a futuristic hackathon where
              developers, designers and innovators come together
              to build something meaningful before the clock runs out.
            </p>

            <p>
              Choose your challenge, build your idea and make
              your final commit count.
            </p>
          </div>

          <div className="terminal-card">

            <div className="terminal-top">
              <span>●</span>
              <span>●</span>
              <span>●</span>
            </div>

            <div className="terminal-content">
              <p>&gt; booting_hackathon...</p>
              <p>&gt; loading_ideas...</p>
              <p>&gt; developers_found: 100+</p>
              <p>&gt; creativity: MAX</p>
              <p>&gt; status: READY</p>
              <p className="terminal-green">
                &gt; LET'S_BUILD_
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* CHALLENGES */}
      <section id="challenges" className="section">

        <div className="section-title">
          <span>02.</span>
          <h2>CHALLENGES</h2>
        </div>

        <div className="challenge-grid">

          <div className="challenge-card">
            <span className="challenge-number">01</span>
            <h3>WEB / APP</h3>
            <p>
              Build a useful web or mobile application
              that solves a real-world problem.
            </p>
            <span className="challenge-arrow">→</span>
          </div>

          <div className="challenge-card">
            <span className="challenge-number">02</span>
            <h3>AI / ML</h3>
            <p>
              Use artificial intelligence and machine learning
              to create something innovative.
            </p>
            <span className="challenge-arrow">→</span>
          </div>

          <div className="challenge-card">
            <span className="challenge-number">03</span>
            <h3>CYBERSECURITY</h3>
            <p>
              Build solutions that make digital systems
              safer and more secure.
            </p>
            <span className="challenge-arrow">→</span>
          </div>

        </div>
      </section>

      {/* TIMELINE */}
      <section id="timeline" className="section">

        <div className="section-title">
          <span>03.</span>
          <h2>TIMELINE</h2>
        </div>

        <div className="timeline">

          <div className="timeline-item">
            <span>01</span>
            <div>
              <h3>REGISTRATION</h3>
              <p>Register your team and choose your challenge.</p>
            </div>
          </div>

          <div className="timeline-item">
            <span>02</span>
            <div>
              <h3>IDEATION</h3>
              <p>Find a problem and design your solution.</p>
            </div>
          </div>

          <div className="timeline-item">
            <span>03</span>
            <div>
              <h3>HACK</h3>
              <p>Build, test and improve your project.</p>
            </div>
          </div>

          <div className="timeline-item">
            <span>04</span>
            <div>
              <h3>FINAL COMMIT</h3>
              <p>Submit your project before the deadline.</p>
            </div>
          </div>

        </div>
      </section>

      {/* PRIZES */}
      <section id="prizes" className="section">

        <div className="section-title">
          <span>04.</span>
          <h2>PRIZES</h2>
        </div>

        <div className="prize-grid">

          <div className="prize-card">
            <span>01</span>
            <h3>₹25,000</h3>
            <p>WINNER</p>
          </div>

          <div className="prize-card">
            <span>02</span>
            <h3>₹15,000</h3>
            <p>RUNNER UP</p>
          </div>

          <div className="prize-card">
            <span>03</span>
            <h3>₹10,000</h3>
            <p>SECOND RUNNER UP</p>
          </div>

        </div>
      </section>

      {/* REGISTRATION */}
      <section id="register" className="section register-section">

        <div className="section-title">
          <span>05.</span>
          <h2>REGISTER</h2>
        </div>

        <div className="register-container">

          <div className="register-heading">
            <h2>
              READY TO MAKE
              <br />
              YOUR <span>FINAL COMMIT?</span>
            </h2>

            <p>
              Fill in your details and join The Last Commit.
            </p>
          </div>

          <form
            className="register-form"
            onSubmit={handleRegister}
          >

            {/* NAME */}
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {/* PHONE */}
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            {/* COLLEGE */}
            <input
              type="text"
              name="college"
              placeholder="College Name"
              value={formData.college}
              onChange={handleChange}
              required
            />

            {/* YEAR */}
            <input
              type="text"
              name="year"
              placeholder="Year of Study"
              value={formData.year}
              onChange={handleChange}
              required
            />

            {/* TEAM */}
            <input
              type="text"
              name="teamName"
              placeholder="Team Name"
              value={formData.teamName}
              onChange={handleChange}
              required
            />

            {/* TRACK */}
            <select
              name="track"
              value={formData.track}
              onChange={handleChange}
              required
            >
              <option value="Web/App">Web / App</option>
              <option value="AI/ML">AI / ML</option>
              <option value="Cybersecurity">
                Cybersecurity
              </option>
            </select>

            {/* BUTTON */}
            <button
              type="submit"
              className="primary-button register-button"
            >
              REGISTER NOW →
            </button>

          </form>

          {/* MESSAGE */}
          {message && (
            <p className="registration-message">
              {message}
            </p>
          )}

        </div>
      </section>

      {/* FOOTER */}
      <footer>

        <div>
          &lt;THE_LAST_COMMIT /&gt;
        </div>

        <p>
          Built for those who dare to ship.
        </p>

        <p>
          © 2026 CHERRY NETWORK
        </p>

      </footer>

    </div>
  );
}

export default App;