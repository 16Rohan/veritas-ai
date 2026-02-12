interface CategoryTagProps {
  category: "Phishing" | "Malware" | "Social Engineering" | "Financial Fraud" | "Emerging Threat";
}

export const CategoryTag = ({ category }: CategoryTagProps) => {
  const colors = {
    "Phishing": "bg-cyan-500/20 border-cyan-500/50 text-cyan-300",
    "Malware": "bg-purple-500/20 border-purple-500/50 text-purple-300",
    "Social Engineering": "bg-violet-500/20 border-violet-500/50 text-violet-300",
    "Financial Fraud": "bg-rose-500/20 border-rose-500/50 text-rose-300",
    "Emerging Threat": "bg-amber-500/20 border-amber-500/50 text-amber-300"
  };

  return (
    <span className={`inline-block px-3 py-1 text-xs font-semibold border rounded-full ${colors[category]}`}>
      {category}
    </span>
  );
};
