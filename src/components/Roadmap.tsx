import { CheckCircle2, Circle } from "lucide-react";

const roadmapItems = [
  {
    phase: "Phase 1",
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
    phase: "Phase 2",
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
    phase: "Phase 3",
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
    phase: "Phase 4",
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
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl font-bold mb-4 gradient-text">Roadmap</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our journey to revolutionize decentralized finance
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="space-y-8">
            {roadmapItems.map((item, index) => (
              <div
                key={item.phase}
                className="relative animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`bg-card border rounded-xl p-8 hover:glow-primary transition-all duration-300 ${
                  item.status === "current" ? "border-accent glow-accent" : "border-border"
                }`}>
                  <div className="flex items-start gap-6">
                    <div className={`flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${
                      item.status === "completed" ? "bg-accent/20 text-accent" :
                      item.status === "current" ? "bg-highlight/20 text-highlight animate-glow-pulse" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      {item.status === "completed" ? (
                        <CheckCircle2 className="w-8 h-8" />
                      ) : (
                        <Circle className="w-8 h-8" />
                      )}
                    </div>

                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">{item.phase}</div>
                          <h3 className="text-2xl font-bold gradient-text">{item.title}</h3>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          item.status === "completed" ? "bg-accent/20 text-accent" :
                          item.status === "current" ? "bg-highlight/20 text-highlight" :
                          "bg-muted/50 text-muted-foreground"
                        }`}>
                          {item.status === "completed" ? "✓ Completed" :
                           item.status === "current" ? "In Progress" :
                           "Upcoming"}
                        </span>
                      </div>

                      <ul className="space-y-3">
                        {item.items.map((task, taskIndex) => (
                          <li key={taskIndex} className="flex items-center gap-3 text-foreground">
                            <div className={`w-2 h-2 rounded-full ${
                              item.status === "completed" ? "bg-accent" :
                              item.status === "current" ? "bg-highlight" :
                              "bg-muted-foreground"
                            }`} />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
