import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import styles from './index.module.css';

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  const modules = [
    {
      title: 'Module 1: ROS 2 Foundations',
      description: 'Learn ROS 2 — the nervous system of modern robots. Build nodes, topics, services, actions, publishers, subscribers, QoS, and real robot workflows.',
      link: '/docs/Module-1-ROS2/nodes-topics',
    },
    {
      title: 'Module 2: Simulation & Digital Twins',
      description: 'Master simulation systems: Gazebo, Unity Robotics, Isaac Sim, and digital twin workflows for learning and testing robots safely.',
      link: '/docs/Module-2-Simulation/gazebo-physics',
    },
    {
      title: 'Module 3: Hardware & Intelligence',
      description: 'Motors, actuators, torque control, IMUs, sensors, microcontrollers, embedded systems — everything real humanoids need.',
      link: '/docs/Module-3-Brain/isaac-sim',
    },
    {
      title: 'Module 4: VLA — Vision, Language, Action',
      description: 'Learn the most advanced robotics architecture: perception models, LLM-driven command systems, task planners, and advanced AI-driven movement.',
      link: '/docs/Module-4-VLA/voice-to-action',
    },
    {
      title: 'Module 5: Advanced AI & Motion Control',
      description: 'Reinforcement learning, motion planning, MPC, trajectory optimization, and how robots learn intelligent, adaptable intelligence.',
      link: '/docs/Module-5-Humanoid-Design/kinematics-locomotion',
    },
    {
      title: 'Module 6: Designing Humanoid Robots',
      description: 'Learn end-to-end humanoid creation: mechanical design, kinematics, actuators, control systems, and AI-driven movement.',
      link: '/docs/Module-6-Advanced-Control/reinforcement-learning',
    },
  ];

  const features = [
    {
      title: 'AI-Driven Design',
      description: 'Built fully around modern LLMs, AI agents, RAG systems, and multimodal reasoning — not just classical algorithms.',
    },
    {
      title: 'Hands-On Learning',
      description: 'Every module includes practical labs, projects, simulators, and real-world applications — not just pure theory.',
    },
    {
      title: 'Industry-Inspired Curriculum',
      description: 'Curriculum reflects real-world demands: Figure AI, Agility, and company\'s AI-focused humanoid robotics roadmaps.',
    },
  ];

  return (
    <Layout
      title="Physical AI & Humanoid Robotics Textbook"
      description="A complete and practical learning system for humanoid robotics, ROS 2, and advanced AI"
    >
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>Physical AI & Humanoid Robotics Textbook</h1>
          <p className={styles.heroDescription}>
            A complete and practical learning system where you master the future: humanoid robotics,
            ROS 2, large action models, simulation, VLA systems, hardware, and advanced AI for
            next-generation intelligent machines.
          </p>
          <Link to="/docs/Introduction/vision" className={styles.ctaButton}>
            Start Reading →
          </Link>
        </div>
      </section>

      {/* What This Textbook Covers */}
      <section className={styles.contentSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>What This Textbook Covers</h2>
          <p className={styles.sectionDescription}>
            This is a complete AI-native engineering curriculum designed for physical AI, humanoid robots,
            embodied intelligence, ROS 2 programming, digital twin simulations, and Vision-Language-Action
            (VLA) systems. Each module builds your robotics superpowers step by step.
          </p>
        </div>
      </section>

      {/* Modules Section */}
      <section className={styles.modulesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitleCenter}>Explore All Modules</h2>
          <div className={styles.modulesGrid}>
            {modules.map((module, index) => (
              <div key={index} className={styles.moduleCard}>
                <h3 className={styles.moduleCardTitle}>{module.title}</h3>
                <p className={styles.moduleDescription}>{module.description}</p>
                <Link to={module.link} className={styles.moduleButton}>
                  Open Module →
                </Link>
              </div>
            ))}

            {/* Appendix Card */}
            <div className={`${styles.moduleCard} ${styles.appendixCard}`}>
              <h3 className={styles.moduleCardTitle}>Appendix</h3>
              <p className={styles.moduleDescription}>
                Glossary, research papers, references, external resources, and further reading for
                mastering robotics and AI.
              </p>
              <Link to="/docs/Appendices/lab-setup-guide" className={styles.moduleButton}>
                Open Appendix →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Textbook Section */}
      <section className={styles.whySection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitleCenter}>Why This Textbook is AI-Native & Future-Focused</h2>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureText}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>Begin Your Robotics Journey</h2>
          <p className={styles.ctaText}>
            The future belongs to physical AI, embodied intelligence, and humanoid robotics.
            Start mastering it today.
          </p>
          <Link to="/docs/Introduction/vision" className={styles.ctaButtonLarge}>
            Start Reading →
          </Link>
        </div>
      </section>
    </Layout>
  );
}
