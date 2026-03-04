import PortfolioPage from "@/components/portfolio-page";
import { getPortfolioContent } from "@/lib/portfolio-content";

export default async function Page() {
    const content = await getPortfolioContent();
    return <PortfolioPage content={content} />;
}
