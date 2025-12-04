// Header intentionally omitted on dashboard
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import MarketCard from "@/components/dashboard/MarketCard";
import InsightTile from "@/components/dashboard/InsightTile";
import ChatSection from "@/components/dashboard/ChatSection";
import VoiceButton from "@/components/dashboard/VoiceButton";

const markets = [
	{ name: "Wakulima Market", price: 45, demand: "high" as const, crates: 200, bestTime: "Morning", distance: 12 },
	{ name: "Githurai Market", price: 38, demand: "medium" as const, crates: 150, bestTime: "Afternoon", distance: 8 },
	{ name: "Kawangware Market", price: 32, demand: "low" as const, crates: 80, bestTime: "Evening", distance: 15 },
];

const Dashboard = () => {
	const [isMarketsOpen, setIsMarketsOpen] = useState(true);

	return (
		<div className="min-h-screen bg-background pb-24">

			<main className="container max-w-6xl mx-auto px-4 py-8">
				<div className="grid gap-6 lg:grid-cols-3">
					<div className="lg:col-span-2 space-y-6">
						<section>
									<div className="flex items-center gap-2 mb-4">
										<div className="flex items-center gap-2">
											<span className="text-2xl">📊</span>
											<h2 className="text-xl font-bold text-foreground">Market Updates</h2>
										</div>
										<button
											aria-expanded={isMarketsOpen}
											onClick={() => setIsMarketsOpen((s) => !s)}
											className="ml-auto p-2 rounded-md hover:bg-muted transition-colors flex items-center"
										>
											<ChevronDown className={`w-5 h-5 transition-transform ${isMarketsOpen ? "rotate-180" : "rotate-0"}`} />
										</button>
									</div>

									{isMarketsOpen && (
										<div className="space-y-4">
											{markets.map((market, index) => (
												<MarketCard key={index} {...market} />
											))}
										</div>
									)}
						</section>

						<section>
							<div className="flex items-center gap-2 mb-4">
								<span className="text-2xl">💡</span>
								<h2 className="text-xl font-bold text-foreground">AI Suggestions</h2>
							</div>

							<div className="grid gap-3">
								<InsightTile icon="🥇" label="Best Market Today" value="Wakulima Market" subtext="Ksh 45/kg • High demand" variant="primary" />
								<div className="grid grid-cols-2 gap-3">
									<InsightTile icon="📈" label="Profit Estimate" value="Ksh 2,500" variant="secondary" />
									<InsightTile icon="🚚" label="When to Sell" value="Morning" variant="accent" />
								</div>
							</div>
						</section>
					</div>

					<aside className="space-y-6">
						<div className="sticky top-24">
							<ChatSection />
						</div>

						<div>
							<h3 className="mb-3 text-sm font-medium text-muted-foreground">Quick Insights</h3>
							<div className="grid gap-3">
								<InsightTile icon="📊" label="Weekly Trend" value="Up 8%" variant="secondary" />
								<InsightTile icon="⚠️" label="Supply Alert" value="Low in Kawangware" variant="accent" />
							</div>
						</div>
					</aside>
				</div>
			</main>

			<VoiceButton />
		</div>
	);
};

export default Dashboard;
