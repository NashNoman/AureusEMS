"use client";

import { createBank } from "@/actions/bank";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function CreateBankButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  const handleCreateBank = async () => {
    setLoading(true);
    await createBank(id);
  };

  return loading ? (
    <Button className="w-32 opacity-70">
      <Loader2 className="animate-spin" />
    </Button>
  ) : (
    <Button onClick={handleCreateBank} className="w-32">
      Create bank
    </Button>
  );
}
