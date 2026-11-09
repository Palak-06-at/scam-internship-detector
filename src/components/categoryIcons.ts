import { BadgeCheck, CreditCard, IndianRupee, KeyRound, Timer, TrendingUp, type LucideIcon } from "lucide-react";
import type { IndicatorCategory } from "@/types/analysis";

/** One icon per detection category, shared by result cards and the features section. */
export const CATEGORY_ICONS: Record<IndicatorCategory, LucideIcon> = {
  "registration-fee": IndianRupee,
  "payment-request": CreditCard,
  "unrealistic-salary": TrendingUp,
  urgency: Timer,
  "sensitive-info": KeyRound,
  "guaranteed-selection": BadgeCheck,
};
