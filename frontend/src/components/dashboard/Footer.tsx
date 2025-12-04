import { Home, TrendingUp, User } from "lucide-react";

const Footer = () => {
	return (
		<footer className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border/50 z-40">
			<nav className="container max-w-6xl mx-auto px-4 py-2 flex items-center justify-around">
				<button className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-muted transition-colors">
					<Home className="w-7 h-7 text-primary" />
					<span className="text-xs font-medium text-primary">Home</span>
				</button>

				<button className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-muted transition-colors">
					<TrendingUp className="w-7 h-7 text-muted-foreground" />
					<span className="text-xs font-medium text-muted-foreground">Prices</span>
				</button>

				<button className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-muted transition-colors">
					<User className="w-7 h-7 text-muted-foreground" />
					<span className="text-xs font-medium text-muted-foreground">Me</span>
				</button>
			</nav>
		</footer>
	);
};

export default Footer;
