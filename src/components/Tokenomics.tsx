import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import CountUp from "react-countup";

const data = [
  { name: "Presale", value: 40, color: "#1E90FF" },
  { name: "Liquidity", value: 25, color: "#4CA1AF" },
  { name: "Team", value: 15, color: "#56CCF2" },
  { name: "Marketing", value: 10, color: "#3A98B9" },
  { name: "Ecosystem", value: 10, color: "#2C7A9B" },
];

export const Tokenomics = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 px-4 bg-card/30" id="tokenomics">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">Tokenomics</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Strategic token distribution designed for sustainable growth and long-term value
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="h-96"
          >
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
                  animationBegin={0}
                  animationDuration={1500}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(216, 33%, 13%)', 
                    border: '1px solid hsl(216, 33%, 25%)',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Stats */}
          <div className="space-y-6">
            {data.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 hover:glow-accent transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold text-foreground">{item.name}</h3>
                  <span className="text-3xl font-bold text-accent">
                    {isInView && <CountUp end={item.value} duration={2} suffix="%" />}
                  </span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${item.value}%` } : {}}
                    transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Token Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
          {[
            { label: "Total Supply", value: "1,000,000,000", suffix: "" },
            { label: "Network", value: "BSC", suffix: "" },
            { label: "Buy / Sell Tax", value: "2% / 2%", suffix: "" },
            { label: "Liquidity", value: "Locked", suffix: "" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
              className="bg-card border border-border rounded-lg p-6 text-center hover:border-accent/50 hover:glow-accent transition-all duration-300"
            >
              <div className="text-3xl font-bold text-accent mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
