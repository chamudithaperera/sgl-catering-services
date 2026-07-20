import { servicePageContent } from "../data/servicePageContent";
import { ServiceShowcasePage } from "./ServiceShowcasePage";

export default function CateringPage() {
  return <ServiceShowcasePage page={servicePageContent.catering} />;
}
