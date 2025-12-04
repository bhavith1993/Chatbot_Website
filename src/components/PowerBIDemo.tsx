import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  BarChart3, 
  Filter, 
  Download, 
  Share2,
  Play,
  Pause
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const cashFlowData = [
  { month: "Jan", inflow: 450, outflow: 380 },
  { month: "Feb", inflow: 520, outflow: 410 },
  { month: "Mar", inflow: 480, outflow: 390 },
  { month: "Apr", inflow: 590, outflow: 440 },
  { month: "May", inflow: 610, outflow: 460 },
  { month: "Jun", inflow: 680, outflow: 490 },
];

const revenueData = [
  { category: "Product A", value: 1200 },
  { category: "Product B", value: 890 },
  { category: "Product C", value: 650 },
  { category: "Product D", value: 420 },
];

const profitData = [
  { month: "Jan", profit: 70 },
  { month: "Feb", profit: 110 },
  { month: "Mar", profit: 90 },
  { month: "Apr", profit: 150 },
  { month: "May", profit: 150 },
  { month: "Jun", profit: 190 },
];

const budgetData = [
  { category: "Revenue", budget: 5000, actual: 5200 },
  { category: "COGS", budget: 2800, actual: 2650 },
  { category: "OpEx", budget: 1500, actual: 1580 },
  { category: "Marketing", budget: 400, actual: 380 },
];

const arAgingData = [
  { range: "0-30 Days", amount: 820 },
  { range: "31-60 Days", amount: 450 },
  { range: "61-90 Days", amount: 180 },
  { range: "90+ Days", amount: 95 },
];

const plData = [
  { month: "Jan", revenue: 450, expenses: 380, netIncome: 70 },
  { month: "Feb", revenue: 520, expenses: 410, netIncome: 110 },
  { month: "Mar", revenue: 480, expenses: 390, netIncome: 90 },
  { month: "Apr", revenue: 590, expenses: 440, netIncome: 150 },
  { month: "May", revenue: 610, expenses: 460, netIncome: 150 },
  { month: "Jun", revenue: 680, expenses: 490, netIncome: 190 },
];

const PowerBIDemo = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(true);
  const [clicking, setClicking] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      // Animate cursor movement before tab change
      const nextTab = (activeTab + 1) % 6;
      
      // Get actual button position
      const targetButton = tabRefs.current[nextTab];
      const container = containerRef.current;
      
      if (targetButton && container) {
        const buttonRect = targetButton.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // Calculate position relative to container
        const tabButtonX = buttonRect.left - containerRect.left + buttonRect.width / 2;
        const tabButtonY = buttonRect.top - containerRect.top + buttonRect.height / 2;
        
        // Animate cursor to button
        setShowCursor(true);
        setCursorPosition({ x: tabButtonX, y: tabButtonY });
      }
      
      // Show click animation
      setTimeout(() => {
        setClicking(true);
        setTimeout(() => setClicking(false), 300);
      }, 800);
      
      // Change tab after cursor animation
      setTimeout(() => {
        setActiveTab(nextTab);
      }, 1200);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, activeTab]);

  const tabs = ["Overview", "Cash Flow", "Revenue", "Budget", "A/R Aging", "P&L"];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20" id="demo">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <BarChart3 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Live Demo</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Power BI Finance Dashboards
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the power of custom-built financial dashboards
          </p>
        </div>

        <div className="max-w-7xl mx-auto relative" ref={containerRef}>
          {/* Animated Cursor */}
          {showCursor && isPlaying && (
            <>
              <div 
                className="absolute pointer-events-none z-50 transition-all duration-700 ease-out"
                style={{ 
                  left: `${cursorPosition.x}px`, 
                  top: `${cursorPosition.y}px`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {/* Cursor pointer */}
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none"
                  className="drop-shadow-lg"
                >
                  <path 
                    d="M5 3L19 12L12 13L9 20L5 3Z" 
                    fill="white" 
                    stroke="black" 
                    strokeWidth="1"
                  />
                </svg>
                
                {/* Click ripple effect */}
                {clicking && (
                  <>
                    <div className="absolute inset-0 -m-2 rounded-full bg-blue-400/40 animate-ping" />
                    <div className="absolute inset-0 -m-1 rounded-full bg-blue-500/30 animate-pulse" />
                  </>
                )}
              </div>
            </>
          )}

          {/* Power BI Style Dashboard */}
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 overflow-hidden shadow-2xl relative">
            {/* Top Bar - Power BI Style */}
            <div className="bg-slate-950 border-b border-slate-700 p-3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-slate-900" />
                  </div>
                  <span className="text-white font-semibold">Financial Dashboard</span>
                </div>
                <div className="h-6 w-px bg-slate-700" />
                <div className="flex gap-2">
                  {tabs.map((tab, idx) => (
                    <button
                      key={idx}
                      ref={(el) => (tabRefs.current[idx] = el)}
                      onClick={() => {
                        setActiveTab(idx);
                        setIsPlaying(false);
                      }}
                      className={`px-4 py-1.5 rounded text-sm font-medium transition-colors ${
                        activeTab === idx
                          ? "bg-slate-700 text-white"
                          : "text-slate-400 hover:text-white hover:bg-slate-800"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
                  title={isPlaying ? "Pause auto-play" : "Resume auto-play"}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors">
                  <Filter className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-6 min-h-[600px]">
              {activeTab === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
                  {/* KPI Cards */}
                  <Card className="bg-slate-800/50 border-slate-700 p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-400 text-sm">Total Revenue</span>
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">$5.2M</div>
                    <div className="text-emerald-500 text-sm">+18% vs last month</div>
                  </Card>

                  <Card className="bg-slate-800/50 border-slate-700 p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-400 text-sm">Cash Position</span>
                      <DollarSign className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">$2.4M</div>
                    <div className="text-blue-500 text-sm">+12% vs last month</div>
                  </Card>

                  <Card className="bg-slate-800/50 border-slate-700 p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-400 text-sm">Net Margin</span>
                      <PieChart className="w-4 h-4 text-purple-500" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">21.2%</div>
                    <div className="text-purple-500 text-sm">+4.1% vs target</div>
                  </Card>

                  {/* Charts */}
                  <Card className="bg-slate-800/50 border-slate-700 p-6 md:col-span-2">
                    <h3 className="text-white font-semibold mb-4">Profit Trend</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <AreaChart data={profitData}>
                        <defs>
                          <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="month" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1e293b', 
                            border: '1px solid #475569',
                            borderRadius: '8px'
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="profit" 
                          stroke="#10b981" 
                          strokeWidth={2}
                          fill="url(#profitGradient)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Card>

                  <Card className="bg-slate-800/50 border-slate-700 p-6">
                    <h3 className="text-white font-semibold mb-4">Top Products</h3>
                    <div className="space-y-3">
                      {revenueData.map((item, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-300">{item.category}</span>
                            <span className="text-white font-medium">${item.value}K</span>
                          </div>
                          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                              style={{ width: `${(item.value / 1200) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              )}

              {activeTab === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <Card className="bg-slate-800/50 border-slate-700 p-6">
                    <h3 className="text-white font-semibold mb-4">Cash Flow Analysis</h3>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={cashFlowData}>
                        <XAxis dataKey="month" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1e293b', 
                            border: '1px solid #475569',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar dataKey="inflow" fill="#10b981" radius={[8, 8, 0, 0]} />
                        <Bar dataKey="outflow" fill="#ef4444" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-slate-800/50 border-slate-700 p-6">
                      <div className="text-slate-400 text-sm mb-2">Net Cash Flow</div>
                      <div className="text-2xl font-bold text-white">$890K</div>
                      <div className="text-emerald-500 text-sm mt-1">↑ 8.2% MoM</div>
                    </Card>
                    <Card className="bg-slate-800/50 border-slate-700 p-6">
                      <div className="text-slate-400 text-sm mb-2">Operating Cash</div>
                      <div className="text-2xl font-bold text-white">$1.2M</div>
                      <div className="text-blue-500 text-sm mt-1">94% efficiency</div>
                    </Card>
                    <Card className="bg-slate-800/50 border-slate-700 p-6">
                      <div className="text-slate-400 text-sm mb-2">Burn Rate</div>
                      <div className="text-2xl font-bold text-white">$460K</div>
                      <div className="text-orange-500 text-sm mt-1">5.2 months runway</div>
                    </Card>
                  </div>
                </div>
              )}

              {activeTab === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <Card className="bg-slate-800/50 border-slate-700 p-6">
                    <h3 className="text-white font-semibold mb-4">Revenue by Category</h3>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={revenueData} layout="vertical">
                        <XAxis type="number" stroke="#64748b" />
                        <YAxis dataKey="category" type="category" stroke="#64748b" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1e293b', 
                            border: '1px solid #475569',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar dataKey="value" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-slate-800/50 border-slate-700 p-6">
                      <div className="text-slate-400 text-sm mb-2">YoY Growth</div>
                      <div className="text-2xl font-bold text-white">+24.5%</div>
                      <div className="text-emerald-500 text-sm mt-1">Above target</div>
                    </Card>
                    <Card className="bg-slate-800/50 border-slate-700 p-6">
                      <div className="text-slate-400 text-sm mb-2">Market Share</div>
                      <div className="text-2xl font-bold text-white">18.3%</div>
                      <div className="text-blue-500 text-sm mt-1">+2.1% vs Q1</div>
                    </Card>
                  </div>
                </div>
              )}

              {activeTab === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <Card className="bg-slate-800/50 border-slate-700 p-6">
                    <h3 className="text-white font-semibold mb-4">Budget vs Actual</h3>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={budgetData}>
                        <XAxis dataKey="category" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1e293b', 
                            border: '1px solid #475569',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar dataKey="budget" fill="#60a5fa" radius={[8, 8, 0, 0]} name="Budget" />
                        <Bar dataKey="actual" fill="#34d399" radius={[8, 8, 0, 0]} name="Actual" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-slate-800/50 border-slate-700 p-6">
                      <div className="text-slate-400 text-sm mb-2">Budget Variance</div>
                      <div className="text-2xl font-bold text-white">+3.8%</div>
                      <div className="text-emerald-500 text-sm mt-1">Above budget</div>
                    </Card>
                    <Card className="bg-slate-800/50 border-slate-700 p-6">
                      <div className="text-slate-400 text-sm mb-2">Forecast Accuracy</div>
                      <div className="text-2xl font-bold text-white">94.2%</div>
                      <div className="text-blue-500 text-sm mt-1">High confidence</div>
                    </Card>
                    <Card className="bg-slate-800/50 border-slate-700 p-6">
                      <div className="text-slate-400 text-sm mb-2">YTD Performance</div>
                      <div className="text-2xl font-bold text-white">102%</div>
                      <div className="text-emerald-500 text-sm mt-1">On track</div>
                    </Card>
                  </div>
                </div>
              )}

              {activeTab === 4 && (
                <div className="space-y-4 animate-fade-in">
                  <Card className="bg-slate-800/50 border-slate-700 p-6">
                    <h3 className="text-white font-semibold mb-4">Accounts Receivable Aging</h3>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={arAgingData}>
                        <XAxis dataKey="range" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1e293b', 
                            border: '1px solid #475569',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar dataKey="amount" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-slate-800/50 border-slate-700 p-6">
                      <div className="text-slate-400 text-sm mb-2">Total A/R</div>
                      <div className="text-2xl font-bold text-white">$1.55M</div>
                      <div className="text-blue-500 text-sm mt-1">Current balance</div>
                    </Card>
                    <Card className="bg-slate-800/50 border-slate-700 p-6">
                      <div className="text-slate-400 text-sm mb-2">DSO</div>
                      <div className="text-2xl font-bold text-white">42 days</div>
                      <div className="text-emerald-500 text-sm mt-1">-3 days vs target</div>
                    </Card>
                    <Card className="bg-slate-800/50 border-slate-700 p-6">
                      <div className="text-slate-400 text-sm mb-2">Past Due %</div>
                      <div className="text-2xl font-bold text-white">17.7%</div>
                      <div className="text-orange-500 text-sm mt-1">Monitor closely</div>
                    </Card>
                  </div>
                </div>
              )}

              {activeTab === 5 && (
                <div className="space-y-4 animate-fade-in">
                  <Card className="bg-slate-800/50 border-slate-700 p-6">
                    <h3 className="text-white font-semibold mb-4">Profit & Loss Statement</h3>
                    <ResponsiveContainer width="100%" height={400}>
                      <AreaChart data={plData}>
                        <defs>
                          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="expensesGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="netIncomeGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="month" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1e293b', 
                            border: '1px solid #475569',
                            borderRadius: '8px'
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          fill="url(#revenueGradient)" 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="expenses" 
                          stroke="#ef4444" 
                          strokeWidth={2}
                          fill="url(#expensesGradient)" 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="netIncome" 
                          stroke="#10b981" 
                          strokeWidth={2}
                          fill="url(#netIncomeGradient)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-slate-800/50 border-slate-700 p-6">
                      <div className="text-slate-400 text-sm mb-2">Gross Profit Margin</div>
                      <div className="text-2xl font-bold text-white">48.5%</div>
                      <div className="text-emerald-500 text-sm mt-1">+2.3% YoY</div>
                    </Card>
                    <Card className="bg-slate-800/50 border-slate-700 p-6">
                      <div className="text-slate-400 text-sm mb-2">Operating Margin</div>
                      <div className="text-2xl font-bold text-white">28.1%</div>
                      <div className="text-blue-500 text-sm mt-1">Above target</div>
                    </Card>
                    <Card className="bg-slate-800/50 border-slate-700 p-6">
                      <div className="text-slate-400 text-sm mb-2">EBITDA</div>
                      <div className="text-2xl font-bold text-white">$1.8M</div>
                      <div className="text-emerald-500 text-sm mt-1">+16% vs plan</div>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </Card>

          <div className="mt-8 text-center">
            <Button size="lg" className="bg-gradient-hero hover:opacity-90 transition-opacity" asChild>
              <a href="#contact">Request Demo</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PowerBIDemo;
