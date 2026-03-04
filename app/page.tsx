import PortfolioPage from "@/components/portfolio-page";
import { getPortfolioContent } from "@/lib/portfolio-content";

export const dynamic = "force-dynamic";

export default async function Page() {
    const content = await getPortfolioContent();
    return <PortfolioPage content={content} />;
}
