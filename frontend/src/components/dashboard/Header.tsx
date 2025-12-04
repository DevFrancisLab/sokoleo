import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
	return (
		<header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border/50">
			<div className="container max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
						<span className="text-2xl">🍅</span>
					</div>
					<span className="text-2xl font-bold text-primary">SOKOLEO</span>
				</div>

				<Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl hover:bg-muted">
					<Menu className="w-7 h-7 text-foreground" />
				</Button>
			</div>
		</header>
	);
};

export default Header;
