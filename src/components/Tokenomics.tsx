import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Presale", value: 40, color: "hsl(275, 100%, 35%)" },
  { name: "Liquidity", value: 25, color: "hsl(290, 85%, 45%)" },
  { name: "Team", value: 15, color: "hsl(180, 100%, 50%)" },
  { name: "Marketing", value: 10, color: "hsl(328, 100%, 54%)" },
  { name: "Ecosystem", value: 10, color: "hsl(270, 50%, 30%)" },
];

export const Tokenomics = () => {
  return (
    <section className="py-20 px-4 bg-card/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl font-bold mb-4 gradient-text">Tokenomics</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Fair and transparent token distribution designed for long-term growth
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Chart */}
          <div className="h-96 animate-slide-up">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Stats */}
          <div className="space-y-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            {data.map((item, index) => (
              <div
                key={item.name}
                className="bg-card border border-border rounded-lg p-6 hover:glow-primary transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-foreground">{item.name}</h3>
                  <span className="text-2xl font-bold gradient-text">{item.value}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-1000 rounded-full"
                    style={{
                      width: `${item.value}%`,
                      background: `linear-gradient(90deg, ${item.color}, ${item.color})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Token Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
          <div className="bg-card border border-border rounded-lg p-6 text-center hover:glow-accent transition-all duration-300">
            <div className="text-3xl font-bold gradient-text mb-2">1,000,000,000</div>
            <div className="text-muted-foreground">Total Supply</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center hover:glow-accent transition-all duration-300">
            <div className="text-3xl font-bold gradient-text mb-2">BSC</div>
            <div className="text-muted-foreground">Network</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center hover:glow-accent transition-all duration-300">
            <div className="text-3xl font-bold gradient-text mb-2">2% / 2%</div>
            <div className="text-muted-foreground">Buy / Sell Tax</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center hover:glow-accent transition-all duration-300">
            <div className="text-3xl font-bold gradient-text mb-2">Locked</div>
            <div className="text-muted-foreground">Liquidity</div>
          </div>
        </div>
      </div>
    </section>
  );
};
