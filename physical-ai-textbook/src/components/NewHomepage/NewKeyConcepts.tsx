import React from 'react';
import { FaMicrochip, FaCode, FaRobot, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const applicationFields = [
    {
        icon: <FaMicrochip />,
        title: 'Hardware Engineering',
        description: 'From PCB design and sensor integration to advanced actuator control systems.',
        color: 'text-blue-500'
    },
    {
        icon: <FaCode />,
        title: 'Software & AI Development',
        description: 'Master ROS2 middleware, cutting-edge computer vision, and large language model (LLM) integration.',
        color: 'text-green-500'
    },
    {
        icon: <FaRobot />,
        title: 'Robotics Research',
        description: 'Explore Sim2Real transfer techniques, advanced kinematics, and embodied cognition strategies.',
        color: 'text-purple-500'
    },
];

const advantages = [
    "Comprehensive Full-Stack Curriculum",
    "Hands-on Projects with Real Hardware",
    "Cutting-edge VLA & LLM Integration",
    "Industry-Standard Tools (ROS2, Isaac Sim)",
    "Future-Proof Skillset"
];

const challenges = [
    "Steep Learning Curve for Beginners",
    "Hardware Costs Required for Full Experience",
    "Complex Software Dependencies",
    "Rapidly Evolving Field (Requires Constant Updates)"
];

export default function NewKeyConcepts(): JSX.Element {
    return (
        <section className="py-16 md:py-24 bg-dark text-white">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <p className="text-sm uppercase tracking-[0.6em] text-accent-400 mb-3">Core Impact</p>
                    <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-5">
                        Bridging Theory and Practical Robotics
                    </h2>
                    <p className="text-lg text-gray-300">
                        Our curriculum prepares you for diverse roles in the rapidly evolving field of Physical AI, addressing both its promises and challenges.
                    </p>
                </div>

                {/* Fields of Application */}
                <div className="mb-20">
                    <h3 className="text-3xl font-bold text-center mb-10 text-white">Fields of Application</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {applicationFields.map((field, i) => (
                            <div
                                key={i}
                                className="bg-gray-800 border border-gray-700 rounded-xl p-7 text-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-accent-500"
                            >
                                <div className={`mb-5 w-14 h-14 rounded-full bg-gray-700 flex items-center justify-center mx-auto text-3xl ${field.color}`}>
                                    {field.icon}
                                </div>
                                <h4 className="text-xl font-bold mb-2 text-white">{field.title}</h4>
                                <p className="text-md text-gray-400">{field.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pros & Cons Analysis */}
                <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Advantages */}
                    <div className="bg-gray-800 border border-green-700 rounded-xl p-8 shadow-lg">
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-green-400">
                            <FaCheckCircle className="text-3xl" /> Advantages
                        </h3>
                        <ul className="space-y-4">
                            {advantages.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-200">
                                    <span className="mt-1 w-2.5 h-2.5 rounded-full bg-green-500 flex-shrink-0" />
                                    <p className="text-md">{item}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Disadvantages / Challenges */}
                    <div className="bg-gray-800 border border-red-700 rounded-xl p-8 shadow-lg">
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-red-400">
                            <FaTimesCircle className="text-3xl" /> Challenges
                        </h3>
                        <ul className="space-y-4">
                            {challenges.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-200">
                                    <span className="mt-1 w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0" />
                                    <p className="text-md">{item}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
