import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  RotateCcw,
  Sprout,
  Sun,
  Droplets,
  Wind,
  ThermometerSun,
  Leaf,
  FlaskConical,
  BookOpen,
  Microscope,
  Flower2,
  Network,
  CircleDot,
  ShieldCheck,
  Mountain,
  Bug,
  MoveDiagonal,
  CloudSun
} from "lucide-react";
import "./styles.css";

const lessons = [
  {
    title: "Dormant Seed",
    factor: "Germination needs the right conditions",
    icon: Droplets,
    lesson:
      "A seed contains an embryo and stored food. Water activates enzymes, oxygen allows aerobic respiration, and a suitable temperature lets reactions happen quickly enough.",
    question: "A dry seed is placed in warm soil but does not germinate. Which missing factor is most likely stopping enzyme activity from starting?",
    choices: ["Water", "Extra nitrate ions", "Bright light"],
    answer: "Water",
    deficiency: "The seed stays inactive because enzymes cannot work properly without water.",
    correction:
      "Water is needed to activate enzymes and soften the seed coat. Light may help later, but many seeds can begin germinating underground."
  },
  {
    title: "Root Emerges",
    factor: "Root hair cells absorb water",
    icon: Droplets,
    lesson:
      "Root hair cells have a large surface area. Water enters them by osmosis, moving from a more dilute soil solution into more concentrated cell sap.",
    question: "Why are root hair cells effective at absorbing water from soil?",
    choices: [
      "They have a large surface area and take in water by osmosis",
      "They contain many petals to attract insects",
      "They open stomata to let water enter"
    ],
    answer: "They have a large surface area and take in water by osmosis",
    deficiency: "The young root cannot absorb enough water, so the shoot starts to wilt.",
    correction:
      "Root hairs increase surface area. Osmosis moves water into root cells when the cell sap is more concentrated than the soil water."
  },
  {
    title: "First Leaves",
    factor: "Photosynthesis makes glucose",
    icon: Sun,
    lesson:
      "Leaves use light energy absorbed by chlorophyll to make glucose from carbon dioxide and water. Oxygen is released as a waste product.",
    question: "Which word equation best represents photosynthesis?",
    choices: [
      "carbon dioxide + water -> glucose + oxygen",
      "glucose + oxygen -> carbon dioxide + water",
      "water + minerals -> starch + nitrogen"
    ],
    answer: "carbon dioxide + water -> glucose + oxygen",
    deficiency: "The leaves become weak because the plant is not making enough glucose.",
    correction:
      "Photosynthesis uses carbon dioxide and water to produce glucose and oxygen. The reverse equation describes aerobic respiration."
  },
  {
    title: "Green Leaf",
    factor: "Leaf structure supports photosynthesis",
    icon: Leaf,
    lesson:
      "Palisade mesophyll cells are near the top of the leaf and contain many chloroplasts, so they absorb lots of light for photosynthesis.",
    question: "Why are palisade mesophyll cells important in a leaf?",
    choices: [
      "They contain many chloroplasts and absorb light for photosynthesis",
      "They carry sucrose down the phloem only at night",
      "They form the waterproof waxy cuticle"
    ],
    answer: "They contain many chloroplasts and absorb light for photosynthesis",
    deficiency: "The leaf loses its strong green colour and photosynthesis slows.",
    correction:
      "Palisade mesophyll cells are packed with chloroplasts. Chloroplasts contain chlorophyll, which absorbs light energy."
  },
  {
    title: "Gas Exchange",
    factor: "Stomata control gas movement",
    icon: Wind,
    lesson:
      "Stomata allow carbon dioxide to diffuse into the leaf. Guard cells open and close stomata, which also affects water loss by transpiration.",
    question: "On a hot, dry day, a plant closes many stomata. What is the trade-off?",
    choices: [
      "Less water is lost, but less carbon dioxide enters for photosynthesis",
      "More carbon dioxide enters, and transpiration stops completely",
      "The phloem changes into xylem to carry oxygen"
    ],
    answer: "Less water is lost, but less carbon dioxide enters for photosynthesis",
    deficiency: "The plant protects water, but photosynthesis slows because less carbon dioxide enters.",
    correction:
      "Closing stomata reduces water vapour loss, but it also reduces carbon dioxide diffusion into the leaf."
  },
  {
    title: "Strong Stem",
    factor: "Xylem transports water and minerals",
    icon: Network,
    lesson:
      "Xylem vessels carry water and mineral ions upward from roots to leaves. Their lignin-strengthened walls help support the plant.",
    question: "Which statement correctly describes xylem?",
    choices: [
      "It carries water and mineral ions from roots to leaves",
      "It carries sucrose from leaves to storage organs only",
      "It produces pollen grains in the anther"
    ],
    answer: "It carries water and mineral ions from roots to leaves",
    deficiency: "The stem weakens and the leaves receive too little water.",
    correction:
      "Xylem transports water and dissolved mineral ions upward. Phloem transports sugars and amino acids."
  },
  {
    title: "Food Transport",
    factor: "Phloem moves sugars",
    icon: Network,
    lesson:
      "Phloem transports sucrose and amino acids from sources, such as leaves, to sinks, such as roots, fruits, seeds, or growing regions.",
    question: "A developing fruit is acting as a sink. What does that mean?",
    choices: [
      "It receives sugars transported in the phloem",
      "It absorbs water directly from air spaces",
      "It releases pollen onto a stigma"
    ],
    answer: "It receives sugars transported in the phloem",
    deficiency: "The growing tissues do not receive enough sugar for respiration and storage.",
    correction:
      "A sink is a part of the plant that receives transported food substances. Leaves are often sources because they make sugars."
  },
  {
    title: "Healthy Leaves",
    factor: "Mineral ions prevent deficiencies",
    icon: FlaskConical,
    lesson:
      "Nitrate ions are needed to make amino acids and proteins. Magnesium ions are needed to make chlorophyll.",
    question: "A plant has yellow leaves and poor growth because it cannot make enough chlorophyll. Which mineral ion is most directly linked?",
    choices: ["Magnesium ions", "Helium ions", "Copper metal"],
    answer: "Magnesium ions",
    deficiency: "The leaves turn yellow because chlorophyll production is reduced.",
    correction:
      "Magnesium is part of chlorophyll. Nitrate deficiency can also cause poor growth, but magnesium is most directly linked to chlorophyll."
  },
  {
    title: "Fast Growth",
    factor: "Limiting factors control photosynthesis",
    icon: ThermometerSun,
    lesson:
      "Photosynthesis can be limited by light intensity, carbon dioxide concentration, or temperature. The factor in shortest supply controls the rate.",
    question: "A greenhouse has enough water and warmth, but photosynthesis is still slow in dim light. What is the limiting factor?",
    choices: ["Light intensity", "Seed dispersal", "Petal colour"],
    answer: "Light intensity",
    deficiency: "Growth slows because the plant cannot capture enough light energy.",
    correction:
      "A limiting factor is the condition that stops the rate from increasing. Here, dim light limits photosynthesis."
  },
  {
    title: "Flowering Plant",
    factor: "Pollination comes before fertilisation",
    icon: Flower2,
    lesson:
      "Pollination is transfer of pollen from an anther to a stigma. Fertilisation happens later when a male gamete nucleus fuses with a female gamete nucleus in an ovule.",
    question: "Which sequence is correct for sexual reproduction in flowering plants?",
    choices: [
      "pollination -> pollen tube growth -> fertilisation -> seed formation",
      "fertilisation -> pollination -> seed dispersal -> pollen tube growth",
      "germination -> fertilisation -> anther formation -> pollination"
    ],
    answer: "pollination -> pollen tube growth -> fertilisation -> seed formation",
    deficiency: "Flowers form, but seeds cannot develop properly because reproduction is disrupted.",
    correction:
      "Pollen must reach the stigma before a pollen tube can grow toward the ovule for fertilisation."
  },
  {
    title: "Mature Plant",
    factor: "Adaptations and dispersal support survival",
    icon: Sprout,
    lesson:
      "Seed dispersal spreads offspring away from the parent plant, reducing competition for light, water, minerals, and space.",
    question: "Why is seed dispersal useful for a plant species?",
    choices: [
      "It reduces competition between seedlings and the parent plant",
      "It stops all transpiration in adult plants",
      "It changes xylem into chloroplasts"
    ],
    answer: "It reduces competition between seedlings and the parent plant",
    deficiency: "New seedlings crowd together and compete strongly for the same resources.",
    correction:
      "Dispersal helps seeds reach new areas, so seedlings are less likely to compete directly with the parent plant."
  },
];

function shuffleChoices(choices) {
  const shuffled = [...choices];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

const indexItems = [
  {
    title: "Plant Cells and Organisation",
    icon: Microscope,
    summary:
      "Plants are multicellular organisms. Their cells have structures that help with support, photosynthesis, storage, and transport.",
    points: [
      "Plant cells have a cellulose cell wall for support and shape.",
      "Chloroplasts contain chlorophyll, which absorbs light energy.",
      "A large permanent vacuole contains cell sap and helps keep the cell firm.",
      "Cells group into tissues, tissues form organs such as leaves and roots, and organs work together as systems."
    ],
    terms: ["cell wall", "chloroplast", "vacuole", "tissue", "organ"]
  },
  {
    title: "Photosynthesis and Plant Nutrition",
    icon: Sun,
    summary:
      "Photosynthesis is how plants make glucose using light energy. It is the foundation of most food chains.",
    points: [
      "Word equation: carbon dioxide + water -> glucose + oxygen, using light and chlorophyll.",
      "Carbon dioxide enters leaves through stomata. Water is absorbed by roots and transported in xylem.",
      "Glucose can be used in respiration, changed into starch for storage, changed into cellulose for cell walls, or combined with mineral ions to make proteins.",
      "Plants need nitrate ions to make amino acids and proteins. Magnesium ions are needed to make chlorophyll."
    ],
    terms: ["photosynthesis", "chlorophyll", "glucose", "starch", "nitrate", "magnesium"]
  },
  {
    title: "Leaf Structure and Gas Exchange",
    icon: Leaf,
    summary:
      "Leaves are adapted to absorb light and exchange gases while reducing unnecessary water loss.",
    points: [
      "The upper epidermis is transparent so light can reach photosynthetic cells.",
      "Palisade mesophyll cells contain many chloroplasts for photosynthesis.",
      "Spongy mesophyll has air spaces so gases can diffuse quickly.",
      "Stomata are pores controlled by guard cells. They allow carbon dioxide in and oxygen and water vapour out."
    ],
    terms: ["epidermis", "palisade mesophyll", "spongy mesophyll", "stomata", "guard cells"]
  },
  {
    title: "Roots, Minerals, and Water Uptake",
    icon: Droplets,
    summary:
      "Roots anchor the plant and absorb water and mineral ions from the soil.",
    points: [
      "Root hair cells give roots a large surface area for absorption.",
      "Water enters root hair cells by osmosis because the cell sap is more concentrated than soil water.",
      "Mineral ions are often absorbed by active transport, which needs energy from respiration.",
      "Healthy soil provides water, air spaces for root respiration, and mineral ions."
    ],
    terms: ["root hair cell", "osmosis", "active transport", "mineral ions", "respiration"]
  },
  {
    title: "Transport in Plants",
    icon: Network,
    summary:
      "Plants use transport tissues to move water, minerals, and sugars around the body.",
    points: [
      "Xylem carries water and mineral ions from roots to leaves. Mature xylem vessels are dead, hollow tubes strengthened with lignin.",
      "Phloem carries sucrose and amino acids from sources, such as leaves, to sinks, such as growing regions or storage organs.",
      "Translocation is movement of food substances through phloem.",
      "The transpiration stream helps pull water up the plant as water evaporates from leaf surfaces."
    ],
    terms: ["xylem", "phloem", "lignin", "translocation", "source", "sink"]
  },
  {
    title: "Transpiration",
    icon: Wind,
    summary:
      "Transpiration is the loss of water vapour from leaves. It is important, but too much can cause wilting.",
    points: [
      "Water evaporates from mesophyll cells and diffuses out through stomata.",
      "A higher temperature, stronger wind, and lower humidity usually increase transpiration rate.",
      "More light can increase transpiration because stomata open for photosynthesis.",
      "Plants reduce water loss using features such as waxy cuticles, fewer stomata, sunken stomata, or curled leaves."
    ],
    terms: ["transpiration", "diffusion", "humidity", "waxy cuticle", "wilting"]
  },
  {
    title: "Growth Conditions and Limiting Factors",
    icon: ThermometerSun,
    summary:
      "Plant growth depends on balanced conditions. If one factor is in short supply, it can limit photosynthesis and growth.",
    points: [
      "Light intensity, carbon dioxide concentration, and temperature are common limiting factors for photosynthesis.",
      "Enzymes control many plant reactions, so very low temperatures slow reactions and very high temperatures can damage enzymes.",
      "A plant also needs enough water, mineral ions, space, and suitable soil pH.",
      "In greenhouses, farmers may control light, carbon dioxide, temperature, water, and mineral supply to increase yield."
    ],
    terms: ["limiting factor", "enzyme", "yield", "greenhouse", "optimum"]
  },
  {
    title: "Seed Germination",
    icon: CircleDot,
    summary:
      "A seed contains an embryo plant and stored food. Germination begins when conditions are suitable.",
    points: [
      "Seeds usually need water, oxygen, and a suitable temperature to germinate.",
      "Water activates enzymes and softens the seed coat.",
      "Oxygen is needed for aerobic respiration, which releases energy for growth.",
      "The radicle grows first to form the root, then the shoot grows towards light."
    ],
    terms: ["seed", "embryo", "germination", "radicle", "plumule"]
  },
  {
    title: "Flowering Plant Reproduction",
    icon: Flower2,
    summary:
      "Flowering plants reproduce sexually using pollen and ovules. This creates genetic variation.",
    points: [
      "Anthers produce pollen grains, which contain male gametes.",
      "Ovules in the ovary contain female gametes.",
      "Pollination is transfer of pollen from an anther to a stigma.",
      "Fertilisation happens when the nucleus from a male gamete joins with the nucleus of a female gamete.",
      "After fertilisation, ovules become seeds and the ovary can develop into a fruit."
    ],
    terms: ["anther", "stigma", "ovule", "pollination", "fertilisation", "seed"]
  },
  {
    title: "Pollination and Seed Dispersal",
    icon: Sprout,
    summary:
      "Pollination moves pollen, while seed dispersal spreads offspring away from the parent plant.",
    points: [
      "Insect-pollinated flowers often have bright petals, scent, nectar, and sticky pollen.",
      "Wind-pollinated flowers often have small petals, exposed anthers, feathery stigmas, and light pollen.",
      "Seeds may be dispersed by wind, animals, water, or explosive splitting.",
      "Dispersal reduces competition for light, water, minerals, and space."
    ],
    terms: ["insect pollination", "wind pollination", "dispersal", "competition", "fruit"]
  },
  {
    title: "Deficiencies and Plant Health",
    icon: FlaskConical,
    summary:
      "Deficiency symptoms are clues that a plant is missing an important mineral or growth condition.",
    points: [
      "Nitrate deficiency can cause poor growth and yellow older leaves because fewer proteins are made.",
      "Magnesium deficiency can cause yellowing leaves because less chlorophyll is produced.",
      "Too little water causes wilting because cells lose turgor pressure.",
      "Too little light causes weak, pale growth because photosynthesis is reduced.",
      "Waterlogged soil can damage roots because root cells cannot get enough oxygen for respiration."
    ],
    terms: ["deficiency", "chlorosis", "turgor", "waterlogging", "mineral ions"]
  },
  {
    title: "Plant Adaptations and Ecology",
    icon: BookOpen,
    summary:
      "Plants are adapted to survive in different habitats and are producers in ecosystems.",
    points: [
      "Plants are producers because they make organic nutrients using photosynthesis.",
      "Cacti and other xerophytes reduce water loss using thick cuticles, reduced leaves, and water storage tissues.",
      "Climbing plants use supports to reach light without building thick stems.",
      "Plant biomass passes energy to herbivores, then to higher consumers in food chains.",
      "Decomposers recycle mineral ions from dead organisms back into soil."
    ],
    terms: ["producer", "adaptation", "xerophyte", "biomass", "decomposer"]
  }
];

const labResources = [
  {
    key: "water",
    label: "Water",
    icon: Droplets,
    animation: "water",
    help: "Too little causes wilting. Too much can waterlog soil and reduce oxygen for roots."
  },
  {
    key: "sunlight",
    label: "Sunlight",
    icon: Sun,
    animation: "sunlight",
    help: "Light provides energy for photosynthesis, but extreme light with heat can stress plants."
  },
  {
    key: "air",
    label: "CO2 / Air",
    icon: Wind,
    animation: "air",
    help: "Carbon dioxide enters through stomata and is used to make glucose."
  },
  {
    key: "nutrients",
    label: "Nutrients",
    icon: FlaskConical,
    animation: "nutrients",
    help: "Mineral ions such as nitrate and magnesium support proteins and chlorophyll."
  },
  {
    key: "soil",
    label: "Soil",
    icon: Mountain,
    animation: "soil",
    help: "Good soil anchors roots, holds water, and contains air spaces and mineral ions."
  },
  {
    key: "temperature",
    label: "Temperature",
    icon: ThermometerSun,
    animation: "temperature",
    help: "A suitable temperature keeps enzymes working well. Too cold or too hot slows growth."
  },
  {
    key: "space",
    label: "Space",
    icon: MoveDiagonal,
    animation: "space",
    help: "Roots and leaves need room to spread and avoid competition."
  },
  {
    key: "humidity",
    label: "Humidity",
    icon: CloudSun,
    animation: "humidity",
    help: "Humidity affects transpiration. Very dry air increases water loss."
  },
  {
    key: "protection",
    label: "Protection",
    icon: ShieldCheck,
    animation: "protection",
    help: "Protection reduces damage from pests and disease."
  }
];

const startingLabResources = {
  water: 50,
  sunlight: 50,
  air: 50,
  nutrients: 50,
  soil: 50,
  temperature: 50,
  space: 50,
  humidity: 50,
  protection: 50
};

function App() {
  const [activeTab, setActiveTab] = useState("experiment");
  const [stage, setStage] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState("healthy");
  const [message, setMessage] = useState("Read the lesson, then choose an answer.");
  const [shuffleKey, setShuffleKey] = useState(0);
  const [shuffledChoices, setShuffledChoices] = useState(() =>
    shuffleChoices(lessons[0].choices)
  );
  const current = lessons[stage];
  const progress = useMemo(() => ((stage + 1) / lessons.length) * 100, [stage]);

  useEffect(() => {
    setShuffledChoices(shuffleChoices(lessons[stage].choices));
  }, [stage, shuffleKey]);

  function chooseAnswer(choice) {
    if (status === "dead" || status === "complete") return;

    if (choice === current.answer) {
      if (stage === lessons.length - 1) {
        setStatus("complete");
        setMessage("Excellent! Your plant grew into a healthy mature plant.");
        return;
      }

      setStage((nextStage) => nextStage + 1);
      setAttempts(0);
      setStatus("healthy");
      setMessage("Correct! The plant grows to the next stage.");
      return;
    }

    if (attempts === 0) {
      setAttempts(1);
      setStatus("deficient");
      setMessage(`Not quite. ${current.deficiency} ${current.correction} Try one more time.`);
      return;
    }

    setStatus("dead");
    setMessage(`The plant died because this concept was missed: ${current.factor}. ${current.correction}`);
  }

  function restart() {
    setStage(0);
    setAttempts(0);
    setStatus("healthy");
    setShuffleKey((key) => key + 1);
    setMessage("Read the lesson, then choose an answer.");
  }

  const Icon = current.icon;

  return (
    <main className="app-shell">
      <nav className="tab-bar" aria-label="Main sections">
        <button
          className={activeTab === "experiment" ? "tab-button active" : "tab-button"}
          onClick={() => setActiveTab("experiment")}
        >
          <Sprout size={18} />
          Experiment
        </button>
        <button
          className={activeTab === "index" ? "tab-button active" : "tab-button"}
          onClick={() => setActiveTab("index")}
        >
          <BookOpen size={18} />
          Plant Index
        </button>
        <button
          className={activeTab === "lab" ? "tab-button active" : "tab-button"}
          onClick={() => setActiveTab("lab")}
        >
          <FlaskConical size={18} />
          My Seed Lab
        </button>
      </nav>

      {activeTab === "lab" ? (
        <SeedLab />
      ) : activeTab === "index" ? (
        <PlantIndex />
      ) : (
        <section className="experiment-panel" aria-label="Interactive plant experiment">
          <div className="top-bar">
            <div>
              <div className="section-label">
                <Sprout size={18} />
                Interactive Experiment
              </div>
              <h2>{current.title}</h2>
            </div>
            <button className="icon-button" onClick={restart} aria-label="Restart experiment" title="Restart">
              <RotateCcw size={20} />
            </button>
          </div>

          <div className="progress-track" aria-label="Growth progress">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>

          <PlantScene stage={stage} status={status} />

          <div className={`message ${status}`}>{message}</div>

          <div className="lesson-box">
            <div className="factor-chip">
              <Icon size={18} />
              {current.factor}
            </div>
            <p>{current.lesson}</p>
          </div>

          <div className="quiz-area">
            <h3>{current.question}</h3>
            <div className="choices">
              {shuffledChoices.map((choice) => (
                <button
                  className="choice-button"
                  key={choice}
                  onClick={() => chooseAnswer(choice)}
                  disabled={status === "dead" || status === "complete"}
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

function SeedLab() {
  const [seedName, setSeedName] = useState("Neon Bean");
  const [resources, setResources] = useState(startingLabResources);
  const [activeEffect, setActiveEffect] = useState(null);
  const [careSteps, setCareSteps] = useState(0);

  const labScore = useMemo(() => {
    const balanceScore = Object.values(resources).reduce((total, value) => {
      return total + Math.max(0, 100 - Math.abs(value - 60) * 2);
    }, 0);

    return Math.round(balanceScore / Object.values(resources).length);
  }, [resources]);

  const labStage = useMemo(() => {
    if (labScore < 32) return "struggling";
    if (careSteps < 2) return "seed";
    if (careSteps < 4) return "sprout";
    if (careSteps < 6) return "leafy";
    if (careSteps < 8 || labScore < 82) return "flowering";
    return "life-cycle";
  }, [labScore, careSteps]);

  const labFeedback = useMemo(() => {
    const low = Object.entries(resources).filter(([, value]) => value < 28).map(([key]) => key);
    const high = Object.entries(resources).filter(([, value]) => value > 84).map(([key]) => key);

    if (low.length > 0) {
      return `${formatResource(low[0])} is too low. The plant is showing stress because this resource is needed for healthy growth.`;
    }

    if (high.length > 0) {
      return `${formatResource(high[0])} is too high. Balance matters because too much of a resource can also harm a plant.`;
    }

    if (labStage === "life-cycle") {
      return `${seedName} has balanced conditions and is completing a full life cycle with flowers, fruit, seeds, and new seedlings.`;
    }

    return `${seedName} is growing. Keep the resources close to a balanced range to unlock later life-cycle stages.`;
  }, [resources, labStage, seedName]);

  function updateResource(key, value) {
    setResources((current) => ({ ...current, [key]: Number(value) }));
  }

  function useResource(resource) {
    setActiveEffect(resource.animation);
    setResources((current) => ({
      ...current,
      [resource.key]: Math.min(100, current[resource.key] + 8)
    }));
    setCareSteps((steps) => Math.min(10, steps + 1));
    window.setTimeout(() => setActiveEffect(null), 1300);
  }

  function resetLab() {
    setResources(startingLabResources);
    setActiveEffect(null);
    setCareSteps(0);
  }

  return (
    <section className="lab-page" aria-label="My Seed Lab plant simulation">
      <div className="lab-header">
        <div>
          <div className="section-label">
            <FlaskConical size={18} />
            My Seed Lab
          </div>
          <h1>Grow Your Own Seed</h1>
          <p>
            Create a seed, test different environments, and use plant resources from the index to keep it healthy.
          </p>
        </div>
        <label className="seed-name-field">
          Seed name
          <input value={seedName} onChange={(event) => setSeedName(event.target.value)} />
        </label>
      </div>

      <div className="lab-layout">
        <section className="lab-simulation">
          <div className="lab-score">
            <span>Health score</span>
            <strong>{labScore}%</strong>
          </div>
          <div className="lab-stage-chip">{formatLabStage(labStage)}</div>
          <LabPlantScene stage={labStage} effect={activeEffect} />
          <div className={`message ${labScore < 40 ? "deficient" : labStage === "life-cycle" ? "complete" : ""}`}>
            {labFeedback}
          </div>
        </section>

        <section className="resource-panel" aria-label="Plant resources">
          {labResources.map((resource) => {
            const Icon = resource.icon;
            return (
              <article className="resource-control" key={resource.key}>
                <div className="resource-title">
                  <Icon size={19} />
                  <div>
                    <h2>{resource.label}</h2>
                    <p>{resource.help}</p>
                  </div>
                </div>
                <div className="resource-actions">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={resources[resource.key]}
                    onChange={(event) => updateResource(resource.key, event.target.value)}
                    aria-label={`${resource.label} level`}
                  />
                  <span>{resources[resource.key]}%</span>
                  <button onClick={() => useResource(resource)}>Use</button>
                </div>
              </article>
            );
          })}
          <button className="reset-lab-button" onClick={resetLab}>
            <RotateCcw size={18} />
            Reset Lab
          </button>
        </section>
      </div>
    </section>
  );
}

function LabPlantScene({ stage, effect }) {
  return (
    <div className={`lab-scene ${stage} ${effect ? `effect-${effect}` : ""}`}>
      <div className="lab-sun" />
      <div className="lab-soil">
        <div className="lab-root-network" />
        <div className="lab-plant">
          <span className="lab-leaf lab-left" />
          <span className="lab-leaf lab-right" />
          <span className="lab-leaf lab-left upper" />
          <span className="lab-leaf lab-right upper" />
          <span className="lab-flower" />
          <span className="lab-fruit" />
        </div>
        <div className="lab-seedlings">
          <span />
          <span />
        </div>
      </div>
      <div className="lab-droplets" aria-hidden="true"><span /><span /><span /></div>
      <div className="lab-rays" aria-hidden="true"><span /><span /><span /></div>
      <div className="lab-air" aria-hidden="true"><span /><span /><span /></div>
      <div className="lab-minerals" aria-hidden="true"><span /><span /><span /></div>
      <div className="lab-temp-aura" aria-hidden="true" />
      <div className="lab-mist" aria-hidden="true" />
      <div className="lab-shield" aria-hidden="true"><Bug size={22} /></div>
      <div className="lab-space-ring" aria-hidden="true" />
    </div>
  );
}

function formatResource(key) {
  const resource = labResources.find((item) => item.key === key);
  return resource ? resource.label : key;
}

function formatLabStage(stage) {
  const names = {
    struggling: "Stress stage",
    seed: "Seed stage",
    sprout: "Sprout stage",
    leafy: "Leaf growth",
    flowering: "Flowering stage",
    "life-cycle": "Full life cycle"
  };

  return names[stage] || stage;
}

function PlantIndex() {
  return (
    <section className="index-page" aria-label="Plant biology revision index">
      <div className="index-hero">
        <div>
          <div className="section-label">
            <BookOpen size={18} />
            Plant Index
          </div>
          <h1>Plant Biology Revision Guide</h1>
          <p>
            A Cambridge/IGCSE-style study guide covering plant structure, nutrition,
            transport, reproduction, growth conditions, deficiencies, and adaptations.
          </p>
        </div>
        <div className="mini-diagram" aria-label="Simple plant system diagram">
          <div className="diagram-sun" />
          <div className="diagram-leaf left" />
          <div className="diagram-leaf right" />
          <div className="diagram-stem" />
          <div className="diagram-root root-one" />
          <div className="diagram-root root-two" />
          <span className="diagram-label photosynthesis">photosynthesis</span>
          <span className="diagram-label transport">xylem + phloem</span>
        </div>
      </div>

      <div className="index-grid">
        {indexItems.map((item) => {
          const Icon = item.icon;
          return (
            <article className="index-item expanded" key={item.title}>
              <div className="index-heading">
                <Icon size={22} />
                <h2>{item.title}</h2>
              </div>
              <p>{item.summary}</p>
              <ul>
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="term-row" aria-label={`${item.title} key vocabulary`}>
                {item.terms.map((term) => (
                  <span key={term}>{term}</span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function PlantScene({ stage, status }) {
  const growthRatio = Math.min(stage / (lessons.length - 1), 1);
  const height = status === "dead" ? 60 : 56 + growthRatio * 150;
  const leafCount = Math.min(6, stage + 1);
  const showFlower = stage >= 8 && status !== "dead";
  const showPollen = stage >= 9 && status !== "dead";
  const showFruit = stage >= 9 && status !== "dead";
  const showSeeds = stage >= 10 && status !== "dead";

  return (
    <div className={`plant-scene ${status}`}>
      <div className="sun" />
      <div className="cloud cloud-one" />
      <div className="cloud cloud-two" />
      <div className="soil">
        <div className="seed" />
        {status !== "dead" && (
          <div className="plant" style={{ height: `${height}px` }}>
            {Array.from({ length: leafCount }).map((_, index) => (
              <span
                className={`leaf leaf-${index % 2 === 0 ? "left" : "right"}`}
                style={{ bottom: `${24 + index * 22}px` }}
                key={index}
              />
            ))}
            {showFlower && <span className="flower" />}
            {showFruit && <span className="fruit" />}
            {showPollen && (
              <span className="pollen-field" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>
            )}
          </div>
        )}
        {showSeeds && (
          <div className="seed-dispersal" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        )}
        {showSeeds && (
          <div className="new-seedlings" aria-hidden="true">
            <span />
            <span />
          </div>
        )}
        {status === "dead" && <div className="dead-plant" />}
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
