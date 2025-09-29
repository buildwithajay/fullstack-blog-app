import React from 'react';
import { 
  Users, 
  Target, 
  Award, 
  Globe, 
  TrendingUp, 
  Heart,
  BookOpen,
  Eye,
  Shield,
  Zap
} from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Trust & Accuracy",
      description: "We prioritize factual reporting and verify all information before publication to maintain the highest standards of journalism."
    },
    {
      icon: Eye,
      title: "Transparency",
      description: "Our editorial process is open and accountable. We clearly distinguish between news, analysis, and opinion content."
    },
    {
      icon: Globe,
      title: "Global Perspective",
      description: "We provide comprehensive coverage of local and international news with context and cultural sensitivity."
    },
    {
      icon: Users,
      title: "Community Focus",
      description: "We serve our readers by addressing topics that matter to them and giving voice to diverse perspectives."
    }
  ];

  const team = [
    {
      role: "Editorial Team",
      count: "15+",
      description: "Experienced journalists and editors"
    },
    {
      role: "Content Writers",
      count: "30+",
      description: "Expert contributors across various fields"
    },
    {
      role: "Fact Checkers",
      count: "10+",
      description: "Dedicated verification specialists"
    },
    {
      role: "Tech Team",
      count: "8+",
      description: "Platform development and support"
    }
  ];

  const stats = [
    { number: "500K+", label: "Monthly Readers" },
    { number: "10K+", label: "Published Articles" },
    { number: "50+", label: "Expert Contributors" },
    { number: "15+", label: "News Categories" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50 py-16 px-6 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center bg-red-100 rounded px-3 py-1 mb-6">
            <div className="w-2 h-2 bg-red-600 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-red-700 uppercase tracking-wide">About Us</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
            Your Trusted Source for
            <br />
            <span className="text-red-600">News & Analysis</span>
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            NepalNiti is committed to delivering accurate, unbiased news and in-depth analysis. 
            We believe in the power of informed citizens and the responsibility of journalism to 
            serve the public interest.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-black mb-6">
                Our Mission
              </h2>
              <div className="w-16 h-1 bg-red-600 mb-6"></div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                At NepalNiti, we strive to be the most trusted source of news and information. 
                Our mission is to inform, educate, and empower our readers through comprehensive 
                coverage of politics, technology, business, culture, and global affairs.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We believe that quality journalism is essential for a healthy democracy. 
                Every story we publish undergoes rigorous fact-checking and editorial review 
                to ensure accuracy and fairness.
              </p>
            </div>
            
            <div className="bg-red-600 p-12 text-white">
              <Target className="w-16 h-16 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-lg leading-relaxed">
                To be the leading digital news platform that sets the standard for journalistic 
                integrity, innovation, and public service. We envision a world where quality 
                journalism is accessible to everyone, everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-black py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Our Impact in Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 uppercase tracking-wide text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-black mb-4 text-center">
            Our Core Values
          </h2>
          <div className="w-16 h-1 bg-red-600 mb-12 mx-auto"></div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 border-l-4 border-red-600 hover:shadow-md transition-shadow duration-200">
                <value.icon className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="text-xl font-bold text-black mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-black mb-4 text-center">
            Meet Our Team
          </h2>
          <div className="w-16 h-1 bg-red-600 mb-12 mx-auto"></div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="bg-white border border-gray-200 p-6 text-center hover:border-red-600 transition-colors duration-200">
                <div className="text-4xl font-bold text-red-600 mb-2">
                  {member.count}
                </div>
                <h3 className="text-lg font-bold text-black mb-2">
                  {member.role}
                </h3>
                <p className="text-gray-600 text-sm">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Standards */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-black mb-4 text-center">
            Editorial Standards
          </h2>
          <div className="w-16 h-1 bg-red-600 mb-12 mx-auto"></div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 border-l-4 border-red-600">
              <h3 className="text-xl font-bold text-black mb-3">Accuracy First</h3>
              <p className="text-gray-700">
                We verify all facts before publication and correct any errors promptly and transparently.
              </p>
            </div>
            
            <div className="bg-white p-6 border-l-4 border-gray-300">
              <h3 className="text-xl font-bold text-black mb-3">Independence</h3>
              <p className="text-gray-700">
                Our editorial decisions are made independently, free from commercial or political influence.
              </p>
            </div>
            
            <div className="bg-white p-6 border-l-4 border-gray-300">
              <h3 className="text-xl font-bold text-black mb-3">Fairness & Balance</h3>
              <p className="text-gray-700">
                We present multiple perspectives and give all parties the opportunity to respond.
              </p>
            </div>
            
            <div className="bg-white p-6 border-l-4 border-gray-300">
              <h3 className="text-xl font-bold text-black mb-3">Accountability</h3>
              <p className="text-gray-700">
                We take responsibility for our journalism and welcome feedback from our readers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-6 bg-red-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Get in Touch
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Have a story tip or feedback? We'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-white text-red-600 px-8 py-3 font-semibold text-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Contact Us
            </button>
            <button 
              onClick={() => window.location.href = '/blogs'}
              className="border-2 border-white text-white px-8 py-3 font-semibold text-lg hover:bg-white hover:text-red-600 transition-colors duration-200"
            >
              Read Our Stories
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;