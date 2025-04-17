# 🌉 Ulm Flachsbrücke WebApp

**An interactive web application showcasing the Smart Circular Bridge ("Flachsbrücke") in Ulm.**

![Banner](/src/assets/alltag/3_SCB%20in%20Ulm.png)

## 👨‍💻 Development & Credits

This web application was developed by

- **[Josef Häusel](https://github.com/josefhaeusel)** – *Lead Creative Technologist at [KLANGERFINDER GmbH & Co. KG](https://klangerfinder.de)*.
- **[Alec Dull](https://github.com/AlecDull)** – *Creative Technologist at [KLANGERFINDER GmbH & Co. KG](https://klangerfinder.de)*.

Commissioned by and in collaboration with the Smart Circular Bridge project.

## 🎯 Project Overview
https://github.com/josefhaeusel/ulmBrueckeWebapp/blob/main/README.md
This project presents the innovative **Smart Circular Bridge** in Ulm—a pioneering structure built from flax fibers and bio-based resins. The bridge not only exemplifies sustainable construction but also transforms into a musical instrument, translating pedestrian movements into sound.

Key features:

- **Bio-based Construction**: Utilizes flax fibers and recycled PET foam, resulting in a lightweight yet robust structure.
- **Interactive Sound Experience**: Equipped with 42 sensors that capture movements and environmental changes, converting them into auditory feedback.
- **Real-time Monitoring**: Continuous data collection for structural health monitoring, aiding research in sustainable materials.

Learn more at [flachsbruecke-ulm.de](https://flachsbruecke-ulm.de).

## 🖥️ Technologies Used

- **Frontend**: [Vue.js]
- **Deployment**: [nginx]
- **Audio Stream**: [Icecast2]
- **API**: [Nest.JS]
- **Monitoring**: [C#]


## 🚀 Getting Started (FE)

1. **Clone the repository**:
   ```bash
   git clone
   ```
2. **Navigate to the project directory**:
   ```bash
   cd ulmBrueckeWebapp
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm build
   ```
5. **Serve via nginx**
   ```bash
   # see nginx.conf
   ```
7. **Start /api detached and log**:
   ```bash
   nohup npm start > app.log 2>&1 &;
   lsof -i :3000;
   tail -f app.log
   ```

## 📁 Project Structure

```plaintext
ulmBrueckeWebapp/
├── api/                  # NestJS API
├── heartbeat_console/    # C# Code for IPC heartbeat
├── public/               # Static assets
├── public/               # Static assets
├── src/                  # Source files
│   ├── components/       # Reusable components
│   ├── pages/            # Application pages
│   ├── assets/           # Images, stylesheets, etc.
│   └── App.js            # Root component
├── package.json          # Project metadata and dependencies
└── README.md             # Project documentation
```

## 🎵 Experience the Bridge

Visit the live application to:

- Hear the bridge's responses to pedestrian movements.
- Interact and play with the sounds.
- Explore the bridge's construction and sustainability features.

👉 [flachsbruecke-ulm.de](https://flachsbruecke-ulm.de)

## 📚 Learn More

- [Sensor Data Dashboard](https://dashboard.smartcircularbridge.eu/d/ulm/ulm?orgId=1&refresh=5s)
- [Smart Circular Bridge Project Overview](https://vb.nweurope.eu/projects/project-search/smart-circular-bridge-scb-for-pedestrians-and-cyclists-in-a-circular-built-environment/)
- [University of Stuttgart – BioMat](https://www.uni-stuttgart.de/en/research/profile/biomat/)
  

![Flachsbrücke Ulm](/public/favicon.jpg)
---

*Developed with ❤️ to showcase the fusion of sustainable engineering and interactive technology.*
