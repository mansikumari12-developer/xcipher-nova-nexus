import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, Circle, Rocket } from "lucide-react";

const roadmapItems = [
  {
    phase: "Q1 2025",
    title: "Launch & Foundation",
    status: "completed",
    items: [
      "Token Contract Deployment",
      "Website Launch",
      "Community Building",
      "Initial Marketing Campaign",
    ],
  },
  {
    phase: "Q2 2025",
    title: "Exchange Listings",
    status: "current",
    items: [
      "PancakeSwap Listing",
      "CMC & CoinGecko Listing",
      "Audit by CertiK",
      "Partnership Announcements",
    ],
  },
  {
    phase: "Q3 2025",
    title: "Ecosystem Growth",
    status: "upcoming",
    items: [
      "CEX Listings",
      "Staking Platform",
      "NFT Marketplace",
      "Mobile App Development",
    ],
  },
  {
    phase: "Q4 2025",
    title: "Global Expansion",
    status: "upcoming",
    items: [
      "Major Exchange Listings",
      "DeFi Integrations",
      "Cross-chain Bridge",
      "Enterprise Partnerships",
    ],
  },
];

export const Roadmap = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 px-4" id="roadmap">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">Roadmap</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our strategic journey to revolutionize decentralized finance
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-primary to-muted hidden md:block" />

          <div className="space-y-12">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="relative"
              >
                <div
                  className={`bg-card border rounded-xl p-8 ml-0 md:ml-20 hover:border-accent/50 transition-all duration-300 ${
                    item.status === "current" ? "border-accent glow-accent" : "border-border"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`absolute left-4 md:left-0 top-8 -translate-x-1/2 w-16 h-16 rounded-full flex items-center justify-center border-4 border-background ${
                      item.status === "completed"
                        ? "bg-accent/20 text-accent"
                        : item.status === "current"
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {item.status === "completed" ? (
                      <CheckCircle2 className="w-8 h-8" />
                    ) : item.status === "current" ? (
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Rocket className="w-8 h-8" />
                      </motion.div>
                    ) : (
                      <Circle className="w-8 h-8" />
                    )}
                  </div>

                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 pl-12 md:pl-0">
                    <div>
                      <div className="text-sm text-accent font-semibold mb-2">{item.phase}</div>
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground">{item.title}</h3>
                    </div>
                    <span
                      className={`mt-2 md:mt-0 inline-flex px-4 py-2 rounded-full text-sm font-semibold ${
                        item.status === "completed"
                          ? "bg-accent/20 text-accent"
                          : item.status === "current"
                          ? "bg-primary/20 text-primary"
                          : "bg-muted/50 text-muted-foreground"
                      }`}
                    >
                      {item.status === "completed"
                        ? "✓ Completed"
                        : item.status === "current"
                        ? "🚀 In Progress"
                        : "Upcoming"}
                    </span>
                  </div>

                  <ul className="space-y-3 pl-12 md:pl-0">
                    {item.items.map((task, taskIndex) => (
                      <motion.li
                        key={taskIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.2 + taskIndex * 0.1, duration: 0.4 }}
                        className="flex items-center gap-3 text-foreground"
                      >
                        <div
                          className={`w-2 h-2 rounded-full ${
                            item.status === "completed"
                              ? "bg-accent"
                              : item.status === "current"
                              ? "bg-primary"
                              : "bg-muted-foreground"
                          }`}
                        />
                        {task}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
