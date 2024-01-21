export const initialBasicDetails = {
  name: "Don Joe",
  profilePicture: "https://example.com/profile-picture.jpg",
  currentJobTitle: "Software Engineer",
  email: "john.doe@example.com",
  website: "https://johndoe.com",
  phoneNumber: "123-456-7890",
  location: "Cityville, USA",
  yearsOfExperience: "5",
  totalExperience: "8",
};
export const initialEducationDetails = {
  institute: "University of Example",
  degree: "Bachelor of Science",
  startDate: "09/2018",
  endDate: "09/2018",
  grade: "A",
};

export const initialEducationList = [
  {
    institute: "University of Example",
    degree: "Bachelor of Science",
    startDate: "09/2018",
    endDate: "09/2018",
    grade: "A",
  },
  {
    institute: "University of Example",
    degree: "Bachelor of Science",
    startDate: "09/2018",
    endDate: "09/2018",
    grade: "A",
  },
];

export const initialSelectedLanguages = ["JavaScript", "Python"];

export const initialAwardList = [
  {
    name: "Outstanding Performer",
    year: "2022",
    shortDescription: "Recognized for exceptional performance and dedication.",
  },
  {
    name: "Outstanding Performer",
    year: "2022",
    shortDescription: "Recognized for exceptional performance and dedication.",
  },
];

export const initialAward = {
  name: "Outstanding Performer",
  year: "2022",
  shortDescription: "Recognized for exceptional performance and dedication.",
};

export const initialExperience = {
  organisation: "TechCo Inc.",
  title: "Sr. Software Engineer",
  startDate: "01/2017",
  endDate: "Present",
  description: `Excels in full-stack development, leveraging JavaScript and Python to drive innovation. Spearheaded projects, receiving accolades for outstanding contributions and leadership. 
      
    Excels in full-stack development, leveraging JavaScript and Python to drive innovation. Spearheaded projects, receiving accolades for outstanding contributions and leadership.
    
Excels in full-stack development, leveraging JavaScript and Python to drive innovation.
    `,
};

export const initialExperienceList = [
  {
    organisation: "TechCo Inc.",
    title: "Sr. Software Engineer",
    startDate: "01/2017",
    endDate: "Present",
    description: `Excels in full-stack development, leveraging JavaScript and Python to drive innovation. Spearheaded projects, receiving accolades for outstanding contributions and leadership. 
      
    Excels in full-stack development, leveraging JavaScript and Python to drive innovation. Spearheaded projects, receiving accolades for outstanding contributions and leadership.
    
Excels in full-stack development, leveraging JavaScript and Python to drive innovation.
    `,
  },
  {
    organisation: "TechCo Inc.",
    title: "Sr. Software Engineer",
    startDate: "01/2017",
    endDate: "Present",
    description: `Excels in full-stack development, leveraging JavaScript and Python to drive innovation. Spearheaded projects, receiving accolades for outstanding contributions and leadership. 
      
    Excels in full-stack development, leveraging JavaScript and Python to drive innovation. Spearheaded projects, receiving accolades for outstanding contributions and leadership.
    
Excels in full-stack development, leveraging JavaScript and Python to drive innovation.
    `,
  },
];

export const initialResumeName = "My resume";
export const initialProject = {
  name: "E-commerce Platform",
  startDate: "2022-01-15",
  endDate: "2022-03-10",
  description:
    "Led the development of a comprehensive e-commerce platform that revolutionized online retail. Implemented advanced features, including a dynamic product catalog, user-friendly shopping cart, and secure payment gateways.",
  link: "https://example.com/ecommerce",
};
export const initialProjectList = [
  {
    name: "E-commerce Platform",
    startDate: "2022-01-15",
    endDate: "2022-03-10",
    description:
      "Led the development of a comprehensive e-commerce platform that revolutionized online retail. Implemented advanced features, including a dynamic product catalog, user-friendly shopping cart, and secure payment gateways.",
    link: "https://example.com/ecommerce",
  },
  {
    name: "E-commerce Platform",
    startDate: "2022-01-15",
    endDate: "2022-03-10",
    description:
      "Led the development of a comprehensive e-commerce platform that revolutionized online retail. Implemented advanced features, including a dynamic product catalog, user-friendly shopping cart, and secure payment gateways.",
    link: "https://example.com/ecommerce",
  },
];

export const initialResumeState = {
  name: initialResumeName,
  basicDetails: initialBasicDetails,
  educationDetails: initialEducationDetails,
  educationList: initialEducationList,
  selectedLanguages: initialSelectedLanguages,
  selectedTools: ["Git", "VS Code"],
  selectedFrameworks: initialSelectedLanguages,
  awardDetails: initialAward,
  awardList: initialAwardList,
  experienceDetails: initialExperience,
  experienceList: initialExperienceList,
  projectDetails: initialProject,
  projectList: initialProjectList,
};
