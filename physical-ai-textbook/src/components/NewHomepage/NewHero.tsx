import React from 'react';
import Link from '@docusaurus/Link';

const highlights = [
    'ROS 2 nervous system and middleware orchestration',
    'Physically accurate simulations inside Isaac and Unity',
    'Vision-Language-Action agents that talk to robots',
    'Labs curated by humanoid research teams',
];

const stats = [
    { label: 'Curriculum hours', value: '120+' },
    { label: 'Labs shipped', value: '24' },
    { label: 'Partner institutions', value: '12' },
];

export default function NewHero(): React.JSX.Element {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-dark via-gray-950 to-gray-800 text-white py-24 sm:py-32">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-10 left-1/4 h-56 w-56 rounded-full bg-primary-500/20 blur-3xl" />
                <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-[30%] bg-secondary-500/20 blur-3xl" />
            </div>

            <div className="relative container mx-auto px-6 lg:px-12 z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                    <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
                        <p className="text-sm uppercase tracking-[0.5em] text-primary-300">Physical AI Textbook</p>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                            Sculpting the Future of Embodied Intelligence
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto lg:mx-0">
                            Master ROS 2, advanced simulation, Isaac AI, and cutting-edge Vision-Language-Action models. This immersive curriculum equips you to design, simulate, and deploy intelligent humanoids.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 text-base">
                            <Link
                                to="/docs/Introduction/vision"
                                className="inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-primary-600 to-secondary-500 px-8 py-3 font-semibold text-white shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                Start Your Journey
                            </Link>
                            <Link
                                to="mailto:hello@physical-ai.textbook"
                                className="inline-flex items-center justify-center rounded-full border border-gray-400 px-8 py-3 font-semibold text-gray-200 hover:border-secondary-400 hover:text-secondary-200 transition-colors"
                            >
                                Request Lab Guide
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
                            {stats.map((stat) => (
                                <div key={stat.label} className="rounded-xl border border-gray-700 bg-gray-800/50 p-5 text-center backdrop-blur-sm">
                                    <p className="text-3xl font-extrabold text-primary-400">{stat.value}</p>
                                    <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mt-2">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-1/2 relative p-8 rounded-3xl border border-gray-700 bg-gray-800/60 shadow-2xl backdrop-blur-sm lg:p-10">
                        <p className="text-xs uppercase tracking-[0.4em] text-secondary-400">Studio Preview</p>
                        <h2 className="mt-4 text-3xl font-bold text-white">Phoenix Immersive Lab</h2>
                        <p className="mt-3 text-sm text-gray-300">
                            Experience live code, real-time simulation streaming, and hardware playbacks in a single, intuitive panel. Every lesson provides a reproducible lab template for hands-on learning.
                        </p>

                        <div className="mt-8 space-y-4">
                            {highlights.map((text) => (
                                <div key={text} className="flex items-center gap-3">
                                    <span className="h-2.5 w-2.5 rounded-full bg-secondary-400 flex-shrink-0" />
                                    <p className="text-base text-gray-200">{text}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 flex items-center justify-between rounded-xl border border-primary-600 bg-primary-900/40 px-6 py-4">
                            <div>
                                <p className="text-xs uppercase tracking-[0.3em] text-primary-300">Next Frontier</p>
                                <p className="text-lg font-bold text-white mt-1">Vision-Language-Action</p>
                            </div>
                            <span className="text-xs uppercase tracking-[0.4em] text-green-400 bg-green-900/30 px-3 py-1 rounded-full">Live</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
