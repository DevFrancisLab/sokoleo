// Header intentionally omitted on dashboard
import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import MarketCard from "@/components/dashboard/MarketCard";
import InsightTile from "@/components/dashboard/InsightTile";
import ChatSection from "@/components/dashboard/ChatSection";
import VoiceButton from "@/components/dashboard/VoiceButton";
import FloatingChatButton from "@/components/dashboard/FloatingChatButton";
import NotificationBell from "@/components/dashboard/NotificationBell";
import Sidebar from "@/components/dashboard/Sidebar";
import { useSidebar } from "@/components/dashboard/SidebarContext";

const markets = [
	{ name: "Wakulima Market", price: 125, demand: "high" as const, crates: 200, bestTime: "Morning", distance: 12 },
	{ name: "Githurai Market", price: 140, demand: "medium" as const, crates: 150, bestTime: "Afternoon", distance: 8 },
	{ name: "Kawangware Market", price: 130, demand: "low" as const, crates: 80, bestTime: "Evening", distance: 15 },
];

const Dashboard = () => {
	const [isMarketsOpen, setIsMarketsOpen] = useState(true);
	const [isAISuggestionsOpen, setIsAISuggestionsOpen] = useState(true);

	// Markets state and pagination
	const [marketItems, setMarketItems] = useState(() => markets.slice());
	const [visibleCount, setVisibleCount] = useState(() => Math.min(3, marketItems.length));

	const loadMoreMarkets = () => {
		// Append 3 generated market entries to simulate loading more
		setMarketItems((prev) => {
			const next = prev.slice();
			const startIdx = prev.length + 1;
			for (let i = 0; i < 3; i++) {
				const idx = startIdx + i;
				next.push({
					name: `Market ${idx}`,
					price: Math.floor(Math.random() * 30) + 25,
					demand: (['low', 'medium', 'high'] as const)[Math.floor(Math.random() * 3)],
					crates: Math.floor(Math.random() * 200) + 50,
					bestTime: (['Morning', 'Afternoon', 'Evening'] as const)[Math.floor(Math.random() * 3)],
					distance: Math.floor(Math.random() * 20) + 5,
				} as any);
			}
			return next;
		});
		setVisibleCount((v) => v + 3);
	};

	const { isCollapsed } = useSidebar();

	return (
		<div className="min-h-screen bg-background pb-24">
			<Sidebar />

			<main className={`container max-w-6xl mx-auto px-4 py-8 ${isCollapsed ? "lg:ml-20" : "lg:ml-80"}`}>
					<div className="flex items-center justify-end mb-4">
						{/* Notification bell placed top-right */}
						<NotificationBell />
					</div>
				{isMarketsOpen ? (
					<>
						{/* Expanded: centered markets only, AI Suggestions hidden */}
						<div className="w-full flex justify-center">
						<div className="w-full max-w-2xl space-y-6">
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

								<div className="space-y-4">
									{marketItems.slice(0, visibleCount).map((market, index) => (
										<MarketCard key={index} {...market} />
									))}
								</div>

								<Button onClick={loadMoreMarkets} className="w-full mt-4 h-12 text-lg font-semibold" variant="outline">
									Load More
								</Button>
							</section>
						</div>
						</div>
						</>
					) : (
					<>
						{/* Collapsed: full width centered layout for AI Suggestions + Chat */}
						<div className="w-full flex justify-center">
						<div className="w-full max-w-2xl space-y-6">
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
							</section>

							<section>
												<div className="flex items-center gap-2 mb-4">
													<span className="text-2xl">💡</span>
													<h2 className="text-xl font-bold text-foreground">AI Suggestions</h2>
													<button
														onClick={() => setIsAISuggestionsOpen(!isAISuggestionsOpen)}
														aria-label={isAISuggestionsOpen ? "Collapse AI Suggestions" : "Expand AI Suggestions"}
														className="ml-auto p-2 rounded-md hover:bg-muted transition-colors flex items-center"
													>
														<ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isAISuggestionsOpen ? "rotate-180" : "rotate-0"}`} />
													</button>
												</div>

												{isAISuggestionsOpen && (
													<div className="grid gap-3">
														<InsightTile icon="🥇" label="Best Market Today" value="Wakulima Market" subtext="Ksh 45/kg • High demand" variant="primary" />
													</div>
												)}
							</section>

							<ChatSection />
							</div>
						</div>
					</>
				)}
			</main>
			{isMarketsOpen && <FloatingChatButton onClick={() => setIsMarketsOpen(false)} />}
			<VoiceButton />
		</div>
	);
};

export default Dashboard;
