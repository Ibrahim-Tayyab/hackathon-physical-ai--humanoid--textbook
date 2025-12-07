---
slug: ros2-first-node-guide
title: "ROS 2 Quick Start: Your First Node in 5 Minutes"
authors: [ibrahim]
tags: [ros2, tutorials]
image: https://docs.ros.org/en/humble/_static/humble-small.png
---

# ROS 2 Quick Start: Build Your First Node in 5 Minutes

If you're new to robotics, **ROS 2 (Robot Operating System 2)** might seem intimidating. But creating your first node is surprisingly simple! Let's build a "Hello World" publisher-subscriber system.

<!--truncate-->

## Prerequisites

- Ubuntu 22.04 (or Docker)
- ROS 2 Humble installed
- Python 3.10+

```bash
# Quick install (if needed)
sudo apt install ros-humble-desktop python3-colcon-common-extensions
source /opt/ros/humble/setup.bash
```

---

## Step 1: Create a Workspace

```bash
mkdir -p ~/ros2_ws/src
cd ~/ros2_ws/src
```

---

## Step 2: Create a Package

```bash
ros2 pkg create --build-type ament_python hello_ros2 --dependencies rclpy std_msgs
```

This creates:
```
hello_ros2/
├── package.xml
├── setup.py
├── hello_ros2/
│   └── __init__.py
```

---

## Step 3: Write the Publisher Node

Create `hello_ros2/publisher.py`:

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class HelloPublisher(Node):
    def __init__(self):
        super().__init__('hello_publisher')
        self.publisher = self.create_publisher(String, 'greetings', 10)
        self.timer = self.create_timer(1.0, self.publish_message)
        self.counter = 0
    
    def publish_message(self):
        msg = String()
        msg.data = f'Hello, ROS 2! Message #{self.counter}'
        self.publisher.publish(msg)
        self.get_logger().info(f'Published: "{msg.data}"')
        self.counter += 1

def main(args=None):
    rclpy.init(args=args)
    node = HelloPublisher()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

---

## Step 4: Write the Subscriber Node

Create `hello_ros2/subscriber.py`:

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class HelloSubscriber(Node):
    def __init__(self):
        super().__init__('hello_subscriber')
        self.subscription = self.create_subscription(
            String,
            'greetings',
            self.listener_callback,
            10
        )
    
    def listener_callback(self, msg):
        self.get_logger().info(f'Received: "{msg.data}"')

def main(args=None):
    rclpy.init(args=args)
    node = HelloSubscriber()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

---

## Step 5: Register Entry Points

Edit `setup.py`:

```python
entry_points={
    'console_scripts': [
        'publisher = hello_ros2.publisher:main',
        'subscriber = hello_ros2.subscriber:main',
    ],
},
```

---

## Step 6: Build and Run

```bash
cd ~/ros2_ws
colcon build --packages-select hello_ros2
source install/setup.bash
```

**Terminal 1:**
```bash
ros2 run hello_ros2 publisher
```

**Terminal 2:**
```bash
ros2 run hello_ros2 subscriber
```

---

## Output

**Publisher:**
```
[INFO] [hello_publisher]: Published: "Hello, ROS 2! Message #0"
[INFO] [hello_publisher]: Published: "Hello, ROS 2! Message #1"
```

**Subscriber:**
```
[INFO] [hello_subscriber]: Received: "Hello, ROS 2! Message #0"
[INFO] [hello_subscriber]: Received: "Hello, ROS 2! Message #1"
```

---

## What Just Happened?

1. **Publisher Node** sends messages to the `/greetings` topic every second
2. **Subscriber Node** listens to `/greetings` and logs received messages
3. **ROS 2 middleware** handles all the networking magic behind the scenes

---

## Next Steps

- Add parameters (e.g., message frequency)
- Create custom message types
- Visualize with `rqt_graph`

🎉 **Congratulations!** You've just built your first ROS 2 system. From here, you can control real robots, integrate sensors, and build autonomous behaviors.

---

**Full Code:** [GitHub Repo](https://github.com/Ibrahim-Tayyab?tab=repositories)  
**Next Tutorial:** Service Calls and Action Servers  
**Author:** Muhammed Ibrahim
