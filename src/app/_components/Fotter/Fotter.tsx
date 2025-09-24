"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="border-t bg-background text-foreground">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <h1 className="text-lg font-bold">MyStore</h1>

        {/* بدل الروابط والأيقونات */}
        <div className="text-center md:text-left text-sm text-muted-foreground">
          <p className="font-medium">Made with ❤️ by MyStore Team</p>
          <p className="text-xs">Delivering quality products since 2025</p>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="text-center text-sm text-muted-foreground pb-6">
        © {new Date().getFullYear()} MyStore. All rights reserved.
      </div>
    </footer>
  );
}
