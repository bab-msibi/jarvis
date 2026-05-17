type TerminalOutputProps = {
  lines: string[];
};

export function TerminalOutput({ lines }: TerminalOutputProps) {
  return (
    <div className="mono-scroll h-[290px] bg-[#010913] px-3 py-3 font-mono text-xs leading-6 text-cyan-200">
      {lines.map((line, index) => (
        <p className="w-max min-w-full pr-4" key={`${line}-${index}`}>
          {line}
        </p>
      ))}
    </div>
  );
}
