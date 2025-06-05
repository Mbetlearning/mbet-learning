export async function GET(req, { params }) {
  const { id } = params;

  const courseMap = {
    'web-development': {
      title: "Full Stack Web Development",
      description: "Learn HTML, CSS, JS, React, Node.js",
      instructor: "John Doe",
      duration: 40,
      level: "Beginner to Advanced",
      topics: [
        "HTML & CSS",
        "JavaScript Basics",
        "React & Hooks",
        "Node.js & Express",
        "MongoDB",
        "Deployment",
      ],
      videos: [
        {
          title: "HTML Introduction", 
          videoUrl: "https://s3.ap-southeast-1.wasabisys.com/mbet-course-videos/html.mp4",
          pdfUrl: "https://s3.ap-southeast-1.wasabisys.com/mbet-course-videos/htmlpdf",
        },
        // {
        //   title: "CSS Basics",
        //   videoUrl: "https://s3.ap-southeast-1.wasabisys.com/mbet-course-videos/css.mp4",
        //   pdfUrl: "https://s3.ap-southeast-1.wasabisys.com/mbet-course-videos/css-guide.pdf",
        // }
      ]
    }
    // You can add 'python-development' and 'java-development' here
  };

  const course = courseMap[id];

  if (!course) {
    return new Response(JSON.stringify({ error: "Course not found" }), { status: 404 });
  }

  return new Response(JSON.stringify(course), {
    headers: { "Content-Type": "application/json" },
  });
}
