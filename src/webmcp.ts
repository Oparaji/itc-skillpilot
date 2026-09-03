export type Course = {
  id: number;
  title: string;
  description: string;
  price: number;
  duration: string;
  level: string;
  category: string;
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
  },
  {
    id: 5,
    title: "Cybersecurity Fundamentals",
    description:
      "Understand cybersecurity fundamentals, online safety, threats and protection.",
    price: 50000,
    duration: "6 weeks",
    level: "Beginner",
    category: "Security",
  },
  {
    id: 6,
    title: "E-Commerce Mastery",
    description:
      "Learn how to plan, build and market an online store.",
    price: 50000,
    duration: "6 weeks",
    level: "Beginner",
    category: "Business",
  },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function registerSkillPilotTools() {
  const modelContext =
    (document as any).modelContext ||
    (navigator as any).modelContext;

  if (!modelContext) {
    console.warn(
      "WebMCP is not available in this browser. The SkillPilot UI will still work."
    );
    return;
  }

  const controller = new AbortController();

  modelContext.registerTool(
    {
      name: "find_courses",
      description:
        "Find SkillPilot courses by category, learning level, or keyword.",
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description:
              "Search term such as AI, marketing, web design, cybersecurity, business, beginner, or intermediate.",
          },
        },
      },
      async execute({ query }: { query?: string }) {
        const search = (query || "").toLowerCase().trim();

        const results = courses.filter((course) => {
          if (!search) return true;

          return (
            course.title.toLowerCase().includes(search) ||
            course.description.toLowerCase().includes(search) ||
            course.category.toLowerCase().includes(search) ||
            course.level.toLowerCase().includes(search)
          );
        });

        return {
          content: [
            {
              type: "text",
              text:
                results.length > 0
                  ? results
                      .map(
                        (course) =>
                          `${course.title} | ${course.category} | ${course.level} | ${formatCurrency(course.price)} | ${course.duration}`
                      )
                      .join("\n")
                  : "No matching courses found.",
            },
          ],
        };
      },
    },
    { signal: controller.signal }
  );

  modelContext.registerTool(
    {
      name: "get_course_details",
      description:
        "Get detailed information about a specific SkillPilot course.",
      inputSchema: {
        type: "object",
        properties: {
          courseId: {
            type: "number",
            description: "The ID of the course.",
          },
        },
        required: ["courseId"],
      },
      async execute({ courseId }: { courseId: number }) {
        const course = courses.find((item) => item.id === courseId);

        if (!course) {
          return {
            content: [
              {
                type: "text",
                text: "Course not found.",
              },
            ],
          };
        }

        return {
          content: [
            {
              type: "text",
              text: `${course.title}
Category: ${course.category}
Level: ${course.level}
Duration: ${course.duration}
Price: ${formatCurrency(course.price)}
Description: ${course.description}`,
            },
          ],
        };
      },
    },
    { signal: controller.signal }
  );

  modelContext.registerTool(
    {
      name: "recommend_courses",
      description:
        "Recommend the best SkillPilot courses based on a learner's goal, experience level, and budget.",
      inputSchema: {
        type: "object",
        properties: {
          goal: {
            type: "string",
            description:
              "What the learner wants to achieve.",
          },
          budget: {
            type: "number",
            description:
              "Maximum amount the learner wants to spend in Nigerian Naira.",
          },
          level: {
            type: "string",
            description:
              "Learner experience level, for example beginner or intermediate.",
          },
        },
        required: ["goal"],
      },
      async execute({
        goal,
        budget,
        level,
      }: {
        goal: string;
        budget?: number;
        level?: string;
      }) {
        const text = goal.toLowerCase();

        let results = [...courses];

        if (
          text.includes("ai") ||
          text.includes("artificial intelligence")
        ) {
          results = courses.filter(
            (course) => course.category === "AI"
          );
        } else if (
          text.includes("marketing") ||
          text.includes("online business")
        ) {
          results = courses.filter(
            (course) =>
              course.category === "Marketing" ||
              course.category === "Business" ||
              course.category === "AI"
          );
        } else if (
          text.includes("website") ||
          text.includes("web design") ||
          text.includes("web")
        ) {
          results = courses.filter(
            (course) => course.category === "Technology"
          );
        } else if (
          text.includes("security") ||
          text.includes("cyber")
        ) {
          results = courses.filter(
            (course) => course.category === "Security"
          );
        }

        if (level) {
          const levelResults = results.filter(
            (course) =>
              course.level.toLowerCase() === level.toLowerCase()
          );

          if (levelResults.length > 0) {
            results = levelResults;
          }
        }

        if (budget && budget > 0) {
          const affordable = results.filter(
            (course) => course.price <= budget
          );

          if (affordable.length > 0) {
            results = affordable;
          }
        }

        results = results.slice(0, 3);

        return {
          content: [
            {
              type: "text",
              text:
                results.length > 0
                  ? results
                      .map(
                        (course, index) =>
                          `${index + 1}. ${course.title} — ${formatCurrency(course.price)} — ${course.duration} — ${course.level}`
                      )
                      .join("\n")
                  : "No suitable courses were found for the requested criteria.",
            },
          ],
        };
      },
    },
    { signal: controller.signal }
  );

  modelContext.registerTool(
    {
      name: "calculate_training_cost",
      description:
        "Calculate the total cost of one or more SkillPilot courses.",
      inputSchema: {
        type: "object",
        properties: {
          courseIds: {
            type: "array",
            items: {
              type: "number",
            },
            description: "IDs of the courses to include.",
          },
        },
        required: ["courseIds"],
      },
      async execute({ courseIds }: { courseIds: number[] }) {
        const selected = courses.filter((course) =>
          courseIds.includes(course.id)
        );

        const total = selected.reduce(
          (sum, course) => sum + course.price,
          0
        );

        return {
          content: [
            {
              type: "text",
              text: `Selected courses: ${selected
                .map((course) => course.title)
                .join(", ")}
Total training cost: ${formatCurrency(total)}`,
            },
          ],
        };
      },
    },
    { signal: controller.signal }
  );
  modelContext.registerTool(
    {
      name: "create_learning_plan",
      description:
        "Create a personalized multi-week learning plan based on a learner's goal, budget, and selected courses.",
      inputSchema: {
        type: "object",
        properties: {
          goal: {
            type: "string",
            description: "The learner's main goal.",
          },
          courseIds: {
            type: "array",
            items: {
              type: "number",
            },
            description: "IDs of the courses to include in the learning plan.",
          },
          weeks: {
            type: "number",
            description: "Preferred length of the learning plan in weeks.",
          },
        },
        required: ["goal", "courseIds"],
      },
      async execute({
        goal,
        courseIds,
        weeks = 12,
      }: {
        goal: string;
        courseIds: number[];
        weeks?: number;
      }) {
        const selected = courses.filter((course) =>
          courseIds.includes(course.id)
        );

        if (selected.length === 0) {
          return {
            content: [
              {
                type: "text",
                text: "No valid courses were selected.",
              },
            ],
          };
        }

        const total = selected.reduce(
          (sum, course) => sum + course.price,
          0
        );

        const weeksPerCourse = Math.max(
          1,
          Math.floor(weeks / selected.length)
        );

        const roadmap = selected
          .map(
            (course, index) =>
              `Phase ${index + 1}: ${course.title} — approximately ${weeksPerCourse} weeks`
          )
          .join("\n");

        return {
          content: [
            {
              type: "text",
              text: `PERSONALIZED SKILLPILOT LEARNING PLAN

Goal: ${goal}

Recommended duration: ${weeks} weeks

Learning roadmap:
${roadmap}

Total investment: ${formatCurrency(total)}

Next step: Complete each phase in sequence and review your progress before moving to the next course.`,
            },
          ],
        };
      },
    },
    { signal: controller.signal }
  );
    modelContext.registerTool(
    {
      name: "start_enrollment",
      description:
        "Start a learner's enrollment request for a selected SkillPilot course. Requires explicit confirmation before creating the enrollment request.",
      inputSchema: {
        type: "object",
        properties: {
          courseId: {
            type: "number",
            description: "ID of the course to enroll in.",
          },
          confirm: {
            type: "boolean",
            description:
              "Must be true to create the enrollment request after the learner has reviewed the course and cost.",
          },
        },
        required: ["courseId", "confirm"],
        additionalProperties: false,
      },
      async execute({
        courseId,
        confirm,
      }: {
        courseId: number;
        confirm: boolean;
      }) {
        const course = courses.find((item) => item.id === courseId);

        if (!course) {
          return {
            content: [
              {
                type: "text",
                text: "Course not found. Please provide a valid course ID.",
              },
            ],
          };
        }

        if (!confirm) {
          return {
            content: [
              {
                type: "text",
                text: `Enrollment is not started yet. Please confirm enrollment for "${course.title}" at ${formatCurrency(course.price)}.`,
              },
            ],
          };
        }

        const enrollment = {
          courseId: course.id,
          courseTitle: course.title,
          price: course.price,
          createdAt: new Date().toISOString(),
        };

        localStorage.setItem(
          "skillpilot_last_enrollment",
          JSON.stringify(enrollment)
        );

        window.dispatchEvent(
          new CustomEvent("skillpilot:enrollment", {
            detail: enrollment,
          })
        );

        return {
          content: [
            {
              type: "text",
              text: `Enrollment request started for "${course.title}" at ${formatCurrency(course.price)}. The learner can now complete the enrollment process on the SkillPilot page.`,
            },
          ],
        };
      },
    },
    { signal: controller.signal }
  );
  
  console.log(
    "SkillPilot WebMCP tools registered successfully."
  );

  return controller;
}