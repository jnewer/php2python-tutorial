import { Code2, Lightbulb } from 'lucide-react';
import { CodeBlock } from '@/components/course/code-block';
import type { CodeComparison } from '@/lib/course-data';

export function CodeComparisonPanel({ comparison, onCopy }: { comparison: CodeComparison; onCopy?: (lang: string) => void }) {
  return (
    <div className="space-y-3">
      <h5 className="text-sm font-semibold text-foreground flex items-center gap-2">
        <Code2 className="h-4 w-4 text-primary" />
        {comparison.title}
      </h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <CodeBlock code={comparison.php} language="php" onCopy={onCopy} />
        <CodeBlock code={comparison.python} language="python" onCopy={onCopy} />
      </div>
      {comparison.note && (
        <div className="flex gap-2 items-start p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
          <Lightbulb className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
          <p className="text-sm text-emerald-700 dark:text-emerald-300 leading-relaxed">{comparison.note}</p>
        </div>
      )}
    </div>
  );
}
