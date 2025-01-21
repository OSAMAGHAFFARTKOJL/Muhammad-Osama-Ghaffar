import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, LineChart, Line, XAxis, YAxis, CartesianGrid, Bar } from 'recharts';
import { Brain, Code, Terminal, Github, Linkedin, Mail, Award, Rocket, Book, ChevronRight } from 'lucide-react';

// Typing animation component
const TypingAnimation = () => {
  const [text, setText] = useState('');
  const fullText = "Python Developer | AI & ML Enthusiast | 86 WPM";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setText(prev => prev + fullText[index]);
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return <div className="font-mono text-xl">{text}</div>;
};

// Project card component
const ProjectCard = ({ title, description, link }) => (
  <Card className="h-full transform transition-transform hover:scale-105">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Code size={20} />
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
      <a 
        href={link} 
        className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
        target="_blank" 
        rel="noopener noreferrer"
      >
        View Project <ChevronRight size={16} />
      </a>
    </CardContent>
  </Card>
);

// Skills chart data
const skillsData = [
  { name: 'Python', value: 90 },
  { name: 'ML/AI', value: 85 },
  { name: 'Django', value: 80 },
  { name: 'DSA', value: 75 },
  { name: 'Web Dev', value: 70 },
];

// Main portfolio component
const Portfolio = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center space-y-6">
          <h1 className="text-5xl font-bold mb-4">Muhammad Osama Ghaffar</h1>
          <TypingAnimation />
          <div className="flex justify-center space-x-4 mt-8">
            <a href="https://github.com/OSAMAGHAFFARTKOJL" className="p-2 hover:text-blue-300">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/osama-ghaffar/" className="p-2 hover:text-blue-300">
              <Linkedin size={24} />
            </a>
            <a href="mailto:dev.osamaghaffar@gmail.com" className="p-2 hover:text-blue-300">
              <Mail size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Honors & Awards</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award size={24} />
                  Harvard CS50x Winner
                </CardTitle>
              </CardHeader>
              <CardContent>
                Puzzle Day '24 Champion
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900 dark:to-red-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book size={24} />
                  Stanford Section Leader
                </CardTitle>
              </CardHeader>
              <CardContent>
                Code in Place '24
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket size={24} />
                  MITIT Contest
                </CardTitle>
              </CardHeader>
              <CardContent>
                Global Rank: 138th out of 500+ teams
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-6 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Technical Skills</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Programming & Development</CardTitle>
              </CardHeader>
              <CardContent>
                <BarChart width={400} height={300} data={skillsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="value" fill="#3B82F6" />
                </BarChart>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Typing Speed Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart width={400} height={300}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Line 
                    type="monotone" 
                    data={[
                      { month: 'Jan', wpm: 65 },
                      { month: 'Feb', wpm: 70 },
                      { month: 'Mar', wpm: 75 },
                      { month: 'Apr', wpm: 78 }
                    ]} 
                    dataKey="wpm" 
                    stroke="#3B82F6" 
                  />
                </LineChart>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard 
              title="Custom GPT"
              description="A customized language model for specific user interactions and tasks."
              link="https://github.com/OSAMAGHAFFARTKOJL/CustomGpt"
            />
            <ProjectCard 
              title="Video Transcriber"
              description="Application that converts video audio to text with high accuracy."
              link="https://github.com/OSAMAGHAFFARTKOJL/VideoTranscribHackathon"
            />
            <ProjectCard 
              title="Healthcare Assistant"
              description="AI-powered app for health monitoring and first aid suggestions."
              link="https://github.com/OSAMAGHAFFARTKOJL/Health"
            />
            <ProjectCard 
              title="Diabetes Prediction"
              description="ML model that predicts diabetes risk based on health data."
              link="https://github.com/OSAMAGHAFFARTKOJL/Diabetes-prediction"
            />
            <ProjectCard 
              title="Kitchen Creators"
              description="Recipe suggestion app based on available ingredients."
              link="https://github.com/OSAMAGHAFFARTKOJL/Kitchen"
            />
            <ProjectCard 
              title="CHATBOT"
              description="Intelligent chatbot for automated customer service."
              link="https://github.com/OSAMAGHAFFARTKOJL/CHATBOT"
            />
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20 px-6 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Education</h2>
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Bachelor's in Computer Science</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">National University of Modern Language (NUML) Islamabad</p>
                <p>2023-2027</p>
                <p className="text-blue-600">CGPA: 3.99/4.0</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Intermediate (HSSC)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">Punjab Group of Colleges Faisalabad</p>
                <p>2021-2023</p>
                <p className="text-blue-600">Grade: A+ (90.2%)</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-800 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="https://github.com/OSAMAGHAFFARTKOJL" className="hover:text-blue-400">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/osama-ghaffar/" className="hover:text-blue-400">
              <Linkedin size={24} />
            </a>
            <a href="mailto:dev.osamaghaffar@gmail.com" className="hover:text-blue-400">
              <Mail size={24} />
            </a>
          </div>
          <p>© 2024 Muhammad Osama Ghaffar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;