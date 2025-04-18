import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Book, Briefcase, Award, MessageSquare, User, Mail, Github, Linkedin, ExternalLink, ChevronRight, ChevronDown, Brain } from 'lucide-react';

// Smooth scrolling navigation
const ScrollLink = ({ to, children, className }) => {
  const handleClick = (e) => {
    e.preventDefault();
    const element = document.getElementById(to);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <a href={`#${to}`} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

// 3D Tilt component for cards
const TiltCard = ({ children, className }) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const tiltX = (y - centerY) / 10;
      const tiltY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    
    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s ease';
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <div ref={cardRef} className={`transition-transform duration-300 ${className}`}>
      {children}
    </div>
  );
};

// Animated skill bar component
const SkillBar = ({ skill, percentage }) => {
  const [width, setWidth] = useState(0);
  const skillRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(percentage), 300);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );
    
    if (skillRef.current) {
      observer.observe(skillRef.current);
    }
    
    return () => {
      if (skillRef.current) {
        observer.unobserve(skillRef.current);
      }
    };
  }, [percentage]);
  
  return (
    <div ref={skillRef} className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="font-medium text-gray-700 dark:text-gray-300">{skill}</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
};

// Project component with hover effect
const ProjectCard = ({ title, description, technologies, image, link }) => {
  return (
    <TiltCard className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
      <div className="relative group overflow-hidden bg-gray-100 dark:bg-gray-900 h-48">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 p-4 w-full transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="text-white text-sm">
            <p className="font-medium">Technologies:</p>
            <p>{technologies}</p>
            {link && (
              <a 
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center text-blue-400 hover:text-blue-300"
              >
                View Project <ExternalLink size={14} className="ml-1" />
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
      </div>
    </TiltCard>
  );
};

// Section transition component
const SectionTransition = ({ children, id, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section 
      ref={sectionRef} 
      id={id}
      className={`py-20 ${className} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700`}
    >
      {children}
    </section>
  );
};

// Main Portfolio Component
const Portfolio = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-gray-800/90 shadow-md backdrop-blur-md py-3' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center">
            <a href="#" className="text-xl font-bold">Muhammad Osama Ghaffar</a>
            <nav className="hidden md:flex space-x-6">
              <ScrollLink to="about" className="hover:text-blue-600 transition-colors">About</ScrollLink>
              <ScrollLink to="education" className="hover:text-blue-600 transition-colors">Education</ScrollLink>
              <ScrollLink to="projects" className="hover:text-blue-600 transition-colors">Projects</ScrollLink>
              <ScrollLink to="experience" className="hover:text-blue-600 transition-colors">Experience</ScrollLink>
              <ScrollLink to="testimonials" className="hover:text-blue-600 transition-colors">Testimonials</ScrollLink>
              <ScrollLink to="contact" className="hover:text-blue-600 transition-colors">Contact</ScrollLink>
            </nav>
            <button className="md:hidden">
              <ChevronDown size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-800 opacity-90"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 h-full w-1/2 bg-white dark:bg-gray-800 clip-path-diagonal"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-white mb-8 md:mb-0">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                Muhammad Osama Ghaffar
              </h1>
              <h2 className="text-xl md:text-2xl mb-6">Software Engineer | AI & Data Science Enthusiast</h2>
              <p className="max-w-md mb-8">
                A passionate Computer Science student with a focus on Artificial Intelligence, 
                Machine Learning, and innovative software solutions.
              </p>
              <div className="flex space-x-4">
                <ScrollLink 
                  to="projects" 
                  className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-md font-medium transition-colors"
                >
                  View Projects
                </ScrollLink>
                <ScrollLink 
                  to="contact" 
                  className="border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Contact Me
                </ScrollLink>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-full border-4 border-white shadow-xl">
                {/* Placeholder for profile image */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-8xl font-bold">
                  <img src="https://media.licdn.com/dms/image/v2/D4D03AQE0G9dLAF9qPw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1730020267662?e=1749081600&v=beta&t=aVcZZxnHIO-0K0Zt08nM5rqFP_faVmOsLMruH7_qInM" alt="OG" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ScrollLink to="about">
            <ChevronDown size={30} className="text-white" />
          </ScrollLink>
        </div>
      </div>

      {/* About Section */}
      <SectionTransition id="about" className="bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-10">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-2/5">
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <User size={30} className="mr-2 text-blue-600" />
                About Me
              </h2>
              <p className="mb-4">
                I'm a dedicated Computer Science student at the National University of Modern Language (NUML) Islamabad, 
                Pakistan, with a strong academic record and a passion for technology.
              </p>
              <p className="mb-4">
                My primary interests lie in Artificial Intelligence, Machine Learning, and Data Science. 
                I enjoy solving complex problems and creating innovative solutions that can make a positive impact.
              </p>
              <p>
                Beyond academics, I actively participate in hackathons, international events
                and share my knowledge through mentoring and teaching. My goal is to become a leading professional 
                in the tech industry, focusing on ethical AI development and innovative software solutions.
              </p>
            </div>
            <div className="md:w-3/5">
              <h3 className="text-xl font-semibold mb-4">Technical Skills</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <SkillBar skill="Python" percentage={95} />
                  <SkillBar skill="Machine Learning" percentage={85} />
                  <SkillBar skill="Data Science" percentage={82} />
                  <SkillBar skill="Django" percentage={80} />
                </div>
                <div>
                  <SkillBar skill="Data Structures & Algorithms" percentage={88} />
                  <SkillBar skill="C/C++" percentage={78} />
                  <SkillBar skill="Web Development" percentage={75} />
                  <SkillBar skill="GitHub & Version Control" percentage={85} />
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Achievements at a Glance</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TiltCard className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <div className="flex items-start">
                      <Award className="text-blue-600 mr-3 mt-1" size={20} />
                      <div>
                        <h4 className="font-semibold">Harvard CS50x</h4>
                        <p className="text-sm">Winner, Puzzle Day '24</p>
                      </div>
                    </div>
                  </TiltCard>
                  <TiltCard className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                    <div className="flex items-start">
                      <Book className="text-purple-600 mr-3 mt-1" size={20} />
                      <div>
                        <h4 className="font-semibold">Stanford Code in Place</h4>
                        <p className="text-sm">Section Leader '24</p>
                      </div>
                    </div>
                  </TiltCard>
                  <TiltCard className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <div className="flex items-start">
                      <Brain className="text-green-600 mr-3 mt-1" size={20} />
                      <div>
                        <h4 className="font-semibold">MITIT Contest</h4>
                        <p className="text-sm">Global Rank: 138/500+ teams</p>
                      </div>
                    </div>
                  </TiltCard>
                  <TiltCard className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                    <div className="flex items-start">
                      <Code className="text-yellow-600 mr-3 mt-1" size={20} />
                      <div>
                        <h4 className="font-semibold">LeetCode</h4>
                        <p className="text-sm">Solved 350+ problems</p>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionTransition>

      {/* Education Section */}
      <SectionTransition id="education" className="bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-10">
          <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center">
            <Book size={30} className="mr-2 text-blue-600" />
            Education & Achievements
          </h2>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200 dark:bg-blue-900"></div>
            
            <div className="grid grid-cols-1 gap-10">
              {/* Education Timeline Item */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-6 h-6 rounded-full bg-blue-600 border-4 border-white dark:border-gray-900"></div>
                <div className="ml-auto mr-auto md:ml-0 md:mr-[calc(50%+2rem)] md:pr-4 md:text-right mb-10 md:mb-0 md:w-[calc(50%-2rem)]">
                  <TiltCard className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-2">Bachelor's Degree in Computer Science</h3>
                    <h4 className="text-blue-600 font-semibold mb-1">National University of Modern Language (NUML)</h4>
                    <p className="text-gray-500 dark:text-gray-400 mb-3">2023 - 2027</p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-md p-2 inline-block">
                      <span className="font-bold">CGPA: 3.97/4.0</span>
                    </div>
                    <p className="mt-4">
                      Currently pursuing a Bachelor's degree with focus on AI, Machine Learning, and Software Development.
                      Consistently maintaining position among top students in the department.
                    </p>
                  </TiltCard>
                </div>
              </div>
              
              {/* Education Timeline Item */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-6 h-6 rounded-full bg-blue-600 border-4 border-white dark:border-gray-900"></div>
                <div className="ml-auto mr-auto md:mr-0 md:ml-[calc(50%+2rem)] md:pl-4 md:text-left mb-10 md:mb-0 md:w-[calc(50%-2rem)]">
                  <TiltCard className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-2">Intermediate (HSSC)</h3>
                    <h4 className="text-blue-600 font-semibold mb-1">Punjab Group of Colleges</h4>
                    <p className="text-gray-500 dark:text-gray-400 mb-3">2021 - 2023</p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-md p-2 inline-block">
                      <span className="font-bold">Grade: A+ (90.2%)</span>
                    </div>
                    <p className="mt-4">
                      Completed intermediate education with distinction in science subjects,
                      particularly excelling in Computer Science and Mathematics.
                    </p>
                  </TiltCard>
                </div>
              </div>
              
              {/* Education Timeline Item */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-6 h-6 rounded-full bg-blue-600 border-4 border-white dark:border-gray-900"></div>
                <div className="ml-auto mr-auto md:ml-0 md:mr-[calc(50%+2rem)] md:pr-4 md:text-right md:w-[calc(50%-2rem)]">
                  <TiltCard className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-2">Matriculation (SSC)</h3>
                    <h4 className="text-blue-600 font-semibold mb-1">The Punjab School System</h4>
                    <p className="text-gray-500 dark:text-gray-400 mb-3">2019 - 2021</p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-md p-2 inline-block">
                      <span className="font-bold">Grade: A+ (99%)</span>
                    </div>
                    <p className="mt-4">
                      Achieved exceptional grades with near-perfect scores in Computer Science,
                      Mathematics, and Physics.
                    </p>
                  </TiltCard>
                </div>
              </div>
            </div>
          </div>
          
          {/* Key Achievements */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold mb-6 text-center">Key Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TiltCard className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="h-2 bg-blue-600"></div>
                <div className="p-6">
                  <h4 className="font-bold text-lg mb-3">Academic Excellence</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ChevronRight size={18} className="text-blue-600 mt-1 flex-shrink-0" />
                      <span>Outstanding CGPA of 3.98/4.0 at NUML</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight size={18} className="text-blue-600 mt-1 flex-shrink-0" />
                      <span>Consistent top performer in Computer Science courses</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight size={18} className="text-blue-600 mt-1 flex-shrink-0" />
                      <span>Special recognition for programming skills</span>
                    </li>
                  </ul>
                </div>
              </TiltCard>
              
              <TiltCard className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="h-2 bg-purple-600"></div>
                <div className="p-6">
                  <h4 className="font-bold text-lg mb-3">Competitions & Hackathons</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ChevronRight size={18} className="text-purple-600 mt-1 flex-shrink-0" />
                      <span>Winner, Harvard CS50x Puzzle Day '24</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight size={18} className="text-purple-600 mt-1 flex-shrink-0" />
                      <span>Team lead at MITIT Contest '25 (138th globally)</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight size={18} className="text-purple-600 mt-1 flex-shrink-0" />
                      <span>Participated in 25+ international events/hackathons</span>
                    </li>
                  </ul>
                </div>
              </TiltCard>
              
              <TiltCard className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="h-2 bg-green-600"></div>
                <div className="p-6">
                  <h4 className="font-bold text-lg mb-3">Leadership & Teaching</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <ChevronRight size={18} className="text-green-600 mt-1 flex-shrink-0" />
                      <span>Section Leader at Stanford Code in Place '24</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight size={18} className="text-green-600 mt-1 flex-shrink-0" />
                      <span>Delivered webinars on Machine Learning & AI</span>
                    </li>
                    <li className="flex items-start">
                      <ChevronRight size={18} className="text-green-600 mt-1 flex-shrink-0" />
                      <span>Mentor for underprivileged students in programming</span>
                    </li>
                  </ul>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </SectionTransition>

      {/* Projects Section */}
      <SectionTransition id="projects" className="bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-10">
          <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center">
            <Code size={30} className="mr-2 text-blue-600" />
            Projects & Research
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProjectCard
              title="Custom GPT"
              description="Developed a customized language model for specific user interactions and tasks."
              technologies="Python, Transformers, NLP, TensorFlow"
              link="https://github.com/OSAMAGHAFFARTKOJL/CustomGpt"
            />
            
            <ProjectCard
              title="Video Transcriber App"
              description="Created an application that converts video audio to text with high accuracy."
              technologies="Python, SpeechRecognition, FFmpeg, Django"
              link="https://github.com/OSAMAGHAFFARTKOJL/VideoTranscribHackathon"
            />
            
            <ProjectCard
              title="Healthcare Assistant App"
              description="Built an app to assist users with health monitoring and give suggestions for first aid."
              technologies="Python, Machine Learning, Flask, REST API"
              link="https://github.com/OSAMAGHAFFARTKOJL/Health"
            />
            
            <ProjectCard
              title="Diabetes Prediction App"
              description="Developed an app that predicts diabetes risk based on user health data."
              technologies="Python, Scikit-learn, Pandas, Data Analysis"
              link="https://github.com/OSAMAGHAFFARTKOJL/Diabetes-prediction"
            />
            
            <ProjectCard
              title="Kitchen Creators"
              description="Application that suggests recipes based on available ingredients in your kitchen."
              technologies="Python, Django, Database Design, API Integration"
              link="https://github.com/OSAMAGHAFFARTKOJL/Kitchen"
            />
            
            <ProjectCard
              title="Intelligent Chatbot"
              description="Designed and implemented an intelligent chatbot for automated customer service."
              technologies="Python, NLP, DialogFlow, Pattern Matching"
              link="https://github.com/OSAMAGHAFFARTKOJL/CHATBOT"
            />
          </div>
          
          <div className="mt-12 text-center">
            <a 
              href="https://github.com/OSAMAGHAFFARTKOJL" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              View All Projects on GitHub <Github size={18} className="ml-2" />
            </a>
          </div>
          
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-6 text-center">Research Interests</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TiltCard className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg">
                <h4 className="font-bold text-xl mb-4 text-blue-700 dark:text-blue-400">Artificial Intelligence & Machine Learning</h4>
                <p className="mb-4">
                  My research focuses on developing advanced machine learning models for real-world applications,
                  particularly in healthcare and education sectors.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ChevronRight size={18} className="text-blue-600 mt-1 flex-shrink-0" />
                    <span>Neural networks for medical diagnosis</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={18} className="text-blue-600 mt-1 flex-shrink-0" />
                    <span>Natural Language Processing for educational content</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={18} className="text-blue-600 mt-1 flex-shrink-0" />
                    <span>Ethical considerations in AI development</span>
                  </li>
                </ul>
              </TiltCard>
              
              <TiltCard className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-lg">
                <h4 className="font-bold text-xl mb-4 text-purple-700 dark:text-purple-400">Data Science & Analytics</h4>
                <p className="mb-4">
                  I explore innovative approaches to data analysis and visualization,
                  aiming to extract meaningful insights from complex datasets.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ChevronRight size={18} className="text-purple-600 mt-1 flex-shrink-0" />
                    <span>Big data analysis techniques for social impact</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={18} className="text-purple-600 mt-1 flex-shrink-0" />
                    <span>Predictive analytics for business intelligence</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={18} className="text-purple-600 mt-1 flex-shrink-0" />
                    <span>Data visualization for complex information</span>
                  </li>
                </ul>
              </TiltCard>
            </div>
          </div>
        </div>
      </SectionTransition>

      {/* Experience Section */}
      <SectionTransition id="experience" className="bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-10">
          <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center">
            <Briefcase size={30} className="mr-2 text-blue-600" />
            Experience & Internships
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TiltCard className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="h-2 bg-blue-600"></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-xl">Machine Learning Intern</h3>
                    <h4 className="text-blue-600 font-medium">TechSolutions Inc.</h4>
                  </div>
                  <span className="text-sm bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 py-1 px-3 rounded-full">
                    Summer 2024
                  </span>
                </div>
                <p className="mb-4">
                  Worked on developing and implementing machine learning models for predictive analytics
                  and data processing pipelines.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ChevronRight size={18} className="text-blue-600 mt-1 flex-shrink-0" />
                    <span>Developed a customer churn prediction model with 89% accuracy</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={18} className="text-blue-600 mt-1 flex-shrink-0" />
                    <span>Optimized data processing pipelines reducing execution time by 40%</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={18} className="text-blue-600 mt-1 flex-shrink-0" />
                    <span>Contributed to the team's research on AutoML solutions</span>
                  </li>
                </ul>
              </div>
            </TiltCard>
            
            <TiltCard className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="h-2 bg-purple-600"></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-xl">Research Assistant</h3>
                    <h4 className="text-purple-600 font-medium">AI Lab, NUML University</h4>
                  </div>
                  <span className="text-sm bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 py-1 px-3 rounded-full">
                    2023 - Present
                  </span>
                </div>
                <p className="mb-4">
                  Assisting faculty with research projects in artificial intelligence and
                  machine learning applications.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ChevronRight size={18} className="text-purple-600 mt-1 flex-shrink-0" />
                    <span>Collected and prepared datasets for computer vision research</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={18} className="text-purple-600 mt-1 flex-shrink-0" />
                    <span>Implemented neural networks for image classification tasks</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={18} className="text-purple-600 mt-1 flex-shrink-0" />
                    <span>Co-authored a research paper on neural style transfer techniques</span>
                  </li>
                </ul>
              </div>
            </TiltCard>
            
            <TiltCard className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="h-2 bg-green-600"></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-xl">Teaching Assistant</h3>
                    <h4 className="text-green-600 font-medium">Department of Computer Science, NUML</h4>
                  </div>
                  <span className="text-sm bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 py-1 px-3 rounded-full">
                    Fall 2023
                  </span>
                </div>
                <p className="mb-4">
                  Assisted professors in teaching programming fundamentals and data structures
                  to undergraduate students.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ChevronRight size={18} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Led tutorial sessions and practical labs for 40+ students</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={18} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Developed supplementary learning materials and coding exercises</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={18} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Organized coding competitions to enhance student engagement</span>
                  </li>
                </ul>
              </div>
            </TiltCard>
            
            <TiltCard className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="h-2 bg-yellow-600"></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-xl">Open Source Contributor</h3>
                    <h4 className="text-yellow-600 font-medium">Various Python Projects</h4>
                  </div>
                  <span className="text-sm bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200 py-1 px-3 rounded-full">
                    2022 - Present
                  </span>
                </div>
                <p className="mb-4">
                  Actively contributing to open source Python libraries and frameworks,
                  focusing on machine learning and data science tools.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ChevronRight size={18} className="text-yellow-600 mt-1 flex-shrink-0" />
                    <span>Contributed to scikit-learn documentation improvements</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={18} className="text-yellow-600 mt-1 flex-shrink-0" />
                    <span>Fixed bugs in popular data visualization libraries</span>
                  </li>
                  <li className="flex items-start">
                    <ChevronRight size={18} className="text-yellow-600 mt-1 flex-shrink-0" />
                    <span>Developed extensions for existing ML frameworks</span>
                  </li>
                </ul>
              </div>
            </TiltCard>
          </div>
        </div>
      </SectionTransition>

      {/* Testimonials Section */}
      <SectionTransition id="testimonials" className="bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4 md:px-10">
          <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center">
            <MessageSquare size={30} className="mr-2 text-blue-600" />
            Testimonials
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TiltCard className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <div className="mb-4">
                <div className="flex text-yellow-400">
                  {Array(5).fill(0).map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="italic mb-4">
                "Osama was an exceptional instructor in the Code in Place program. His ability to make complex programming topics accessible and his infectious enthusiasm created a supportive, collaborative learning environment that allowed me and my classmates to thrive.
                 Osama went above and beyond to support us, making himself available for additional guidance and fostering a strong sense of community. His passion, expertise, and dedication to student success make him a truly invaluable asset, 
                 and I recommend him without hesitation."
              </p>
              <div className="mt-4">
                <h4 className="font-semibold">Maryam A. Alamer</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Code In Place Participant</p>
              </div>
            </TiltCard>
            
            <TiltCard className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <div className="mb-4">
                <div className="flex text-yellow-400">
                  {Array(5).fill(0).map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="italic mb-4">
                "I worked with Osama in Hackathon competition for creating a creative website. Osama is one of the hardworking members in the group. His remarkable work on developing an AI integration was intelligent. Thank you Osama for joining the team and I wish you all the best "
              </p>
              <div className="mt-4">
                <h4 className="font-semibold">Taif Almamari</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Development Mechanical Engineer 3D/2D designer & modeling </p>
              </div>
            </TiltCard>
            
            <TiltCard className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <div className="mb-4">
                <div className="flex text-yellow-400">
                  {Array(5).fill(0).map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="italic mb-4">
                "I had the pleasure of working with Osama Ghaffar during the recent lablab.ai hackathon. His exceptional backend development skills, strong work ethic, and collaborative spirit significantly contributed to our project's success. Osama's ability to quickly grasp complex requirements and implement solutions was impressive. I highly recommend him for any future opportunities.                "
              </p>
              <div className="mt-4">
                <h4 className="font-semibold">Reema Memon</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Telecom Engineer'23 | Huawei SFTF'23 @ Qatar</p>
              </div>
            </TiltCard>
          </div>
        </div>
      </SectionTransition>

      {/* Contact Section */}
      <SectionTransition id="contact" className="bg-gradient-to-br from-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 md:px-10">
          <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center">
            <Mail size={30} className="mr-2" />
            Get In Touch
          </h2>
          
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="lg:w-1/2">
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <p className="mb-6">
                Feel free to reach out for collaborations, opportunities, or just to say hello!
                I'm always interested in new projects and connections.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="mr-3 text-blue-300" size={20} />
                  <span>osamaghaffar.og@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <User className="mr-3 text-blue-300" size={20} />
                  <span>NUML, Islamabad, Pakistan</span>
                </div>
                <div className="flex items-center">
                  <Github className="mr-3 text-blue-300" size={20} />
                  <a 
                    href="https://github.com/OSAMAGHAFFARTKOJL" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-300 transition-colors"
                  >
                    github.com/OSAMAGHAFFARTKOJL
                  </a>
                </div>
                <div className="flex items-center">
                  <Linkedin className="mr-3 text-blue-300" size={20} />
                  <a 
                    href="https://linkedin.com/in/muhammad-osama-ghaffar" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-300 transition-colors"
                  >
                    linkedin.com/in/muhammad-osama-ghaffar
                  </a>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block mb-1 font-medium">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block mb-1 font-medium">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-1 font-medium">Message</label>
                  <textarea 
                    id="message" 
                    rows="4" 
                    className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="px-6 py-3 bg-white text-blue-700 hover:bg-blue-50 rounded-md font-medium transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </SectionTransition>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">Muhammad Osama Ghaffar</h3>
              <p className="text-gray-400">Computer Science Student & Developer</p>
            </div>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/OSAMAGHAFFARTKOJL" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
              <a 
                href="https://linkedin.com/in/muhammad-osama-ghaffar" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:osamaghaffar.og@gmail.com" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
          <div className="mt-6 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Muhammad Osama Ghaffar. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;