import { useEffect, useMemo, useState } from "react";
import "./App.css";

type Course = {
  id: number;
  title: string;
  description: string;
  price: number;
  duration: string;
  level: string;
  category: string;
  icon: string;
};

const courses: Course[] = [
  {
    id: 1,
    title: "Generative AI for Business",
    description:
      "Learn how to use generative AI to save time, improve productivity and create new business opportunities.",
    price: 25000,
    duration: "4 weeks",
    level: "Beginner",
    category: "AI",
    icon: "🤖",
  },
  {
    id: 2,
    title: "AI Integration Strategies",
    description:
      "Learn practical strategies for integrating AI into business workflows and digital operations.",
    price: 75000,
    duration: "8 weeks",
    level: "Intermediate",
    category: "AI",
    icon: "⚡",
  },
  {
    id: 3,
    title: "Digital Marketing Mastery",
    description:
      "Build practical skills in SEO, social media, content marketing, email marketing and online advertising.",
    price: 75000,
    duration: "8 weeks",
    level: "Beginner",
    category: "Marketing",
    icon: "📈",
  },
  {
    id: 4,
    title: "Web Design & WordPress",
    description:
      "Learn how to create professional websites using WordPress and modern web design techniques.",
    price: 60000,
    duration: "8 weeks",
    level: "Beginner",
    category: "Technology",
    icon: "🌐",
  },
  {
    id: 5,
    title: "Cybersecurity Fundamentals",
    description:
      "Understand the fundamentals of cybersecurity, online safety, threats and protection.",
    price: 50000,
    duration: "6 weeks",
    level: "Beginner",
    category: "Security",
    icon: "🔐",
  },
  {
    id: 6,
    title: "E-Commerce Mastery",
    description:
      "Learn how to plan, build and market an online store and turn digital traffic into customers.",
    price: 50000,
    duration: "6 weeks",
    level: "Beginner",
    category: "Business",
    icon: "🛒",
  },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

function App() {
  const [goal, setGoal] = useState("");
  const [budget, setBudget] = useState("");
  
  const [showCourses, setShowCourses] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [enrolled, setEnrolled] = useState(false);
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false);
  useEffect(() => {
    const handleEnrollment = (event: Event) => {
      const customEvent = event as CustomEvent<{
        courseId: number;
        courseTitle: string;
        price: number;
      }>;

      if (
        selectedCourse &&
        customEvent.detail.courseId === selectedCourse.id
      ) {
        setEnrolled(true);
      }
    };

    window.addEventListener("skillpilot:enrollment", handleEnrollment);

    return () => {
      window.removeEventListener("skillpilot:enrollment", handleEnrollment);
    };
  }, [selectedCourse]);
  const recommendations = useMemo(() => {
    const text = goal.toLowerCase();

    let recommended = [...courses];

    if (text.includes("ai") || text.includes("artificial intelligence")) {
      recommended = courses.filter((course) => course.category === "AI");
    } else if (
      text.includes("marketing") ||
      text.includes("business") ||
      text.includes("online business")
    ) {
      recommended = courses.filter(
        (course) =>
          course.category === "Marketing" ||
          course.category === "Business" ||
          course.category === "AI"
      );
    } else if (text.includes("website") || text.includes("web")) {
      recommended = courses.filter(
        (course) =>
          course.category === "Technology" ||
          course.category === "Marketing"
      );
    } else if (
      text.includes("security") ||
      text.includes("cyber") ||
      text.includes("hacking")
    ) {
      recommended = courses.filter((course) => course.category === "Security");
    }

    if (budget) {
      const numericBudget = Number(budget.replace(/,/g, ""));

      if (numericBudget > 0) {
        const affordable = recommended.filter(
          (course) => course.price <= numericBudget
        );

        if (affordable.length > 0) {
          recommended = affordable;
        }
      }
    }

    return recommended.slice(0, 3);
  }, [goal, budget]);

  const askAdvisor = () => {
    setShowCourses(true);
    setEnrolled(false);
  };

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">
          <span className="logo-mark">S</span>
          <span>SkillPilot</span>
          <strong>AI</strong>
        </div>

        <nav>
          <a href="#advisor">AI Advisor</a>
          <a href="#courses">Courses</a>
          <a href="#how-it-works">How It Works</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <div className="badge">✨ AI-POWERED LEARNING</div>

            <h1>
              Tell us your goal.
              <br />
              <span>AI builds your path.</span>
            </h1>

            <p>
              Find the right skills, courses and learning roadmap based on your
              goals, experience and budget.
            </p>

            <a className="hero-button" href="#advisor">
              Build My Learning Path →
            </a>
          </div>

          <div className="hero-card">
            <div className="floating-card card-one">
              <span>🎯</span>
              <div>
                <strong>Your Goal</strong>
                <small>Start an online business</small>
              </div>
            </div>

            <div className="floating-card card-two">
              <span>🧠</span>
              <div>
                <strong>AI Recommendation</strong>
                <small>3 courses matched</small>
              </div>
            </div>

            <div className="roadmap-preview">
              <div className="roadmap-header">
                <span>YOUR AI ROADMAP</span>
                <span>12 WEEKS</span>
              </div>

              <div className="roadmap-line">
                <div className="roadmap-dot active">1</div>
                <div>
                  <strong>Generative AI</strong>
                  <small>Weeks 1–4</small>
                </div>
              </div>

              <div className="roadmap-line">
                <div className="roadmap-dot">2</div>
                <div>
                  <strong>Digital Marketing</strong>
                  <small>Weeks 5–8</small>
                </div>
              </div>

              <div className="roadmap-line">
                <div className="roadmap-dot">3</div>
                <div>
                  <strong>Online Business</strong>
                  <small>Weeks 9–12</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="advisor-section" id="advisor">
          <div className="section-heading">
            <span className="section-label">AI LEARNING ADVISOR</span>
            <h2>What do you want to achieve?</h2>
            <p>
              Describe your goal in your own words. SkillPilot will help you
              discover the right learning path.
            </p>
          </div>

          <div className="advisor-box">
            <div className="input-group">
              <label htmlFor="goal">YOUR LEARNING GOAL</label>

              <textarea
                id="goal"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="Example: I want to learn AI and digital marketing so I can start an online business..."
              />
            </div>

            <div className="advisor-bottom">
              <div className="budget-input">
                <label htmlFor="budget">YOUR BUDGET</label>

                <div className="money-input">
                  <span>₦</span>

                  <input
                    id="budget"
                    type="text"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="120,000"
                  />
                </div>
              </div>

              <button onClick={askAdvisor} className="advisor-button">
                Ask SkillPilot AI ✨
              </button>
            </div>
          </div>
        </section>

        {showCourses && (
          <section className="recommendations">
            <div className="recommendation-header">
              <div>
                <span className="section-label">AI RECOMMENDATIONS</span>
                <h2>Your recommended learning path</h2>
              </div>

              <span className="match-badge">✓ AI MATCHED</span>
            </div>

            <div className="course-grid">
              {recommendations.map((course) => (
                <article className="course-card" key={course.id}>
                  <div className="course-icon">{course.icon}</div>

                  <div className="course-meta">
                    <span>{course.category}</span>
                    <span>{course.level}</span>
                  </div>

                  <h3>{course.title}</h3>

                  <p>{course.description}</p>

                  <div className="course-info">
                    <span>⏱ {course.duration}</span>
                    <strong>{formatCurrency(course.price)}</strong>
                  </div>

                  <button
                    className="details-button"
                    onClick={() => setSelectedCourse(course)}
                  >
                    View Course →
                  </button>
                </article>
              ))}
            </div>

            {recommendations.length === 0 && (
              <div className="no-results">
                No course matches that budget yet. Try increasing your budget
                or changing your goal.
              </div>
            )}
          </section>
        )}

        <section className="tools-section">
          <div className="tools-card">
            <div className="tools-icon">⚙️</div>

            <div>
              <span className="section-label">AGENT-READY WEBSITE</span>

              <h2>Built for AI agents with WebMCP</h2>

              <p>
                SkillPilot exposes useful learning actions as structured tools
                that AI assistants can discover and use directly.
              </p>

              <div className="tool-list">
                <span>✓ Find courses</span>
                <span>✓ Get course details</span>
                <span>✓ Recommend courses</span>
                <span>✓ Calculate training cost</span>
                <span>✓ Create learning plans</span>
                <span>✓ Start enrollment</span>
              </div>
            </div>
          </div>
        </section>

        <section className="how-section" id="how-it-works">
          <div className="section-heading">
            <span className="section-label">HOW IT WORKS</span>
            <h2>Learning becomes a conversation.</h2>
            <p>
              SkillPilot combines human goals with AI-powered tools to make
              learning decisions easier.
            </p>
          </div>

          <div className="steps">
            <div className="step">
              <div className="step-number">01</div>
              <h3>Tell us your goal</h3>
              <p>Explain what you want to learn or achieve.</p>
            </div>

            <div className="step">
              <div className="step-number">02</div>
              <h3>AI finds your path</h3>
              <p>Courses are matched to your goals, level and budget.</p>
            </div>

            <div className="step">
              <div className="step-number">03</div>
              <h3>Start learning</h3>
              <p>Review the recommendation and choose your next step.</p>
            </div>
          </div>
        </section>

        <section className="catalogue" id="courses">
          <div className="section-heading">
            <span className="section-label">COURSE CATALOGUE</span>
            <h2>Explore available courses</h2>
          </div>

          <div className="catalogue-grid">
            {courses.map((course) => (
              <button
                className="catalogue-item"
                key={course.id}
                onClick={() => setSelectedCourse(course)}
              >
                <span>{course.icon}</span>
                <div>
                  <strong>{course.title}</strong>
                  <small>{formatCurrency(course.price)}</small>
                </div>
                <span>→</span>
              </button>
            ))}
          </div>
        </section>
      </main>

      <footer>
        <div className="logo">
          <span className="logo-mark">S</span>
          <span>SkillPilot</span>
          <strong>AI</strong>
        </div>

        <p>Tell us your goal. Let AI build your path.</p>
      </footer>

      {selectedCourse && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedCourse(null)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-button"
              onClick={() => setSelectedCourse(null)}
            >
              ×
            </button>

            <div className="modal-icon">{selectedCourse.icon}</div>

            <span className="section-label">{selectedCourse.category}</span>

            <h2>{selectedCourse.title}</h2>

            <p>{selectedCourse.description}</p>

            <div className="modal-details">
              <div>
                <small>Duration</small>
                <strong>{selectedCourse.duration}</strong>
              </div>

              <div>
                <small>Level</small>
                <strong>{selectedCourse.level}</strong>
              </div>

              <div>
                <small>Investment</small>
                <strong>{formatCurrency(selectedCourse.price)}</strong>
              </div>
            </div>

            {enrolled ? (
  <div className="enrolled-message">
    <strong>✓ Enrollment Request Started!</strong>
    <p>{selectedCourse.title}</p>
    <small>
      Investment: {formatCurrency(selectedCourse.price)}
    </small>
    <br />
    <small>
      You can now complete your enrollment process.
    </small>

    <button
  type="button"
  className="enroll-button"
  onClick={() => {
    console.log("Complete Enrollment button clicked");
    setShowEnrollmentForm(true);
  }}
>
  Complete Enrollment →
</button>
    {showEnrollmentForm && (
  <div
  className="enrollment-form"
  style={{
    display: "block",
    visibility: "visible",
    opacity: 1,
    position: "relative",
    zIndex: 9999,
  }}
>
    <h3>Complete Your Enrollment</h3>

    <p>
      You are enrolling in <strong>{selectedCourse.title}</strong>.
    </p>

    <input
      type="text"
      placeholder="Full Name"
    />

    <input
      type="email"
      placeholder="Email Address"
    />

    <input
      type="tel"
      placeholder="Phone Number"
    />

    <button
      className="enroll-button"
      onClick={() => {
        alert(
          `Thank you! Your enrollment request for ${selectedCourse.title} has been submitted.`
        );
        setShowEnrollmentForm(false);
      }}
    >
      Submit Enrollment →
    </button>
  </div>
)}
  </div>
) : (
  <button
    className="enroll-button"
    onClick={() => setEnrolled(true)}
  >
    Start Enrollment →
  </button>
)}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;