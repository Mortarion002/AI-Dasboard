"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

export function PreferencesCard() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const [temperature, setTemperature] = React.useState(0.3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      {/* Appearance Card */}
      <div className="bg-surface border border-border rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <h3 className="text-sm font-semibold text-text-primary mb-1">Appearance Preview</h3>
        <p className="text-[13px] text-text-muted mb-6">Customize how AIOps Command looks.</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Switch 
              checked={isDark} 
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} 
            />
            <span className="text-sm text-text-primary font-medium">
              {isDark ? "Dark Mode Active" : "Light Mode Active"}
            </span>
          </div>
        </div>
      </div>

      {/* Model Temperature Card */}
      <div className="bg-surface border border-border rounded-lg p-6 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        <h3 className="text-sm font-semibold text-text-primary mb-1">Default Model Temperature</h3>
        <p className="text-[13px] text-text-muted mb-6">Adjust the default creativity level for all AI requests.</p>
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between text-[11px] font-semibold text-text-muted uppercase tracking-wider">
            <span>Precise (0.0)</span>
            <span>Creative (1.0)</span>
          </div>
          <Slider
            defaultValue={[0.3]}
            max={1}
            step={0.1}
            value={[temperature]}
            onValueChange={(val) => setTemperature(val[0])}
            className="w-full"
          />
          <div className="text-right mt-1 font-mono text-[13px] text-text-primary">
            {temperature.toFixed(1)}
          </div>
        </div>
      </div>
    </div>
  );
}
