import React from 'react';
import Link from '@docusaurus/Link';
import { FaCogs, FaVrCardboard, FaBrain, FaHandSparkles, FaRobot, FaCode, FaIndustry } from 'react-icons/fa';

const modules = [
  {
    id: 'ros2',
    step: '01',
    title: 'ROS2 & Hardware',
    subtitle: 'The Robotic Nervous System',
    icon: <FaCogs className="text-xl" />,
    description:
      'Learn ROS2 concepts, topics, nodes, and real actuator/sensor interfacing. This is the control backbone of your robot.',
    link: '/docs/Module-1-ROS2/nodes-topics',
    color: 'from-blue-500 to-sky-500',
  },
  {
    id: 'simulation',
    step: '02',
    title: 'Simulation & Digital Twin',
    subtitle: 'The Safe Playground',
    icon: <FaVrCardboard className="text-xl" />,
    description:
      'Create rich simulation environments in Gazebo and Isaac. Prototype behaviours and test edge cases before touching hardware.',
    link: '/docs/Module-2-Simulation/gazebo-physics',
    color: 'from-cyan-500 to-emerald-500',
  },
  {
    id: 'brain',
    step: '03',
    title: 'Navigation & Brain',
    subtitle: 'The Decision Layer',
    icon: <FaBrain className="text-xl" />,
    description:
      'Implement SLAM, path planning, Nav2, and RL. Your robot learns to map, explore, and make decisions.',
    link: '/docs/Module-3-Brain/isaac-sim',
    color: 'from-indigo-500 to-violet-500',
  },
  {
    id: 'vla',
    step: '04',
    title: 'VLA & Cognition',
    subtitle: 'The Language Interface',
    icon: <FaHandSparkles className="text-xl" />,
    description:
      'Combine perception, language, and action into one pipeline. Robots that understand “bring me the blue cup”.',
    link: '/docs/Module-4-VLA/voice-to-action',
    color: 'from-fuchsia-500 to-pink-500',
  },
];

export default function NewCourseOverview(): JSX.Element {
  return (
    <section className="py-16 md:py-24 bg-dark text-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <p className="text-sm uppercase tracking-[0.6em] text-secondary-400 mb-3">Our Curriculum</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-5">
            A Structured Path to Embodied AI Mastery
          </h2>
          <p className="text-lg text-gray-300">
            From foundational robotics to advanced cognitive models, our curriculum is designed to build your skills layer by layer, enabling you to engineer intelligent humanoid systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {modules.map((module) => (
            <div
              key={module.id}
              className="relative group bg-gray-800 border border-gray-700 rounded-xl p-6 flex flex-col items-center text-center shadow-lg transition-all duration-300 hover:border-secondary-500 hover:shadow-xl"
            >
              <div className={`mb-5 w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl bg-gradient-to-br ${module.color} shadow-md group-hover:scale-110 transition-transform`}>
                {module.icon}
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">Step {module.step}</p>
              <h3 className="text-xl font-bold mb-2 text-white">{module.title}</h3>
              <p className="text-sm text-gray-300 mb-4 flex-1">{module.description}</p>
              <Link
                to={module.link}
                className="text-sm font-semibold text-secondary-400 hover:text-secondary-200 transition-colors flex items-center gap-2"
              >
                Explore Module <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center max-w-3xl mx-auto">
          <h3 className="text-3xl font-bold text-white mb-4">Ready for the Capstone?</h3>
          <p className="text-lg text-gray-300 mb-6">
            Integrate all your learnings into a single, comprehensive project: building an autonomous humanoid. This capstone challenges you to apply ROS2, simulation, brain, and VLA cognition in a real-world system.
          </p>
          <Link
            to="/docs/06-Appendices"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-accent-600 to-accent-500 px-8 py-3 font-semibold text-white shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            Discover the Capstone Project
          </Link>
        </div>
      </div>
    </section>
  );
}
