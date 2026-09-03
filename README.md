# ITC SkillPilot

**AI-powered course discovery, recommendations, learning plans, training cost calculation, and enrollment — enhanced with WebMCP.**

🌐 **Live Demo:** https://itc-skillpilot.netlify.app/
📦 **Source Code:** https://github.com/Oparaji/itc-skillpilot

## Overview

ITC SkillPilot is a web-based training discovery and enrollment platform designed to help learners find suitable courses, understand course details, plan their learning journey, calculate training costs, and begin enrollment.

The project has been enhanced with **WebMCP**, allowing AI agents to interact with SkillPilot through structured, machine-readable tools instead of relying only on traditional webpage interaction.

SkillPilot demonstrates how a training website can become **agent-ready** while maintaining clear boundaries around actions that require user confirmation.

## What WebMCP Enables

SkillPilot exposes six WebMCP tools:

| Tool                      | Purpose                                                                   |
| ------------------------- | ------------------------------------------------------------------------- |
| `find_courses`            | Search available courses by category, level, or keyword                   |
| `get_course_details`      | Retrieve detailed information about a specific course                     |
| `recommend_courses`       | Recommend courses based on a learner's goal, budget, and experience level |
| `calculate_training_cost` | Calculate the combined cost of selected courses                           |
| `create_learning_plan`    | Generate a personalized multi-week learning plan                          |
| `start_enrollment`        | Start an enrollment request after explicit confirmation                   |

This enables an AI assistant to perform useful training-related tasks directly through SkillPilot's structured tool interface.

## WebMCP Implementation

The WebMCP integration is implemented in:

`src/webmcp.ts`

SkillPilot uses the WebMCP `document.modelContext.registerTool()` API to register its tools with structured descriptions and JSON schemas.

The application also feature-detects WebMCP availability so that the normal SkillPilot user interface continues to work even when WebMCP is not available.

### Example WebMCP Tool Categories

**Discovery**

* Search courses
* Get course information
* Receive course recommendations

**Planning**

* Calculate training costs
* Create personalized learning plans

**Action**

* Start enrollment only after explicit confirmation

The enrollment tool intentionally requires a confirmation parameter before creating an enrollment request. This provides a clear trust boundary between information retrieval and an external action.

## Available Courses

SkillPilot currently includes:

* Generative AI for Business
* AI Integration Strategies
* Digital Marketing Mastery
* Web Design & WordPress
* Cybersecurity Fundamentals
* E-Commerce Mastery

Prices and course information are displayed in Nigerian Naira (NGN).

## Testing WebMCP

To inspect the WebMCP tools in a compatible Chrome environment:

1. Open the live SkillPilot website:
   https://itc-skillpilot.netlify.app/

2. Ensure WebMCP testing is enabled in Chrome.

3. Open Chrome DevTools.

4. Open the **Console** tab.

5. Run:

```javascript
await document.modelContext.getTools()
```

The deployed SkillPilot application should expose six registered tools.

You can also inspect an individual tool's schema and metadata from the returned objects.

## Technology Stack

* React
* TypeScript
* Vite
* CSS
* WebMCP
* Netlify
* GitHub

## Project Structure

```text
itc-skillpilot/
├── public/
├── src/
│   ├── assets/
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   ├── main.tsx
│   └── webmcp.ts
├── index.html
├── package.json
├── vite.config.ts
└── README.md
```

## Why WebMCP?

Traditional websites are primarily designed for people to navigate through buttons, forms, menus, and pages.

WebMCP provides a way for websites to expose structured capabilities that AI agents can understand and use.

For SkillPilot, this means an AI assistant can potentially handle requests such as:

* "Find beginner AI courses."
* "Which course fits my budget?"
* "How much would these two courses cost?"
* "Create a learning plan for me."
* "Show me the details of the Digital Marketing course."

Instead of an agent having to interpret the visual interface, the site's capabilities are explicitly exposed as tools.

## Future Improvements

Potential future development includes:

* Connecting enrollment to a production backend
* Integrating payment processing
* Adding learner accounts and progress tracking
* Expanding the course catalogue
* Adding more agent-accessible training services
* Connecting SkillPilot to real-time course availability
* Improving AI-assisted personalized learning recommendations

## License

This project is open source and available under the **MIT License**.

Copyright © 2026 Anthony Oparaji / INFOLINKS TRAINING AND CONSULTANCY LTD
