// Portfolio interactions and project modals
document.addEventListener("DOMContentLoaded", () => {
  // Navigation Menu Toggle
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  navLinks?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
      menuToggle?.setAttribute("aria-label", "Open navigation");
    });
  });

  // Project Category Filters
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      projectCards.forEach((card) => {
        if (filter === "all") {
          card.hidden = false;
        } else {
          card.hidden = card.dataset.category !== filter;
        }
      });
    });
  });

  // Project Specifications & Case Studies Data
  const projectInfo = {
    careerbridge: {
      title: "CareerBridge – Student Skill Gap & Career Readiness System",
      status: "Academic Project • Python & SQLite Web System",
      problem: "College students often encounter difficulty mapping their current academic and technical competencies against the specific requirements of target industry roles, leading to unclear learning paths.",
      approach: [
        "Architected an end-to-end Python web application facilitating secure student registration, authentication, and profile management.",
        "Built a structured skills inventory enabling users to catalog their programming, analytical, and technical abilities.",
        "Engineered a career selection and benchmark matrix using an SQLite database schema to store target role requirements.",
        "Implemented a data-driven gap analysis algorithm calculating percentage readiness and highlighting exact missing skills.",
        "Generated personalized, actionable career-readiness insights and prioritized academic recommendations for learners."
      ],
      stack: "Python, SQLite, Web Application Architecture, Skill-Gap Analytics, Data Modeling, HTML/CSS.",
      deliverables: "Comprehensive multi-module web application with student profile management, role benchmarking, and real-time gap analysis reporting."
    },
    cars24: {
      title: "Business Analytics Dashboard (Cars24 Dataset)",
      status: "Completed Analytics Project • May 2026",
      problem: "Automotive dealerships and buyers require data-driven clarity into pre-owned car pricing drivers, depreciation curves, and resale factors across various car brands and fuel categories.",
      approach: [
        "Acquired and audited a real-world Cars24 dataset comprising over 15,000 vehicle transactions.",
        "Performed rigorous data cleaning, handling missing values, standardizing categorical columns, and parsing numerical units in Excel and Python.",
        "Conducted Exploratory Data Analysis (EDA) using Python (Pandas, NumPy) to evaluate distributions, outliers, and feature correlations.",
        "Engineered key derived metrics including age depreciation rates, mileage price sensitivity, and fuel-type price premiums.",
        "Designed and published an interactive Power BI dashboard featuring dynamic KPI scorecards, interactive slicers, price vs. age heatmaps, and executive summary charts."
      ],
      stack: "Power BI, Microsoft Excel, Python, Pandas, NumPy, Exploratory Data Analysis (EDA), Data Preprocessing.",
      deliverables: "Fully interactive Power BI dashboard report delivering executive decision support for vehicle valuation and market trends."
    },
    excellibrary: {
      title: "Excel Formula & AI Prompt Library",
      status: "R&D Internship Initiative • ECH Business Solutions (June – Aug 2026)",
      problem: "Learners and corporate professionals often face friction finding trusted, categorized references for advanced spreadsheet formulas and actionable generative AI prompts for analytics workflows.",
      approach: [
        "Researched key technical training requirements in data analytics, spreadsheet modeling, and AI productivity tools.",
        "Created an organized Excel Formula Library covering complex lookup functions (XLOOKUP, INDEX/MATCH), statistical functions, dynamic arrays, and conditional aggregations.",
        "Developed a targeted AI Prompt Library structured for data cleaning, Python query generation, SQL formulation, and analytical reporting.",
        "Authored accompanying assignments, structured learning resources, and thorough technical documentation for LMS-based (Graphy) course delivery.",
        "Created promotional visual thumbnails and co-facilitated hands-on workshops and an 'AI in Excel' interactive webinar."
      ],
      stack: "Advanced Excel, Generative AI Prompting, Graphy LMS Platform, Technical Writing, LinkedIn Optimization, Webinar Delivery.",
      deliverables: "Comprehensive formula reference bank, generative AI prompt catalog, structured LMS learning modules, and webinar delivery."
    }
  };

  // Modal Dialog Logic
  const projectDialog = document.getElementById("projectDialog");
  const dialogTitle = document.getElementById("dialogTitle");
  const dialogContent = document.getElementById("dialogContent");
  const dialogClose = document.getElementById("dialogClose");
  const dialogDone = document.getElementById("dialogDone");

  const closeDialog = () => {
    if (projectDialog?.open) {
      projectDialog.close();
    }
  };

  document.querySelectorAll(".project-details-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const projectKey = button.dataset.project;
      const project = projectInfo[projectKey];
      if (!project || !projectDialog || !dialogTitle || !dialogContent) return;

      dialogTitle.textContent = project.title;
      dialogContent.replaceChildren();

      // Status Tag
      const statusPill = document.createElement("div");
      statusPill.className = "dialog-status-pill";
      statusPill.textContent = project.status;
      dialogContent.append(statusPill);

      // Sections
      const sections = [
        { title: "Business Challenge & Objective", content: project.problem, isList: false },
        { title: "Key Implementation & Methodology", content: project.approach, isList: true },
        { title: "Tools & Technologies Used", content: project.stack, isList: false },
        { title: "Key Deliverables & Outcomes", content: project.deliverables, isList: false }
      ];

      sections.forEach((sec) => {
        const h3 = document.createElement("h3");
        h3.className = "dialog-section-heading";
        h3.textContent = sec.title;
        dialogContent.append(h3);

        if (sec.isList && Array.isArray(sec.content)) {
          const ul = document.createElement("ul");
          ul.className = "dialog-list";
          sec.content.forEach((item) => {
            const li = document.createElement("li");
            li.textContent = item;
            ul.append(li);
          });
          dialogContent.append(ul);
        } else {
          const p = document.createElement("p");
          p.className = "dialog-text";
          p.textContent = sec.content;
          dialogContent.append(p);
        }
      });

      projectDialog.showModal();
    });
  });

  dialogClose?.addEventListener("click", closeDialog);
  dialogDone?.addEventListener("click", closeDialog);
  projectDialog?.addEventListener("click", (event) => {
    if (event.target === projectDialog) closeDialog();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDialog();
  });

  // Copy to Clipboard Helpers
  function setupCopyButton(btnId, textToCopy) {
    const btn = document.getElementById(btnId);
    if (!btn) return;

    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(textToCopy);
        const originalHtml = btn.innerHTML;
        btn.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span class="copy-text">Copied!</span>
        `;
        btn.classList.add("copied");
        setTimeout(() => {
          btn.innerHTML = originalHtml;
          btn.classList.remove("copied");
        }, 2200);
      } catch (err) {
        console.error("Clipboard copy failed:", err);
      }
    });
  }

  setupCopyButton("copyEmailBtn", "mahakshivhare12@gmail.com");
  setupCopyButton("copyPhoneBtn", "+917522889119");

  // Dynamic Year in Footer
  const yearElem = document.getElementById("year");
  if (yearElem) {
    yearElem.textContent = new Date().getFullYear();
  }
});
