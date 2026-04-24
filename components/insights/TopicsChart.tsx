import * as React from "react";
import { Card } from "@/components/ui/card";

type TopicData = {
  name: string;
  percentage: number;
  color: string;
};

type TopicsChartProps = {
  data: TopicData[];
};

export function TopicsChart({ data }: TopicsChartProps) {
  return (
    <Card className="p-5 mt-4 w-full">
      <div className="mb-6">
        <h3 className="label-text text-text-muted">TOP REQUESTED TOPICS</h3>
      </div>
      
      <div className="flex flex-col gap-5">
        {data.map((topic, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-text-primary">{topic.name}</span>
              <span className="font-semibold text-text-primary">{topic.percentage}%</span>
            </div>
            <div className="w-full h-[5px] bg-surface-dim rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full" 
                style={{ 
                  width: `${topic.percentage}%`, 
                  backgroundColor: topic.color 
                }} 
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
