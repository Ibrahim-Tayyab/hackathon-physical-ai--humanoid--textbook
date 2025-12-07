import React from 'react';
import { FaRobot, FaCode, FaIndustry, FaLightbulb, FaRocket, FaShieldAlt } from 'react-icons/fa';

const features = [
  {
    icon: <FaRobot className="text-xl" />,
    title: 'End-to-end, not fragmented',
    description:
      'Most resources offer isolated tutorials. This textbook unifies hardware, software, simulation, and AI into a single, coherent mental model.',
  },
  {
    icon: <FaCode className="text-xl" />,
    title: 'Code that actually runs',
    description:
      'Every concept is accompanied by runnable examples, ensuring you move beyond theory to practical application.',
  },
  {
    icon: <FaIndustry className="text-xl" />,
    title: 'Shaped by real robots',
    description:
      'Inspired by the systems behind leading humanoid projects like Tesla Optimus and Figure AI, focusing on deployable skills.',
  },
];

const visionCards = [
    {
        title: 'Embodied Intelligence First',
        copy: 'Robotics teams thrive with hardware feedback loops. Our curriculum mirrors this, pairing concepts with real-world interactions.',
        icon: <FaLightbulb className="text-2xl text-blue-400" />
    },
    {
        title: 'Simulation-Driven Development',
        copy: 'Prove every algorithm in virtual environments like Gazebo, Isaac Sim, and Unity before hardware deployment.',
        icon: <FaRocket className="text-2xl text-cyan-400" />
    },
    {
        title: 'Decision-Oriented Learning',
        copy: 'Each module culminates in a decision brief, guiding you through trade-offs, risks, and measurable outcomes for your projects.',
        icon: <FaShieldAlt className="text-2xl text-purple-400" />
    }
];

export default function NewAboutSection(): JSX.Element {
  return (
    <section className="py-16 md:py-24 bg-dark text-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Section: Why This Textbook Exists */}
          <div>
            <p className="text-sm uppercase tracking-[0.6em] text-primary-400 mb-3">Our Philosophy</p>
            <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
              Empowering the Next Generation of Physical AI Engineers
            </h2>
            <p className="text-lg text-gray-300 mb-6">
              Traditional AI education often stops at theoretical concepts. We go further, delving into the critical aspects of physical AI: torque, latency, friction, failure, and safety.
            </p>
            <p className="text-lg text-gray-300">
              This textbook provides the essential building blocks used in modern robotics labs and cutting-edge startups, transforming motivated students into creators of moving, learning machines.
            </p>

            <div className="mt-12 space-y-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary-700 text-white flex-shrink-0 shadow-md">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{feature.title}</h3>
                    <p className="text-md text-gray-300">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section: Vision Cards */}
          <div>
            <div className="grid gap-8">
                {visionCards.map((card) => (
                    <article
                        key={card.title}
                        className="flex h-full flex-col justify-between rounded-xl border border-gray-700 bg-gray-800/60 p-7 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-secondary-500"
                    >
                        <div className="flex items-center mb-4 gap-4">
                            {card.icon}
                            <h3 className="text-xl font-bold text-white">{card.title}</h3>
                        </div>
                        <p className="mt-2 text-md text-gray-300 leading-relaxed">{card.copy}</p>
                    </article>
                ))}
            </div>

            <div className="mt-10 p-8 rounded-xl bg-gradient-to-br from-primary-900/70 to-secondary-900/50 border border-primary-700 shadow-xl">
                <p className="text-sm uppercase tracking-[0.5em] text-accent-300 mb-2">Impact</p>
                <h3 className="text-2xl font-bold text-white mb-3">From Research to Real-World Deployment</h3>
                <p className="text-md text-gray-300">
                    Our goal is to bridge the gap between academic research and practical applications, providing you with the knowledge and tools to contribute to the next generation of intelligent systems.
                </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
