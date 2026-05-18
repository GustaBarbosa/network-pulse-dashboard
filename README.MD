# Network Pulse Dashboard

A dynamic network connectivity and infrastructure monitoring dashboard built on a pull-based active scanning architecture. The project demonstrates core capabilities in multi-container orchestration, microservices communication, and defensive implementation against common infrastructure vulnerabilities.

## Core Architecture and Tech Stack

* **Frontend:** React (JavaScript) utilizing state-driven rendering for responsive interface changes and visual updates.
* **Backend:** Flask (Python 3.10-slim) integrated with native Linux networking utilities (`iputils-ping`).
* **Infrastructure:** Multi-container orchestration managed strictly via Docker Compose to ensure local parity with production.
* **Automation:** GNU Make (Makefile) used to encapsulate complex Docker commands into single-word operational tasks.

## Security Controls (SecOps)

* **Command Injection Mitigation:** Host system interaction via the Python `subprocess` module passes arguments strictly encapsulated as a structured array rather than a raw shell string. This completely neutralizes shell chaining attempts using characters such as semicolons, ampersands, or logical operators.
* **Defense-in-Depth Validation:** Input validation is applied on both the client (React) and server (Flask) sides. Network boundaries enforce a strict regular expression that validates the exact mathematical bounds of a standard IPv4 address (0-255 per octet), dropping malformed packets before execution.

## Getting Started

Ensure you have Docker Engine, Docker Compose, and GNU Make installed on your system.

1. Clone the repository:
   ```bash
   git clone [https://github.com/your-username/network-pulse-dashboard.git](https://github.com/your-username/network-pulse-dashboard.git)
   cd network-pulse-dashboard