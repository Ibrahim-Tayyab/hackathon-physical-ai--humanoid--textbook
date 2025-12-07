import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Physical AI & Humanoid Robotics Textbook
 * Structured according to ISI standards for comprehensive robotics education
 */
const sidebars: SidebarsConfig = {
  textbookSidebar: [
    {
      type: 'category',
      label: '📚 Part 1: Foundations',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Chapter 1: Introduction to Physical AI',
          items: [
            'Introduction/vision',
            'Introduction/hardware-setup',
            'Introduction/prerequisites',
            'Introduction/course-timeline',
            'Introduction/learning-outcomes',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '🤖 Part 2: The Robotic Nervous System (ROS 2)',
      items: [
        {
          type: 'category',
          label: 'Chapter 2-4: Module 1 - ROS 2 Fundamentals',
          items: [
            'Module-1-ROS2/nodes-topics',
            'Module-1-ROS2/python-rclpy',
            'Module-1-ROS2/urdf-humanoids',
            'Module-1-ROS2/mini-project',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '🏙 Part 3: Digital Twin & Simulation',
      items: [
        {
          type: 'category',
          label: 'Chapter 5-7: Module 2 - Gazebo & Unity',
          items: [
            'Module-2-Simulation/gazebo-physics',
            'Module-2-Simulation/unity-rendering',
            'Module-2-Simulation/sensors-lidar',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '🧠 Part 4: The AI-Robot Brain',
      items: [
        {
          type: 'category',
          label: 'Chapter 8-10: Module 3 - NVIDIA Isaac & Navigation',
          items: [
            'Module-3-Brain/isaac-sim',
            'Module-3-Brain/nav2-vslam',
            'Module-3-Brain/reinforcement-learning',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '🧍‍♂️ Part 5: Vision-Language-Action Systems',
      items: [
        {
          type: 'category',
          label: 'Chapter 11-13: Module 4 - VLA & Conversational Robotics',
          items: [
            'Module-4-VLA/voice-to-action',
            'Module-4-VLA/cognitive-planning',
            'Module-4-VLA/vla-models',
            'Module-4-VLA/capstone-project',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '🦾 Part 6: Humanoid Design & Manipulation',
      items: [
        {
          type: 'category',
          label: 'Chapter 14-15: Module 5 - Humanoid Robotics',
          items: [
            'Module-5-Humanoid-Design/kinematics-locomotion',
            'Module-5-Humanoid-Design/hands-grasping',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '🎯 Part 7: Advanced AI & Control',
      items: [
        {
          type: 'category',
          label: 'Chapter 16: Module 6 - Advanced Techniques',
          items: [
            'Module-6-Advanced-Control/reinforcement-learning',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '📖 Appendices',
      items: [
        'Appendices/lab-setup-guide',
        'Appendices/edge-hardware',
        'Appendices/troubleshooting',
      ],
    },
  ],
};

export default sidebars;
