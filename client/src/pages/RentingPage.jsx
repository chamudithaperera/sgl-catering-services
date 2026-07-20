import { servicePageContent } from "../data/servicePageContent";
import { ServiceShowcasePage } from "./ServiceShowcasePage";

export default function RentingPage() {
  return <ServiceShowcasePage page={servicePageContent.renting} />;
}
